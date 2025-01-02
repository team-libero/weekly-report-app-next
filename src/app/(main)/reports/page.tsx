'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { UserContext } from '@/contexts/UserContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';

interface WeeklyReport {
  id: number;
  employeeId: string;
  leaderEmployeeId: string;
  userCompanyName: string;
  primeContractorName: string;
  onsiteAddress: string;
  fixedTime: string;
  salesEmployeeId: string;
  periodStartDate: string;
  periodEndDate: string;
}

export default function ReportsPage() {
  const router = useRouter();
  const { employeeId } = useContext(UserContext);
  const searchParams = useSearchParams();
  const employeeIdParam = searchParams.get('employeeId');
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employee, setEmployee] = useState<{
    id: string;
    lastName: string;
    firstName: string;
  }>();
  const [teamLeader, setTeamLeader] = useState<{
    id: string;
    lastName: string;
    firstName: string;
  }>();
  const [salesEmployee, setSalesEmployee] = useState<{
    id: string;
    lastName: string;
    firstName: string;
  }>();
  const reportsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const targetEmployeeId = employeeIdParam || employeeId;
        const reportsRes = await fetch(`/api/report/list/${targetEmployeeId}`);
        const reportsData = await reportsRes.json();
        setReports(reportsData);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    fetchData();
  }, []);
  const handleNewReport = () => {
    router.push('/reportedit');
  };
  const handleDetailReport = (reportId: number) => {
    router.push(`/reportdetail?reportId=${reportId}`);
  };

  const { currentReports, totalPages, pageNumbers } = useMemo(() => {
    const totalPages = Math.ceil(reports.length / reportsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const startIndex = (currentPage - 1) * reportsPerPage;
    const endIndex = startIndex + reportsPerPage;
    const currentReports = reports.slice(startIndex, endIndex);
    return { currentReports, totalPages, pageNumbers };
  }, [reports, currentPage, reportsPerPage]);

  const currentReportsLatest = currentReports[0];
  useEffect(() => {
    const fetchData = async () => {
      if (currentReportsLatest) {
        try {
          const [employeeRes, teamLeaderRes, salesEmployeeRes] =
            await Promise.all([
              fetch(`/api/employee/${currentReportsLatest.employeeId}`),
              fetch(`/api/employee/${currentReportsLatest.leaderEmployeeId}`),
              fetch(`/api/employee/${currentReportsLatest.salesEmployeeId}`),
            ]);

          const [employeeData, teamLeaderData, salesEmployeeData] =
            await Promise.all([
              employeeRes.json(),
              teamLeaderRes.json(),
              salesEmployeeRes.json(),
            ]);

          setEmployee(employeeData);
          setTeamLeader(teamLeaderData);
          setSalesEmployee(salesEmployeeData);
        } catch (error) {
          console.error('データの取得に失敗しました:', error);
        }
      }
    };
    fetchData();
  }, [currentReportsLatest]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-end mb-6 mr-8">
        <Button
          onClick={handleNewReport}
          className="bg-blue-600 hover:bg-blue-700"
        >
          新規登録
        </Button>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-0">
            <div className="flex border">
              <p className="font-bold w-40 p-2 border-r bg-blue-300">
                記入者名
              </p>
              <p className="p-2 flex-1">
                {employee?.lastName} {employee?.firstName}
              </p>
            </div>
            <div className="flex border">
              <p className="font-bold w-40 p-2 border-r bg-blue-300">
                所属チームLD名
              </p>
              <p className="p-2 flex-1">
                {teamLeader?.lastName} {teamLeader?.firstName}
              </p>
            </div>
            <div className="flex border">
              <p className="font-bold w-40 p-2 border-r bg-blue-300">
                ユーザー会社名
              </p>
              <p className="p-2 flex-1">
                {currentReportsLatest?.userCompanyName}
              </p>
            </div>
            <div className="flex border">
              <p className="font-bold w-40 p-2 border-r bg-blue-300">
                元請会社名
              </p>
              <p className="p-2 flex-1">
                {currentReportsLatest?.primeContractorName}
              </p>
            </div>
            <div className="flex border">
              <p className="font-bold w-40 p-2 border-r bg-blue-300">
                現場住所
              </p>
              <p className="p-2 flex-1">
                {currentReportsLatest?.onsiteAddress}
              </p>
            </div>
            <div className="flex border">
              <p className="font-bold w-40 p-2 border-r bg-blue-300">定時</p>
              <p className="p-2 flex-1">{currentReportsLatest?.fixedTime}</p>
            </div>
            <div className="flex border">
              <p className="font-bold w-40 p-2 border-r bg-blue-300">
                自社担当営業
              </p>
              <p className="p-2 flex-1">
                {salesEmployee?.lastName} {salesEmployee?.firstName}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-1">
        {currentReports.map((report) => (
          <div
            key={report.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div>
              {format(new Date(report.periodStartDate), 'yyyy/MM/dd')} ~
              {format(new Date(report.periodEndDate), 'yyyy/MM/dd')}
            </div>
            <Button
              onClick={() => handleDetailReport(report.id)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              詳細
            </Button>
          </div>
        ))}
      </div>

      {/* ページネーション */}
      <div className="flex justify-center gap-2 mt-6">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          前へ
        </Button>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => setCurrentPage(number)}
            variant={currentPage === number ? 'default' : 'outline'}
          >
            {number}
          </Button>
        ))}
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          variant="outline"
        >
          次へ
        </Button>
      </div>
    </div>
  );
}
