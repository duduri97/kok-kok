export default function ClassicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="theme-classic min-h-screen bg-background text-foreground">
            {/* Classic Theme Wrapper */}
            <div className="max-w-md mx-auto min-h-screen bg-background shadow-2xl overflow-hidden relative font-serif">
                {children}
            </div>
        </div>
    );
}
