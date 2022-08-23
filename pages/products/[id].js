import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import db from "lib/db";
import Product from "models/Product";

import { useDispatch } from "react-redux";
import { addToLastSeen } from "app/slices/user.slice";

import { formatNumber } from "utils/formatNumber";

import {
  AddToCart,
  FreeShipping,
  Icons,
  Services,
  Depot,
  SmilarProductsSlider,
  ImageGallery,
  Description,
  Specification,
  Reviews,
} from "components";

export default function SingleProduct({ product, smilarProducts }) {
  const dispatch = useDispatch();

  //? Local State
  const [color, setColor] = useState(product.colors[0] || null);
  const [size, setSize] = useState(product.sizes[0] || null);

  //? Add To LastSeen
  useEffect(() => {
    dispatch(
      addToLastSeen({
        productID: product._id,
        image: product.images[0],
        title: product.title,
      })
    );
  }, [product._id]);

  //? Handlers
  const handleChangeColor = (item) => {
    setColor(item);
  };

  const handleChangeSize = (item) => {
    setSize(item);
  };

  //? Local Components
  const Colors = () => {
    return (
      <section className='lg:col-start-4 lg:col-end-8 lg:row-start-2 lg:row-end-4'>
        <div className='flex justify-between p-4'>
          <span className='text-sm text-gray-700'>رنگ: {color.name}</span>
          <span className='text-sm farsi-digits'>
            {product.colors.length} رنگ
          </span>
        </div>
        <div className='flex flex-wrap gap-3 px-5 my-3'>
          {product.colors.map((item) => (
            <button
              type='button'
              key={item.id}
              onClick={() => handleChangeColor(item)}
              className={` rounded-2xl py-1 px-1.5 flex items-center cursor-pointer  ${
                color.id === item.id
                  ? "border-2 border-sky-500"
                  : " border-2 border-gray-300"
              }`}
            >
              <span
                className='inline-block w-5 h-5 ml-3 shadow rounded-xl'
                style={{ background: item.hashCode }}
              >
                {color.id === item.id && (
                  <Icons.Check
                    className={`h-5 w-5 ${
                      item.hashCode === "#ffffff"
                        ? "text-gray-600"
                        : item.hashCode === "#000000"
                        ? "text-gray-200"
                        : "text-white"
                    } `}
                  />
                )}
              </span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        <div className='section-divide-y' />
      </section>
    );
  };

  const Sizes = () => {
    return (
      <section className='lg:col-start-4 lg:col-end-8 lg:row-start-2 lg:row-end-4'>
        <div className='flex justify-between p-4'>
          <span className='text-sm text-gray-700'>اندازه: {size.name}</span>
          <span className='text-sm'>
            {formatNumber(product.sizes.length)} اندازه
          </span>
        </div>
        <div className='flex flex-wrap gap-3 px-5 my-3'>
          {product.sizes.map((item) => (
            <button
              type='button'
              key={item.id}
              onClick={() => handleChangeSize(item)}
              className={`rounded-full py-1.5 px-2 flex items-center cursor-pointer  ${
                size.id === item.id
                  ? "border-2 border-sky-500"
                  : " border-2 border-gray-300"
              }`}
            >
              <span>{item.size}</span>
            </button>
          ))}
        </div>
        <div className='section-divide-y' />
      </section>
    );
  };

  const OutOfStock = () => {
    return (
      <section className='lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-3 lg:py-2 lg:bg-gray-100 mx-3 p-1.5 rounded bg-gray-50/50 my-5 lg:my-0 lg:rounded-lg'>
        <div className='flex items-center justify-between gap-x-2'>
          <div className='h-[3px] bg-gray-300 flex-1' />
          <h4 className='text-base font-bold text-gray-500'>ناموجود</h4>
          <div className='h-[3px] bg-gray-300 flex-1' />
        </div>
        <p className='px-3 text-sm text-gray-700'>
          این کالا فعلا موجود نیست اما می‌توانید زنگوله را بزنید تا به محض موجود
          شدن، به شما خبر دهیم
        </p>
      </section>
    );
  };

  const ProductInfo = ({ image }) => {
    return (
      <div
        className={`divide-y lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-5 lg:rounded-lg lg:bg-gray-100 lg:flex lg:flex-col   xl:row-end-5 lg:px-3 lg:py-1.5 lg:border lg:border-gray-200 lg:shadow lg:sticky ${
          image ? "lg:top-4 xl:top-32" : "lg:top-60 xl:top-[260px]"
        } `}
      >
        <div className='items-center justify-between hidden space-y-2 lg:py-3 lg:flex'>
          <span className='text-base text-black'>فروشنده :</span>
          <div className='flex gap-x-2'>
            <div className='relative w-6 h-6'>
              <Image src='/icons/mini-logo.png' layout='fill' />
            </div>
            <span>دیجی‌کالا</span>
          </div>
        </div>
        {image && (
          <div className='flex py-3 gap-x-4 '>
            <div className='relative w-28 h-28'>
              <Image src={product.images[0].url} layout='fill' />
            </div>
            <span className='flex-1 text-justify'>{product.title}</span>
          </div>
        )}

        <div className='hidden py-3 lg:items-center lg:gap-x-2 lg:flex'>
          <Icons.ShieldCheck className='icon' />
          <span className='font-light'>گارانتی اصالت و ضمانت تحویل</span>
        </div>

        <div className='hidden lg:block lg:py-3 '>
          <Depot inStock={product.inStock} />
        </div>

        <div className='hidden lg:flex lg:items-center lg:gap-x-1 lg:py-3'>
          <Icons.Check className='icon' />
          <span> فروش :</span>
          <span className='farsi-digits'>{formatNumber(product.sold)}</span>
        </div>

        <AddToCart product={product} color={color} size={size} />
      </div>
    );
  };

  return (
    <main className='xl:mt-28 lg:max-w-[1550px] mx-auto py-4 space-y-4'>
      <Head>
        <title>{`خرید ${product.title}`}</title>
        <meta
          name='description'
          content='هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!'
        />
      </Head>
      <div className='h-fit lg:h-[650px] lg:grid lg:grid-cols-9 lg:grid-rows-5 lg:px-4 lg:gap-x-2 lg:gap-y-4 lg:mb-28 xl:gap-x-7'>
        {/* image */}
        <section className='mb-5 lg:col-span-3 lg:row-span-6'>
          <ImageGallery
            images={product.images}
            discount={product.discount}
            inStock={product.inStock}
          />
        </section>

        {/* title */}
        <h2 className='p-3 text-base font-semibold leading-8 tracking-wide text-black/80 lg:col-span-6'>
          {product.title}
        </h2>

        <div className='section-divide-y' />

        {product.colors.length > 0 && <Colors />}

        {product.sizes.length > 0 && <Sizes />}

        {product.inStock === 0 && <OutOfStock />}

        {/* info */}
        <section className='px-4 pb-2 lg:col-start-4 lg:col-end-8 lg:row-start-3 lg:row-end-4'>
          <h4 className='my-3 lg:mt-6'>ویژگی‌ها</h4>
          <ul className='mr-6 space-y-2 list-disc'>
            {product.info.map((item, i) => (
              <li key={i} className='tracking-wide text-gray-500'>
                <span className='ml-2 font-light'>{item[0]} :</span>
                <span className='text-gray-900'>{item[1]}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* free shipping */}
        <section className='lg:col-start-4 lg:col-end-8 lg:row-start-5 lg:row-end-6 lg:bg-white'>
          <FreeShipping />
        </section>

        {/* Add To Cart */}
        {product.inStock > 0 && <ProductInfo />}
      </div>

      <Services />

      {/* description */}
      {product.description.length > 0 && (
        <Description description={product.description} />
      )}

      {/* SmilarProductsSlider */}
      <SmilarProductsSlider products={smilarProducts} />

      <div className='section-divide-y' />

      <div className='flex'>
        <div className='flex-1'>
          {/* specification */}
          <Specification specification={product.specification} />

          <div className='section-divide-y' />

          {/* Reviews */}
          <Reviews
            numReviews={product.numReviews}
            prdouctID={product._id}
            productTitle={product.title}
          />
        </div>
        <div className='hidden w-full px-3 lg:block lg:max-w-xs xl:max-w-sm'>
          {product.inStock > 0 && <ProductInfo image />}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ params: { id } }) {
  await db.connect();
  const product = await Product.findById({ _id: id }).lean();

  const smilarProducts = await Product.find({
    category: {
      $regex: product.category,
      $options: "i",
    },
    inStock: { $gte: 1 },
  })
    .limit(10)
    .lean();
  await db.disconnect();

  return {
    props: {
      product: db.convertDocToObj(product),
      smilarProducts: smilarProducts.map(db.convertDocToObj),
    },
  };
}

SingleProduct.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
