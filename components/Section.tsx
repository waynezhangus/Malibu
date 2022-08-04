import React, { useEffect, useState } from 'react';
import { Entity, Section } from '../typings';
import QuoteComponent from './Quote';
import TimeAgo from 'react-timeago';
import { useRouter } from 'next/router';
import {
  ChatIcon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline';

interface Props extends Section {
  id: string;
  author: Entity;
  time?: string;
  image?: string;
}

export default function SectionComponent({
  id,
  author,
  text,
  time,
  image,
  quotes,
}: Props) {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  return (
    <div
      className="flex space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-zinc-900"
      id={id}
    >
      <div className="relative shrink-0">
        <a
          href={`https://twitter.com/${author.screenName}`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="mt-1 h-10 w-10 rounded-full object-cover hover:opacity-75"
            src={author.profileImg}
            alt="Publisher Image"
          />
        </a>
        <a
          className="absolute top-[44px] left-[17.5px] h-[calc(100%_-_14px)] w-[5px] border-x-2 border-solid border-transparent bg-gray-300 bg-clip-padding hover:bg-gray-500"
          href={'#' + id}
        ></a>
      </div>

      <div className="flex-1 dark:text-gray-50">
        <div className="flex items-center space-x-1">
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
          {time && (
            <div>
              <span className="text-sm text-gray-500">&middot;&nbsp;</span>
              <TimeAgo className="text-sm text-gray-500" date={time} />
            </div>
          )}
        </div>

        <p className="pt-1 text-sm leading-tight">{text}</p>
        {image && (
          <img
            className="m-3 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            src={image}
            alt=""
          />
        )}

        {quotes && typeof quotes.length === 'number' && quotes.length > 0 && (
          <div>
            {quotes?.map((quote, index) => (
              <QuoteComponent
                key={id + index}
                author={quote.author}
                text={quote.text}
              />
            ))}
          </div>
        )}

        <div className="mt-3 flex justify-between">
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
            <ChatIcon className="h-5 w-5" />
            <p className="pt-0.5 text-sm">5</p>
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
            <SwitchHorizontalIcon className="h-5 w-5" />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
            <HeartIcon className="h-5 w-5" />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
            <UploadIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
