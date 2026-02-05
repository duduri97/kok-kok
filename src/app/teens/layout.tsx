export default function TeensLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="theme-teens min-h-screen bg-background text-foreground">
            {/* Teens Theme Wrapper */}
            <div className="max-w-md mx-auto min-h-screen bg-background shadow-2xl overflow-hidden relative">
                {children}

                {/* Background Gradient Effect */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.3),transparent_70%)]" />
            </div>
        </div>
    );
}
