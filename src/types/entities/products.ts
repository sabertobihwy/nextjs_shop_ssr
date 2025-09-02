import { Decimal } from '@prisma/client/runtime/library';

export type ProductWithVariantsDTO = {
    variants: {
        id: number;
        product_id: number;
        type: string;
        price: string;
        stock: number;
        image_url: string;
    }[];
} & ProductBaseDTO

export type ProductBaseDTO = {
    id: number;
    name: string;
    description: string;
    category_id: number;
    category_name?: string; // 新增
    tenant_id: string;
    min_price: string;
    min_price_img_url: string;
    created_at: string;
    short_slogan: string | null;
    promo_label: string | null;
}

const formatDecimal = (d: Decimal) =>
    d.toString()

export function toProductBaseDTO(product: ({
    categories: {
        name: string;
    } | null;
} & {
    name: string;
    id: number;
    description: string;
    tenant_id: string;
    created_at: Date;
    category_id: number;
    min_price: Decimal;
    min_price_img_url: string;
    short_slogan: string | null;
    promo_label: string | null;
})): ProductBaseDTO {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        category_name: product.categories?.name ?? "",
        tenant_id: product.tenant_id,
        min_price: formatDecimal(product.min_price),
        min_price_img_url: product.min_price_img_url ?? '',
        created_at: product.created_at.toISOString(),
        short_slogan: product.short_slogan,
        promo_label: product.promo_label
    }
}

export function toProductWithVariantsDTO(variants: {
    variants: {
        id: number;
        price: Decimal;
        type: string;
        product_id: number;
        stock: number;
        image_url: string;
    }[];
} & {
    description: string;
    id: number;
    name: string;
    tenant_id: string;
    created_at: Date;
    category_id: number;
    min_price: Decimal;
    min_price_img_url: string;
    short_slogan: string | null;
    promo_label: string | null;
}): ProductWithVariantsDTO {

    return {
        id: variants.id,
        name: variants.name,
        description: variants.description,
        category_id: variants.category_id,
        // category_name 留给上游查询 category include 后再赋
        tenant_id: variants.tenant_id,
        min_price: formatDecimal(variants.min_price),
        min_price_img_url: variants.min_price_img_url,
        created_at: variants.created_at.toISOString(),
        short_slogan: variants.short_slogan,
        promo_label: variants.promo_label,
        variants: variants.variants.map(v => ({
            id: v.id,
            product_id: v.product_id,
            type: v.type,
            price: formatDecimal(v.price),
            stock: v.stock,
            image_url: v.image_url,
        })),
    };
}

export type ShopCardContent = {
    linkHref: string;
    image: string;       // 来自 min_price_img_url
    title: string;       // 来自 name
    description: string; // 来自 description
    slogan?: string;      // 来自 short_slogan
    price: string;       // 来自 min_price
    offerLabel?: string;  // 来自 promo_label
};

export type Category = {
    name: string,
    id: number
}

export type ShopSidebarContentProps = {
    categories: Category[]
    subCategories?: Category[]
    selectedSubIds: number[];                  // 已勾选子类（多选）
    selectedCategoryId: number | null;           // 当前顶级类目（null = View All）
}

export function toShopCardContent(data: ProductBaseDTO[]): ShopCardContent[] {
    return data.map((p) => ({
        linkHref: `./shop/detail/${p.id}`,
        image: p.min_price_img_url,
        title: p.name,
        description: p.description,
        slogan: p.short_slogan ?? undefined,
        price: p.min_price,
        offerLabel: p.promo_label ?? undefined,
    }));
}

export function buildSidebarContent(
    categories: Category[] | undefined,
    selectedCatId: number | null,
    selectedSubIds: number[],
    subcats: Category[]): ShopSidebarContentProps {

    return {
        categories: categories ?? [],
        subCategories: subcats,
        selectedSubIds,
        selectedCategoryId: selectedCatId,
    };
}

// ------
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
    imgList: { url: string; type: string; price: number, variantId: number }[]
    typeIndexMap: Record<string, number>
}

export class ProductDetailAdaptor {
    constructor(private dto: ProductWithVariantsDTO) {
    }
    toProductDetailVO(): ProductDetailVO {
        const imgList = this.dto.variants.map((variant) => ({
            url: variant.image_url,
            type: variant.type,
            price: Number(variant.price),
            variantId: variant.id
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
    constructor(private dtos: ProductBaseDTO[]) {
    }
    toProductDisplayVO(): ProductDisplayVO[] {
        return this.dtos.map(dto => {
            return {
                id: dto.id,
                name: dto.name,
                minPrice: Number(dto.min_price),
                minImageUrl: dto.min_price_img_url,
                createAt: new Date(dto.created_at).getTime()
            }
        })
    }

}

