import React from 'react'
import Logo from '@assets/piggybank.svg'
import Container from '@components/Layout/Container'
import WalletStatus from '@components/Wallet/WalletStatus'
import { Transition } from '@headlessui/react'
import useTransitionControl from '@hooks/useTransitionControl'
import { useAccount } from 'wagmi'
import Image from 'next/image'


function Navbar() {
  const { isConnecting, isReconnecting } = useAccount()
  const [show] = useTransitionControl(isConnecting || isReconnecting)

  return (
    <>
      <header className="flex items-center h-[88px]">
        <Container className="flex justify-between items-center w-full py-5">
          <div className='flex gap-4'>
            <Logo style={{transform: "scale(5)"}}/>
            <h1 className="text-xl font-bold">PiggyBank</h1>
          </div>
          <Transition
            show={show}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Nav */}
            <nav>
              <ul className="flex items-center gap-4 justify-center">
                <li className="hover:underline">
                  <a href="">Statistics</a>
                </li>
                <li className="hover:underline">
                  <a href="">Deposits</a>
                </li>
                <li className="ml-2">
                  <WalletStatus />
                </li>
              </ul>
            </nav>
          </Transition>
        </Container>
      </header>
    </>
  )
}

export default Navbar
