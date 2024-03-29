import * as React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { User } from '../typings';
import Slider from '../components/Slider';

export default function SettingsPage() {
  const initUser: User = {
    theme: true,
    autoExtend: false,
    autoShowFeed: true,
    tweetNum: 5,
    tweetLen: 140,
  };
  const [user, setUser] = React.useState(initUser);
  const onMount = React.useRef(true);

  React.useEffect(() => {
    const userJson = localStorage.getItem('user');
    const localUser = userJson ? JSON.parse(userJson) : null;
    if (localUser) setUser(localUser);
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        if (event.matches) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      });
  }, []);

  React.useEffect(() => {
    if (
      user?.theme === true ||
      (!user && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user.theme]);

  React.useEffect(() => {
    if (!onMount.current) localStorage.setItem('user', JSON.stringify(user));
    else onMount.current = false;
  }, [user]);

  const valueText = (value: number) => {
    return `${value} percent`;
  };
  const valueLabel = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className="h-screen w-full overflow-hidden dark:bg-zinc-900">
      <Head>
        <title>Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header showTitle="settings" />
      <main className="h-full max-w-3xl dark:text-gray-50 sm:mx-auto sm:border-x sm:border-gray-200 dark:sm:border-gray-600">
        <div
          className={`flex flex-col space-y-5 border-b border-gray-200 p-6 dark:border-zinc-600`}
        >
          {/* <div className="mb-1">Display Settings</div> */}
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              name="theme"
              checked={user.theme}
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.checked })
              }
            />
            <div className="switch-bg"></div>
            <div className="switch-thumb"></div>
            <span className="ml-3 text-sm font-medium">Dark theme</span>
          </label>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              name="autoExtend"
              checked={user.autoExtend}
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.checked })
              }
            />
            <div className="switch-bg"></div>
            <div className="switch-thumb"></div>
            <span className="ml-3 text-sm font-medium">
              Extend the threads by default
            </span>
          </label>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              name="autoShowFeed"
              checked={user.autoShowFeed}
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.checked })
              }
            />
            <div className="switch-bg"></div>
            <div className="switch-thumb"></div>
            <span className="ml-3 text-sm font-medium">
              Show feeds on the search page by default
            </span>
          </label>
        </div>
        <div className={`flex flex-col space-y-5 p-6`}>
          {/* <div className="mb-1">Parser Settings</div> */}
          <label className="relative inline-flex flex-col space-y-7">
            <span className="text-sm font-medium">
              Percentage of the article to display by default
            </span>
            <div className="ml-1 w-80">
              <Slider
                step={20}
                defaultValue={20}
                max={100}
                min={20}
                marks
                name="tweetNum"
                value={user.tweetNum}
                onChange={(event, value) => {
                  setUser({ ...user, tweetNum: value as number });
                }}
                valueLabelDisplay="auto"
                getAriaValueText={valueText}
                valueLabelFormat={valueLabel}
              />
            </div>
          </label>
          <label className="relative inline-flex flex-col space-y-7">
            <span className="text-sm font-medium">
              Max characters of each tweet by default
            </span>
            <div className="ml-1 w-80">
              <Slider
                step={140}
                defaultValue={140}
                max={420}
                min={140}
                marks
                name="tweetLen"
                value={user.tweetLen}
                onChange={(event, value) => {
                  setUser({ ...user, tweetLen: value as number });
                }}
                valueLabelDisplay="auto"
              />
            </div>
          </label>
        </div>
      </main>
    </div>
  );
}
