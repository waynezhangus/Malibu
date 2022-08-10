import * as React from 'react';
import { Entity, Section } from '../typings';
import SubSection from './SubSection';
import TimeAgo from 'react-timeago';
import { useRouter } from 'next/router';
import {
  ChatIcon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import { LibraryIcon, BadgeCheckIcon } from '@heroicons/react/solid';

interface Props extends Section {
  id: string;
  author: Entity;
  time?: string;
  image?: string;
  end?: boolean;
  publisher?: boolean;
  verified?: boolean;
}

export default function SectionComponent({
  id,
  author,
  time,
  image,
  text,
  quotes,
  end = false,
  publisher = false,
  verified = false,
}: Props) {
  const [fold, setFold] = React.useState<boolean>(false);

  return (
    <div
      className={`flex space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-zinc-900 ${
        end && 'border-b border-gray-200'
      }`}
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
        {!end && (
          <a
            className={`absolute top-[44px] left-[17.5px] h-[calc(100%_-_16px)] w-[5px]
              border-x-2 border-solid 
              ${
                quotes && quotes.length > 0 && fold
                  ? 'border-gray-200 bg-twitter'
                  : 'border-transparent bg-gray-300'
              } 
             bg-clip-padding hover:bg-gray-500`}
            onClick={() => {
              setFold(!fold);
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          />
        )}
      </div>

      <div className="flex-1 dark:text-gray-50">
        <div className="flex items-center space-x-1">
          {publisher && <LibraryIcon className="h-4 text-twitter" />}
          {verified && <BadgeCheckIcon className="h-4 text-twitter" />}
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
        {quotes && quotes.length > 0 && fold && (
          <p
            className="cursor-pointer pt-1 text-sm leading-tight text-twitter"
            onClick={() => setFold(false)}
          >
            Show more points
          </p>
        )}
        {image && (
          <img
            className="m-3 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            src={image}
            alt=""
          />
        )}

        {quotes &&
          typeof quotes.length === 'number' &&
          quotes.length > 0 &&
          !fold && (
            <div>
              {quotes?.map((quote, index) => (
                <SubSection
                  key={id + index}
                  author={quote.author}
                  text={quote.text}
                  end={index == quotes.length - 1 ? true : false}
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
