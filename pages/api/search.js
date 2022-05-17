import { getSearch } from '../../lib/spotify';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });
  const response = await getSearch(accessToken, 'Top Songs 2020', 'playlist', '5');
  const { items } = await response.json();

  return res.status(200).json({ items });
};

export default handler;