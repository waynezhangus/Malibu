import * as React from 'react';
import Head from 'next/head';

export default function Settings() {
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
    <div className="h-screen w-full dark:bg-zinc-900">
      <Head>
        <title>Settings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hidden dark:block">
        <img
          className="h-16 md:h-24"
          src="/images/logowhite.png" // Route of the image file
          alt="Malibu Logo"
        />
      </div>
      <div className="dark:hidden">
        <img
          className="h-16 md:h-24"
          src="/images/logotrans.png" // Route of the image file
          alt="Malibu Logo"
        />
      </div>
    </div>
  );
}
