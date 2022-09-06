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
    const userJson = localStorage.getItem('user');
    const localUser = userJson ? JSON.parse(userJson) : {};
    if (
      localUser?.theme === true ||
      (!localUser && window.matchMedia('(prefers-color-scheme: dark)').matches)
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
    <div className="w-full dark:bg-zinc-900">
      <Head>
        <title>Analyze Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header showTitle="search" />
      <main className="max-w-3xl sm:pl-40">
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
    // console.log(res.status, res.statusText);
  }
  return {
    props: {
      tweet: data,
    },
  };
}
