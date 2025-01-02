'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UserContext } from '@/contexts/UserContext';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setEmployeeId, setRole } = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          password,
        }),
      });

      const data = await response.json();
      console.log('Status', response.status);
      console.log('Response data', data);

      if (!response.ok) {
        console.log('Error response:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
        });

        toast({
          title: 'ログインエラー',
          description: data.message || 'ログインに失敗しました',
          variant: 'destructive',
        });
        setPassword('');
        return;
      }

      setEmployeeId(data.user.employee.id);
      setRole(data.user.employee.role);

      router.push('/reportedit');
    } catch (error) {
      toast({
        title: 'エラー',
        description:
          error instanceof Error ? error.message : 'ログインに失敗しました。',
        variant: 'destructive',
      });
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" name="login-form">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="user_id">ログインID</Label>
          <Input
            id="user_id"
            type="text"
            placeholder=""
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            // 適当なパスワード使用すると（？）ブラウザに怒られるので以下追加
            autoComplete="one-time-code"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'ログイン中...' : 'ログイン'}
      </Button>
    </form>
  );
};

export default LoginForm;
