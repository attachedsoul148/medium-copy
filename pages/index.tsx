/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { PostType } from '@/types'
import Head from 'next/head'
import Link from 'next/link'
import { client, urlFor } from './../sanity'

interface HomeProps {
  posts: PostType[]
}
const Home: React.FC<HomeProps> = ({ posts }) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="https://cdn.iconscout.com/icon/free/png-256/medium-47-433328.png" />
      </Head>
      <Header />

      <div className="py-10 lg:py-0  px-10 bg-yellow-500 border-y border-black">
        <div className="flex justify-between max-w-7xl mx-auto items-center">
          <div>
            <h1 className="text-5xl max-w-sm">
              <span className="underline decoration-black">Medium</span> is a place to write, read,
              and connect
            </h1>
            <h2 className="text-sm">
              It`s easy and free to post your thinking on any topic and connect with millions of
              readers
            </h2>
          </div>
          <img
            className="hidden md:inline-flex h-40 lg:h-full"
            src="https://www.iconpacks.net/icons/2/free-medium-icon-2177-thumb.png"
            alt="logo"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 gap-3 max-w-7xl mx-auto">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug?.current}`}>
            <div className="flex flex-col border group overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-200 h-full">
              <img
                src={urlFor(post.mainImage).url()}
                alt="postPhoto"
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
              />
              <div className="flex items-center justify-between p-5 flex-1">
                <div>
                  <p className="font-medium text-lg">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author?.name}
                  </p>
                </div>
                <img
                  src={urlFor(post.author?.image).url()}
                  alt="authorAvatar"
                  className="h-12 w-12 rounded-full drop-shadow-md ml-2"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    title,
    description,
    slug,
    mainImage,
    author -> {
      name,
      image,
    }
  }
  `

  const posts = await client.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
