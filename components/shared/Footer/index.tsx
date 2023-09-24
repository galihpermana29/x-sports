'use client';

import TwitterIcon from '@/components/icons/TwitterIcon';
import XsportsLogo from '../XsportsLogo';
import XsportsTextLogo from '../XsportsTextLogo';
import DiscordIcon from '@/components/icons/DiscordIcon';
import TelegramIcon from '@/components/icons/TelegramIcon';
import { usePathname } from 'next/navigation';

function Footer() {
  const path = usePathname();

  return (
    <footer
      className={`gap-16 md:gap-5 text-xport-orange-light flex-col-reverse md:flex-row items-center md:items-end md:justify-between max-w-screen-xl mx-auto mt-20 px-5 py-10 md:px-10 ${
        path.includes('/cms') || path.includes('/livestream')
          ? 'hidden'
          : 'flex'
      }`}>
      <div className="flex flex-col items-center md:items-start gap-5">
        <div className="flex flex-col gap-2">
          <XsportsLogo className="w-20 h-20" />
          <XsportsTextLogo className="w-20" />
        </div>
        <span>Copyright 2023 Xsports. All rights reserved.</span>
      </div>
      <div className="flex flex-col gap-5 justify-end items-center md:items-end">
        <div className="flex items-center gap-5">
          <TwitterIcon className="w-7 h-7 fill-[#CCCCCC]" />
          <DiscordIcon className="w-7 h-7 fill-[#CCCCCC]" />
          <TelegramIcon className="w-7 h-7 fill-[#CCCCCC]" />
        </div>
        <ul className="flex items-center gap-5">
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
