import Image from 'next/image'

import { useGetSingleBannerQuery } from 'services'

export default function BannerOne({ id }) {
  //? Get Banners Query
  const { data } = useGetSingleBannerQuery({
    id,
  })

  if (data?.banners && data.banners.length > 0) {
    return (
      <section className='grid gap-3 px-3 lg:relative lg:grid-cols-2 lg:gap-4'>
        {data.banners
          .filter((item) => item.public && item.type === 'one')
          .map((item, index) => (
            <div
              className={`relative h-[40vw] lg:h-72 w-full rounded-2xl overflow-hidden ${
                index === 0
                  ? 'lg:rounded-none lg:rounded-tr-2xl'
                  : index === 1
                  ? 'lg:rounded-none lg:rounded-tl-2xl'
                  : index === 2
                  ? 'lg:rounded-none lg:rounded-br-2xl'
                  : 'lg:rounded-none lg:rounded-bl-2xl'
              }`}
              key={index}
              title={item.title}
            >
              {item.uri.length > 0 ? (
                <a href={item.uri} target='_blank'>
                  <Image
                    src={item.image.url}
                    layout='fill'
                    alt='Banner'
                    placeholder='blur'
                    blurDataURL='/placeholder.png'
                  />
                </a>
              ) : (
                <Image
                  src={item.image.url}
                  layout='fill'
                  alt='Banner'
                  placeholder='blur'
                  blurDataURL='/placeholder.png'
                />
              )}
            </div>
          ))}
        <div className='absolute z-10 hidden w-16 h-16 translate-x-1/2 -translate-y-1/2 bg-white rounded-full inset-1/2 lg:block' />
      </section>
    )
  }

  return null
}
