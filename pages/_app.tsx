import React, { useEffect } from 'react'
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import {
  configureChains,
  createConfig,
  mainnet,
  useAccount,
  WagmiConfig,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { identify } from '@web3analytic/funnel-sdk'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '' }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'Clober Dex',
  projectId: '14e09398dd595b0d1dccabf414ac4531',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const WalletProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}

const Web3AnalyticWrapper = ({ children }: React.PropsWithChildren) => {
  const { address } = useAccount()

  useEffect(() => {
    if (!address) {
      return
    }
    identify(process.env.NEXT_PUBLIC_WEB3_ANALYTIC_API_KEY || '', address)
  }, [address])

  return <>{children}</>
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          content="Join Clober DEX and Start Trading on a Fully On-chain Order Book. Eliminate Counterparty Risk. Place Limit Orders. Low Transaction Costs Powered by LOBSTER."
          name="description"
        />
        <link href="/favicon.svg" rel="icon" />
      </Head>
      <WalletProvider>
        <Web3AnalyticWrapper>Hello World!</Web3AnalyticWrapper>
      </WalletProvider>
    </>
  )
}
