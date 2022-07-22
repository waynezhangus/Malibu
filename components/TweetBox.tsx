import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { fetchTweets } from '../utils/fetch';

function TweetBox({ setTweets }: any) {
  const [input, setInput] = useState('');
  const { data: session } = useSession();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const tweets = await fetchTweets(input);
    setTweets(tweets);
  };

  return (
    <div className="flex space-x-4 px-5">
      <img
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src={session?.user?.image || 'https://links.papareact.com/gll'}
        alt=""
      />

      <form className="flex flex-1 flex-col">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Paste the URL of the article here."
          className="h-20 w-full text-lg outline-none placeholder:text-lg"
        />
        <div className="mb-3 flex items-center">
          <div className="flex flex-1 space-x-2 text-twitter">
            <PhotographIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            <SearchCircleIcon className="h-5 w-5" />
            <EmojiHappyIcon className="h-5 w-5" />
            <CalendarIcon className="h-5 w-5" />
            <LocationMarkerIcon className="h-5 w-5" />
          </div>
          <button
            disabled={!input}
            onClick={onSubmit}
            className="rounded-full bg-twitter py-2 px-5 font-bold text-white hover:bg-twitter/80 disabled:bg-twitter/30"
          >
            Analyze
          </button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
