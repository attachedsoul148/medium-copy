import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const config = {
  projectId,
  dataset,
  apiVersion: '1',
  useCdn: typeof document !== 'undefined',
}

export const client = createClient(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)
