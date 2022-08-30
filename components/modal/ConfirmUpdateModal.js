import {
  closeModal,
  confirmUpdateAction,
  confirmReset,
} from "app/slices/modal.slice";

import { ModalWrapper } from "components";

export default function ConfirmUpdateModal({ title, dispatch, isShow }) {

  //? Handlers
  const handleConfirmClick = () => {
    dispatch(confirmUpdateAction());
    dispatch(closeModal());
  };

  const handleCancleClick = () => {
    dispatch(confirmReset());
    dispatch(closeModal());
  };

  return (
    <ModalWrapper isShow={isShow}>
      <div
        className={`
  ${
    isShow ? "top-40 transform scale-100" : "top-40 transform scale-50 "
  } max-w-3xl 
   fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className='px-3 py-6 space-y-4 text-center bg-white md:rounded-lg'>
          <p>
            آیا موافق بروزرسانی{" "}
            <span className='font-bold text-green-500'>{title}</span> تغییر داده
            شده هستید؟
          </p>
          <div className='flex justify-center gap-x-20'>
            <button
              type='button'
              className='bg-green-500 rounded-lg btn'
              onClick={handleConfirmClick}
            >
              بروزرسانی و ادامه
            </button>
            <button
              type='button'
              className='rounded-lg btn'
              onClick={handleCancleClick}
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
