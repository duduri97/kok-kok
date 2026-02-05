import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Users } from "lucide-react";
import Link from "next/link";

export default function TeacherPage() {
    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold">교사 전용 모드 👨‍🏫</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/teacher/scan" className="block">
                    <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-2 hover:border-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <QrCode className="w-6 h-6" /> QR 출석 스캔
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">학생들의 QR 코드를 스캔하여 출석을 처리합니다.</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/teacher/class" className="block">
                    <Card className="hover:bg-slate-50 transition-colors cursor-pointer border-2 hover:border-primary">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-6 h-6" /> 반 관리
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">우리 반 학생 목록과 출석 현황을 확인합니다.</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
