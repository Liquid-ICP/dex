import { ChainId, Currency, WNATIVE } from '@sushiswap/sdk'
import React, { FunctionComponent, useMemo } from 'react'

import Logo from '../Logo'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import useHttpLocations from '../../hooks/useHttpLocations'

import Image from '../Image'
import { classNames } from '../../functions'

const BLOCKCHAIN = {
  [ChainId.MAINNET]: 'ethereum',
  [ChainId.BSC]: 'binanace',
  [ChainId.CELO]: 'celo',
  [ChainId.FANTOM]: 'fantom',
  [ChainId.HARMONY]: 'harmony',
  [ChainId.MATIC]: 'polygon',
  [ChainId.XDAI]: 'xdai',
  // [ChainId.OKEX]: 'okex',
}

function getCurrencySymbol(currency) {
  if (currency.symbol === 'WBTC') {
    return 'btc'
  }
  if (currency.symbol === 'WETH') {
    return 'eth'
  }
  return currency.symbol.toLowerCase()
}

export function getCurrencyLogoUrls(currency) {
  const urls = []

  urls.push(`https://raw.githubusercontent.com/sushiswap/icons/master/token/${getCurrencySymbol(currency)}.jpg`)
  if (currency.chainId in BLOCKCHAIN) {
    urls.push(
      `https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/${BLOCKCHAIN[currency.chainId]}/assets/${
        currency.address
      }/logo.png`
    )
    urls.push(
      `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${BLOCKCHAIN[currency.chainId]}/assets/${
        currency.address
      }/logo.png`
    )
  }

  return urls
}

const AvalancheLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/avax.jpg'
const BinanceCoinLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/bnb.jpg'
const EthereumLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/eth.jpg'
const FantomLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/ftm.jpg'
const HarmonyLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/one.jpg'
const HecoLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/heco.jpg'
const MaticLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/polygon.jpg'
const MoonbeamLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/eth.jpg'
const OKExLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/okt.jpg'
const xDaiLogo =
  'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/xdai/assets/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d/logo.png'
const CeloLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/celo.jpg'
const PalmLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/palm.jpg'
const MovrLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/movr.jpg'

const LOGO: { readonly [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: EthereumLogo,
  [ChainId.FANTOM]: FantomLogo,
  [ChainId.FANTOM_TESTNET]: FantomLogo,
  [ChainId.MATIC]: MaticLogo,
  [ChainId.MATIC_TESTNET]: MaticLogo,
  [ChainId.XDAI]: xDaiLogo,
  [ChainId.BSC]: BinanceCoinLogo,
  [ChainId.BSC_TESTNET]: BinanceCoinLogo,
  [ChainId.MOONBEAM_TESTNET]: MoonbeamLogo,
  [ChainId.AVALANCHE]: AvalancheLogo,
  [ChainId.AVALANCHE_TESTNET]: AvalancheLogo,
  [ChainId.HECO]: HecoLogo,
  [ChainId.HECO_TESTNET]: HecoLogo,
  [ChainId.HARMONY]: HarmonyLogo,
  [ChainId.HARMONY_TESTNET]: HarmonyLogo,
  [ChainId.OKEX]: OKExLogo,
  [ChainId.OKEX_TESTNET]: OKExLogo,
  [ChainId.ARBITRUM]: EthereumLogo,
  [ChainId.ARBITRUM_TESTNET]: EthereumLogo,
  [ChainId.CELO]: CeloLogo,
  [ChainId.PALM]: PalmLogo,
  [ChainId.PALM_TESTNET]: PalmLogo,
  [ChainId.MOONRIVER]: MovrLogo,
}

interface CurrencyLogoProps {
  currency?: Currency
  size?: string | number
  style?: React.CSSProperties
  className?: string
  squared?: boolean
}

const unknown = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/unknown.png'

const CurrencyLogo: FunctionComponent<CurrencyLogoProps> = ({
  currency,
  size = '24px',
  style,
  className = '',
  ...rest
}) => {
  const uriLocations = useHttpLocations(
    currency instanceof WrappedTokenInfo ? currency.logoURI || currency.tokenInfo.logoURI : undefined
  )

  const srcs = useMemo(() => {
    if (!currency) {
      return [unknown]
    }

    if (currency.isNative || currency.equals(WNATIVE[currency.chainId])) {
      return [LOGO[currency.chainId], unknown]
    }

    if (currency.isToken) {
      const defaultUrls = [...getCurrencyLogoUrls(currency)]
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls, unknown]
      }
      return defaultUrls
    }
  }, [currency, uriLocations])

  if (currency && currency.isToken) {
    if (currency instanceof WrappedTokenInfo && currency.chainId === ChainId.MATIC) {
      if (currency.tokenInfo.address.toLowerCase() === '0x1b43b97094aa3c6cc678edb9e28ac67daaa7cc64') {
        return (
          <Image
            src="/images/tokens/licp.png"
            width={size}
            height={size}
            alt={currency?.symbol}
            className={classNames('rounded-full', className)}
            {...rest}
          />
        )
      }
      if (currency.tokenInfo.address.toLowerCase() === '0xe7946921c619f5d9e8f28e3a5b4d218e9520dd11') {
        return (
          <Image
            src="/images/tokens/sticp.png"
            width={size}
            height={size}
            alt={currency?.symbol}
            className={classNames('rounded-full', className)}
            {...rest}
          />
        )
      }
      if (currency.tokenInfo.address.toLowerCase() === '0xd63568e4bcb3d32c928e243e2bdb9e272d748a06') {
        return (
          <Image
            src="/images/tokens/wicp.png"
            width={size}
            height={size}
            alt={currency?.symbol}
            className={classNames('rounded-full', className)}
            {...rest}
          />
        )
      }
    }
  }

  return <Logo srcs={srcs} width={size} height={size} alt={currency?.symbol} className={className} {...rest} />
}

export default CurrencyLogo
