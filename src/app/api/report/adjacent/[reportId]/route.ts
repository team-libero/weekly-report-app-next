import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { reportId: string } }
) {
  try {
    const reportId = await parseInt(params.reportId, 10);

    const currentReport = await prisma.weeklyReport.findUnique({
      where: { id: reportId },
      select: { employeeId: true },
    });

    if (!currentReport) {
      return NextResponse.json(null, { status: 404 });
    }

    const [prevReport, nextReport] = await Promise.all([
      prisma.weeklyReport.findFirst({
        where: {
          employeeId: currentReport.employeeId,
          id: { lt: reportId },
        },
        orderBy: {
          id: 'desc',
        },
        select: {
          id: true,
        },
      }),

      prisma.weeklyReport.findFirst({
        where: {
          employeeId: currentReport.employeeId,
          id: { gt: reportId },
        },
        orderBy: {
          id: 'asc',
        },
        select: { id: true },
      }),
    ]);

    return NextResponse.json({ prevReport, nextReport });
  } catch (error) {
    console.error('Failed to fetch adjacent reports', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch adjacent reports',
      },
      { status: 500 }
    );
  }
}
