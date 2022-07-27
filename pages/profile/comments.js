import { useState, useEffect } from "react";
import Image from "next/image";

import { useSelector } from "react-redux";
import { useGetDataQuery } from "app/slices/fetchApi.slice";

import { BigLoading, Buttons, ReveiwCard } from "components";

export default function Comments() {
  //? Local State
  const [reviews, setReviews] = useState([]);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Get Query
  const { data, isLoading, isSuccess } = useGetDataQuery({
    url: "/api/reviews",
    token,
  });

  useEffect(() => {
    if (isSuccess) setReviews(data.reviews);
  }, [isSuccess]);

  return (
    <div>
      <Buttons.Back backRoute='/profile'>دیدگاه‌ها</Buttons.Back>
      <div className='section-divide-y' />
      {isLoading ? (
        <div className='px-3 py-20'>
          <BigLoading />
        </div>
      ) : reviews.length === 0 ? (
        <div className='py-20'>
          <div className='relative mx-auto h-52 w-52'>
            <Image src='/icons/order-empty.svg' layout='fill' />
          </div>

          <p className='text-center'>هنوز هیچ نظری ندارید</p>
        </div>
      ) : (
        <div className='py-3 px-4 space-y-3 '>
          {reviews.map((item) => (
            <ReveiwCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
Comments.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
