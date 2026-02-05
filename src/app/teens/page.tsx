"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Flame, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface RankUser {
    id: string;
    nickname: string;
    points: number;
    tier: string;
    rank: number;
}

export default function TeensPage() {
    const [leaderboard, setLeaderboard] = useState<RankUser[]>([]);
    const [myProfile, setMyProfile] = useState<RankUser | null>(null);
    const [loading, setLoading] = useState(true);

    // Mock User ID for MVP (Replace with Auth context later)
    // In a real scenario, we would use supabase.auth.getUser()
    const currentUserId = "user-1234-5678";

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                setLoading(true);

                // 1. Fetch Profiles
                const { data: profiles } = await supabase.from('profiles').select('id, nickname');

                // 2. Fetch All Points
                const { data: points } = await supabase.from('points').select('user_id, amount');

                if (!points || !profiles) {
                    setLoading(false);
                    return;
                }

                // 3. Calculate Total Points per User
                const pointsMap = new Map<string, number>();
                points.forEach(p => {
                    const current = pointsMap.get(p.user_id) || 0;
                    pointsMap.set(p.user_id, current + p.amount);
                });

                // 4. Merge Data & Sort
                const unsortedRankings = profiles.map(profile => {
                    const totalPoints = pointsMap.get(profile.id) || 0;
                    return {
                        id: profile.id,
                        nickname: profile.nickname || "익명",
                        points: totalPoints,
                        tier: calculateTier(totalPoints),
                        rank: 0 // Placeholder
                    };
                });

                // Sort by Points DESC
                const sortedRankings = unsortedRankings.sort((a, b) => b.points - a.points);

                // Assign Ranks
                const rankedList = sortedRankings.map((user, index) => ({
                    ...user,
                    rank: index + 1
                }));

                setLeaderboard(rankedList.slice(0, 50)); // Top 50

                // Find My Profile
                const me = rankedList.find(u => u.id === currentUserId);
                if (me) {
                    setMyProfile(me);
                } else {
                    // Fallback if no profile/points yet
                    setMyProfile({
                        id: currentUserId,
                        nickname: "나",
                        points: 0,
                        tier: "Bronze",
                        rank: rankedList.length + 1
                    });
                }

            } catch (error) {
                console.error("Failed to fetch rankings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, []);

    const calculateTier = (points: number) => {
        if (points >= 1000) return "Diamond";
        if (points >= 500) return "Platinum";
        if (points >= 300) return "Gold";
        if (points >= 100) return "Silver";
        return "Bronze";
    };

    if (loading) {
        return <div className="p-10 text-center text-primary animate-pulse">Loading Rankings...</div>;
    }

    return (
        <div className="p-6 space-y-8 relative z-10 pb-24">
            {/* Header */}
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold italic tracking-wider text-primary">TEENS ZONE</h1>
                    <p className="text-muted-foreground text-xs">서울반석교회 중고등부</p>
                </div>
                <Avatar className="w-10 h-10 border-2 border-primary">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-secondary text-primary font-bold">
                        {myProfile?.nickname.substring(0, 2) || "ME"}
                    </AvatarFallback>
                </Avatar>
            </header>

            {/* My Status Card */}
            {myProfile && (
                <Card className="bg-gradient-to-br from-secondary/80 to-secondary border-primary/50 shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-black/30 rounded-lg">
                                <Trophy className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-primary/80 font-mono">CURRENT TIER</div>
                                <div className="text-2xl font-black italic text-white tracking-widest">{myProfile.tier.toUpperCase()}</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-bold">
                                <span>RANK #{myProfile.rank}</span>
                                <span className="text-primary">{myProfile.points} PT</span>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden">
                                <div className="h-full bg-primary shadow-[0_0_10px_#39ff14]" style={{ width: `${Math.min((myProfile.points % 1000) / 10, 100)}%` }} />
                            </div>
                            <p className="text-xs text-right text-muted-foreground">Next Tier: 1000 PT</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Leaderboard */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                    <h2 className="font-bold text-lg">Weekly Ranking</h2>
                </div>

                <div className="space-y-3">
                    {leaderboard.length === 0 ? (
                        <div className="text-center p-4 text-muted-foreground">아직 랭킹 데이터가 없습니다.</div>
                    ) : (
                        leaderboard.map((user) => (
                            <div key={user.id} className={`flex items-center gap-4 bg-card/50 p-3 rounded-xl border transition-colors ${user.id === currentUserId ? 'border-primary bg-primary/10' : 'border-white/5 hover:border-primary/50'}`}>
                                <div className={`w-8 h-8 flex items-center justify-center font-bold text-lg ${user.rank === 1 ? 'text-yellow-400' :
                                        user.rank === 2 ? 'text-gray-300' :
                                            user.rank === 3 ? 'text-amber-600' : 'text-muted-foreground'
                                    }`}>
                                    {user.rank}
                                </div>
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-primary/20 text-primary-foreground text-xs">{user.nickname.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="font-bold text-sm">{user.nickname}</div>
                                    <div className="text-xs text-primary/80">{user.tier}</div>
                                </div>
                                <div className="font-mono font-bold">{user.points}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
                <Button className="h-auto py-4 bg-secondary hover:bg-secondary/80 border border-primary/20 flex flex-col gap-2">
                    <Medal className="w-6 h-6 text-primary" />
                    <span className="text-xs font-bold">업적 / 뱃지</span>
                </Button>
                <Button className="h-auto py-4 bg-secondary hover:bg-secondary/80 border border-primary/20 flex flex-col gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                    <span className="text-xs font-bold">내 활동 분석</span>
                </Button>
            </div>

            <div className="text-center pt-8">
                <Button variant="ghost" asChild className="text-muted-foreground hover:text-white">
                    <Link href="/">
                        메인으로 돌아가기
                    </Link>
                </Button>
            </div>
        </div>
    );
}
