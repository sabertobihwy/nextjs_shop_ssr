import { getPageInstanceById } from "@/lib/dao/pageInstance"
import { getSectionInstanceById } from "@/lib/dao/sectionInstance"
import { BizError } from "@/types/shared/BizError"
import { ErrorCode } from "@/types/shared/error-code"

type sectionInstance = {
    id: string
}

export async function fetchSectionPropsByName(pageInstanceId: string, sectionName: string): Promise<unknown> {
    const pageInstance = await getPageInstanceById(pageInstanceId)
    if (!pageInstance) throw new BizError(ErrorCode.PAGEINSTANCE_NOT_FOUND, 404)

    const sectionMap = pageInstance.section_map as Record<string, sectionInstance>
    const sectionInstanceId: string = sectionMap[sectionName]?.id
    if (!sectionInstanceId) throw new BizError(ErrorCode.SECTIONINSTANCE_ID_NOT_FOUND, 404)
    const sectionInstance = await getSectionInstanceById(sectionInstanceId)
    if (!sectionInstance) throw new BizError(ErrorCode.SECTIONINSTANCE_NOT_FOUND, 404)

    return sectionInstance.props
}