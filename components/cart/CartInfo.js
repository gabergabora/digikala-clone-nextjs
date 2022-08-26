import { useSelector } from "react-redux";

import { formatNumber } from "utils/formatNumber";

import Image from "next/image";

export default function CartInfo({ handleRoute, cart }) {
  //? Store
  const { totalItems, totalPrice, totalDiscount } = useSelector(
    (state) => state.cart
  );
  return (
    <div className='px-4 py-2 mt-10 space-y-5 lg:mt-0 lg:h-fit lg:py-4 '>
      {/* total cart price */}
      <div className='flex justify-between pb-2 border-b border-gray-200'>
        <span className='text-sm font-thin farsi-digits'>
          قیمت کالاها ({formatNumber(totalItems)})
        </span>
        <div className='flex items-center'>
          <span className='text-sm farsi-digits'>
            {formatNumber(totalPrice)}
          </span>
          <div className='relative mr-1 w-7 h-7'>
            <Image src='/icons/toman.svg' layout='fill'  alt="تومان" />
          </div>
        </div>
      </div>

      {/* total cart items */}
      <div className='flex justify-between'>
        <span className='text-sm font-thin'>جمع سبد خرید</span>
        <div className='flex items-center'>
          <span className='text-sm farsi-digits'>
            {formatNumber(totalPrice - totalDiscount)}
          </span>
          <div className='relative mr-1 w-7 h-7'>
            <Image src='/icons/toman.svg' layout='fill'  alt="تومان"/>
          </div>
        </div>
      </div>

      <span className='inline-block w-full pb-2 border-b border-gray-200 lg:max-w-xs'>
        هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه می‌شود
      </span>

      {/* total cart profit */}
      <div className='flex justify-between'>
        <span className='text-sm font-thin text-red-500'>سود شما از خرید</span>
        <div className='flex items-center gap-x-1'>
          <span className='text-sm text-red-500 farsi-digits'>
            (% {((totalDiscount / totalPrice) * 100).toFixed(1)})
          </span>
          <span className='text-sm text-red-500 farsi-digits'>
            {formatNumber(totalDiscount)}
          </span>
          <div className='relative mr-1 w-7 h-7'>
            <Image src='/icons/tomanRed.svg' layout='fill'  alt="تومان"/>
          </div>
        </div>
      </div>

      {cart && (
        <button onClick={handleRoute} className='hidden w-full lg:block btn'>
          ادامه
        </button>
      )}
    </div>
  );
}
