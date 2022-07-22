import React, { useEffect, useState } from 'react';
import { Entity, Quote, Tweet } from '../typings';
import QuoteComponent from './Quote';
import TimeAgo from 'react-timeago';
import {
  ChatIcon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline';

interface Props {
  id: string;
  author: Entity;
  text: string;
  time: string;
  image?: string;
  quotes?: Quote[];
}

export default function SectionComponent({
  id,
  author,
  text,
  time,
  image,
  quotes,
}: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  return (
    <div className="flex space-x-3 p-3 hover:bg-gray-100" id={id}>
      <div className="relative shrink-0">
        <img
          className="mt-1 h-10 w-10 rounded-full object-cover"
          src={author.profileImg}
          alt="Publisher Image"
        />
        <a
          className="absolute top-[44px] left-[17.5px] h-[calc(100%_-_14px)] w-[5px] border-x-2 border-solid border-transparent bg-gray-300 bg-clip-padding hover:bg-gray-500"
          href={'#' + id}
        ></a>
      </div>

      <div>
        <div className="flex items-center space-x-1">
          <p className="mr-1 text-sm font-bold">{author.userName}</p>
          <a
            className="text-sm text-gray-500 hover:text-twitter"
            href={`https://twitter.com/${author.screenName}`}
            target="_blank"
          >
            @{author.screenName} ·
          </a>
          <TimeAgo className="text-sm text-gray-500" date={time} />
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
                time={time}
              />
            ))}
          </div>
        )}

        <div className="mt-3 flex justify-between">
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
            <ChatIcon className="h-5 w-5" />
            <p>5</p>
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
