import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'

import { useSelector } from 'react-redux'

import { truncate } from 'utils/truncate'

import { EmptyCart, PageContainer } from 'components'

export default function UserHistory() {
  //? Store
  const { lastSeen } = useSelector((state) => state.user)

  //? selector
  return (
    <main>
      <Head>
        <title>پروفایل | بازدید‌های اخیر</title>
      </Head>
      <PageContainer title='بازدید‌های اخیر'>
        {lastSeen.length > 0 ? (
          <div className='px-3 space-y-4 md:py-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-2 lg:grid-cols-3 md:gap-y-3'>
            {lastSeen.map((item) => (
              <article
                className='border-b md:hover:shadow-3xl md:h-64 md:border-0 '
                key={item.productID}
              >
                <Link href={`/products/${item.productID}`}>
                  <a className='flex items-center gap-4 py-4 md:items-start md:flex-col'>
                    <div className='relative w-32 h-36 md:mx-auto'>
                      <Image
                        src={item.image.url}
                        layout='fill'
                        alt={item.title}
                        placeholder='blur'
                        blurDataURL='/placeholder.png'
                      />
                    </div>
                    <h5 className='flex-1 px-3 text-right text-gray-800 leadiri-6 md:h-32'>
                      {truncate(item.title, 80)}
                    </h5>
                  </a>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <section className='py-20'>
            <EmptyCart className='mx-auto h-52 w-52' />
            <p className='text-center'>لیست بازدید‌های اخیر شما خالی است.</p>
          </section>
        )}
      </PageContainer>
    </main>
  )
}

UserHistory.getProfileLayout = function pageLayout(page) {
  return <>{page}</>
}
