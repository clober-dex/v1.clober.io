import React, { useEffect } from 'react'
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { configureChains, createConfig, useAccount, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { identify } from '@web3analytic/funnel-sdk'
import dynamic from 'next/dynamic'

import HeaderContainer from '../containers/header-container'
import Footer from '../components/footer'
import { ChainProvider } from '../contexts/chain-context'
import { MarketProvider } from '../contexts/limit/market-context'
import { supportChains } from '../constants/chain'
import { toWagmiChain } from '../model/chain'
import { TransactionProvider } from '../contexts/transaction-context'
import { LimitProvider } from '../contexts/limit/limit-context'
import { SwapProvider } from '../contexts/swap/swap-context'
import { OpenOrderProvider } from '../contexts/limit/open-order-context'
import { LimitCurrencyProvider } from '../contexts/limit/limit-currency-context'
import { SwapCurrencyProvider } from '../contexts/swap/swap-currency-context'
import { LimitContractProvider } from '../contexts/limit/limit-contract-context'
import { SwapContractProvider } from '../contexts/swap/swap-contract-context'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  supportChains.map((chain) => toWagmiChain(chain)),
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
      <RainbowKitProvider chains={supportChains} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
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

const LimitProvidersWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <MarketProvider>
      <OpenOrderProvider>
        <LimitProvider>
          <LimitCurrencyProvider>
            <LimitContractProvider>{children}</LimitContractProvider>
          </LimitCurrencyProvider>
        </LimitProvider>
      </OpenOrderProvider>
    </MarketProvider>
  )
}

const SwapProvidersWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <SwapProvider>
      <SwapCurrencyProvider>
        <SwapContractProvider>{children}</SwapContractProvider>
      </SwapCurrencyProvider>
    </SwapProvider>
  )
}

function App({ Component, pageProps }: AppProps) {
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
        <Web3AnalyticWrapper>
          <TransactionProvider>
            <ChainProvider>
              <LimitProvidersWrapper>
                <SwapProvidersWrapper>
                  <div className="flex flex-col w-[100vw] min-h-[100vh] bg-gray-950">
                    <HeaderContainer />
                    <Component {...pageProps} />
                    <Footer />
                  </div>
                </SwapProvidersWrapper>
              </LimitProvidersWrapper>
            </ChainProvider>
          </TransactionProvider>
        </Web3AnalyticWrapper>
      </WalletProvider>
    </>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
