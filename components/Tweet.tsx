import * as React from 'react';
import SectionComponent from './Section';
import { Tweet } from '../typings';

interface Props {
  tweet: Tweet;
}

export default function TweetComponent({ tweet: oldTweet }: Props) {
  const [tweet, setTweet] = React.useState(oldTweet);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'https://malibu-server1.herokuapp.com/tweetUpdate/?' +
          new URLSearchParams({ url: tweet.URL })
      );
      let data;
      if (res.ok) {
        data = await res.json();
        setTweet(data);
        console.log('DB refreshed');
      } else {
        console.log(res.status, res.statusText);
      }
    };
    if ((Date.now() - Date.parse(tweet.updatedAt)) / 1000 > 12 * 3600) {
      fetchData();
    }
  }, []);
  return (
    <div className="sm:border-x sm:border-gray-200 dark:sm:border-gray-600">
      <SectionComponent
        id={tweet._id + 'title'}
        author={tweet.publisher}
        text={tweet.title}
        time={tweet.time}
        image={tweet.image}
        URL={tweet.URL}
        publisher
      />
      <SectionComponent
        id={tweet._id + 'subtitle'}
        author={tweet.author}
        text={tweet.subtitle ?? ''}
        end
        verified
      />
      {tweet.sections &&
        tweet.sections.map((section, index) => (
          <SectionComponent
            key={tweet._id + index}
            id={tweet._id + index}
            author={section.points[0].author}
            text={section.points[0].text}
            points={section.points.slice(1)}
            end={index == tweet.sections.length - 1 ? true : false}
          />
        ))}
    </div>
  );
}
