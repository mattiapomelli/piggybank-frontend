import classNames from 'classnames'

interface AddressProps {
  address: string
  className?: string
}

const Address = ({ address, className }: AddressProps) => {
  return (
    <span className={classNames(className)}>
      {address.substring(0, 6)}...{address?.substring(address.length - 4)}
    </span>
  )
}

export default Address
