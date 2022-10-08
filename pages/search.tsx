import Head from 'next/head';
import * as React from 'react';
import Header from '../components/Header';

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
  } else {
    // console.log(res.status, res.statusText);
  }
  return {
    props: {
      tweet: data,
    },
  };
}
