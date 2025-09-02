// app/(whatever)/loading.tsx  or  src/pages/xxx/loading.tsx
import { ShopDetailSkeleton } from "@/components/skeleton/productDetail/ShopDetailSkeleton";
import * as React from "react";

export default function Loading() {
    return (
        <ShopDetailSkeleton />
    );
}
