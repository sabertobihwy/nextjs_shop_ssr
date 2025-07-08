
export type ProductDTO = {
    variants: {
        id: number;
        product_id: number;
        type: string;
        price: string;
        stock: number;
        image_url: string;
    }[];
} & {
    id: number;
    name: string;
    description: string;
    tenant_id: string;
    created_at: string;
}


// not sure if display need tenantId 
export type ProductDisplayVO = {
    id: number,
    name: string,
    minPrice: number,
    minImageUrl: string,
    createAt: number
}

export type ProductDetailVO = {
    id: number
    tenantId: string
    name: string
    desc: string
    imgList: { url: string; type: string; price: number }[]
    typeIndexMap: Record<string, number>
}

export class ProductDetailAdaptor {
    constructor(private dto: ProductDTO) {
    }
    toProductDetailVO(): ProductDetailVO {
        const imgList = this.dto.variants.map((variant) => ({
            url: variant.image_url,
            type: variant.type,
            price: Number(variant.price),
        }))

        const typeIndexMap = imgList.reduce((map, item, index) => {
            map[item.type] = index
            return map
        }, {} as Record<string, number>)

        return {
            id: this.dto.id,
            name: this.dto.name,
            desc: this.dto.description,
            tenantId: this.dto.tenant_id,
            imgList,
            typeIndexMap,
        }
    }
}

export class ProductAdapter {
    constructor(private dtos: ProductDTO[]) {
    }
    toProductDisplayVO(): ProductDisplayVO[] {
        return this.dtos.map(dto => {

            const minVA = [...dto.variants].sort((a, b) => (Number(a.price) - Number(b.price)))
            return {
                id: dto.id,
                name: dto.name,
                minPrice: Number(minVA[0].price),
                minImageUrl: minVA[0].image_url,
                createAt: new Date(dto.created_at).getTime()
            }
        })
    }

}

