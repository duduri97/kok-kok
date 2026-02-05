import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { User, Baby, GraduationCap, Briefcase, BookOpen, Crown } from "lucide-react";

export default function Home() {
  const roles = [
    {
      id: "kids",
      name: "초등부 (Kids)",
      description: "달란트 모으고 QR 출석해요!",
      icon: <Baby className="w-8 h-8 text-yellow-500" />,
      color: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
      href: "/kids",
    },
    {
      id: "teens",
      name: "중고등부 (Teens)",
      description: "랭킹 확인하고 기프티콘 받자!",
      icon: <GraduationCap className="w-8 h-8 text-green-500" />,
      color: "bg-green-50 hover:bg-green-100 border-green-200",
      href: "/teens", // To be implemented
    },
    {
      id: "mate",
      name: "청년부 (Mate)",
      description: "갓생 챌린지와 멘토링",
      icon: <Briefcase className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      href: "/mate", // To be implemented
    },
    {
      id: "classic",
      name: "장년부 (Classic)",
      description: "성경 통독과 은혜 나눔",
      icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
      color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200",
      href: "/classic", // To be implemented
    },
    {
      id: "teacher",
      name: "교사 / 관리자",
      description: "출석 체크 및 포인트 관리",
      icon: <User className="w-8 h-8 text-slate-500" />,
      color: "bg-slate-50 hover:bg-slate-100 border-slate-200",
      href: "/teacher",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            콕콕 (KOK-KOK)
          </h1>
          <p className="text-slate-500">
            반석 위에 세워진 우리 가족 신앙 놀이터
          </p>
        </div>

        {/* Role Selection Grid */}
        <div className="grid gap-4">
          {roles.map((role) => (
            <Link key={role.id} href={role.href}>
              <Card className={`transition-all duration-200 cursor-pointer border-2 ${role.color}`}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    {role.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{role.name}</h3>
                    <p className="text-sm text-slate-500">{role.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-8">
          © 2026 Seoul Bansuk Church. All rights reserved.
        </p>
      </div>
    </div>
  );
}
