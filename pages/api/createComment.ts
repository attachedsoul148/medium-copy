import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'next-sanity'

export default async function createComment(req: NextApiRequest, res: NextApiResponse) {
  const { _id, name, email, comment } = JSON.parse(req.body)
  const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '1', // use current UTC date - see "specifying API version"!
    token: process.env.SANITY_API_TOKEN, // or leave blank for unauthenticated usage
    useCdn: true,
  }
  const client = createClient(config)
  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference', // ref to post below which this comment was written,
        _ref: _id, // this is for have an opportunity to make request to current comment
      },
      name,
      email,
      comment,
    })
  } catch (err) {
    return res.status(500).json({ message: "Comment can't be uploaded", err })
  }
  return res.status(200).json({ message: 'Comment is submitted' })
}
