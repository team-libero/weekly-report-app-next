'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

export default function ErrorPage() {
  const router = useRouter();

  const handleReturn = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">アクセス権限がありません</h1>
        <p className="text-gray-600">
          申し訳ありませんが、このページにアクセスする権限がないようです。
        </p>
      </div>

      <Button
        onClick={handleReturn}
        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
      >
        <Home className="h-4 w-4" />
        ホームへ戻る
      </Button>
    </div>
  );
}
