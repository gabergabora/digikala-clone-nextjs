import Head from "next/head";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useDeleteReviewMutation, useGetReviewsQuery } from "app/api/reviewApi";

import {
  Pagination,
  ReveiwCard,
  ShowWrapper,
  EmptyCommentsList,
  HandleDelete,
  ConfirmDeleteModal,
  PageContainer,
} from "components";

import useDisclosure from "hooks/useDisclosure";

export default function Reviews() {
  //? Assets
  const [
    isShowConfirmDeleteModal,
    confirmDeleteModalHandlers,
  ] = useDisclosure();

  //? State
  const [deleteInfo, setDeleteInfo] = useState({
    id: "",
    isConfirmDelete: false,
  });
  const [page, setPage] = useState(1);

  //? Store
  // const { isConfirmDelete } = useSelector((state) => state.modal);

  //? Delete Review
  const [
    deleteReview,
    {
      isSuccess: isSuccess_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
      isLoading: isLoading_delete,
    },
  ] = useDeleteReviewMutation();

  //? Get Reviews
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetReviewsQuery({
    page,
  });

  //? Handlers
  const deleteReviewHandler = (id) => {
    setDeleteInfo({ ...deleteInfo, id });
    confirmDeleteModalHandlers.open();
  };

  //? Render
  return (
    <>
      <ConfirmDeleteModal
        title='دیدگاه‌'
        deleteFunc={deleteReview}
        isLoading={isLoading_delete}
        isSuccess={isSuccess_delete}
        isError={isError_delete}
        error={error_delete}
        data={data_delete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        deleteInfo={deleteInfo}
        setDeleteInfo={setDeleteInfo}
      />

      <main id='profileReviews'>
        <Head>
          <title>پروفایل | دیدگاه‌ها</title>
        </Head>

        <PageContainer title='دیدگاه‌ها'>
          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data ? data.reviewsLength : 0}
            emptyElement={<EmptyCommentsList />}
          >
            <div className='px-4 py-3 space-y-3 '>
              {data?.reviews.map((item) => (
                <ReveiwCard
                  deleteReviewHandler={deleteReviewHandler}
                  key={item._id}
                  item={item}
                />
              ))}
            </div>
          </ShowWrapper>

          {data?.reviewsLength > 5 && (
            <div className='py-4 mx-auto lg:max-w-5xl'>
              <Pagination
                currentPage={data.currentPage}
                nextPage={data.nextPage}
                previousPage={data.previousPage}
                hasNextPage={data.hasNextPage}
                hasPreviousPage={data.hasPreviousPage}
                lastPage={data.lastPage}
                setPage={setPage}
                section='profileReviews'
                client
              />
            </div>
          )}
        </PageContainer>
      </main>
    </>
  );
}
Reviews.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
