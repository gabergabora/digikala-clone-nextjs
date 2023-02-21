import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "app/api/productApi";

import {
  BigLoading,
  ConfirmDeleteModal,
  DeleteIconBtn,
  EditIconBtn,
  Icons,
  PageContainer,
  Pagination,
  SelectCategories,
} from "components";
import useDisclosure from "hooks/useDisclosure";

export default function Products() {
  //? Assets
  const [
    isShowConfirmDeleteModal,
    confirmDeleteModalHandlers,
  ] = useDisclosure();
  const router = useRouter();

  //? Refs
  const inputSearchRef = useRef();

  //?  State
  const [deleteInfo, setDeleteInfo] = useState({
    id: "",
    isConfirmDelete: false,
  });
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("all");
  const [search, setSearch] = useState("");
  // const [selectedCategories, setSelectedCategories] = useState({});

  //? Get Products Data
  const { data, isFetching, error, isError, refetch } = useGetProductsQuery({
    page,
    filterCategory,
    search,
  });

  //? Delete Product
  const [
    deleteProduct,
    {
      isSuccess: isSuccess_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
      isLoading: isLoading_delete,
    },
  ] = useDeleteProductMutation();

  //? Filter Category
  // useEffect(() => {
  //   setPage(1);
  //   if (selectedCategories?.lvlOneCategory?._id)
  //     setFilterCategory(selectedCategories?.lvlOneCategory.category);

  //   if (selectedCategories?.lvlTwoCategory?._id)
  //     setFilterCategory(selectedCategories?.lvlTwoCategory.category);

  //   if (selectedCategories?.lvlTwoCategory?._id)
  //     setFilterCategory(selectedCategories?.lvlThreeCategory.category);
  // }, [selectedCategories, search]);

  //? Handlers
  const handleDelete = (id) => {
    setDeleteInfo({ ...deleteInfo, id });
    confirmDeleteModalHandlers.open();
  };

  const handleEdit = (id) => {
    router.push(`/admin/product/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputSearchRef.current.value);
  };

  const handleRemoveSearch = () => {
    inputSearchRef.current.value = "";
    setSearch("");
  };

  //? Render
  return (
    <>
      <ConfirmDeleteModal
        title='محصول'
        deleteFunc={deleteProduct}
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

      <main>
        <Head>
          <title>مدیریت | محصولات</title>
        </Head>
        <PageContainer title='محصولات'>
          {isError ? (
            <div className='py-20 mx-auto space-y-3 text-center w-fit'>
              <h5 className='text-xl'>خطایی رخ داده</h5>
              <p className='text-lg text-red-500'>{error.data.err}</p>
              <button className='mx-auto btn' onClick={refetch}>
                تلاش مجدد
              </button>
            </div>
          ) : isFetching ? (
            <section className='px-3 py-20'>
              <BigLoading />
            </section>
          ) : (
            <section className='p-3 space-y-7' id='adminProducts'>
              <form
                className='max-w-4xl mx-auto space-y-5'
                onSubmit={handleSubmit}
              >
                {/* <SelectCategories
                  setSelectedCategories={setSelectedCategories}
                  show={["lvlOne", "lvlTwo", "lvlThree"]}
                /> */}

                <div className='flex flex-row-reverse rounded-md bg-zinc-200/80 '>
                  <button
                    type='button'
                    className='p-2'
                    onClick={handleRemoveSearch}
                  >
                    <Icons.Close className='icon' />
                  </button>
                  <input
                    type='text'
                    placeholder='جستجو'
                    className='flex-grow p-1 text-right bg-transparent outline-none input'
                    ref={inputSearchRef}
                    defaultValue={search}
                  />
                  <button type='submit' className='p-2'>
                    <Icons.Search className='icon' />
                  </button>
                </div>
              </form>

              {data?.productsLength > 0 ? (
                <>
                  <section className='overflow-x mt-7'>
                    <table className='w-full overflow-scroll table-auto'>
                      <thead className='bg-zinc-50 h-9'>
                        <tr className='text-zinc-500'>
                          <th className='w-28'></th>
                          <th className='border-r-2 border-zinc-200'>
                            نام محصول (تعداد: {data.productsLength})
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.products.map((item) => (
                          <tr
                            key={item._id}
                            className='border-b-2 border-gray-100'
                          >
                            <td className='flex items-center justify-center p-2 gap-x-4'>
                              <DeleteIconBtn
                                onClick={() => handleDelete(item._id)}
                              />
                              <EditIconBtn
                                onClick={() => handleEdit(item._id)}
                              />
                            </td>
                            <td className='p-2'>{item.title}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                  {data?.productsLength > 10 && (
                    <Pagination
                      currentPage={data.currentPage}
                      nextPage={data.nextPage}
                      previousPage={data.previousPage}
                      hasNextPage={data.hasNextPage}
                      hasPreviousPage={data.hasPreviousPage}
                      lastPage={data.lastPage}
                      setPage={setPage}
                      section='adminProducts'
                    />
                  )}
                </>
              ) : (
                <div className='text-center text-red-500 lg:border lg:border-gray-200 lg:rounded-md lg:py-4'>
                  کالایی یافت نشد
                </div>
              )}
            </section>
          )}
        </PageContainer>
      </main>
    </>
  );
}

Products.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
