import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import TweetComponent from '../components/Tweet';
import { Tweet } from '../typings';

interface Props {
  tweet: Tweet;
}

export default function Search({ tweet }: Props) {
  return (
    <div className="w-full">
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
