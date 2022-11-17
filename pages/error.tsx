import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { User } from '../typings';

export default function ErrorPage() {
  const router = useRouter();
  const code = router.query.code as string;
  const url = router.query.url ?? '';
  const initUser: User = {
    theme: true,
    autoExtend: false,
    autoShowFeed: true,
    tweetNum: 5,
    tweetLen: 140,
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
  const errorText = {
    tweet: 'The article you requested can not be parsed.',
    dev: 'The current page is under construction.',
    search: 'Your search did not match any articles.',
  };
  const errorPic = {
    tweet: '/images/parse.png',
    dev: '/images/construction.png',
    search: '/images/search.png',
  };
  return (
    <div className="h-screen w-full overflow-hidden dark:bg-zinc-900">
      <Head>
        <title>Error</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header showTitle="error" />
      <main className="h-full max-w-3xl dark:text-gray-50 sm:mx-auto sm:border-x sm:border-gray-200 dark:sm:border-gray-600">
        <div className="flex flex-col items-center space-y-6 pt-16 md:flex-row md:justify-evenly md:space-y-0">
          <img
            src={errorPic[code as keyof typeof errorPic]}
            alt="Error Picture"
            className="h-40"
          />
          <div>
            <div>{errorText[code as keyof typeof errorText]}</div>
            {code == 'tweet' && (
              <div className="pt-4">
                You can{' '}
                <a className="text-twitter underline" href={url as string}>
                  visit the original article.
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
