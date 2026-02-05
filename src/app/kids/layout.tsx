import { ReactNode } from "react";

export default function KidsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="theme-kids min-h-screen bg-background text-foreground font-sans">
            <main className="max-w-md mx-auto min-h-screen bg-white/50 shadow-2xl relative overflow-hidden">
                {/* Decorative Circles for playfulness */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
                <div className="absolute top-20 -right-10 w-32 h-32 bg-secondary/50 rounded-full blur-2xl -z-10" />

                {children}
            </main>
        </div>
    );
}
