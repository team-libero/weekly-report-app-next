'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Bebas_Neue } from 'next/font/google';
import { UserContext } from '@/contexts/UserContext';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

const InfoGroup = ({
  title,
  content,
}: {
  title: string;
  content: string | undefined;
}) => (
  <div className="mb-3 bg-blue-100 px-2 py-2 rounded-lg">
    <p className="font-bold mb-1">■{title}</p>
    <p className="ml-4">{content}</p>
  </div>
);

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

interface ReportData {
  employeeId: string;
  leaderEmployeeId: string;
  userCompanyName: string;
  primeContractorName: string;
  onsiteAddress: string;
  fixedTime: string;
  salesEmployeeId: string;
  periodStartDate: string;
  periodEndDate: string;
  sourceOfSalesInfo: string;
  howToCollectSalesInfo: string;
  salesInfo: string;
  averageOvertime: string;
  minimumWorkTime: string;
  reachability: string;
  progress: string;
  physicalCondition: string;
  relationship: string;
  workContent: string;
  difficultyLevel: string;
  senseOfSchedule: string;
  failurePointedOut: string;
  impression: string;
  situationOfOtherEmployees: string;
}

export default function ReportDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { employeeId, role } = useContext(UserContext);
  const reportId = searchParams.get('reportId');
  const [reportData, setReportData] = useState<ReportData>();
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
  const [adjacentReports, setAdjacentReports] = useState<{
    prevReport: { id: number } | null;
    nextReport: { id: number } | null;
  }>({ prevReport: null, nextReport: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!reportId || !employeeId) {
          console.log('Required params missing:', { reportId, employeeId });
          router.push('/error/');
          return;
        }

        const [detailRes, adjacentRes] = await Promise.all([
          fetch(`/api/report/detail/${reportId}`),
          fetch(`/api/report/adjacent/${reportId}`),
        ]);

        const [detailData, adjacentData] = await Promise.all([
          detailRes.json(),
          adjacentRes.json(),
        ]);

        // 権限チェック
        const isOwnReport =
          String(detailData.employeeId) === String(employeeId);
        const isGeneralUser = role === '1';

        if (isGeneralUser && !isOwnReport) {
          console.log('Unauthorized access, redirecting to error page');
          router.push('/error');
          return;
        }

        setReportData(detailData);
        setAdjacentReports(adjacentData);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };
    fetchData();
  }, [reportId]);

  useEffect(() => {
    if (reportData) {
      const fetchData = async () => {
        try {
          const [employeeRes, teamLeaderRes, salesEmployeeRes] =
            await Promise.all([
              fetch(`/api/employee/${reportData.employeeId}`),
              fetch(`/api/employee/${reportData.leaderEmployeeId}`),
              fetch(`/api/employee/${reportData.salesEmployeeId}`),
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
      };
      fetchData();
    }
  }, [reportData]);

  const onClickReturn = () => {
    router.back();
  };

  const handlePrevReport = () => {
    if (adjacentReports.prevReport) {
      router.push(`/reportdetail?reportId=${adjacentReports.prevReport.id}`);
    }
  };
  const handleNextReport = () => {
    if (adjacentReports.nextReport) {
      router.push(`/reportdetail?reportId=${adjacentReports.nextReport.id}`);
    }
  };
  const handleEdit = () => {
    router.push(`/reportedit?reportId=${reportId}`);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="secondary" size="icon" onClick={onClickReturn}>
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-2">
          <Button
            className="bg-blue-700 hover:bg-blue-800"
            onClick={handlePrevReport}
            disabled={!adjacentReports.prevReport}
          >
            先週
          </Button>
          <Button
            className="bg-blue-700 hover:bg-blue-800"
            onClick={handleNextReport}
            disabled={!adjacentReports.nextReport}
          >
            翌週
          </Button>
          {reportData?.employeeId === employeeId && (
            <Button
              className="bg-yellow-600 hover:bg-yellow-700"
              disabled={reportData?.employeeId !== employeeId}
              onClick={handleEdit}
            >
              編集
            </Button>
          )}
        </div>
      </div>

      {reportData?.periodStartDate && reportData?.periodEndDate && (
        <div className="">
          <div className={`text-4xl ml-4 ${bebasNeue.className}`}>
            {format(new Date(reportData.periodStartDate), 'yyyy/MM/dd')}
            <span className="mx-3">～</span>
            {format(new Date(reportData.periodEndDate), 'yyyy/MM/dd')}
          </div>
        </div>
      )}

      <InfoSection title="現場基本情報">
        <InfoGroup
          title="氏名"
          content={
            employee?.lastName && employee?.firstName
              ? `${employee?.lastName} ${employee?.firstName}`
              : ''
          }
        />
        <InfoGroup
          title="所属チームLD名"
          content={
            teamLeader?.lastName && teamLeader?.firstName
              ? `${teamLeader?.lastName} ${teamLeader?.firstName}`
              : ''
          }
        />
        <InfoGroup title="ユーザ会社名" content={reportData?.userCompanyName} />
        <InfoGroup
          title="自社担当営業"
          content={
            salesEmployee?.lastName && salesEmployee?.firstName
              ? `${salesEmployee?.lastName} ${salesEmployee?.firstName}`
              : ''
          }
        />
        <InfoGroup
          title="元請会社名"
          content={reportData?.primeContractorName}
        />
        <InfoGroup title="現場住所" content={reportData?.onsiteAddress} />
        <InfoGroup
          title="定時"
          content={
            reportData?.fixedTime
              ? `${reportData?.fixedTime} ※金曜日はHH:MM～HH:MMの定時退社日`
              : ''
          }
        />
      </InfoSection>

      <InfoSection title="営業に関する情報">
        <InfoGroup title="情報源" content={reportData?.sourceOfSalesInfo} />
        <InfoGroup
          title="情報収集"
          content={reportData?.howToCollectSalesInfo}
        />
        <InfoGroup title="営業に関する情報" content={reportData?.salesInfo} />
      </InfoSection>

      <InfoSection title="業務内容">
        <InfoGroup
          title="平均残業時間"
          content={
            reportData?.averageOvertime
              ? `${reportData?.averageOvertime}時間`
              : ''
          }
        />
        <InfoGroup
          title="最低稼働時間"
          content={
            reportData?.minimumWorkTime && reportData?.reachability
              ? reportData.reachability == '1'
                ? `${reportData?.minimumWorkTime}時間 到達できる`
                : `${reportData?.minimumWorkTime}時間 到達できない`
              : ''
          }
        />
        <InfoGroup
          title="進捗状況"
          content={
            reportData?.progress == '1'
              ? `良い`
              : reportData?.progress == '2'
              ? `普通`
              : reportData?.progress == '3'
              ? `悪い`
              : ''
          }
        />
        <InfoGroup
          title="体調"
          content={
            reportData?.physicalCondition == '1'
              ? `良い`
              : reportData?.physicalCondition == '2'
              ? `普通`
              : reportData?.physicalCondition == '3'
              ? `悪い`
              : ''
          }
        />
        <InfoGroup
          title="現場LDや上位会社メンバーとの人間関係"
          content={
            reportData?.relationship == '1'
              ? `良い`
              : reportData?.relationship == '2'
              ? `普通`
              : reportData?.relationship == '3'
              ? `悪い`
              : ''
          }
        />
        <InfoGroup title="作業内容" content={reportData?.workContent} />
        <InfoGroup title="難易度" content={reportData?.difficultyLevel} />
        <InfoGroup title="スケジュール" content={reportData?.senseOfSchedule} />
        <InfoGroup
          title="失敗したこと、指摘を受けた点"
          content={reportData?.failurePointedOut}
        />
        <InfoGroup title="所感" content={reportData?.impression} />
        <InfoGroup
          title="現場で稼働しているACT社員の状況"
          content={reportData?.situationOfOtherEmployees}
        />
      </InfoSection>
    </div>
  );
}
