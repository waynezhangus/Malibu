import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import TweetComponent from '../components/Tweet';
import { Tweet, User } from '../typings';

interface Props {
  error?: string;
  tweet: Tweet;
}

export default function Article({ error, tweet }: Props) {
  const router = useRouter();
  if (error) {
    router.push(`/error?code=${error}`);
    return;
  }
  const initUser: User = {
    theme: true,
    autoExtend: false,
    autoShowFeed: true,
    tweetNum: 5,
  };
  const [user, setUser] = React.useState(initUser);
  React.useEffect(() => {
    const userJson = localStorage.getItem('user');
    const localUser = userJson ? JSON.parse(userJson) : null;
    if (localUser) {
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

  return (
    <div className="w-full dark:bg-zinc-900">
      <Head>
        <title>Article</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header userInput={router.query.url as string} />
      <main className="max-w-3xl sm:pl-40">
        <TweetComponent tweet={tweet} user={user} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const res = await fetch(
    'https://malibu-server1.herokuapp.com/tweet?' +
      new URLSearchParams({
        url: context.query.url,
        tweetNum: context.query.tweetNum,
      })
  );
  let data;
  if (res.ok) {
    data = await res.json();
    return {
      props: {
        tweet: data,
      },
    };
  } else {
    // console.log(res.status, res.statusText);
    return {
      props: {
        error: 'tweet',
      },
    };
  }
}
