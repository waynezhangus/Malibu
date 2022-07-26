import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';
import Avatar from '../components/Avatar';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();
  const [input, setInput] = React.useState('');
  const search = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!input.length) return;
    router.push(`/search?q=${input}`);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Head>
        <title>Malibu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex w-full justify-between p-5 pl-8 text-sm text-gray-700">
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
      <form className="mt-44 flex w-4/5 flex-grow flex-col items-center">
        <Image
          src="/images/logotrans.png" // Route of the image file
          height={100} // Desired size with correct aspect ratio
          width={300} // Desired size with correct aspect ratio
          alt="Malibu Logo"
        />
        <div
          className="mt-5 flex w-full max-w-md items-center space-x-3 rounded-full 
        border border-gray-200 px-5 py-2 focus-within:shadow-lg hover:shadow-md 
        sm:max-w-xl lg:max-w-2xl"
        >
          <SearchIcon className="h-5 text-gray-500" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="flex-grow focus:outline-none"
          />
        </div>
        <div className="mt-8 flex w-1/2 flex-col justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
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
      <Footer />
    </div>
  );
}
