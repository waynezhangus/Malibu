import { Tweet } from '../typings';
import useSWR from 'swr';

const fetchTweets = async (url: string) => {
  const res = await fetch(
    'https://malibu-server1.herokuapp.com/api/?' + new URLSearchParams({ url })
  );
  const data = await res.json();
  return data;
};

// const useTweets = (url: string) => {
//   const fetcher = (url: string) =>
//     fetch(
//       'https://malibu-server1.herokuapp.com/api/?' +
//         new URLSearchParams({ url })
//     ).then((res) => res.json());

//   const { data, error } = useSWR(url, fetcher);

//   console.log(data);

//   return {
//     tweets: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

export { fetchTweets };
