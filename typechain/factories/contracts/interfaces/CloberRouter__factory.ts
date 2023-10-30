/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  CloberRouter,
  CloberRouterInterface,
} from "../../../contracts/interfaces/CloberRouter";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint64",
        name: "deadline",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "isBid",
                type: "bool",
              },
              {
                internalType: "uint16",
                name: "priceIndex",
                type: "uint16",
              },
              {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
              },
            ],
            internalType: "struct OrderKey[]",
            name: "orderKeys",
            type: "tuple[]",
          },
        ],
        internalType: "struct CloberRouter.ClaimOrderParams[]",
        name: "paramsList",
        type: "tuple[]",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
    ],
    name: "isRegisteredMarket",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "deadline",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "claimBounty",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "priceIndex",
            type: "uint16",
          },
          {
            internalType: "uint64",
            name: "rawAmount",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "postOnly",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "useNative",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CloberRouter.LimitOrderParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "limitAsk",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "isBid",
                type: "bool",
              },
              {
                internalType: "uint16",
                name: "priceIndex",
                type: "uint16",
              },
              {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
              },
            ],
            internalType: "struct OrderKey[]",
            name: "orderKeys",
            type: "tuple[]",
          },
        ],
        internalType: "struct CloberRouter.ClaimOrderParams[]",
        name: "claimParamsList",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "deadline",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "claimBounty",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "priceIndex",
            type: "uint16",
          },
          {
            internalType: "uint64",
            name: "rawAmount",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "postOnly",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "useNative",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CloberRouter.LimitOrderParams",
        name: "limitOrderParams",
        type: "tuple",
      },
    ],
    name: "limitAskAfterClaim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "deadline",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "claimBounty",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "priceIndex",
            type: "uint16",
          },
          {
            internalType: "uint64",
            name: "rawAmount",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "postOnly",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "useNative",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CloberRouter.LimitOrderParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "limitBid",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "isBid",
                type: "bool",
              },
              {
                internalType: "uint16",
                name: "priceIndex",
                type: "uint16",
              },
              {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
              },
            ],
            internalType: "struct OrderKey[]",
            name: "orderKeys",
            type: "tuple[]",
          },
        ],
        internalType: "struct CloberRouter.ClaimOrderParams[]",
        name: "claimParamsList",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "deadline",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "claimBounty",
            type: "uint32",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "priceIndex",
            type: "uint16",
          },
          {
            internalType: "uint64",
            name: "rawAmount",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "postOnly",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "useNative",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CloberRouter.LimitOrderParams",
        name: "limitOrderParams",
        type: "tuple",
      },
    ],
    name: "limitBidAfterClaim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "market",
                type: "address",
              },
              {
                internalType: "uint64",
                name: "deadline",
                type: "uint64",
              },
              {
                internalType: "uint32",
                name: "claimBounty",
                type: "uint32",
              },
              {
                internalType: "address",
                name: "user",
                type: "address",
              },
              {
                internalType: "uint16",
                name: "priceIndex",
                type: "uint16",
              },
              {
                internalType: "uint64",
                name: "rawAmount",
                type: "uint64",
              },
              {
                internalType: "bool",
                name: "postOnly",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "useNative",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "baseAmount",
                type: "uint256",
              },
            ],
            internalType: "struct CloberRouter.LimitOrderParams",
            name: "params",
            type: "tuple",
          },
          {
            internalType: "bool",
            name: "isBid",
            type: "bool",
          },
        ],
        internalType: "struct CloberRouter.GeneralLimitOrderParams[]",
        name: "limitOrderParamsList",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "isBid",
                type: "bool",
              },
              {
                internalType: "uint16",
                name: "priceIndex",
                type: "uint16",
              },
              {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
              },
            ],
            internalType: "struct OrderKey[]",
            name: "orderKeys",
            type: "tuple[]",
          },
        ],
        internalType: "struct CloberRouter.ClaimOrderParams[]",
        name: "claimParamsList",
        type: "tuple[]",
      },
    ],
    name: "limitOrder",
    outputs: [
      {
        internalType: "uint256[]",
        name: "orderIds",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "deadline",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "limitPriceIndex",
            type: "uint16",
          },
          {
            internalType: "uint64",
            name: "rawAmount",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "expendInput",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "useNative",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CloberRouter.MarketOrderParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "marketAsk",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "isBid",
                type: "bool",
              },
              {
                internalType: "uint16",
                name: "priceIndex",
                type: "uint16",
              },
              {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
              },
            ],
            internalType: "struct OrderKey[]",
            name: "orderKeys",
            type: "tuple[]",
          },
        ],
        internalType: "struct CloberRouter.ClaimOrderParams[]",
        name: "claimParamsList",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "deadline",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "limitPriceIndex",
            type: "uint16",
          },
          {
            internalType: "uint64",
            name: "rawAmount",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "expendInput",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "useNative",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CloberRouter.MarketOrderParams",
        name: "marketOrderParams",
        type: "tuple",
      },
    ],
    name: "marketAskAfterClaim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "deadline",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "limitPriceIndex",
            type: "uint16",
          },
          {
            internalType: "uint64",
            name: "rawAmount",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "expendInput",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "useNative",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CloberRouter.MarketOrderParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "marketBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "isBid",
                type: "bool",
              },
              {
                internalType: "uint16",
                name: "priceIndex",
                type: "uint16",
              },
              {
                internalType: "uint256",
                name: "orderIndex",
                type: "uint256",
              },
            ],
            internalType: "struct OrderKey[]",
            name: "orderKeys",
            type: "tuple[]",
          },
        ],
        internalType: "struct CloberRouter.ClaimOrderParams[]",
        name: "claimParamsList",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "market",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "deadline",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "limitPriceIndex",
            type: "uint16",
          },
          {
            internalType: "uint64",
            name: "rawAmount",
            type: "uint64",
          },
          {
            internalType: "bool",
            name: "expendInput",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "useNative",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "baseAmount",
            type: "uint256",
          },
        ],
        internalType: "struct CloberRouter.MarketOrderParams",
        name: "marketOrderParams",
        type: "tuple",
      },
    ],
    name: "marketBidAfterClaim",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "markets",
        type: "address[]",
      },
    ],
    name: "registerMarkets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "markets",
        type: "address[]",
      },
    ],
    name: "unregisterMarkets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class CloberRouter__factory {
  static readonly abi = _abi;
  static createInterface(): CloberRouterInterface {
    return new utils.Interface(_abi) as CloberRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CloberRouter {
    return new Contract(address, _abi, signerOrProvider) as CloberRouter;
  }
}