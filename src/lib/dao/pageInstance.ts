import { prisma } from '@/db/prisma'

export async function getPageInstanceById(id: string) {
    return await prisma.page_instance.findUnique({
        where: { id }
    })
}
