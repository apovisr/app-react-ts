import { PostSection } from 'components/post'
import { title } from 'process'


export default async function Page() {
  const posts = [
    {
      id: 1,
      title: 'Boost your conversation rate',
      abstract: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      author: {
        name: 'Michael Foster',
        job: 'Co-Founder / CTO'
      }
    },
    {
      id: 2,
      title: 'Boost your conversation rate',
      abstract: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      author: {
        name: 'Michael Foster',
        job: 'Co-Founder / CTO'
      }
    },
    {
      id: 3,
      title: 'Boost your conversation rate',
      abstract: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      author: {
        name: 'Michael Foster',
        job: 'Co-Founder / CTO'
      }
    },
    {
      id: 4,
      title: 'Boost your conversation rate',
      abstract: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      author: {
        name: 'Michael Foster',
        job: 'Co-Founder / CTO'
      }
    },
    {
      id: 5,
      title: 'Boost your conversation rate',
      abstract: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      author: {
        name: 'Michael Foster',
        job: 'Co-Founder / CTO'
      }
    }
  ]

  const resultado = [];
  for (let i = 0; i < posts.length; i += 3) {
    resultado.push(posts.slice(i, i + 3));
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">From the blog</h2>
          <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
        </div>
        {resultado.map((triPost, index) => (
          <PostSection key={index} posts={triPost}></PostSection>
        ))}
      </div>
    </div>
  )
}