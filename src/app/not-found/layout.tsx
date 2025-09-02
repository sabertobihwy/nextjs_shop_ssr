
export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="zh">
            <body>{children}</body>
        </html>
    );
}
