// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '../../typings';

type Data = Comment[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetId } = req.query;
  const comments: Comment[] = [
    {
      _id: '10',
      createdAt: '2022-06-30T20:14:41.778+00:00',
      updatedAt: '2022-07-05T19:54:18.865+00:00',
      text: 'test this comment',
      username: 'Wayne Zhang',
      profileImg:
        'https://pbs.twimg.com/profile_images/1540186755101405189/Jo_ylk3K_400x400.jpg',
      tweetId: tweetId,
    },
    {
      _id: '11',
      createdAt: '2022-06-30T20:14:41.778+00:00',
      updatedAt: '2022-07-05T19:54:18.865+00:00',
      text: 'test this comment again',
      username: 'Wayne Zhang',
      profileImg:
        'https://pbs.twimg.com/profile_images/1540186755101405189/Jo_ylk3K_400x400.jpg',
      tweetId: tweetId,
    },
  ];

  res.status(200).json(comments);
}
