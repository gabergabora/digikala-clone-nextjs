import Image from "next/image";
import Head from "next/head";

import { Buttons } from "components";

export default function Lists() {
  return (
    <main>
      <Head>
        <title>پروفایل | لیست‌ها</title>
      </Head>
      <Buttons.Back backRoute='/profile'>لیست‌ها</Buttons.Back>
      <div className='section-divide-y' />

      <section className='py-20'>
        <div className='relative mx-auto h-52 w-52'>
          <Image src='/icons/favorites-list-empty.svg' layout='fill' alt='لیست خالی' />
        </div>

        <p className='text-center'>لیست علاقه‌مندی‌های شما خالی است.</p>
        <span className='block my-3 text-base text-center text-amber-500'>
          (بزودی)
        </span>
      </section>
    </main>
  );
}
Lists.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
