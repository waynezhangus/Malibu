import * as React from 'react';
import { useRouter } from 'next/router';
import TimeAgo from 'react-timeago';
import { Tweet, User } from '../typings';

interface Props {
  tweet: Tweet;
  user: User;
}

export default function SearchItem({ tweet, user }: Props) {
  const router = useRouter();
  return (
    <div
      className="flex h-64 max-w-[300px] cursor-pointer flex-col space-y-1 p-6 hover:bg-gray-100 dark:hover:bg-zinc-800 sm:max-w-[280px]"
      onClick={() =>
        router.push(
          `/article?url=${tweet.URL}&tweetNum=${user.tweetNum}&tweetLen=${user.tweetLen}`
        )
      }
    >
      <div className="min-h-0 grow">
        <img
          className="h-full w-full rounded-lg object-cover"
          src={tweet.image}
          alt=""
        />
      </div>
      <div className="flex text-xs text-gray-500 dark:text-gray-300">
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
