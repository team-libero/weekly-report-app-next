import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  try {
    const reportId = parseInt(params.reportId, 10);
    const data = await request.json();

    const weeklyReport = await prisma.weeklyReport.update({
      where: {
        id: reportId,
      },
      data: {
        employeeId: data.employeeId,
        leaderEmployeeId: data.leaderEmployeeId,
        salesEmployeeId: data.salesEmployeeId,
        userCompanyName: data.userCompanyName || null,
        primeContractorName: data.primeContractorName || null,
        onsiteAddress: data.onsiteAddress || '',
        fixedTime: data.fixedTime || '',
        periodStartDate: new Date(data.periodStartDate),
        periodEndDate: new Date(data.periodEndDate),
        sourceOfSalesInfo: data.sourceOfSalesInfo || null,
        howToCollectSalesInfo: data.howToCollectSalesInfo || null,
        salesInfo: data.salesInfo || null,
        averageOvertime: data.averageOverTime || '0',
        workContent: data.workContent || '',
        minimumWorkTime: data.minimumWorkTime
          ? parseInt(data.minimumWorkTime, 10)
          : 0,
        reachability: data.reachability || '1',
        progress: data.progress || '1',
        physicalCondition: data.physicalCondition || '1',
        relationship: data.relationship || '1',
        failurePointedOut: data.failurePointedOut || null,
        impression: data.impression || '',
        difficultyLevel: data.difficultyLevel
          ? parseInt(data.difficultyLevel, 10)
          : null,
        senseOfSchedule: data.senseOfSchedule
          ? parseInt(data.senseOfSchedule, 10)
          : null,
        situationOfOtherEmployees: data.situationOfOtherEmployees || null,
      },
    });

    return NextResponse.json(weeklyReport);
  } catch (error) {
    console.error('Failed to update weekly report:', error);
    return NextResponse.json(
      { erro: 'Failed to update weekly report' },
      { status: 500 }
    );
  }
}
