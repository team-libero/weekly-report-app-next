import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json();

    if (!userId || !password) {
      return NextResponse.json(
        { error: 'ユーザーIDとパスワードは必須です' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        loginId: userId,
        password: password,
      },
      include: {
        employee: {
          include: {
            department: true,
            team: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: 'ユーザーIDまたはパスワードが正しくありません',
        },
        { status: 401 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      massage: 'ログイン成功',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error', error);
    return NextResponse.json(
      {
        message: 'ログイン処理中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}
