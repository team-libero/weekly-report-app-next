import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // データの整形
    const prismaData = {
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
    };

    try {
      const weeklyReport = await prisma.weeklyReport.create({
        data: prismaData,
      });

      return NextResponse.json(weeklyReport);
    } catch (prismaError) {
      console.error('Prisma error', prismaError);
      return (
        NextResponse.json({
          error: 'Database error',
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Failed to create weekly report', error);
    return NextResponse.json(
      { error: 'Failed to create weekly report' },
      { status: 500 }
    );
  }
}
