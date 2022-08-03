import React from 'react';
import Container from './Container';
import type { NextPage } from 'next'
import { useAccount, useConnect } from 'wagmi'

import WalletStatus from '@components/WalletStatus'

function UserNav() {
  const { connector: activeConnector, isConnected, address } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
    
  return (
    <>
      <header className="flex items-center">
        <Container className="flex justify-between items-center w-full py-5">
          {/* Logo */}
          <h1>PiggyBank</h1>
        
          {/* Nav */}
        <nav>
          <ul className="flex items-center gap-4 justify-center"> 
            <li className="hover:underline"><a href="">Statistics</a></li>
            <li className="hover:underline"><a href="">Deposits</a></li>
            <li>
              <WalletStatus/>
            </li>
          </ul>
        </nav>
        </Container>
      </header>
    </>
  );
}

export default UserNav;
