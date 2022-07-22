import React from 'react';
import { Entity } from '../typings';
import TimeAgo from 'react-timeago';

interface Props {
  author: Entity;
  text: string;
  time: string;
}

export default function SectionComponent({ author, text, time }: Props) {
  return (
    <div className="mt-2 flex space-x-3">
      <div className="relative shrink-0">
        <img
          className="mt-1 h-10 w-10 rounded-full object-cover"
          src={author.profileImg}
          alt="Writer Image"
        />
        <a className="absolute top-[44px] left-[17.5px] h-[calc(100%_-_32px)] w-[5px] border-x-2 border-solid border-transparent bg-gray-300 bg-clip-padding hover:bg-gray-500"></a>
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
      </div>
    </div>
  );
}
