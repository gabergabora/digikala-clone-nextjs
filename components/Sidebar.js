import { useEffect } from 'react'
import Link from 'next/link'

import { Disclosure } from '@headlessui/react'
import { Icons, LogoPersian, SidebarSkeleton } from 'components'

import useDisclosure from 'hooks/useDisclosure'
import useCategory from 'hooks/useCategory'

export default function Sidebar() {
  //? Assets
  const [isSidebar, sidebarHandlers] = useDisclosure()
  const { categories, isLoading } = useCategory()

  //? Create Category List
  const categoryList = categories
    .filter((category) => category.level === 1)
    .map((levelOne) => {
      let children = categories.filter(
        (category) => category.parent === levelOne._id
      )
      if (children.length > 0)
        return {
          ...levelOne,
          children,
        }
      else return levelOne
    })
    .map((levelOne) => {
      if (levelOne.children) {
        let newLevelTwo = levelOne.children.map((levelTwo) => {
          let children = categories.filter(
            (category) => category.parent === levelTwo._id
          )

          if (children.length > 0) return { ...levelTwo, children }
          else return levelTwo
        })
        return { ...levelOne, children: newLevelTwo }
      } else return levelOne
    })

  //? Handlers
  const handleClose = () => sidebarHandlers.close()

  //? Re-Renders
  //*    prevent scroll
  useEffect(() => {
    if (isSidebar) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isSidebar])

  //? Render
  return (
    <>
      <button
        className='p-1 lg:hidden'
        type='button'
        onClick={sidebarHandlers.open}
      >
        <Icons.Bars className='icon' />
      </button>
      <div className={`sidebar ${isSidebar ? 'right-0' : '-right-full'} `}>
        <div
          className={`${
            isSidebar
              ? 'opacity-100 visible duration-300 delay-200'
              : 'opacity-0 invisible '
          }  bg-gray-100/50  z-10 w-full h-full`}
          onClick={sidebarHandlers.close}
        />

        <div className='overflow-y-auto sidebar__content'>
          <LogoPersian className='h-10 mr-3 w-28' />
          <h5 className='sidebar__title'>دسته‌بندی کالاها</h5>
          {isLoading ? (
            <SidebarSkeleton />
          ) : categories ? (
            <div>
              {categoryList.map((category) => (
                <Disclosure key={category._id}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='sidebar__category'>
                        <span
                          className={`pl-3 font-semibold tracking-wide ${
                            open ? 'text-red-400' : 'text-gray-600'
                          }`}
                        >
                          {category.name}
                        </span>

                        <Icons.ArrowDown
                          className={` ${
                            open
                              ? 'rotate-180 transform text-red-400 '
                              : 'text-gray-700'
                          } w-7 h-7 bg-gray-50 rounded-2xl`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className=' text-sm bg-gray-100 text-gray-500 !mt-0'>
                        <Link href={`/main/${category.slug}`}>
                          <a
                            className='py-2 text-gray-500 arrow-link pr-7'
                            onClick={handleClose}
                          >
                            تمام موارد این دسته
                            <Icons.ArrowLeft className='text-gray-500 icon' />
                          </a>
                        </Link>
                        {category?.children &&
                          category.children.map((category) => (
                            <Disclosure key={category._id}>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className='sidebar__category pr-7'>
                                    <span
                                      className={`font-medium text-md ${
                                        open ? 'text-red-400' : 'text-gray-600'
                                      }`}
                                    >
                                      {category.name}
                                    </span>
                                    <Icons.ArrowDown
                                      className={` ${
                                        open
                                          ? 'rotate-180 transform text-red-400 '
                                          : 'text-gray-700'
                                      } w-7 h-7 bg-gray-50 rounded-2xl`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel
                                    className={`px-4 pt-2 pb-1 text-sm text-gray-500 !mt-0 
                                     ${open ? 'border-b border-gray-50' : ''}
                                    `}
                                  >
                                    <Link
                                      href={`/products?category=${category.slug}`}
                                    >
                                      <a
                                        className='py-2 text-gray-500 arrow-link pr-9'
                                        onClick={handleClose}
                                      >
                                        تمام موارد این دسته
                                        <Icons.ArrowLeft className='text-gray-500 icon' />
                                      </a>
                                    </Link>
                                    {category.children &&
                                      category.children.map((category) => (
                                        <Link
                                          key={category._id}
                                          href={`/products?category=${category.slug}`}
                                        >
                                          <a
                                            className='pr-9 py-2.5 my-2 font-normal tracking-wide block'
                                            onClick={handleClose}
                                          >
                                            {category.name}
                                          </a>
                                        </Link>
                                      ))}
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
