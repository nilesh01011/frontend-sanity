import Image from 'next/image'
import { Lato } from 'next/font/google';
import { useState } from 'react';
import { createClient } from "next-sanity";
import PostCard from '@/components/PostCard';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900']
})

export default function Home({ posts }) {
  const [postBlog, setPostBlog] = useState(posts);
  return (
    <main
      className={`text-2xl ${lato.className}`}
    >
      <div className='text-2xl p-[20px]'>

        <div className='grid grid-cols-4 gap-[20px] w-full h-full mt-[20px]'>
          {
            postBlog.map((ele) => {
              return (
                <PostCard key={ele._id} data={ele} />
              )
            })
          }
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  const client = createClient({
    projectId: 'ui7tabvz',
    dataset: 'production',
    useCdn: false
  })

  const query = `*[_type == "post"]`;
  const posts = await client.fetch(query);

  return {
    props: {
      posts
    }
  }
}
