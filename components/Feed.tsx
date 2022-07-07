import React, { useState } from 'react';
import { RefreshIcon } from '@heroicons/react/outline';
import TweetBox from './TweetBox';
import TweetComponent from './Tweet';
import { Tweet } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';
import toast from 'react-hot-toast';

interface Props {
  tweets: Tweet[];
}

function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...');
    const tweets = await fetchTweets();
    toast.success('Feed Updated!', { id: refreshToast });
    setTweets(tweets);
  };

  return (
    <div className="col-span-7 max-h-screen overflow-y-scroll border-x scrollbar-hide lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 
          cursor-pointer text-twitter transition-all duration-500
          ease-out hover:rotate-180
          active:scale-125"
        />
      </div>

      <div>
        <TweetBox />
      </div>

      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
