import useToggle from "hooks/useToggle";

import { Icons } from "components";

export default function Specification({ specification }) {
  const { status: isShowSpec, toggleStatus: toggleShowSpec } = useToggle();

  let renderSpecification = isShowSpec
    ? specification
    : specification.slice(0, 7);

  return (
    <section className='px-4 '>
      <div className='lg:max-w-3xl xl:max-w-5xl lg:flex lg:gap-x-20'>
        <h4 className='mb-3 h-fit w-min lg:border-b-2 lg:border-red-500'>
          مشخصات
        </h4>
        <ul className='space-y-4 lg:mt-10'>
          {renderSpecification.map((item, i) => (
            <li key={i} className='flex'>
              <span className='py-2 ml-3 font-light leading-5 tracking-wide text-gray-500 w-36'>
                {item[0]}
              </span>
              <span
                className='w-full py-2 font-normal leading-5 tracking-wide text-gray-600 break-all border-b border-gray-100 md:break-normal '
                dangerouslySetInnerHTML={{ __html: item[1] }}
              ></span>
            </li>
          ))}
        </ul>
      </div>
      {specification.length > 7 && (
        <button
          type='button'
          className='flex items-center py-2 text-sm text-sky-400'
          onClick={toggleShowSpec}
        >
          {isShowSpec ? "بستن" : "مشاهده بیشتر"}
          <Icons.ArrowLeft className='icon text-sky-400' />
        </button>
      )}
    </section>
  );
}
