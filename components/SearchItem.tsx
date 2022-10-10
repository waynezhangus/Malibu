import * as React from 'react';
import { useRouter } from 'next/router';
import TimeAgo from 'react-timeago';
import { Tweet } from '../typings';

interface Props {
  tweet: Tweet;
  tweetNum: number;
}

export default function SearchItem({ tweet, tweetNum }: Props) {
  const router = useRouter();
  return (
    <div
      className="flex h-64 max-w-[300px] cursor-pointer flex-col space-y-1 p-6 hover:bg-gray-100 dark:hover:bg-zinc-800 sm:max-w-[280px]"
      onClick={() =>
        router.push(`/article?url=${tweet.URL}&tweetNum=${tweetNum}`)
      }
    >
      <div className="min-h-0 grow">
        <img
          className="h-full w-full rounded-lg object-cover"
          src={tweet.image}
          alt=""
        />
      </div>
      <div className="hidden text-xs text-gray-500 dark:text-gray-300 lg:flex">
        {tweet.publisher.name}
        <span className="pl-1">&middot;&nbsp;</span>
        <TimeAgo date={tweet.time} />
      </div>
      <div className="h-10 text-sm text-gray-500 dark:text-gray-300">
        {tweet.title}
      </div>
    </div>
  );
}
