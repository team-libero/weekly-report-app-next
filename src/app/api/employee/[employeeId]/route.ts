import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { employeeId: string } }
) {
  try {
    const { employeeId } = await params;
    const employees = await prisma.employee.findFirst({
      where: {
        id: employeeId,
      },
      select: {
        id: true,
        lastName: true,
        firstName: true,
      },
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.error('Failed to fetch employees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}
