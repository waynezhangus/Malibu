import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { Tweet, User } from '../typings';
import SearchItem from '../components/SearchItem';

interface Props {
  error?: string;
  tweets: Tweet[];
}

export default function SearchPage({ error, tweets }: Props) {
  const router = useRouter();
  if (error || tweets.length == 0) {
    router.push(`/error?code=search`);
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
        <title>Search Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header userInput={router.query.q as string} />
      <main className="max-w-4xl p-6 dark:text-gray-50 sm:mx-auto sm:border-x sm:border-gray-200 dark:sm:border-gray-600">
        {tweets && (
          <div
            className={`flex min-h-[560px] flex-wrap content-start items-center justify-center`}
          >
            {tweets.map((tweet, index) => (
              <SearchItem
                key={tweet._id}
                tweet={tweet}
                tweetNum={user.tweetNum}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const res = await fetch(
    'https://malibu-server1.herokuapp.com/search?' +
      new URLSearchParams({
        q: context.query.q,
      })
  );
  let data;
  if (res.ok) {
    data = await res.json();
    return {
      props: {
        tweets: data,
      },
    };
  } else {
    // console.log(res.status, res.statusText);
    return {
      props: {
        error: 'search',
      },
    };
  }
}
