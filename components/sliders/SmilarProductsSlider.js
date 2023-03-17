import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'

// import required modules
import { Navigation, FreeMode } from 'swiper'
import { ProductCard } from 'components'

export default function SmilarProductsSlider({ smilarProducts }) {
  return (
    <section className='px-3 py-4 overflow-hidden lg:border lg:border-gray-100 lg:rounded-md'>
      <h4 className='mb-3 lg:border-b-2 lg:border-red-500'>
        {smilarProducts.title}
      </h4>
      <Swiper
        navigation={true}
        modules={[Navigation, FreeMode]}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{ 640: { width: 640, slidesPerView: 2 } }}
        freeMode={true}
      >
        {smilarProducts.products.map((item) => (
          <SwiperSlide key={item._id} className='sm:border-l'>
            <ProductCard product={item} slide />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
