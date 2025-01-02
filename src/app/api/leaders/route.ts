import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const teamLeaders = await prisma.employee.findMany({
      where: {
        NOT: {
          role: '1',
        },
      },
      select: {
        id: true,
        lastName: true,
        firstName: true,
        team: {
          select: {
            name: true,
          },
        },
      },
    });

    const formattedLeaders = teamLeaders.map((leader) => ({
      id: leader.id,
      name: `${leader.lastName} ${leader.firstName}`,
      teamName: leader.team?.name ?? '',
    }));

    return NextResponse.json(formattedLeaders);
  } catch (error) {
    console.error('Error fetching teamleaders:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch team leaders',
      },
      { status: 500 }
    );
  }
}
