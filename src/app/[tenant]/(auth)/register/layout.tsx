
export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex justify-between items-center h-[700px] ' >
            {children}
        </div>
    )
}