import React, { useEffect, useState } from 'react';
import SectionComponent from './Section';
import { Tweet } from '../typings';

interface Props {
  tweet: Tweet;
}

export default function TweetComponent({ tweet }: Props) {
  return (
    <div className="border-t-2 border-gray-100">
      <SectionComponent
        id={tweet._id + 'title'}
        author={tweet.publisher}
        text={tweet.title}
        time={tweet.time}
        image={tweet.image}
      />
      <SectionComponent
        id={tweet._id + 'subtitle'}
        author={tweet.author}
        text={tweet.subtitle ?? ''}
        time={tweet.time}
      />
      {tweet.sections &&
        tweet.sections.map((section, index) => (
          <SectionComponent
            key={tweet._id + index}
            id={tweet._id + index}
            author={tweet.author}
            text={section.text}
            time={tweet.time}
            quotes={section.quotes}
          />
        ))}
    </div>
  );
}
