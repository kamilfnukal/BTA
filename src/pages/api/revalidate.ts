import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { secret, page }
  } = req

  if (secret !== process.env.secret) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // Revalidating index page
    if (page === 'index') {
      await res.revalidate('/')
      return res.json({ revalidated: true })
    }

    // Revalidating home page
    if (page === 'home') {
      await res.revalidate('/auth/home')
      return res.json({ revalidated: true })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send('Error revalidating')
  }
}
