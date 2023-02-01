/* eslint-disable @next/next/no-img-element */
import Header from '@/components/Header'
import blockContent from '@/medium-sanity-copy/schemas/blockContent'
import { PostType, SlugType } from '@/types'
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik'
import { FieldProps } from 'formik/dist/Field'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import PortableText from 'react-portable-text'
import { client, urlFor } from './../../sanity'
import * as yup from 'yup'
import Footer from '@/components/Footer'

interface PostProps {
  post: PostType
}
let schema = yup.object().shape({
  name: yup.string().required('Name field is required'),
  comment: yup.string().required('Comment field is required'),
  email: yup.string().email('Email field must be email type').required('Email field is required'),
})

const Post: React.FC<PostProps> = ({ post }) => {
  const [submitted, setSubmitted] = useState(false)
  const initialValues = {
    name: '',
    email: '',
    comment: '',
  }
  const onSubmit = (values: typeof initialValues, { resetForm }: FormikHelpers<typeof values>) => {
    try {
      setSubmitted(true)
      fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify({ ...values, _id: post._id }),
      })
      resetForm()
    } catch {
      setSubmitted(false)
    }
  }
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="https://cdn.iconscout.com/icon/free/png-256/medium-47-433328.png" />
      </Head>

      <Header />

      <div className="max-w-3xl mx-auto px-5 md:px-0">
        <div className="my-5">
          <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
          <h2 className="text-xl text-gray-600">{post.description}</h2>
          <div className="flex items-center space-x-3 my-3">
            <img
              className="h-10 w-10 rounded-full drop-shadow-md"
              src={urlFor(post.author?.image).url()}
              alt="avatar"
            />
            <p className="font-extralight text-gray-600">
              Blog post by <span className="text-yellow-500">{post.author?.name}</span> - Published
              at {new Date(post._createdAt!).toUTCString()}
            </p>
          </div>
        </div>

        <PortableText
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          content={post.body!}
          serializers={{
            h1: (props: any) => <h1 className="text-2xl text-bold my-5" {...props} />,
            h2: (props: any) => <h2 className="text-xl text-bold my-5" {...props} />,
            li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
            link: ({ href, children }: any) => (
              <a href={href} className="text-blue-500 hover:underline">
                {children}
              </a>
            ),
          }}
        />
      </div>

      <hr className="color bg-yellow-500 h-1 max-w-xl mx-auto mt-10 mb-5" />

      {submitted ? (
        <div className="max-w-2xl mx-auto p-5 bg-yellow-500 text-white mb-5 rounded-lg">
          <h2 className="font-bold text-xl">Thank you for your comment!</h2>
          <p>Once it has been approved , it will appear below!</p>
        </div>
      ) : (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
          {() => (
            <Form className="max-w-2xl mx-auto p-5">
              <span className="text-yellow-500">Enjoyed this article?</span>
              <h1 className="text-3xl font-bold">Leave the comment below!</h1>
              <hr className="my-2" />

              <div className="flex flex-col my-3">
                <label htmlFor="name" className="font-medium mx-1">
                  Name
                </label>
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <input
                      type="text"
                      {...field}
                      className="outline-none border py-2 px-3 rounded shadow ring-yellow-500 focus:ring-2"
                    />
                  )}
                </Field>
              </div>

              <div className="flex flex-col my-3">
                <label htmlFor="email" className="font-medium mx-1">
                  Email
                </label>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <input
                      type="text"
                      {...field}
                      className="outline-none border py-2 px-3 rounded shadow ring-yellow-500 focus:ring-2"
                    />
                  )}
                </Field>
              </div>

              <div className="flex flex-col my-3">
                <label htmlFor="comment" className="font-medium mx-1">
                  Comment
                </label>
                <Field name="comment">
                  {({ field }: FieldProps) => (
                    <textarea
                      {...field}
                      rows={8}
                      className="outline-none border resize-none py-2 px-3 rounded shadow ring-yellow-500 focus:ring-2"
                    />
                  )}
                </Field>
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-white text-lg font-medium w-full text-center py-2 hover:bg-yellow-400 rounded-lg mt-1 mb-3 transition-colors">
                Comment
              </button>

              <div className="flex flex-col space-y-1 text-red-500 items-center">
                <ErrorMessage name="name">{(err) => <span>{err}</span>}</ErrorMessage>
                <ErrorMessage name="email">{(err) => <span>{err}</span>}</ErrorMessage>
                <ErrorMessage name="comment">{(err) => <span>{err}</span>}</ErrorMessage>
              </div>
            </Form>
          )}
        </Formik>
      )}

      <div className="flex flex-col p-5 max-w-3xl mx-auto border shadow shadow-yellow-500 rounded-lg my-10 space-y-2">
        <h2 className="text-2xl font-medium">Comments</h2>
        <hr />
        {post.comments?.map((comment) => (
          <p key={comment._id}>
            <span className="text-yellow-500">{comment.name}</span> : {comment.comment}
          </p>
        ))}
      </div>

      <Footer />
    </div>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `
    *[_type == "post"]{
        _id,
        slug
      }
    `

  const posts = await client.fetch(query)

  const paths = posts.map((post: { _id: string; slug: SlugType }) => ({
    params: {
      slug: post.slug.current,
    },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        description,
        slug,
        mainImage,
        title,
        author -> {
          name,
          image
        },
        body,
        "comments" :*[_type == "comment" && post._ref == ^._id && approved == true]
      }
    `
  const post = await client.fetch(query, { slug: params?.slug })

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
