'use client';
import Sidebar from '@/components/cms/Navbar';
import Navbar from '@/components/cms/TopNav';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const withNav = [
    '/cms/home',
    '/cms/home/ongoing',
    '/cms/home/games',
    '/cms/home/teams',
    '/cms/home/news',
    '/cms/home/completed',
    '/cms/home/threads',
    '/cms/home/deposit',
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const isLogin = JSON.parse(localStorage.getItem('cms_user'));
      if (!isLogin) router.push('/cms');
    }
  }, []);

  return (
    <html lang="en">
      <body>
        {withNav.includes(path) ? (
          <div className="flex relative">
            <div className="fixed">
              <Sidebar />
            </div>
            <div className="flex-1">
              <Navbar />
              <div className="ml-[300px] !bg-white min-h-screen">
                {children}
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
