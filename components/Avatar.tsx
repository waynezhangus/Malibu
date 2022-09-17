import * as React from 'react';
import Link from 'next/link';

interface Props {
  url: string;
  className?: string;
}

export default function Avatar({ url, className }: Props) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div className={`relative ${className}`}>
      {menuOpen && (
        <ul className="absolute right-0 top-8 w-20 rounded-md bg-[#f8f9fa] p-2 text-center  text-sm shadow-md dark:bg-zinc-700 dark:text-gray-50 dark:hover:bg-zinc-600">
          <li>
            <Link href={'/settings'}>
              <a>Settings</a>
            </Link>
          </li>
        </ul>
      )}
      <img
        loading="lazy"
        className={`h-8 cursor-pointer rounded-full transition-transform duration-150 hover:scale-110`}
        src={url}
        alt="profile pic"
        onClick={() => setMenuOpen(!menuOpen)}
      />
    </div>
  );
}
