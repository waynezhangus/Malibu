import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import Avatar from '../components/Avatar';
import Footer from '../components/Footer';
import Feed from '../components/Feed';

export default function Home() {
  const router = useRouter();
  const [input, setInput] = React.useState('');
  const [showFeed, setShowFeed] = React.useState(true);
  const search = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!input.length) return;
    router.push(`/search?q=${input}`);
  };

  React.useEffect(() => {
    const settingJson = localStorage.getItem('settings');
    const settings = settingJson ? JSON.parse(settingJson) : {};
    if (
      settings?.theme === 'dark' ||
      (!settings?.theme &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        if (event.matches) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      });
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
      <Head>
        <title>Malibu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <video
        className="fixed inset-0 -z-10 hidden min-h-full min-w-full object-cover dark:block"
        autoPlay
        muted
        loop
        id="bgVideo"
      >
        <source src="/Cosmos.mp4" type="video/mp4" />
      </video>
      <header className="flex w-full justify-between p-5 pl-8 text-sm text-gray-700 dark:text-gray-50">
        <div className="flex items-center space-x-4">
          <a className="link">About</a>
          <a className="link">Settings</a>
        </div>
        <div className="flex items-center space-x-4">
          <a
            className="link"
            href="http://www.twitter.com"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          <Avatar
            url={
              'https://yt3.ggpht.com/m8od2OcBuHTpgbmzGf1w0JXfb3e3hPJVTkaw8zyV86zO-ULTDQeiJMej8hx396BERzqfgRaMAQ=s88-c-k-c0x00ffffff-no-rj-mo'
            }
          />
        </div>
      </header>
      <form
        className="mt-10 flex w-[90%] flex-grow flex-col items-center sm:mt-20"
        action="/s"
      >
        <div className="hidden dark:block">
          <img
            className="h-16 sm:h-24"
            src="/images/logowhite.png" // Route of the image file
            alt="Malibu Logo"
          />
        </div>
        <div className="dark:hidden">
          <img
            className="h-16 sm:h-24"
            src="/images/logotrans.png" // Route of the image file
            alt="Malibu Logo"
          />
        </div>
        <div
          className="mt-5 flex w-full max-w-md items-center space-x-3 rounded-full 
        border border-gray-200 px-5 py-2 focus-within:shadow-lg hover:shadow-md 
        sm:max-w-xl lg:max-w-2xl"
        >
          <SearchIcon className="h-5 text-gray-500 dark:text-gray-50" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="on"
            name="URL"
            type="search"
            className="flex-grow focus:outline-none dark:bg-transparent dark:text-gray-50 dark:caret-white"
          />
          <XIcon
            className="h-5 cursor-pointer text-gray-500 transition-transform duration-100
            hover:scale-125 dark:text-gray-50 sm:mr-3 sm:h-6"
            onClick={() => setInput('')}
          />
        </div>
        <div className="mt-8 hidden w-1/2 justify-center sm:flex sm:flex-row sm:space-x-4">
          <button onClick={search} type="submit" className="btn">
            Smart Analyze
          </button>
          <button className="btn">
            <a href={input} target="_blank" rel="noreferrer">
              Original Website
            </a>
          </button>
        </div>
      </form>

      <div className="relative m-4 hidden md:block">
        {showFeed && (
          <div className="absolute z-10 h-48 w-full animate-[move_2s_forwards_ease-in-out] bg-white dark:hidden"></div>
        )}

        <div
          className={`flex space-x-2 ${
            showFeed
              ? 'dark:animate-[fadeIn_2s_forwards_ease-in-out]'
              : 'invisible'
          }`}
        >
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
        </div>

        <label
          htmlFor="showFeed"
          className="relative mt-4 inline-flex cursor-pointer items-center"
        >
          <input
            type="checkbox"
            id="showFeed"
            className="peer sr-only"
            checked={showFeed}
            onChange={() => setShowFeed(!showFeed)}
          />
          <div className="switch-bg"></div>
          <div className="switch-thumb"></div>
          <span className="ml-3 text-xs font-medium text-gray-500 dark:text-gray-300">
            {showFeed ? 'Hide feed' : 'Show feed'}
          </span>
        </label>
      </div>
      <Footer />
    </div>
  );
}
