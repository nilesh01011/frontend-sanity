import urlFor from '@/libs/urlFor';
import { createClient } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

function BlogDetailPage({ posts, theme = "dark" }) {

    const [data, setData] = useState(posts);

    // console.log(data[0])

    const [variant, setVariant] = useState(data[0].variant);
    const prices = new Intl.NumberFormat('en-IN').format(data[0].price);

    return (
        <>
            <div className='w-full md:pt-[10px] max-w-[1200px] mx-auto xl:px-0 px-[15px] mt-20'>
                <Link href='/' className='bg-gray-700 rounded-md p-[1rem_2rem]'>Go back</Link>
                <div className='flex gap-[20px] mt-[3rem]'>
                    {/* left sides */}
                    <div className='lg:w-[45%] w-full'>
                        {/* cars title */}
                        <div className="w-full pb-[10px] flex items-center justify-between">
                            {/* title */}
                            <h2 className={`md:text-[24px] text-[20px] font-[800] uppercase`}>{data[0].title}</h2>
                        </div>
                        {/* product images */}
                        <div className='w-full h-full overflow-hidden'>
                            <Image height={240} width={360} src={data[0].mainImage && urlFor(data[0].mainImage).url()} alt={data[0].title} className='sm:w-[425px] w-[280px] mx-auto sm:h-[343px] h-[160px] rounded-[10px_10px_0_0] object-contain' />
                        </div>
                    </div>
                    {/* right sides */}
                    <div className='lg:w-[53%] w-full h-max lg:mb-0'>
                        {/* contents */}
                        <span className='font-bold mb-[7px] block'>Description:</span>
                        <p className='text-xl leading-9'>{data[0].body[0].children[0].text}</p>
                        {/* prices */}
                        <span className='text-green-500 text-2xl mt-[2rem] block font-semibold'>₹{prices}</span>
                        {/* description */}
                        <ul className='flex flex-col gap-[6px] mt-[2rem] list-disc'>
                            {
                                variant.map((ele) => {
                                    return (
                                        <li key={ele._key}>{ele.children[0].text}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {

    const pageSlug = context.query.slug;

    if (!pageSlug) {
        return {
            notFound: true,
        };
    }

    const client = createClient({
        projectId: 'ui7tabvz',
        dataset: 'production',
        useCdn: false
    })

    const query = `*[_type == "post" && slug.current == "${pageSlug}"]`;
    const posts = await client.fetch(query);

    if (!posts) {
        return {
            notFound: true,
        };
    } else {
        return {
            props: {
                posts
            }
        }
    }

}

export default BlogDetailPage