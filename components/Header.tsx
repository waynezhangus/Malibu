import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import Avatar from './Avatar';

export default function Header({ showTitle = 'search' }) {
  const router = useRouter();
  const [input, setInput] = React.useState('');
  const search = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!input.length) return;
    router.push(`/search?q=${input}`);
  };

  return (
    <header className="sticky top-0 z-10 flex flex-col items-center border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-zinc-900">
      <div
        className={`flex w-full items-center px-6 py-2 ${
          showTitle == 'search' ? 'sm:py-7' : 'sm:py-3'
        }`}
      >
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
        {showTitle == 'error' && (
          <div className="mx-auto hidden text-xl font-medium tracking-wide text-sky-400 dark:text-gray-50 sm:inline-block">
            We are sorry!
          </div>
        )}
        {showTitle == 'settings' && (
          <div className="mx-auto hidden text-xl font-medium tracking-wide text-sky-400 dark:text-gray-50 sm:inline-block">
            User Settings
          </div>
        )}
        {showTitle == 'search' && (
          <form
            className="mx-5 mr-auto hidden w-full max-w-3xl items-center rounded-full 
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
            <XMarkIcon
              className="h-5 cursor-pointer text-gray-500 transition-transform duration-100
              hover:scale-125 dark:text-gray-500 sm:mr-3 sm:h-6"
              onClick={() => setInput('')}
            />
            <MagnifyingGlassIcon
              className="hidden h-5 border-l border-gray-300 
              pl-4 text-blue-500 sm:inline-flex"
            />
            <button hidden type="submit" onClick={search}></button>
          </form>
        )}
        <Avatar className="ml-auto flex-none sm:ml-20" />
      </div>
      <div className="w-full">
        {showTitle == 'error' && (
          <div className="mb-2 text-center text-xl font-medium tracking-wide text-sky-400 dark:text-gray-50 sm:hidden">
            We are sorry!
          </div>
        )}
        {showTitle == 'settings' && (
          <div className="mb-2 text-center text-xl font-medium tracking-wide text-sky-400 dark:text-gray-50 sm:hidden">
            User Settings
          </div>
        )}
        {showTitle == 'search' && (
          <form
            className="mx-5 mb-2 flex items-center rounded-full 
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
            <XMarkIcon
              className="h-5 cursor-pointer text-gray-500 transition-transform duration-100
                hover:scale-125 dark:text-gray-50 sm:mr-3 sm:h-6"
              onClick={() => setInput('')}
            />
            <MagnifyingGlassIcon
              className="hidden h-5 border-l border-gray-300
                pl-4 text-blue-500 sm:inline-flex"
            />
            <button hidden type="submit" onClick={search}></button>
          </form>
        )}
      </div>
    </header>
  );
}
