import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import Avatar from '../components/Avatar';
import Footer from '../components/Footer';
import Feed from '../components/Feed';
import { Tweet, User } from '../typings';

export default function Home() {
  const initUser: User = {
    theme: true,
    autoExtend: false,
    autoShowFeed: true,
    tweetNum: 5,
    tweetLen: 140,
  };

  const router = useRouter();
  const [input, setInput] = React.useState('');
  const [user, setUser] = React.useState(initUser);
  const [showFeed, setShowFeed] = React.useState(false);
  const [tweets, setTweets] = React.useState<Tweet[] | null>(null);
  // search function
  const search = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!input.length) return;
    if (input.includes('www.popsci.com'))
      router.push(
        `/article?url=${input}&tweetNum=${user.tweetNum}&tweetLen=${user.tweetLen}`
      );
    else router.push(`/search?q=${input}`);
  };
  // toggle theme
  React.useEffect(() => {
    const userJson = localStorage.getItem('user');
    const localUser = userJson ? JSON.parse(userJson) : null;
    if (localUser) {
      setShowFeed(localUser.autoShowFeed);
      setUser(localUser);
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (
      localUser?.theme === false ||
      (!localUser && window.matchMedia('(prefers-color-scheme: light)').matches)
    ) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (event) => {
        if (event.matches) document.documentElement.classList.remove('dark');
        else document.documentElement.classList.add('dark');
      });
  }, []);
  // get feeds
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://malibu-server1.herokuapp.com/tweets');
      let data;
      if (res.ok) {
        data = await res.json();
        setTweets(data);
      } else {
        console.log(res.status, res.statusText);
      }
    };
    fetchData();
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
          <a className="link" onClick={() => router.push(`/error?code=dev`)}>
            About
          </a>
          <a className="link" onClick={() => router.push('settings')}>
            Settings
          </a>
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
          <Avatar />
        </div>
      </header>
      <form
        className="mt-10 flex w-[90%] flex-col items-center md:mt-20 md:flex-grow"
        action="/s"
      >
        <div className="hidden dark:block">
          <img
            className="h-16 md:h-24"
            src="/images/logowhite.png"
            alt="Malibu Logo"
          />
        </div>
        <div className="dark:hidden">
          <img
            className="h-16 md:h-24"
            src="/images/logotrans.png"
            alt="Malibu Logo"
          />
        </div>
        <div
          className="mt-5 flex w-full max-w-md items-center space-x-3 rounded-full 
        border border-gray-200 px-5 py-2 focus-within:shadow-lg hover:shadow-md 
        md:max-w-xl lg:max-w-2xl"
        >
          <MagnifyingGlassIcon className="h-5 text-gray-500 dark:text-gray-50" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="URL"
            type="search"
            className="flex-grow focus:outline-none dark:bg-transparent dark:text-gray-50 dark:caret-white"
          />
          <XMarkIcon
            className="h-5 cursor-pointer text-gray-500 transition-transform duration-100
            hover:scale-125 dark:text-gray-50 md:mr-3 md:h-6"
            onClick={() => setInput('')}
          />
        </div>
        <div className="mt-8 hidden w-1/2 justify-center md:flex md:flex-row md:space-x-4">
          <button onClick={search} type="submit" className="btn">
            Global Search
          </button>
          <button
            onClick={() => router.push(`/error?code=dev`)}
            className="btn"
          >
            Random Article
          </button>
        </div>
      </form>

      <div className="relative m-4 hidden md:block">
        {/* Feed, >sm */}
        {showFeed && (
          <div className="absolute z-10 h-48 w-full animate-[move_2s_forwards_ease-in-out] bg-white dark:hidden"></div>
        )}
        {tweets && (
          <div
            className={`flex space-x-2 ${
              showFeed
                ? 'dark:animate-[fadeIn_2s_forwards_ease-in-out]'
                : 'invisible'
            }`}
          >
            {tweets.map((tweet, index) => (
              <Feed key={tweet._id} tweet={tweet} user={user} />
            ))}
          </div>
        )}

        <label
          htmlFor="showFeed"
          className={`relative mt-4 inline-flex cursor-pointer items-center ${
            !tweets && 'invisible'
          }`}
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

      {/* Feed, sm */}
      <div className="relative mt-4 w-[80%] flex-grow md:hidden">
        <label
          htmlFor="showFeed"
          className="relative my-6 inline-flex cursor-pointer items-center"
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
          <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">
            {showFeed ? 'Hide feed' : 'Show feed'}
          </span>
        </label>

        {tweets && (
          <ul
            className={`text-base text-gray-500 dark:text-gray-300 ${
              showFeed ? 'block' : 'hidden'
            }`}
          >
            {tweets.map((tweet, index) => (
              <li
                key={index}
                className="flex cursor-pointer items-center border-b py-3 dark:border-gray-400"
                onClick={() =>
                  router.push(
                    `/article?url=${tweet.URL}&tweetNum=${user.tweetNum}&tweetLen=${user.tweetLen}`
                  )
                }
              >
                <ArrowTrendingUpIcon className="mr-3 h-5 flex-none text-gray-500 dark:text-gray-50" />
                {tweet.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
}
