import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
// import Image from 'next/image'
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { Tweet } from '../typings';

interface Props {
  tweets: Tweet[];
}

export default function Home({ tweets }: Props) {
  return (
    <>
      <Head>
        <title>Malibu Project</title>
      </Head>
      <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
        <Toaster />

        <main className="grid grid-cols-10">
          <Sidebar />

          <Feed tweets={tweets} />

          <Widgets />
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_URL}api/tweets`);
  const data = await res.json();
  const tweets: Tweet[] = data.tweets;

  return {
    props: {
      tweets,
    },
  };
};
