import Image from "next/image";

export default function EmptySearchList() {
  return (
    <div className='py-20'>
      <div className='relative mx-auto h-60 w-60'>
        <Image src='/icons/empty-search.svg' layout='fill' alt="جستجو کنید"/>
      </div>
      <div className='max-w-md p-2 mx-auto space-y-2 border rounded-md'>
        <div className='flex items-center gap-x-2'>
          <div className='relative w-8 h-8'>
            <Image src='/icons/exclamation.svg' layout='fill' alt="بدون نتیجه"/>
          </div>
          <h5>نتیجه‌ای یافت نشد!</h5>
        </div>
        <p className='text-gray-500'>
          از عبارت‌های متداول‌تر استفاده کنید و یا املای عبارت وارد‌شده را بررسی
          کنید.
        </p>
      </div>
    </div>
  );
}
