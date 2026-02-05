"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Star, Gift, Crown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function KidsPage() {
    const [points, setPoints] = useState(0);
    const [recentAttendance, setRecentAttendance] = useState<string | null>(null);

    // Mock User for MVP (should be replaced with Auth Context)
    const userId = "user-1234-5678";

    useEffect(() => {
        const fetchData = async () => {
            // 1. Fetch Total Points
            const { data: pointsData } = await supabase
                .from('points')
                .select('amount')
                .eq('user_id', userId);

            if (pointsData) {
                const total = pointsData.reduce((acc, curr) => acc + curr.amount, 0);
                setPoints(total);
            }

            // 2. Fetch Recent Attendance
            const { data: attendanceData } = await supabase
                .from('attendance_logs')
                .select('check_in_at')
                .eq('user_id', userId)
                .order('check_in_at', { ascending: false })
                .limit(1);

            if (attendanceData && attendanceData.length > 0) {
                setRecentAttendance(attendanceData[0].check_in_at);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 space-y-6 pb-24">
            {/* Header */}
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-primary-foreground">안녕, 친구! 👋</h1>
                    <p className="text-muted-foreground">
                        {recentAttendance
                            ? `최근 출석: ${new Date(recentAttendance).toLocaleDateString()}`
                            : "오늘도 예수님과 함께해요"}
                    </p>
                </div>
                <div className="bg-white p-2 rounded-full shadow-sm border border-border">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xl">
                        🧒
                    </div>
                </div>
            </header>

            {/* Main Action Card (Attendance) */}
            <Card className="bg-primary border-none shadow-lg overflow-hidden relative">
                <div className="absolute right-[-20px] top-[-20px] opacity-20">
                    <QrCode size={150} />
                </div>
                <CardContent className="p-6 flex flex-col items-start gap-4 z-10 relative">
                    <div className="bg-white/90 p-3 rounded-full shadow-sm">
                        <QrCode className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-primary-foreground">QR 출석하기</h2>
                        <p className="text-primary-foreground/80 text-sm">교회에 왔으면 찍어주세요!</p>
                    </div>
                    <Button variant="secondary" className="w-full font-bold text-lg h-12 rounded-2xl shadow-md" asChild>
                        <Link href="/kids/qr">
                            내 QR 코드 보기
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white border-2 border-secondary overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center h-full">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-1">
                            <Star className="w-6 h-6 fill-yellow-500" />
                        </div>
                        <div className="font-bold text-2xl text-foreground">{points}</div>
                        <div className="text-xs text-muted-foreground font-medium">나의 달란트</div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-2 border-secondary overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center h-full">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
                            <Crown className="w-6 h-6 fill-blue-500" />
                        </div>
                        <div className="font-bold text-2xl text-foreground">LV. 3</div>
                        <div className="text-xs text-muted-foreground font-medium">믿음의 용사</div>
                    </CardContent>
                </Card>
            </div>

            {/* Menu List */}
            <div className="space-y-3">
                <h3 className="font-bold text-lg px-1">신나는 활동</h3>

                <Link href="#" className="block">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-border flex items-center justify-between hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
                                <Gift className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-bold">달란트 시장</div>
                                <div className="text-xs text-muted-foreground">모은 달란트로 선물 사기</div>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                </Link>

                {/* More menu items can go here */}
            </div>

        </div>
    );
}
