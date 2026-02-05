"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, CheckCircle2, ChevronRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MatePage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <div className="bg-blue-600 p-6 pt-8 pb-16 rounded-b-[2rem] relative">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-0.5">MATE</h1>
                        <p className="text-blue-100 text-xs">청년부 - 갓생 챌린지</p>
                    </div>
                    <Avatar className="w-10 h-10 border-2 border-white/30">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-blue-800 text-white font-bold text-sm">ME</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <div className="px-6 -mt-10 space-y-6">
                {/* Main Action Card */}
                <Card className="border-none shadow-xl bg-white overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="font-bold text-lg">이번 주 모임</h2>
                                <p className="text-slate-500 text-sm">토요일 오후 4시, 비전홀</p>
                            </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl">
                            참석 여부 알리기
                        </Button>
                    </CardContent>
                </Card>

                {/* Challenge Section */}
                <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        🔥 갓생 챌린지
                        <span className="text-xs font-normal text-blue-600 bg-blue-100 px-2 py-1 rounded-full">D-4</span>
                    </h3>
                    <div className="grid gap-3">
                        <Card className="border-none shadow-sm bg-white">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-full text-green-600">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800">새벽예배 드리기</div>
                                        <div className="text-xs text-slate-500">주 3회 달성 도전!</div>
                                    </div>
                                </div>
                                <span className="text-green-600 font-bold">1/3</span>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm bg-white opacity-60">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded-full text-slate-400">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800">성경 5장 읽기</div>
                                        <div className="text-xs text-slate-500">매일 매일 꾸준히</div>
                                    </div>
                                </div>
                                <span className="text-slate-400 font-bold">0/1</span>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Mentoring */}
                <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 border-none text-white shadow-lg">
                    <CardContent className="p-5 flex items-center justify-between">
                        <div>
                            <div className="text-purple-100 text-sm mb-1 font-medium">커리어 & 신앙 멘토링</div>
                            <div className="font-bold text-lg">멘토 찾기</div>
                        </div>
                        <div className="bg-white/20 p-2 rounded-full">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center pt-4">
                    <Button variant="ghost" asChild className="text-slate-400 hover:text-slate-600">
                        <Link href="/">
                            메인으로 돌아가기
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
