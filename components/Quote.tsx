import React from 'react';
import { Quote } from '../typings';

export default function QuoteComponent({ author, text }: Quote) {
  return (
    <div className="mt-2 flex space-x-3">
      <div className="relative shrink-0">
        <a
          href={`https://twitter.com/${author.screenName}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="mt-1 h-10 w-10 rounded-full object-cover hover:opacity-75"
            src={author.profileImg}
            alt="Writer Image"
          />
        </a>
        <a className="absolute top-[44px] left-[17.5px] h-[calc(100%_-_32px)] w-[5px] border-x-2 border-solid border-transparent bg-gray-300 bg-clip-padding hover:bg-gray-500"></a>
      </div>

      <div>
        <div className="flex flex-col items-start space-x-1 sm:flex-row">
          <a
            className="mr-1 text-sm font-bold hover:text-twitter"
            href={`https://twitter.com/${author.screenName}`}
            target="_blank"
            rel="noreferrer"
          >
            {author.userName}
          </a>
          <a
            className="text-sm text-gray-500"
            href={`https://twitter.com/${author.screenName}`}
            target="_blank"
            rel="noreferrer"
          >
            @{author.screenName}
          </a>
        </div>

        <p className="pt-1 text-sm leading-tight">{text}</p>
      </div>
    </div>
  );
}
