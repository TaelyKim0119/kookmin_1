"use client";

import { useState, useEffect } from "react";

interface Schedule {
  date: string;
  content: string;
  note: string;
  link: string;
  isImportant?: boolean;
  icon?: string;
}

const ImportantStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="#FFD700"
      stroke="#FFD700"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(3);

  useEffect(() => {
    setMounted(true);
  }, []);

  const months = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

  const schedules: { [key: number]: Schedule[] } = {
    3: [
      {
        date: "3.4-3.7",
        content: "2025학년도 1학기 일반대학원 연구등록",
        note: "09:00~17:00 (기일엄수)",
        link: "https://gds.kookmin.ac.kr/information/notice/3953"
      },
      {
        date: "3.12-3.14",
        content: "2025학년도 1학기 일반대학원 연구등록 기간 연장",
        note: "09:00~17:00 (기일엄수)",
        link: "https://gds.kookmin.ac.kr/information/notice/3953",
        isImportant: true
      },
      {
        date: "3.4-3.19",
        content: "수업연한 단축신청서 제출",
        note: "",
        link: "https://gds.kookmin.ac.kr/information/notice/3950"
      },
      {
        date: "3.14",
        content: "일반대학원 [사이버보안학과] 종합시험",
        note: "시험장소: 320호",
        link: "https://gds.kookmin.ac.kr/information/notice/3952",
        isImportant: true
      }
    ],
    4: [
      {
        date: "4.7(월)-4.10(목)",
        content: "2025학년도 1학기 학위청구논문 심사 요청서 제출",
        note: "17:00까지",
        link: "https://cns.kookmin.ac.kr/cns/notice/graduate-school-notice.do?mode=view&articleNo=5925492&article.offset=0&articleLimit=10",
        isImportant: true,
        icon: "📚"
      }
    ],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    1: [],
    2: []
  };

  const getMonthIcon = (month: number) => {
    if (schedules[month]?.length > 0) {
      const hasImportant = schedules[month].some(schedule => schedule.isImportant);
      if (hasImportant) return <ImportantStar />;
      return "📆";
    }
    return "";
  };

  const getScheduleIcon = (isImportant: boolean, customIcon?: string) => {
    if (customIcon) return customIcon;
    return isImportant ? <ImportantStar /> : "📆";
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="relative h-48 sm:h-56 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/header-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-800/80"></div>
        {/* 헤더 내용 */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-2 px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">KOOKMIN UNIVERSITY</h1>
          <p className="text-sm sm:text-lg font-light">
            Department of Cyber Security<br className="sm:hidden" /> / Department of Mathematics
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">2025 학년도 일반대학원 학사일정</h2>
        </div>
      </header>

      {/* 카테고리 메뉴 */}
      <div className="bg-white shadow-sm py-2 overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 sm:flex sm:justify-center gap-2 sm:gap-8">
            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">🎓</span>
              <span className="whitespace-nowrap">입학/졸업</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">📝</span>
              <span className="whitespace-nowrap">시험/성적</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">📋</span>
              <span className="whitespace-nowrap">논문</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">📆</span>
              <span className="whitespace-nowrap">신청/등록</span>
            </a>
            <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 col-span-2">
              <span className="mr-2"><ImportantStar /></span>
              <span className="whitespace-nowrap">중요</span>
            </a>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-8">
        {/* 월 선택 */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2 mb-8">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors
                ${selectedMonth === month
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }
                ${schedules[month].length > 0 ? 'ring-2 ring-blue-600 ring-opacity-50' : ''}
              `}
            >
              {month}월
            </button>
          ))}
        </div>

        {/* 학사 일정 테이블 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-700">일자</th>
                  <th className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-700">내용</th>
                  <th className="hidden sm:table-cell px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-blue-700">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {schedules[selectedMonth]
                  .sort((a, b) => {
                    const dateA = a.date.split('-')[0];
                    const dateB = b.date.split('-')[0];
                    return Number(dateA.replace('.', '')) - Number(dateB.replace('.', ''));
                  })
                  .map((schedule, index) => (
                    <tr key={index}>
                      <td className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-900 whitespace-nowrap bg-blue-50">{schedule.date}</td>
                      <td className="px-4 sm:px-6 py-2 sm:py-3">
                        <div className="flex items-center">
                          <span className="mr-2">{getScheduleIcon(schedule.isImportant || false, (schedule as any).icon)}</span>
                          <a 
                            href={schedule.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm text-blue-600 hover:underline line-clamp-2 sm:line-clamp-1"
                          >
                            {schedule.content}
                          </a>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-500 whitespace-nowrap">{schedule.note}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-100 mt-4">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs sm:text-sm text-gray-600 text-center">&copy; 2025 국민대학교 일반대학원. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
