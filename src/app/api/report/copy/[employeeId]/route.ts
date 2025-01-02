import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { employeeId: string } }
) {
  try {
    const { employeeId } = await params;

    const latestReport = await prisma.weeklyReport.findFirst({
      where: {
        employeeId: employeeId,
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        userCompanyName: true,
        primeContractorName: true,
        onsiteAddress: true,
        fixedTime: true,
        leaderEmployeeId: true,
        salesEmployeeId: true,
        sourceOfSalesInfo: true,
        howToCollectSalesInfo: true,
        salesInfo: true,
        averageOvertime: true,
        minimumWorkTime: true,
        reachability: true,
        workContent: true,
        progress: true,
        physicalCondition: true,
        relationship: true,
        difficultyLevel: true,
        senseOfSchedule: true,
        impression: true,
        situationOfOtherEmployees: true,
        failurePointedOut: true,
      },
    });

    return NextResponse.json(latestReport);
  } catch (error) {
    console.error('Failed to fetch copy', error);
    return NextResponse.json(
      { error: 'Failed to fetch copy' },
      { status: 500 }
    );
  }
}
