import { prisma } from '@/db/prisma'

export async function getPageInstanceById(id: string) {
    return await prisma.page_instance.findUnique({
        where: { id }
    })
}
export async function getPageSectionMap(pageId: string) {
    return prisma.page_instance.findUnique({
        where: { id: pageId },
        select: { section_map: true },
    });
}