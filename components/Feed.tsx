import * as React from 'react';
import { useRouter } from 'next/router';
import { Tweet } from '../typings';

interface Props {
  tweet: Tweet;
  tweetNum: number;
}

export default function Feed({ tweet, tweetNum }: Props) {
  const router = useRouter();
  return (
    <div
      className="flex h-48 max-w-[220px] cursor-pointer flex-col space-y-1.5 rounded-lg bg-gray-100 p-3 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700"
      onClick={() =>
        router.push(`/article?url=${tweet.URL}&tweetNum=${tweetNum}`)
      }
    >
      <div className="text-sm text-gray-500 dark:text-gray-300">
        {tweet.title}
      </div>
      <div className="hidden text-xs text-gray-500 dark:text-gray-300 lg:block">
        {tweet.publisher.userName}
      </div>
      <div className="min-h-0 grow">
        <img
          className="h-full w-full rounded-lg object-cover"
          src={tweet.image}
          alt=""
        />
      </div>
    </div>
  );
}
