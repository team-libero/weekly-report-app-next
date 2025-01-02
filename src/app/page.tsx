'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // ここで認証状態をチェック
    const isAuthenticated = false; // 実際の認証チェックロジックに置き換える

    if (isAuthenticated) {
      router.push('/reportedit'); // ログイン済みの場合、レポート編集ページへ
    } else {
      router.push('/login'); // 未ログインの場合、ログインページへ
    }
  }, [router]);

  // リダイレクト中の表示
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">週報システム</h1>
        <p>Loading...</p>
      </div>
    </div>
  );
}
