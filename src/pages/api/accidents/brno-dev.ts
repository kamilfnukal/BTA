// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE } from '../../../const/api'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const acc1 = { attributes: { ...EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE.attributes, den: 1, mesic: 10, rok: 2012 } }
  const acc2 = { attributes: { ...EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE.attributes, den: 1, mesic: 10, rok: 2012 } }
  const acc3 = { attributes: { ...EXAMPLE_BRNO_BIKE_ACCIDENT_RESPONSE.attributes, den: 28, mesic: 10, rok: 2012 } }

  return res.status(200).json({ features: [acc1, acc2, acc3] })
}
