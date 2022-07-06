// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Tweet } from '../../typings';

type Data = {
  tweets: Tweet[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets: Tweet[] = [
    {
      _id: '0',
      createdAt: '2022-06-30T20:14:41.778+00:00',
      updatedAt: '2022-07-05T19:54:18.865+00:00',
      text: 'test this tweet',
      username: 'Wayne Zhang',
      profileImg:
        'https://pbs.twimg.com/profile_images/1540186755101405189/Jo_ylk3K_400x400.jpg',
      image:
        'https://pbs.twimg.com/media/FW1j3rjXgAMcb4q?format=jpg&name=small',
    },
  ];
  res.status(200).json({ tweets });
}
