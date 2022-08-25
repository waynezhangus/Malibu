import * as React from 'react';
import Head from 'next/head';

export default function Settings() {
  return (
    <div>
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
