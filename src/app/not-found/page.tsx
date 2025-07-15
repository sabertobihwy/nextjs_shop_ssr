import NotFoundClient from './not-found-client'

export default function Page() {
    return (
        // <Suspense fallback={<div style={{ padding: '2rem' }}>加载中...</div>}>
        //     <NotFoundClient />
        // </Suspense>
        <NotFoundClient />
    )
}
