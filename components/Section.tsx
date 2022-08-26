import * as React from 'react';
import { Entity, Point } from '../typings';
import SubSection from './SubSection';
import TimeAgo from 'react-timeago';
import { useRouter } from 'next/router';
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ArrowUturnLeftIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';
import { BuildingLibraryIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';

interface Props {
  id: string;
  author: Entity;
  text: string;
  points?: Point[];
  time?: string;
  image?: string;
  URL?: string;
  end?: boolean;
  publisher?: boolean;
  verified?: boolean;
}

export default function SectionComponent({
  id,
  author,
  text,
  time,
  image,
  URL,
  points,
  end = false,
  publisher = false,
  verified = false,
}: Props) {
  const [fold, setFold] = React.useState<boolean>(false);

  return (
    <div
      className={`flex space-x-3 py-3 px-4 hover:bg-gray-100 dark:hover:bg-zinc-900 ${
        end && 'border-b border-gray-200 dark:border-zinc-600'
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
                points && points.length > 0 && fold
                  ? 'border-gray-200 bg-twitter dark:border-gray-300'
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
          {publisher && <BuildingLibraryIcon className="h-4 text-twitter" />}
          {verified && <CheckBadgeIcon className="h-4 text-twitter" />}
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
        {points && points.length > 0 && !fold && (
          <p
            className="cursor-pointer pt-1 text-sm leading-tight text-twitter"
            onClick={() => setFold(true)}
          >
            Hide this thread
          </p>
        )}
        {points && points.length > 0 && fold && (
          <p
            className="cursor-pointer pt-1 text-sm leading-tight text-twitter"
            onClick={() => setFold(false)}
          >
            Show this thread
          </p>
        )}
        {image && (
          <div className="group relative m-3 ml-0 mb-1 h-60 text-center">
            <img
              className="h-full w-full rounded-lg object-cover shadow-sm group-hover:opacity-40 group-hover:transition group-hover:duration-300"
              src={image}
              alt=""
            />
            <a
              className="invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm group-hover:visible"
              href={URL}
              target="_blank"
              rel="noreferrer"
            >
              <ArrowTopRightOnSquareIcon className="mr-2 inline-block h-4" />
              Original Website
            </a>
          </div>
        )}

        {points &&
          typeof points.length === 'number' &&
          points.length > 0 &&
          !fold && (
            <div>
              {points?.map((point, index) => (
                <SubSection
                  key={id + index}
                  author={point.author}
                  text={point.text}
                  end={index == points.length - 1 ? true : false}
                />
              ))}
            </div>
          )}

        <div className="mt-3 flex justify-between">
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <p className="pt-0.5 text-sm">5</p>
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
            <ArrowsRightLeftIcon className="h-5 w-5" />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
            <HeartIcon className="h-5 w-5" />
          </div>
          <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
            <ArrowUturnLeftIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
