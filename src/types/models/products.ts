import { Prisma } from '@prisma/client';

export type ProductDTO = {
    variants: {
        id: number;
        product_id: number;
        type: string;
        price: Prisma.Decimal;
        stock: number;
        image_url: string;
    }[];
} & {
    name: string;
    id: number;
    desc: string;
};

export type ProductDisplayVO = {
    id: number,
    name: string,
    minPrice: number,
    minImageUrl: string
}

export type ProductDetailVO = {
    id: number
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
            price: variant.price.toNumber(),
        }))

        const typeIndexMap = imgList.reduce((map, item, index) => {
            map[item.type] = index
            return map
        }, {} as Record<string, number>)

        return {
            id: this.dto.id,
            name: this.dto.name,
            desc: this.dto.desc,
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
            const minVA = [...dto.variants].sort((a, b) => (a.price.toNumber() - b.price.toNumber()))
            return {
                id: dto.id,
                name: dto.name,
                minPrice: minVA[0].price.toNumber(),
                minImageUrl: minVA[0].image_url
            }
        })
    }

}

