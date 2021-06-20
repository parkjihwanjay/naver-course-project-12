import type { NextApiRequest, NextApiResponse } from 'next';
import passport from '../../lib/passport';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  passport.authenticate('naver');
  res.json({});
};
