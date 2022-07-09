// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data, Langs } from 'data/langsData'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const lang = req.query.lang as Langs

  if (Array.isArray(lang) || !lang) {
    return res.status(400).json({ message: 'Invalid language' })
  }

  res.status(200).json(data[lang])
}
