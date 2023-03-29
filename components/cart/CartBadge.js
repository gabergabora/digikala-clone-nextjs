import Icons from 'components/common/Icons'

import { useSelector } from 'react-redux'

import { formatNumber } from 'utils'

export default function CartBadge() {
  const { totalItems } = useSelector((state) => state.cart)

  return (
    <div className='relative'>
      <span className='absolute outline outline-2 bottom-3.5 left-5 bg-red-500 rounded-md w-5 h-5 p-0.5 text-center text-xs text-white farsi-digits'>
        {formatNumber(totalItems)}
      </span>

      <Icons.Cart className='icon h-7 w-7' />
    </div>
  )
}
