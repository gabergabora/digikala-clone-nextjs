import { useGetDataQuery } from "app/slices/fetchApiSlice";
import { openModal } from "app/slices/modalSlice";
import { BigLoading, Buttons } from "components";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Get Data Query
  const { data, isLoading, isSuccess } = useGetDataQuery({
    url: "/api/products",
  });

  //? Handlers
  const handleDelete = (id) => {
    dispatch(
      openModal({
        isShow: true,
        id,
        type: "confirm-delete-product",
        title: "محصول",
      })
    );
  };

  const handleEdit = (id) => {
    router.push(`/admin/product/${id}`);
  };

  return (
    <>
      <Buttons.Back backRoute='/admin'>محصولات</Buttons.Back>
      <div className='section-divide-y' />
      {isLoading && (
        <div className='px-3 py-20'>
          <BigLoading />
        </div>
      )}
      <div className='px-3'>
        {isSuccess && (
          <div className='overflow-x mt-7'>
            <table className='w-full overflow-scroll table-auto'>
              <thead className='bg-zinc-50 h-9'>
                <tr className='text-zinc-500'>
                  <th></th>
                  <th className='border-r-2 border-zinc-200'>نام محصول</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((item) => (
                  <tr key={item._id} className='border-b-2 border-gray-100'>
                    <td className='flex items-center p-2 gap-x-2'>
                      <Buttons.Delete onClick={() => handleDelete(item._id)} />
                      <Buttons.Edit onClick={() => handleEdit(item._id)} />
                    </td>
                    <td className='p-2'>{item.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

Products.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
