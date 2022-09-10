import * as React from 'react';
import SectionComponent from './Section';
import { Tweet, User } from '../typings';

interface Props {
  tweet: Tweet;
  user: User;
}

export default function TweetComponent({ tweet: oldTweet, user }: Props) {
  const [tweet, setTweet] = React.useState(oldTweet);
  const [tweetNum, setTweetNum] = React.useState(user.tweetNum);
  React.useEffect(() => setTweetNum(user.tweetNum), [user.tweetNum]);
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

  const onEditTweet = async () => {
    const res = await fetch(
      'https://malibu-server1.herokuapp.com/tweet?' +
        new URLSearchParams({
          url: tweet.URL,
          tweetNum: tweetNum.toString(),
        })
    );
    let data;
    if (res.ok) {
      data = await res.json();
      setTweet(data);
    } else {
      // console.log(res.status, res.statusText);
    }
  };
  return (
    <div className="sm:border-x sm:border-gray-200 dark:sm:border-gray-600">
      <div className="flex items-center border-b border-gray-200 py-3 px-4 dark:border-zinc-600 dark:text-gray-50">
        <span className="mr-3 text-sm font-medium">
          Total number of tweets you would like to see
        </span>
        <label className="relative inline-flex flex-1 cursor-pointer items-center">
          <input
            className="text-sm focus:outline-none dark:bg-zinc-800"
            type="number"
            min="2"
            max="50"
            name="tweetNum"
            value={tweetNum}
            onChange={(e) => setTweetNum(parseInt(e.target.value))}
          />
        </label>
        <button className="btn p-1.5 dark:bg-zinc-700" onClick={onEditTweet}>
          Submit
        </button>
      </div>
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
