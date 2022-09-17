import * as React from 'react';
import SectionComponent from './Section';
import { Tweet, User } from '../typings';
import Slider from './Slider';
import toast, { Toaster } from 'react-hot-toast';

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
    const refreshToast = toast.loading('Refreshing...');
    const res = await fetch(
      'https://malibu-server1.herokuapp.com/tweetEdit?' +
        new URLSearchParams({
          url: tweet.URL,
          tweetNum: tweetNum.toString(),
        })
    );
    let data;
    if (res.ok) {
      data = await res.json();
      setTweet(data);
      toast.success('Tweets Updated!', { id: refreshToast });
    } else {
      // console.log(res.status, res.statusText);
    }
  };
  const valueText = (value: number) => {
    return `${value} seconds`;
  };
  const valueLabel = (value: number) => {
    return `${value}s`;
  };

  const maxSeconds = tweet.numWords / 4;
  return (
    <div className="sm:border-x sm:border-gray-200 dark:sm:border-gray-600">
      <div className="flex flex-col space-y-5 border-b border-gray-200 px-4 pt-3 dark:border-zinc-600 dark:text-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Estimated reading time</span>
          <button className="btn p-1.5 dark:bg-zinc-700" onClick={onEditTweet}>
            Submit
          </button>
        </div>
        <div className="px-2">
          <Slider
            step={30}
            defaultValue={(maxSeconds * user.tweetNum) / 100}
            max={maxSeconds}
            min={30}
            marks
            name="tweetNum"
            value={Math.round(((tweetNum / 100) * maxSeconds) / 30) * 30}
            onChange={(event, value) => {
              setTweetNum(Math.round(((value as number) / maxSeconds) * 100));
            }}
            valueLabelDisplay="auto"
            getAriaValueText={valueText}
            valueLabelFormat={valueLabel}
          />
        </div>
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
      <Toaster
        toastOptions={{
          className: 'dark:bg-zinc-700 dark:text-gray-50',
        }}
      />
    </div>
  );
}
