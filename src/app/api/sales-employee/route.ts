import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const salesEmployee = await prisma.employee.findMany({
      where: {
        departmentId: '1',
      },
      select: {
        id: true,
        lastName: true,
        firstName: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const formattedSalesEmployee = salesEmployee.map((employee) => ({
      id: employee.id,
      name: `${employee.lastName} ${employee.firstName}`,
    }));

    return NextResponse.json(formattedSalesEmployee);
  } catch (error) {
    console.error('Failed to fetch sales employee', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales employee' },
      { status: 500 }
    );
  }
}
