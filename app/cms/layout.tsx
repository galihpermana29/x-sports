'use client';
import Sidebar from '@/components/cms/Navbar';
import Navbar from '@/components/cms/TopNav';
import { usePathname } from 'next/navigation';

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const withNav = ['/cms/home', '/cms/home/ongoing'];
  return (
    <html lang="en">
      <body>
        {withNav.includes(path) ? (
          <div className="flex">
            <div>
              <Sidebar />
            </div>
            <div className="flex-1">
              <Navbar />
              <div>{children}</div>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
