import urlFor from '@/libs/urlFor';
import Image from 'next/image'
import { useRouter } from 'next/router';

function PostCard({ data }) {
    const router = useRouter();

    const prices = new Intl.NumberFormat('en-IN').format(data.price);
    // data.slug.current

    return (
        <div onClick={() => router.push(`/${data.slug.current}`)} className='w-full group h-max shadow-md rounded-[10px] cursor-pointer bg-black'>
            <div className='bg-gray-800 w-full h-full rounded-[10px_10px_0_0] overflow-hidden'>
                <Image height={240} width={360} src={data.mainImage && urlFor(data.mainImage).url()} alt={data.title} className='w-[70%] mx-auto h-[240px] rounded-[10px_10px_0_0] object-contain' />
            </div>

            <div className='p-[20px] flex items-center justify-between gap-[10px]'>
                {/* title */}
                <span className='font-bold group-hover:underline'>{data.title}</span>
                {/* prices */}
                <span className='text-green-500 font-semibold'>₹{prices}</span>
                {/* <span className='text-green-500 font-semibold'>₹{data.price}</span> */}
            </div>
        </div>
    )
}

export default PostCard