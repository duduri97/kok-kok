"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart } from "lucide-react"; // Note: Check lucide icons later
import Link from "next/link";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

// Simple Bible Data
const BIBLE_BOOKS = [
    { name: "창세기", chapters: 50 },
    { name: "출애굽기", chapters: 40 },
    { name: "레위기", chapters: 27 },
    { name: "민수기", chapters: 36 },
    { name: "신명기", chapters: 34 },
    // Simplified for MVP...
];

export default function ClassicPage() {
    const [progress] = useState(12); // Mock progress
    const [amenCount, setAmenCount] = useState(1240);
    const [isPrayed, setIsPrayed] = useState(false);

    const handleAmen = () => {
        if (!isPrayed) {
            setAmenCount(prev => prev + 1);
            setIsPrayed(true);
            // In real app, call API to record prayer
        }
    };

    return (
        <div className="p-6 space-y-8 pb-24">
            {/* Header */}
            <header className="space-y-1 pt-4">
                <h1 className="text-3xl font-bold tracking-tight text-primary font-serif">Classic</h1>
                <p className="text-muted-foreground text-sm">말씀과 기도로 거룩하여짐이라 (딤전 4:5)</p>
            </header>

            {/* Bible Reading Card */}
            <Card className="border-secondary bg-card shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xl font-serif text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        성경 1독 도전
                    </CardTitle>
                    <span className="text-primary font-bold text-lg">12%</span>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Progress value={progress} className="h-2 bg-secondary" />
                    <p className="text-sm text-muted-foreground">
                        현재 <strong>창세기 40장</strong>을 읽고 계십니다.
                    </p>
                    <div className="grid grid-cols-5 gap-2 mt-4">
                        {BIBLE_BOOKS.map((book, i) => (
                            <div key={i} className={`text-xs p-2 rounded text-center border ${i === 0 ? 'bg-primary/20 border-primary text-primary' : 'border-secondary text-muted-foreground'}`}>
                                {book.name.substring(0, 1)}
                            </div>
                        ))}
                    </div>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-white/90">
                        오늘의 말씀 읽기
                    </Button>
                </CardContent>
            </Card>

            {/* Prayer Relay */}
            <Card className="border-secondary bg-card shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-serif text-white flex items-center gap-2">
                        <Heart className="w-5 h-5 text-rose-500" />
                        중보기도 릴레이
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-secondary/50 p-4 rounded-xl border border-secondary">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">환우를 위한 기도</span>
                            <span className="text-xs text-muted-foreground">2시간 전</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-200">
                            김철수 성도님의 수술이 잘 마쳐지고 회복될 수 있도록 기도 부탁드립니다.
                            주님의 치유의 손길이 함께하시길...
                        </p>
                    </div>

                    <Button
                        onClick={handleAmen}
                        disabled={isPrayed}
                        variant="outline"
                        className={`w-full h-12 text-lg gap-2 border-primary/30 ${isPrayed ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10 hover:text-primary transition-colors'}`}
                    >
                        <span>🙏</span>
                        <span className="font-bold">{isPrayed ? "아멘으로 화답하셨습니다" : "아멘으로 동참하기"}</span>
                        <span className="ml-auto text-xs font-normal opacity-70">{amenCount}명 참여</span>
                    </Button>
                </CardContent>
            </Card>

            <div className="text-center pt-4">
                <Button variant="ghost" asChild className="text-muted-foreground hover:text-white">
                    <Link href="/">
                        메인으로 돌아가기
                    </Link>
                </Button>
            </div>
        </div>
    );
}
