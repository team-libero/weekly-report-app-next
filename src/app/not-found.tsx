'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        {/* 404タイトル */}
        <h1 className="text-6xl font-bold inline-block bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          404
        </h1>

        {/* ページが見つかりませんメッセージ */}
        <p className="text-lg mt-3 mb-2">ページが見つかりません</p>
        <p className="text-gray-500 mb-6">
          お探しのページは存在しないか、移動した可能性があります。
        </p>

        {/* ホームに戻るボタン */}
        <div className="flex flex-col gap-3">
          <Link href="/" className="inline-block">
            <Button className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white hover:from-teal-500 hover:via-teal-600 hover:to-teal-700">
              ホームに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
