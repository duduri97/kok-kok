"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, UserPlus, Search, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Student {
    id: string;
    nickname: string;
    role: string;
    points: number;
    attendance_count: number;
}

export default function ClassManagementPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            // 1. Fetch Profiles
            const { data: profiles, error: pError } = await supabase
                .from('profiles')
                .select('id, nickname, role')
                .in('role', ['kids', 'teens']);

            if (pError) throw pError;

            // 2. Fetch Points for each
            const { data: points } = await supabase.from('points').select('user_id, amount');

            // 3. Fetch Attendance Logs for each
            const { data: logs } = await supabase.from('attendance_logs').select('user_id');

            const pointsMap = new Map<string, number>();
            points?.forEach(p => pointsMap.set(p.user_id, (pointsMap.get(p.user_id) || 0) + p.amount));

            const logsMap = new Map<string, number>();
            logs?.forEach(l => logsMap.set(l.user_id, (logsMap.get(l.user_id) || 0) + 1));

            const studentsData = profiles.map(p => ({
                id: p.id,
                nickname: p.nickname || "익명",
                role: p.role,
                points: pointsMap.get(p.id) || 0,
                attendance_count: logsMap.get(p.id) || 0
            }));

            setStudents(studentsData);
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = students.filter(s =>
        s.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6 space-y-6 max-w-4xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/teacher">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">반 관리 📋</h1>
                </div>
                <Button className="gap-2">
                    <UserPlus className="w-4 h-4" /> 학생 추가
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-sm text-muted-foreground">전체 인원</div>
                        <div className="text-2xl font-bold">{students.length}명</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-sm text-muted-foreground">부서</div>
                        <div className="text-2xl font-bold">초등/중고등</div>
                    </CardContent>
                </Card>
                {/* More stats if needed */}
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="학생 이름 검색..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Student Table */}
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>이름</TableHead>
                            <TableHead>부서</TableHead>
                            <TableHead className="text-right">출석 횟수</TableHead>
                            <TableHead className="text-right">달란트</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">로딩 중...</TableCell>
                            </TableRow>
                        ) : filteredStudents.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">검색 결과가 없습니다.</TableCell>
                            </TableRow>
                        ) : (
                            filteredStudents.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.nickname}</TableCell>
                                    <TableCell>
                                        <Badge variant={student.role === 'kids' ? 'secondary' : 'outline'} className={student.role === 'kids' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}>
                                            {student.role === 'kids' ? '초등부' : '중고등부'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{student.attendance_count}회</TableCell>
                                    <TableCell className="text-right font-mono font-bold text-primary">{student.points}P</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
