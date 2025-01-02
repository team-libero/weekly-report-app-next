'use client';

import React, { useState, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { UserContext } from '../../contexts/UserContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { role, setEmployeeId, setRole } = useContext(UserContext);
  const router = useRouter();

  const onClickLogout = () => {
    setEmployeeId('');
    setRole('');
    router.push('/login');
  };

  const NavLink: React.FC<NavLinkProps> = ({ href, onClick, children }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => {
          onClick?.();
          setOpen(false);
        }}
        className={`
          block px-4 py-2 rounded-md transition-colors
          ${isActive ? 'bg-blue-700 hover:bg-blue-800' : 'hover:bg-blue-700'}
        `}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">
            週報アプリ
          </Link>

          {/* モバイルメニューボタン */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-blue-600 text-white border-none w-64"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <SheetTitle className="text-white sr-only">
                ナビゲーションメニュー
              </SheetTitle>
              <nav className="flex flex-col gap-4">
                <NavLink href="/reports">週報一覧</NavLink>
                <NavLink href="/reportedit">週報登録/更新</NavLink>
                {role === '1' && (
                  <NavLink href="/employeelist">社員一覧</NavLink>
                )}
                <Button
                  variant="secondary"
                  onClick={onClickLogout}
                  className="mt-4"
                >
                  ログアウト
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex items-center gap-4">
            <NavLink href="/reports">週報一覧</NavLink>
            <NavLink href="/reportedit">週報登録/更新</NavLink>
            {role !== '1' && <NavLink href="/employeelist">社員一覧</NavLink>}
          </nav>

          {/* デスクトップログアウトボタン */}
          <Button
            onClick={onClickLogout}
            variant="secondary"
            className="hidden md:block"
          >
            ログアウト
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
