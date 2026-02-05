"use client";

import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function KidsQRPage() {
    // Mock User Data (In real app, get from Supabase Auth)
    const [user] = useState({
        id: "user-1234-5678",
        name: "김수아",
        role: "kids"
    });

    const [timestamp, setTimestamp] = useState<number | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTimestamp(Date.now());
    }, []);

    if (!timestamp) return null;

    // QR Payload (derived from stable timestamp)
    const qrData = JSON.stringify({
        uid: user.id,
        type: "ATTENDANCE",
        ts: timestamp
    });

    return (
        <div className="p-6 h-screen flex flex-col items-center justify-center space-y-6">

            <div className="w-full flex justify-start">
                <Button variant="ghost" asChild className="pl-0 hover:bg-transparent text-muted-foreground">
                    <Link href="/kids" className="flex items-center gap-2">
                        <ArrowLeft /> 돌아가기
                    </Link>
                </Button>
            </div>

            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-primary-foreground">나의 출석 QR</h1>
                <p className="text-muted-foreground">선생님께 이 화면을 보여주세요!</p>
            </div>

            <Card className="w-full max-w-sm bg-white border-4 border-primary shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-primary p-4 text-center">
                    <CardTitle className="text-white text-lg">{user.name} 어린이</CardTitle>
                </CardHeader>
                <CardContent className="p-10 flex flex-col items-center justify-center gap-6 bg-white">
                    <div className="border-4 border-dashed border-gray-200 p-4 rounded-2xl">
                        <QRCodeSVG
                            value={qrData}
                            size={200}
                            level="H"
                            includeMargin={false}
                            imageSettings={{
                                src: "/icon-192x192.png", // PWA Icon (placeholder)
                                x: undefined,
                                y: undefined,
                                height: 24,
                                width: 24,
                                excavate: true,
                            }}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        화면 밝기를 최대로 높여주세요 ☀️
                    </p>
                </CardContent>
            </Card>

            <Button variant="outline" className="rounded-full gap-2 border-primary/20 text-primary-foreground" onClick={() => window.location.reload()}>
                <RefreshCw size={16} /> QR 새로고침
            </Button>

        </div>
    );
}
