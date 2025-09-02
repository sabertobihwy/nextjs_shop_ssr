import { ProductBaseDTO } from "@/types/entities/products";

export type PriceBucket = {
    label: string;                // 文案：Less than $X / $X - $Y / ...
    min: number | null;           // 下界（包含）；null 表示无下界
    max: number | null;           // 上界（不包含）；null 表示无上界
};

function parseMoney(s: string): number {
    const n = Number((s || "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : NaN;
}

function fmtUSD(n: number): string {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

/** 根据所有产品的 min_price，等分成 4 个价格区间（仅返回区间与文案） */
export function buildPriceBuckets(products: ProductBaseDTO[]): PriceBucket[] {
    const vals = products.map(p => parseMoney(p.min_price)).filter(Number.isFinite) as number[];
    if (vals.length === 0) {
        return [
            { label: "Less than $0", min: null, max: 0 },
            { label: "$0 - $0", min: 0, max: 0 },
            { label: "$0 - $0", min: 0, max: 0 },
            { label: "More than $0", min: 0, max: null },
        ];
    }

    const lo = Math.min(...vals);
    const hi = Math.max(...vals);

    // 所有价格相等的极端情况
    if (hi === lo) {
        const L = Math.round(lo);
        return [
            { label: `Less than ${fmtUSD(L)}`, min: null, max: L },
            { label: `${fmtUSD(L)} - ${fmtUSD(L)}`, min: L, max: L }, // 点击可转成等于 L 的筛选
            { label: `${fmtUSD(L)} - ${fmtUSD(L)}`, min: L, max: L },
            { label: `More than ${fmtUSD(L)}`, min: L, max: null },
        ];
    }

    const span = hi - lo;
    // 25%/50%/75% 分位（四等分）
    let e1 = lo + span * 0.25;
    let e2 = lo + span * 0.50;
    let e3 = lo + span * 0.75;

    // 文案好看一点：取整到美元
    e1 = Math.round(e1);
    e2 = Math.round(e2);
    e3 = Math.round(e3);

    return [
        { label: `Less than ${fmtUSD(e1)}`, min: null, max: e1 },
        { label: `${fmtUSD(e1)} - ${fmtUSD(e2)}`, min: e1, max: e2 },
        { label: `${fmtUSD(e2)} - ${fmtUSD(e3)}`, min: e2, max: e3 },
        { label: `More than ${fmtUSD(e3)}`, min: e3, max: null },
    ];
}