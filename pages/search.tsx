import Head from 'next/head';
import * as React from 'react';
import Header from '../components/Header';
import TweetComponent from '../components/Tweet';
import { Tweet } from '../typings';

interface Props {
  tweet: Tweet;
}

export default function Search({ tweet }: Props) {
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
    <div className="w-full dark:bg-[#202124]">
      <Head>
        <title>Analyze Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-3xl px-2 sm:pl-40">
        <TweetComponent tweet={tweet} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const res = await fetch(
    'https://malibu-server1.herokuapp.com/tweet?' +
      new URLSearchParams({ url: context.query.q })
  );
  let data;
  if (res.ok) {
    data = await res.json();
  } else {
    console.log(res.status, res.statusText);
  }
  return {
    props: {
      tweet: data,
    },
  };
}
