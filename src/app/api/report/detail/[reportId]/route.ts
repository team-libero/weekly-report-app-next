import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { reportId: string; employeeId: string } }
) {
  try {
    const { reportId } = params;
    const reportDetail = await prisma.weeklyReport.findFirst({
      where: {
        id: parseInt(reportId, 10),
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        employeeId: true,
        leaderEmployeeId: true,
        userCompanyName: true,
        salesEmployeeId: true,
        primeContractorName: true,
        onsiteAddress: true,
        fixedTime: true,
        periodStartDate: true,
        periodEndDate: true,
        sourceOfSalesInfo: true,
        howToCollectSalesInfo: true,
        salesInfo: true,
        averageOvertime: true,
        minimumWorkTime: true,
        reachability: true,
        progress: true,
        physicalCondition: true,
        relationship: true,
        workContent: true,
        difficultyLevel: true,
        senseOfSchedule: true,
        failurePointedOut: true,
        impression: true,
        situationOfOtherEmployees: true,
      },
    });
    return NextResponse.json(reportDetail);
  } catch (error) {
    console.error('Failed to fetch report detail', error);
    return NextResponse.json(
      { error: 'Failed to fetch report detail' },
      { status: 500 }
    );
  }
}
