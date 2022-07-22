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
      title:
        'Omicron may not be more dangerous than other variants, early hospital report suggests.',
      subtitle:
        "Although Omicron is highly transmissible, cases so far don't show an increase in severity.",
      time: '2021-06-30T20:14:41.778+00:00',
      publisher: {
        userName: 'Popular Science',
        screenName: 'PopSci',
        profileImg:
          'http://pbs.twimg.com/profile_images/1029084163780079616/KL96wS4C_normal.jpg',
      },
      author: {
        userName: 'Hannah Seo',
        screenName: 'ahannahseo',
        profileImg:
          'http://pbs.twimg.com/profile_images/1409649060726902785/eJiZUtLQ_normal.jpg',
      },
      image:
        'https://www.popsci.com/uploads/2020/03/25/Y5VQ2BU4WBGYJHKS3SNFWEBBKA.jpg',
      sections: [
        {
          text: 'This is just for testing',
          quotes: [
            {
              author: {
                userName: 'Anthony Fauci',
                screenName: 'NIAIDNews',
                profileImg:
                  'http://pbs.twimg.com/profile_images/1239931973260492805/RrDAtYcl_normal.jpg',
              },
              text: 'Clearly, in South Africa, Omicron has a transmission advantage.',
            },
            {
              author: {
                userName: 'Anthony Fauci',
                screenName: 'NIAIDNews',
                profileImg:
                  'http://pbs.twimg.com/profile_images/1239931973260492805/RrDAtYcl_normal.jpg',
              },
              text: 'Although it’s too early to make any definitive statements about it, thus far it does not look like there’s a great degree of severity to it.',
            },
          ],
        },
      ],
    },
  ];
  res.status(200).json({ tweets });
}
