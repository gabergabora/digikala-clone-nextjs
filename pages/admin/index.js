import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import { DashboardAside } from "components";

export default function AdminPage() {
  const router = useRouter();

  //? Store
  const { user, token } = useSelector((state) => state.user);

  if (!token || user?.role === "user") router.push("/admin/login");

  if (user?.role === "admin" || user?.root)
    return (
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-8xl '>
        <Head>
          <title>دیجی‌کالا | مدیریت</title>
        </Head>

        <div>
          <DashboardAside user={user} />
        </div>
        <div className='hidden py-6 lg:inline-block lg:flex-1 lg:border lg:border-gray-300 lg:rounded-md lg:mt-6 h-fit'>
          <section className='py-20'>
            <div className='relative mx-auto mb-8 h-52 w-52'>
              <Image src='/icons/chart.png' layout='fill' alt="نمودار"/>
            </div>

            <p className='text-center'>آنالیز وضعیت</p>
            <span className='block my-3 text-base text-center text-amber-500'>
              (بزودی)
            </span>
          </section>
        </div>
      </div>
    );
}
