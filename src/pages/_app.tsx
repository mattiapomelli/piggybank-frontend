import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CHAIN } from '@constants/chains'
import { ALCHEMY_KEY, ALCHEMY_RPC_URL } from '@constants/urls'
import Layout from '@components/Layout/Layout'

const { chains, provider } = configureChains(
  [CHAIN],
  [alchemyProvider({ alchemyId: ALCHEMY_KEY }), publicProvider()],
)

const connectors = [
  new InjectedConnector({
    chains,
  }),
  new WalletConnectConnector({
    chains,
    options: {
      rpc: { [CHAIN.id]: ALCHEMY_RPC_URL[CHAIN.id] },
    },
  }),
]

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  )
}

export default MyApp
