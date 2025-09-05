import { Skeleton } from "@/components/ui/skeleton"

export default function ShopHeaderSkeleton() {
  return (
    <div className="sticky top-0 z-30 px-4 h-14 flex justify-between items-center bg-white/80 backdrop-blur-md">
      <div></div>
      <Skeleton className="w-full h-14" />
    </div>
  )
}