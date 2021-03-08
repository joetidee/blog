import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'

import PostHeader from '@/components/Post/Header'
import PostBody from '@/components/Post/Body'
import Share from '@/components/Post/Share'
import { getGlobalTransition } from '@/components/GlobalStyle'
import ScrollToTop from '@/components/ScrollToTop'

import { getPostBySlug, getAllPosts } from '@/lib/api'
import { HOMEPAGE, URLs } from '@/lib/constants'

export default function Post({ post }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Wrapper>
      <Container>
        <NextSeo
          title={post.title}
          description={post.excerpt}
          canonical={`${HOMEPAGE}${post.slug}`}
          openGraph={{
            article: {
              publishedTime: post.date,
              authors: [URLs.PORTFOLIO],
              section: post.section,
              tags: post.tags,
            },
            url: `${HOMEPAGE}${post.slug}`,
            title: post.title,
            description: post.excerpt,
            images: [
              {
                url: `${HOMEPAGE}_next/image?url=${encodeURIComponent(
                  post.ogImage.url
                )}&w=1920&q=75`,
                alt: `${post.title} image cover`,
                width: 200,
                height: 200,
              },
            ],
            site_name: post.title,
          }}
        />
        <PostHeader {...post} />
        <PostBody {...post} />
      </Container>
      <ScrollToTop />
      <Share title={post.title} summary={post.excerpt} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const Container = styled.div`
  color: ${({ theme }) => theme.contentText};
  ${getGlobalTransition()}
  padding: 2rem 1rem;
  max-width: 100vw;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: ${({ theme }) => theme.breakpoints.sm};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: ${({ theme }) => theme.breakpoints.md};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: ${({ theme }) => theme.breakpoints.rg};
  }
`

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'content',
    'ogImage',
    'coverImage',
    'tags',
    'section',
  ])

  return {
    props: {
      post,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
