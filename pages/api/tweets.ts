// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Tweet } from '../../typings';

type Data = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets = [{}];
  res.status(200).json({});
}
