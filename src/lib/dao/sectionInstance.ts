import { prisma } from '@/db/prisma'

export async function getSectionInstanceById(id: string) {
    console.log(`😊sectionInstanceId： === ${id}`)

    return await prisma.section_instance.findUnique({
        where: { id }
    })
}
