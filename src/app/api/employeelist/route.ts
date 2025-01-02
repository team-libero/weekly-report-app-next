import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const teamId = searchParams.get('teamId');

    const whereClause = teamId && teamId !== 'all' ? { teamId: teamId } : {};

    const employees = await prisma.employee.findMany({
      where: whereClause,
      select: {
        id: true,
        lastName: true,
        firstName: true,
        mailAddress: true,
      },
    });

    // Prismaの結果を画面表示用のフォーマットに変換
    const formattedEmployees = employees.map((emp) => ({
      emp_id: emp.id,
      emp_lname: emp.lastName,
      emp_fname: emp.firstName,
      mail_address: emp.mailAddress,
    }));

    return NextResponse.json(formattedEmployees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}
