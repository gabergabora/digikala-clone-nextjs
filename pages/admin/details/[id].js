import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import {
  addOptionsType,
  loadDetails,
  resetDetails,
} from "app/slices/details.slice";
import { openModal } from "app/slices/modal.slice";
import { showAlert } from "app/slices/alert.slice";
import {
  useCreateDetailsMutation,
  useDeleteDetailsMutation,
  useGetDetailsQuery,
  useUpdateDetailsMutation,
} from "app/api/detailsApi";

import {
  Button,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  DetailsList,
  HandleDelete,
  HandleUpdate,
  Loading,
  PageContainer,
  ShowWrapper,
} from "components";

import useCategory from "hooks/useCategory";

export default function DetailsPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  //? Get Categories Data
  const { categories } = useCategory();

  //? Store
  const { isConfirmDelete, isConfirmUpdate } = useSelector(
    (state) => state.modal
  );
  const {
    category,
    info,
    specification,
    details_id,
    optionsType,
  } = useSelector((state) => state.details);

  //? Get Details Data
  const {
    data: details,
    isFetching: detailsIsFetching,
    isSuccess: detailsIsSuccess,
  } = useGetDetailsQuery({
    id: router.query.id,
  });

  //? Load Details Store
  const getCtegory = categories.find((item) => item._id === router.query.id);
  useEffect(() => {
    dispatch(
      loadDetails({
        category: getCtegory,
        details_id: details?.details?._id,
        info: details?.details?.info,
        specification: details?.details?.specification,
        optionsType: details?.details?.optionsType,
      })
    );
  }, [getCtegory, detailsIsSuccess]);

  //? Delete Details
  const [
    deleteDetails,
    {
      isSuccess: isSuccess_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
      isLoading: isLoading_delete,
    },
  ] = useDeleteDetailsMutation();

  //? Handle Delete Response
  useEffect(() => {
    if (isSuccess_delete) dispatch(resetDetails());
  }, [isSuccess_delete]);

  //? Update Details
  const [
    updateDetails,
    {
      data: data_update,
      isSuccess: isSuccess_update,
      isError: isError_update,
      error: error_update,
      isLoading: isLoading_update,
    },
  ] = useUpdateDetailsMutation();

  //? Create Details
  const [
    createDetails,
    { data, isSuccess, isError, isLoading, error },
  ] = useCreateDetailsMutation();

  //? Handle Create Details Response
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
      router.push("/admin/details");
    }
    if (isError)
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
  }, [isSuccess, isLoading]);

  //? Handlers
  const submitHandler = async (e) => {
    e.preventDefault();
    if (info.length !== 0 && specification.length !== 0) {
      await createDetails({
        body: {
          category_id: category._id,
          name: category.slug,
          info,
          specification,
          optionsType,
        },
      });
    } else {
      dispatch(
        showAlert({
          status: "error",
          title: "لطفا مشخصات و ویژگی ها را وارد کنید",
        })
      );
    }
  };

  const deleteHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        id: details_id,
        type: "confirm-delete-details",
        title: "مشخصات و ویژگی ها",
      })
    );
  };

  const updateHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        id: details_id,
        type: "confirm-update-details",
        title: "مشخصات و ویژگی های",
        editedData: {
          category_id: category._id,
          info,
          specification,
          optionsType,
        },
      })
    );
  };

  const handleOptionTypeChange = (e) => {
    dispatch(addOptionsType(e.target.value));
  };

  //? Render
  return (
    <>
      {isConfirmUpdate && (
        <HandleUpdate
          updateFunc={updateDetails}
          isSuccess={isSuccess_update}
          isError={isError_update}
          error={error_update}
          data={data_update}
        />
      )}

      {isConfirmDelete && (
        <HandleDelete
          deleteFunc={deleteDetails}
          isSuccess={isSuccess_delete}
          isError={isError_delete}
          error={error_delete}
          data={data_delete}
        />
      )}

      <ConfirmDeleteModal
        isLoading={isLoading_delete}
        isSuccess={isSuccess_delete}
      />

      <ConfirmUpdateModal
        isLoading={isLoading_update}
        isSuccess={isSuccess_update}
      />

      <main>
        <Head>
          <title>مدیریت | مشخصات</title>
        </Head>

        <PageContainer
          title={` مشخصات و ویژگی‌های دسته‌بندی ${category?.name}`}
        >
          <ShowWrapper
            error={null}
            isError={null}
            refetch={null}
            isFetching={detailsIsFetching}
            isSuccess={detailsIsSuccess}
            dataLength={details ? 1 : 0}
            emptyElement={null}
          >
            <form className='p-3 space-y-6' onSubmit={submitHandler}>
              <div className='space-y-3'>
                <p className='mb-2'>نوع انتخاب :</p>
                <div className='flex items-center gap-x-1'>
                  <input
                    type='radio'
                    checked={optionsType === "none"}
                    name='optionsType'
                    id='none'
                    value='none'
                    onChange={handleOptionTypeChange}
                    className='ml-1'
                  />
                  <label htmlFor='none'>بدون حق انتخاب</label>
                </div>
                <div className='flex items-center gap-x-1'>
                  <input
                    type='radio'
                    checked={optionsType === "colors"}
                    name='optionsType'
                    id='colors'
                    value='colors'
                    onChange={handleOptionTypeChange}
                    className='ml-1'
                  />
                  <label htmlFor='colors'>بر اساس رنگ</label>
                </div>
                <div className='flex items-center gap-x-1'>
                  <input
                    type='radio'
                    checked={optionsType === "sizes"}
                    name='optionsType'
                    id='sizes'
                    value='sizes'
                    onChange={handleOptionTypeChange}
                    className='ml-1'
                  />
                  <label htmlFor='sizes'>بر اساس سایز</label>
                </div>
              </div>
              <DetailsList category={category} type='info' data={info} />
              <DetailsList
                category={category}
                type='specification'
                data={specification}
              />
              <div className='flex justify-center gap-x-4'>
                {details_id  ? (
                  <>
                    <Button
                      className='bg-amber-500 rounded-3xl'
                      onClick={updateHandler}
                      isLoading={isLoading_update}
                    >
                      بروزرسانی اطلاعات
                    </Button>
                    <Button
                      className='rounded-3xl'
                      isLoading={isLoading_delete}
                      onClick={deleteHandler}
                    >
                      حذف اطلاعات
                    </Button>
                  </>
                ) : (
                  <Button
                    className=' bg-green-500'
                    rounded
                    type='submit'
                    isLoading={isLoading}
                  >
                    ثبت اطلاعات
                  </Button>
                )}
              </div>
            </form>
          </ShowWrapper>
        </PageContainer>
      </main>
    </>
  );
}

DetailsPage.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
