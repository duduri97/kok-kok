export default function MateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            {/* Mobile Container Limit */}
            <div className="w-full max-w-md min-h-screen bg-slate-50 shadow-2xl relative overflow-hidden">
                {children}
            </div>
        </div>
    );
}
