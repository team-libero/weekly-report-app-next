import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { employeeId: string } }
) {
  try {
    const { employeeId } = await params;
    const reports = await prisma.weeklyReport.findMany({
      where: {
        employeeId: employeeId,
      },
      orderBy: {
        periodStartDate: 'desc',
      },
      select: {
        id: true,
        employeeId: true,
        leaderEmployeeId: true,
        userCompanyName: true,
        primeContractorName: true,
        onsiteAddress: true,
        fixedTime: true,
        salesEmployeeId: true,
        periodStartDate: true,
        periodEndDate: true,
      },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error('Failed to fetch report list', error);
    return NextResponse.json(
      { error: 'Failed to fetch report list' },
      { status: 500 }
    );
  }
}
