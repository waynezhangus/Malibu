import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';

export default function ErrorPage() {
  const router = useRouter();
  const code = router.query.code as string;
  const errorText = {
    tweet: 'The article you requested can not be parsed.',
    dev: 'The current page is under construction.',
  };
  const errorPic = {
    tweet: '/images/parse.png',
    dev: '/images/construction.png',
  };
  return (
    <div className="h-screen w-full overflow-hidden dark:bg-zinc-900">
      <Head>
        <title>Error</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header showTitle="error" />
      <main className="h-full max-w-3xl dark:text-gray-50 sm:mx-auto sm:border-x sm:border-gray-200 dark:sm:border-gray-600">
        <div className="flex items-center justify-evenly pt-16">
          <img
            src={errorPic[code as keyof typeof errorPic]}
            alt="Error Picture"
            className="h-40"
          />
          <div>{errorText[code as keyof typeof errorText]}</div>
        </div>
      </main>
    </div>
  );
}