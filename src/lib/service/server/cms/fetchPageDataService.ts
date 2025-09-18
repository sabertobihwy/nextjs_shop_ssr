import { getPageSectionMap } from "@/lib/dao/pageInstance";
import { getSectionPropsByIds } from "@/lib/dao/sectionInstance";
import { Prisma } from "@prisma/client";

type SectionMap = Record<string, { id?: string }>;
const KEY_OK = /^[A-Za-z0-9_]{1,64}$/; // 简单白名单，防原型污染

function asSectionMap(j: Prisma.JsonValue | null | undefined): SectionMap {
    return (j && typeof j === 'object') ? (j as any) : {};
}

export async function buildAccNoOrder(pageId: string) {
    // 1) 拿 map
    const page = await getPageSectionMap(pageId);
    const map = asSectionMap(page?.section_map);

    // 2) 批量查 props（去重）
    const ids = Array.from(
        new Set(
            Object.values(map)
                .map(v => v?.id)
                .filter((x): x is string => !!x),
        ),
    );

    const rows = await getSectionPropsByIds(ids);
    const byId = new Map(rows.map(r => [r.id, r.props as unknown]));

    // 3) 动态组装 acc（无原型对象）
    const acc: Record<string, unknown> = {};

    for (const [name, meta] of Object.entries(map)) {
        if (!KEY_OK.test(name)) continue;         // 过滤奇怪键名
        const props = meta?.id ? byId.get(meta.id) : undefined;
        if (props === undefined || props === null) continue;
        acc[name] = props;                        // e.g. acc.section_hero = {...}
    }

    return acc; // 无序字典
}