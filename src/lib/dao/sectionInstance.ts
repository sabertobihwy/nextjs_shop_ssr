import { prisma } from '@/db/prisma'

export async function getSectionInstanceById(id: string) {
    console.log(`😊sectionInstanceId： === ${id}`)

    return await prisma.section_instance.findUnique({
        where: { id }
    })
}

export async function getSectionPropsByIds(ids: string[]) {
    if (ids.length === 0) return [];
    return prisma.section_instance.findMany({
        where: { id: { in: ids } },
        select: { id: true, props: true },
    });
}