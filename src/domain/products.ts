import { Product } from '@/lib/type';
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

export type ProductDetailVO = {
    id: number
    name: string
    desc: string
    imgList: { url: string; type: string; price: number }[]
    typeIndexMap: Record<string, number>
}

export class ProductAdapter {
    constructor(private dto: ProductDTO) { }
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

export function adaptorTmp(dto: ProductDTO): Product
export function adaptorTmp(dto: ProductDTO[]): Product[];
export function adaptorTmp(dto: ProductDTO[] | ProductDTO): Product[] | Product {
    if (Array.isArray(dto)) {
        return dto.map((item): Product => {
            return {
                id: item.id,
                name: item.name,
                price: item.variants[0].price.toNumber(),
                description: item.desc,
                image: item.variants[0].image_url,
                variant: item.variants.map(v => v.type)
            }
        })
    } else {
        return {
            id: dto.id,
            name: dto.name,
            price: dto.variants[0].price.toNumber(),
            description: dto.desc,
            image: dto.variants[0].image_url,
            variant: dto.variants.map(v => v.type)
        }
    }

}
