import { SearchIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import Avatar from './Avatar';

export default function Header() {
  const router = useRouter();
  const [input, setInput] = React.useState('');
  const search = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!input.length) return;
    router.push(`/search?q=${input}`);
  };

  return (
    <header className="sticky top-0 z-10 flex flex-col items-center border-b bg-white dark:border-zinc-600 dark:bg-zinc-900">
      <div className="flex w-full items-center px-6 pt-2 sm:pt-7 sm:pb-7">
        <div className="hidden dark:block">
          <Image
            className="cursor-pointer"
            src="/images/logowhite.png" // Route of the image file
            height={40} // Desired size with correct aspect ratio
            width={120} // Desired size with correct aspect ratio
            alt="Malibu Logo"
            onClick={() => router.push('/')}
          />
        </div>
        <div className="dark:hidden">
          <Image
            className="cursor-pointer"
            src="/images/logotrans.png" // Route of the image file
            height={40} // Desired size with correct aspect ratio
            width={120} // Desired size with correct aspect ratio
            alt="Malibu Logo"
            onClick={() => router.push('/')}
          />
        </div>
        <form
          className="mx-5 hidden w-full max-w-3xl items-center rounded-full 
          border border-gray-200 px-5 py-2 shadow-md dark:border-transparent dark:bg-zinc-800 sm:flex"
          action="/s"
        >
          <input
            value={input}
            type="search"
            autoComplete="on"
            name="URL"
            className="flex-grow focus:outline-none dark:bg-transparent dark:text-gray-50 dark:caret-white"
            onChange={(e) => setInput(e.target.value)}
          />
          <XIcon
            className="h-5 cursor-pointer text-gray-500 transition-transform duration-100
            hover:scale-125 dark:text-gray-500 sm:mr-3 sm:h-6"
            onClick={() => setInput('')}
          />
          <SearchIcon
            className="hidden h-5 border-l border-gray-300 
            pl-4 text-blue-500 sm:inline-flex"
          />
          <button hidden type="submit" onClick={search}></button>
        </form>
        <Avatar
          className="ml-auto"
          url={
            'https://yt3.ggpht.com/m8od2OcBuHTpgbmzGf1w0JXfb3e3hPJVTkaw8zyV86zO-ULTDQeiJMej8hx396BERzqfgRaMAQ=s88-c-k-c0x00ffffff-no-rj-mo'
          }
        />
      </div>
      <div className="w-full">
        <form
          className="my-2 mx-5 flex items-center rounded-full 
            border border-gray-200 px-5 py-2 shadow-md dark:border-transparent dark:bg-zinc-800 sm:hidden"
          action="/s"
        >
          <input
            value={input}
            type="search"
            autoComplete="on"
            name="URL"
            className="flex-grow focus:outline-none dark:bg-transparent dark:text-gray-50 dark:caret-white"
            onChange={(e) => setInput(e.target.value)}
          />
          <XIcon
            className="h-5 cursor-pointer text-gray-500 transition-transform duration-100
              hover:scale-125 dark:text-gray-50 sm:mr-3 sm:h-6"
            onClick={() => setInput('')}
          />
          <SearchIcon
            className="hidden h-5 border-l border-gray-300 
              pl-4 text-blue-500 sm:inline-flex"
          />
          <button hidden type="submit" onClick={search}></button>
        </form>
      </div>
    </header>
  );
}
