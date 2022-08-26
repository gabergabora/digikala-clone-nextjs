import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { DiscountProduct, ProductPrice } from "components";

export default function DiscountSlider({ products, colors, categoryImage }) {
  return (
    <section
      className='lg:rounded-xl lg:mx-3 py-2.5 flex lg:px-1'
      style={{
        background: `linear-gradient(${colors && `${colors[0]},${colors[1]}`})`,
      }}
    >
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={2}
        breakpoints={{
          490: { width: 490, slidesPerView: 3 },
        }}
      >
        <SwiperSlide className='py-10 '>
          <div className='relative w-20 h-20 mx-auto'>
            <Image
              src='/icons/amazing-typo.svg'
              layout='fill'
              alt='پیشنهاد شگفت انگیز'
            />
          </div>
          <div className='relative w-20 h-20 mx-auto'>
            <Image
              src={categoryImage?.url || "/icons/general.png"}
              layout='fill'
              alt='icon'
            />
          </div>
        </SwiperSlide>
        {products.map((product, index) => (
          <SwiperSlide
            key={product._id}
            className={`w-fit  bg-white mx-0.5 py-6 ${
              index === 0 ? "rounded-r-lg" : index === 9 ? "rounded-l-lg" : ""
            } `}
          >
            <Link href={`/products/${product._id}`}>
              <a>
                <article>
                  <div className='relative w-32 mx-auto h-36 '>
                    <Image
                      src={product.images[0].url}
                      layout='fill'
                      alt={product.title}
                    />
                  </div>
                  <div className='flex px-2 justify-evenly gap-x-2 '>
                    <div>
                      <DiscountProduct discount={product.discount} />
                    </div>
                    <ProductPrice
                      inStock={product.inStock}
                      discount={product.discount}
                      price={product.price}
                    />
                  </div>
                </article>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
