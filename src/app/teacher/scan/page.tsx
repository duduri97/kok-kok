"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface ScanResult {
    uid: string;
    type: string;
    ts: number;
}

export default function TeacherScanPage() {
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            },
            false
        );

        scanner.render(
            (decodedText) => {
                try {
                    const result = JSON.parse(decodedText);
                    if (result.type === "ATTENDANCE") {
                        handleScanSuccess(result);
                        scanner.clear(); // Stop scanning after success
                    }
                } catch (e) {
                    console.error("Invalid QR Code", e);
                }
            },
            () => {
                // console.warn(_);
            }
        );

        return () => {
            scanner.clear().catch(error => console.error("Failed to clear scanner. ", error));
        };
    }, []);

    const handleScanSuccess = async (result: ScanResult) => {
        try {
            // Optimistic UI update
            setScanResult(result);

            // 1. Insert Attendance Log
            const { error: logError } = await supabase
                .from('attendance_logs')
                .insert({
                    user_id: result.uid,
                    type: 'SUNDAY_SERVICE',
                    check_in_at: new Date().toISOString()
                });

            if (logError) throw logError;

            // 2. Insert Points (Reward)
            const { error: pointError } = await supabase
                .from('points')
                .insert({
                    user_id: result.uid,
                    amount: 10,
                    reason: '주일예배 출석' // Sunday Service Attendance
                });

            if (pointError) throw pointError;

            console.log("Attendance recorded successfully!");

        } catch (error) {
            console.error("Failed to record attendance:", error);
            alert("출석 처리 중 오류가 발생했습니다.");
            setScanResult(null); // Reset on error
        }
    };

    const handleReset = () => {
        setScanResult(null);
        window.location.reload();
    };

    return (
        <div className="container mx-auto p-4 max-w-md h-screen flex flex-col">
            <div className="mb-4">
                <Button variant="ghost" asChild className="pl-0">
                    <Link href="/teacher" className="flex items-center gap-2">
                        <ArrowLeft /> 교사 홈으로
                    </Link>
                </Button>
            </div>

            <h1 className="text-2xl font-bold mb-6 text-center">📷 출석 QR 스캔</h1>

            <Card className="flex-1 border-2 border-slate-200 shadow-lg overflow-hidden flex flex-col">
                <CardContent className="p-0 flex-1 flex flex-col relative bg-black">
                    {!scanResult ? (
                        <div id="reader" className="w-full h-full text-white" />
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center bg-green-50 p-6 text-center space-y-4">
                            <CheckCircle2 className="w-24 h-24 text-green-500 animate-bounce" />
                            <h2 className="text-2xl font-bold text-green-700">출석 확인 완료!</h2>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-200 w-full">
                                <p className="text-sm text-muted-foreground">학생 ID</p>
                                <p className="text-xl font-mono font-bold text-slate-800">{scanResult.uid}</p>
                                <p className="text-xs text-slate-400 mt-2">시간: {new Date(scanResult.ts).toLocaleTimeString()}</p>
                            </div>
                            <Button onClick={handleReset} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl text-lg">
                                다음 학생 스캔하기
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {!scanResult && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                    QR 코드를 사각형 안에 맞춰주세요.
                </p>
            )}
        </div>
    );
}
