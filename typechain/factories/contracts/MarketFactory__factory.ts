/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MarketFactory,
  MarketFactoryInterface,
} from "../../contracts/MarketFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "marketDeployer_",
        type: "address",
      },
      {
        internalType: "address",
        name: "priceBookDeployer_",
        type: "address",
      },
      {
        internalType: "address",
        name: "orderTokenDeployer_",
        type: "address",
      },
      {
        internalType: "address",
        name: "initialDaoTreasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "canceler_",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "initialQuoteTokenRegistrations_",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "errorCode",
        type: "uint256",
      },
    ],
    name: "CloberError",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousTreasury",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newTreasury",
        type: "address",
      },
    ],
    name: "ChangeDaoTreasury",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "previousHost",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newHost",
        type: "address",
      },
    ],
    name: "ChangeHost",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "ChangeOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "orderToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "quoteToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "baseToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteUnit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "makerFee",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "takerFee",
        type: "uint24",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "a",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "d",
        type: "uint128",
      },
    ],
    name: "CreateStableMarket",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "market",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "orderToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "quoteToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "baseToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quoteUnit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int24",
        name: "makerFee",
        type: "int24",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "takerFee",
        type: "uint24",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "a",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "r",
        type: "uint128",
      },
    ],
    name: "CreateVolatileMarket",
    type: "event",
  },
  {
    inputs: [],
    name: "canceler",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "treasury",
        type: "address",
      },
    ],
    name: "changeDaoTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "marketHost",
        type: "address",
      },
      {
        internalType: "address",
        name: "quoteToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "baseToken",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "quoteUnit",
        type: "uint96",
      },
      {
        internalType: "int24",
        name: "makerFee",
        type: "int24",
      },
      {
        internalType: "uint24",
        name: "takerFee",
        type: "uint24",
      },
      {
        internalType: "uint128",
        name: "a",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "d",
        type: "uint128",
      },
    ],
    name: "createStableMarket",
    outputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "marketHost",
        type: "address",
      },
      {
        internalType: "address",
        name: "quoteToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "baseToken",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "quoteUnit",
        type: "uint96",
      },
      {
        internalType: "int24",
        name: "makerFee",
        type: "int24",
      },
      {
        internalType: "uint24",
        name: "takerFee",
        type: "uint24",
      },
      {
        internalType: "uint128",
        name: "a",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "r",
        type: "uint128",
      },
    ],
    name: "createVolatileMarket",
    outputs: [
      {
        internalType: "address",
        name: "market",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "daoTreasury",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "a",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "d",
        type: "uint128",
      },
    ],
    name: "deployedArithmeticPriceBook",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint128",
        name: "a",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "r",
        type: "uint128",
      },
    ],
    name: "deployedGeometricPriceBook",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "executeChangeOwner",
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
    name: "executeHandOverHost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "quoteToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "baseToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "marketNonce",
        type: "uint256",
      },
    ],
    name: "formatOrderTokenName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "quoteToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "baseToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "marketNonce",
        type: "uint256",
      },
    ],
    name: "formatOrderTokenSymbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "futureOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
    name: "getMarketHost",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
    name: "getMarketInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "host",
            type: "address",
          },
          {
            internalType: "enum CloberMarketFactory.MarketType",
            name: "marketType",
            type: "uint8",
          },
          {
            internalType: "uint128",
            name: "a",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "factor",
            type: "uint128",
          },
          {
            internalType: "address",
            name: "futureHost",
            type: "address",
          },
        ],
        internalType: "struct CloberMarketFactory.MarketInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "marketDeployer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "orderTokenDeployer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "prepareChangeOwner",
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
      {
        internalType: "address",
        name: "newHost",
        type: "address",
      },
    ],
    name: "prepareHandOverHost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "priceBookDeployer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "registerQuoteToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "registeredQuoteTokens",
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
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "unregisterQuoteToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x61014060405260016000553480156200001757600080fd5b506040516200229f3803806200229f8339810160408190526200003a91620001b9565b306080524660a052600380546001600160a01b03191633908117909155604080516000815260208101929092527f9aecf86140d81442289f667eb72e1202a8fbb3478a686659952e145e85319656910160405180910390a16001600160a01b0386811660c05285811660e05284811661010052600580546001600160a01b0319169185169182179055604080516000815260208101929092527f9c878c72f750f0f8c445422c2ea8a62dd0caa0d317c673f77a560b49880eae4f910160405180910390a16001600160a01b0382166101205260005b81518110156200017957600160026000848481518110620001345762000134620002ea565b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff1916911515919091179055620001718162000300565b90506200010f565b5050505050505062000328565b80516001600160a01b03811681146200019e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60008060008060008060c08789031215620001d357600080fd5b620001de8762000186565b95506020620001ef81890162000186565b9550620001ff6040890162000186565b94506200020f6060890162000186565b93506200021f6080890162000186565b60a08901519093506001600160401b03808211156200023d57600080fd5b818a0191508a601f8301126200025257600080fd5b815181811115620002675762000267620001a3565b8060051b604051601f19603f830116810181811085821117156200028f576200028f620001a3565b60405291825284820192508381018501918d831115620002ae57600080fd5b938501935b82851015620002d757620002c78562000186565b84529385019392850192620002b3565b8096505050505050509295509295509295565b634e487b7160e01b600052603260045260246000fd5b6000600182016200032157634e487b7160e01b600052601160045260246000fd5b5060010190565b60805160a05160c05160e0516101005161012051611efd620003a260003960006102b201526000818161023e0152611385015260008181610278015281816108bf0152610d5f015260008181610368015281816109c60152610e660152600081816107c30152610c63015260006112070152611efd6000f3fe608060405234801561001057600080fd5b50600436106101985760003560e01c8063a8c9e9c5116100e3578063e2e3a3951161008c578063f817f80e11610066578063f817f80e146103cb578063fa306641146103fe578063fb69491a1461041157600080fd5b8063e2e3a3951461039d578063eed1c973146103a5578063f529bc64146103b857600080fd5b8063b9e9d1aa116100bd578063b9e9d1aa14610350578063bb1e453114610363578063c00fdd5b1461038a57600080fd5b8063a8c9e9c5146102fa578063afdd9edc1461030d578063affed0e01461033957600080fd5b80638da5cb5b11610145578063992d454d1161011f578063992d454d146102ad5780639a635fc8146102d4578063a17a97e4146102e757600080fd5b80638da5cb5b14610260578063900704a21461027357806390e305ef1461029a57600080fd5b80633f6c3813116101765780633f6c3813146101fb57806379022a9f1461020e57806382b556e81461023957600080fd5b806303f038e81461019d5780630cf85bcc146101c65780633609d6c8146101e6575b600080fd5b6101b06101ab3660046118d7565b610424565b6040516101bd9190611968565b60405180910390f35b6101d96101d436600461197b565b61047d565b6040516101bd91906119ae565b6101f96101f436600461197b565b61054d565b005b6101f9610209366004611a24565b61060b565b600554610221906001600160a01b031681565b6040516001600160a01b0390911681526020016101bd565b6102217f000000000000000000000000000000000000000000000000000000000000000081565b600354610221906001600160a01b031681565b6102217f000000000000000000000000000000000000000000000000000000000000000081565b6101f96102a836600461197b565b61067b565b6102217f000000000000000000000000000000000000000000000000000000000000000081565b6101b06102e23660046118d7565b6106ec565b6102216102f5366004611a74565b61072d565b610221610308366004611aa7565b610760565b61022161031b36600461197b565b6001600160a01b039081166000908152600760205260409020541690565b61034260065481565b6040519081526020016101bd565b600454610221906001600160a01b031681565b6102217f000000000000000000000000000000000000000000000000000000000000000081565b6101f961039836600461197b565b610b34565b6101f9610b60565b6102216103b3366004611aa7565b610bff565b6101f96103c636600461197b565b610fa0565b6103ee6103d936600461197b565b60026020526000908152604090205460ff1681565b60405190151581526020016101bd565b61022161040c366004611a74565b610fc9565b6101f961041f36600461197b565b610fdb565b6060610438836001600160a01b0316611005565b61044a856001600160a01b0316611005565b610453846110f6565b60405160200161046593929190611b6a565b60405160208183030381529060405290509392505050565b6040805160a080820183526000808352602080840182905283850182905260608401829052608084018290526001600160a01b038681168352600782529185902085519384019095528454918216835292939192830190600160a01b900460ff1660028111156104ef576104ef611998565b600281111561050057610500611998565b815260018201546001600160801b0380821660208401527001000000000000000000000000000000009091041660408201526002909101546001600160a01b031660609091015292915050565b6001600160a01b038082166000908152600760205260409020805460028201549192908116911633811461059c57604051630e92930560e11b8152600060048201526024015b60405180910390fd5b82546001600160a01b038281166001600160a01b0319928316811786556002860180549093169092556040805185831681526020810193909352908616917f14a21e6ea0f287f06342617887cf2480d7555e13dd7460b2fd26b9d375480559910160405180910390a250505050565b6001600160a01b038083166000908152600760205260409020541633811461064957604051630e92930560e11b815260006004820152602401610593565b506001600160a01b03918216600090815260076020526040902060020180546001600160a01b03191691909216179055565b610683611196565b600554604080516001600160a01b03928316815291831660208301527f9c878c72f750f0f8c445422c2ea8a62dd0caa0d317c673f77a560b49880eae4f910160405180910390a1600580546001600160a01b0319166001600160a01b0392909216919091179055565b6060610700836001600160a01b0316611005565b610712856001600160a01b0316611005565b61071b846110f6565b60405160200161046593929190611c00565b60006001600061073f858560026111c6565b81526020810191909152604001600020546001600160a01b03169392505050565b600061076a6111fc565b6001600160a01b038816600090815260026020526040902054889060ff166107a857604051630e92930560e11b8152600f6004820152602401610593565b6107b58a87876050611248565b6000610810600654604080517f00000000000000000000000000000000000000000000000000000000000000006020820152908101829052600090606001604051602081830303815290604052805190602001209050919050565b9050600061081d82611353565b9050886bffffffffffffffffffffffff1660000361085057604051630e92930560e11b8152600481810152602401610593565b60008061085f888860026111c6565b6000818152600160205260409020546001600160a01b0316925090508161095e576040517f20c2c5060000000000000000000000000000000000000000000000000000000081526001600160801b03808a166004830152881660248201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906320c2c506906044016020604051808303816000875af1158015610910573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109349190611c96565b600082815260016020526040902080546001600160a01b0319166001600160a01b03831617905591505b506040516329f3eddd60e11b81526001600160a01b0383811660048301528d811660248301528c81166044830152606482018590526bffffffffffffffffffffffff8c16608483015260028b900b60a483015262ffffff8a1660c483015282811660e48301527f000000000000000000000000000000000000000000000000000000000000000016906353e7dbba90610104016020604051808303816000875af1158015610a10573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a349190611c96565b9450846001600160a01b03167f5fc7ed7f89761a3920e746f78c175bdaa0b6b9a0e926ba58170853a28dc0e457838e8e8e6006548f8f8f8f604051610aea999897969594939291906001600160a01b03998a16815297891660208901529590971660408701526bffffffffffffffffffffffff939093166060860152608085019190915260020b60a084015262ffffff1660c08301526001600160801b0392831660e08301529091166101008201526101200190565b60405180910390a2610b00858e60028a8a611400565b610b0f828d8d6006548961158e565b60068054906000610b1f83611cc9565b91905055505050505098975050505050505050565b610b3c611196565b6001600160a01b03166000908152600260205260409020805460ff19166001179055565b6004546001600160a01b0316338114610b8f57604051630e92930560e11b815260006004820152602401610593565b600354604080516001600160a01b03928316815291831660208301527f9aecf86140d81442289f667eb72e1202a8fbb3478a686659952e145e85319656910160405180910390a1600380546001600160a01b039092166001600160a01b0319928316179055600480549091169055565b6000610c096111fc565b6001600160a01b038816600090815260026020526040902054889060ff16610c4757604051630e92930560e11b8152600f6004820152602401610593565b610c558a8787610190611248565b6000610cb0600654604080517f00000000000000000000000000000000000000000000000000000000000000006020820152908101829052600090606001604051602081830303815290604052805190602001209050919050565b90506000610cbd82611353565b9050886bffffffffffffffffffffffff16600003610cf057604051630e92930560e11b8152600481810152602401610593565b600080610cff888860016111c6565b6000818152600160205260409020546001600160a01b03169250905081610dfe576040517f35ac18a20000000000000000000000000000000000000000000000000000000081526001600160801b03808a166004830152881660248201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906335ac18a2906044016020604051808303816000875af1158015610db0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dd49190611c96565b600082815260016020526040902080546001600160a01b0319166001600160a01b03831617905591505b506040516329f3eddd60e11b81526001600160a01b0383811660048301528d811660248301528c81166044830152606482018590526bffffffffffffffffffffffff8c16608483015260028b900b60a483015262ffffff8a1660c483015282811660e48301527f000000000000000000000000000000000000000000000000000000000000000016906353e7dbba90610104016020604051808303816000875af1158015610eb0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed49190611c96565b9450846001600160a01b03167ffbf48d1fdd7299b6980d1473be6b6cc91fd16dd6ab1ac30193cde1e9f69b6fe9838e8e8e6006548f8f8f8f604051610f8a999897969594939291906001600160a01b03998a16815297891660208901529590971660408701526bffffffffffffffffffffffff939093166060860152608085019190915260020b60a084015262ffffff1660c08301526001600160801b0392831660e08301529091166101008201526101200190565b60405180910390a2610b00858e60018a8a611400565b610fa8611196565b6001600160a01b03166000908152600260205260409020805460ff19169055565b60006001600061073f858560016111c6565b610fe3611196565b600480546001600160a01b0319166001600160a01b0392909216919091179055565b60408051600481526024810182526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f95d89b4100000000000000000000000000000000000000000000000000000000179052905160609160009182916001600160a01b0386169161107a9190611ce2565b600060405180830381855afa9150503d80600081146110b5576040519150601f19603f3d011682016040523d82523d6000602084013e6110ba565b606091505b5091509150816110e557604051806040016040528060038152602001623f3f3f60e81b8152506110ee565b6110ee8161160b565b949350505050565b60606000611103836117dd565b600101905060008167ffffffffffffffff81111561112357611123611cfe565b6040519080825280601f01601f19166020018201604052801561114d576020820181803683370190505b5090508181016020015b600019017f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a850494508461115757509392505050565b6003546001600160a01b031633146111c457604051630e92930560e11b815260006004820152602401610593565b565b60008383836040516020016111dd93929190611d14565b6040516020818303038152906040528051906020012090509392505050565b306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146111c457604051630e92930560e11b815260056004820152602401610593565b6207a11f19600284900b12806112645750600283900b6207a120125b1561128557604051630e92930560e11b815260086004820152602401610593565b62ffffff82166207a12010156112b157604051630e92930560e11b815260086004820152602401610593565b6003546001600160a01b038581169116148015906112e657508062ffffff168360020b8362ffffff166112e49190611d7e565b125b1561130757604051630e92930560e11b815260086004820152602401610593565b60008360020b12801561132c5750600061132a600285900b62ffffff8516611d7e565b125b1561134d57604051630e92930560e11b815260086004820152602401610593565b50505050565b6040517f2b85ba38000000000000000000000000000000000000000000000000000000008152600481018290526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632b85ba38906024016020604051808303816000875af11580156113d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113fa9190611c96565b92915050565b6001600160a01b03841661142957604051630e92930560e11b8152600481810152602401610593565b6040518060a00160405280856001600160a01b0316815260200184600281111561145557611455611998565b81526001600160801b03808516602080840191909152908416604080840191909152600060609093018390526001600160a01b0389811684526007835292208351815493166001600160a01b0319841681178255918401519092909183917fffffffffffffffffffffff0000000000000000000000000000000000000000001617600160a01b8360028111156114ed576114ed611998565b021790555060408281015160608401516001600160801b03908116700100000000000000000000000000000000029116176001830155608090920151600290910180546001600160a01b039283166001600160a01b03199091161790558151600081528682166020820152908716917f14a21e6ea0f287f06342617887cf2480d7555e13dd7460b2fd26b9d375480559910160405180910390a25050505050565b846001600160a01b0316636ee5741a6115a8868686610424565b6115b38787876106ec565b846040518463ffffffff1660e01b81526004016115d293929190611da6565b600060405180830381600087803b1580156115ec57600080fd5b505af1158015611600573d6000803e3d6000fd5b505050505050505050565b6060604082511061162a57818060200190518101906113fa9190611de5565b81516020036117b95760005b60208160ff161080156116835750828160ff168151811061165957611659611e92565b01602001517fff000000000000000000000000000000000000000000000000000000000000001615155b1561169a578061169281611ea8565b915050611636565b60008160ff1667ffffffffffffffff8111156116b8576116b8611cfe565b6040519080825280601f01601f1916602001820160405280156116e2576020820181803683370190505b509050600091505b60208260ff161080156117375750838260ff168151811061170d5761170d611e92565b01602001517fff000000000000000000000000000000000000000000000000000000000000001615155b156117b257838260ff168151811061175157611751611e92565b602001015160f81c60f81b818360ff168151811061177157611771611e92565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350816117aa81611ea8565b9250506116ea565b9392505050565b50506040805180820190915260038152623f3f3f60e81b602082015290565b919050565b6000807a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611826577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000830492506040015b6d04ee2d6d415b85acef81000000008310611852576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061187057662386f26fc10000830492506010015b6305f5e1008310611888576305f5e100830492506008015b612710831061189c57612710830492506004015b606483106118ae576064830492506002015b600a83106113fa5760010192915050565b6001600160a01b03811681146118d457600080fd5b50565b6000806000606084860312156118ec57600080fd5b83356118f7816118bf565b92506020840135611907816118bf565b929592945050506040919091013590565b60005b8381101561193357818101518382015260200161191b565b50506000910152565b60008151808452611954816020860160208601611918565b601f01601f19169290920160200192915050565b6020815260006117b2602083018461193c565b60006020828403121561198d57600080fd5b81356117b2816118bf565b634e487b7160e01b600052602160045260246000fd5b600060a0820190506001600160a01b038084511683526020840151600381106119e757634e487b7160e01b600052602160045260246000fd5b8060208501525060408401516001600160801b03808216604086015280606087015116606086015250508060808501511660808401525092915050565b60008060408385031215611a3757600080fd5b8235611a42816118bf565b91506020830135611a52816118bf565b809150509250929050565b80356001600160801b03811681146117d857600080fd5b60008060408385031215611a8757600080fd5b611a9083611a5d565b9150611a9e60208401611a5d565b90509250929050565b600080600080600080600080610100898b031215611ac457600080fd5b8835611acf816118bf565b97506020890135611adf816118bf565b96506040890135611aef816118bf565b955060608901356bffffffffffffffffffffffff81168114611b1057600080fd5b94506080890135600281900b8114611b2757600080fd5b935060a089013562ffffff81168114611b3f57600080fd5b9250611b4d60c08a01611a5d565b9150611b5b60e08a01611a5d565b90509295985092959890939650565b7f436c6f626572204f726465723a20000000000000000000000000000000000000815260008451611ba281600e850160208901611918565b602f60f81b600e918401918201528451611bc381600f840160208901611918565b600560fb1b600f92909101918201528351611be5816010840160208801611918565b602960f81b6010929091019182015260110195945050505050565b7f434c4f422d000000000000000000000000000000000000000000000000000000815260008451611c38816005850160208901611918565b602f60f81b6005918401918201528451611c59816006840160208901611918565b600560fb1b600692909101918201528351611c7b816007840160208801611918565b602960f81b6007929091019182015260080195945050505050565b600060208284031215611ca857600080fd5b81516117b2816118bf565b634e487b7160e01b600052601160045260246000fd5b600060018201611cdb57611cdb611cb3565b5060010190565b60008251611cf4818460208701611918565b9190910192915050565b634e487b7160e01b600052604160045260246000fd5b60007fffffffffffffffffffffffffffffffff00000000000000000000000000000000808660801b168352808560801b1660108401525060038310611d6957634e487b7160e01b600052602160045260246000fd5b5060f89190911b602082015260210192915050565b8082018281126000831280158216821582161715611d9e57611d9e611cb3565b505092915050565b606081526000611db9606083018661193c565b8281036020840152611dcb818661193c565b9150506001600160a01b0383166040830152949350505050565b600060208284031215611df757600080fd5b815167ffffffffffffffff80821115611e0f57600080fd5b818401915084601f830112611e2357600080fd5b815181811115611e3557611e35611cfe565b604051601f8201601f19908116603f01168101908382118183101715611e5d57611e5d611cfe565b81604052828152876020848701011115611e7657600080fd5b611e87836020830160208801611918565b979650505050505050565b634e487b7160e01b600052603260045260246000fd5b600060ff821660ff8103611ebe57611ebe611cb3565b6001019291505056fea26469706673582212203d5cf86070f6d88b703ef227899ae27f6f6de6d45dab678ead0bcd9da7499d1f64736f6c63430008110033";

type MarketFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarketFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MarketFactory__factory extends ContractFactory {
  constructor(...args: MarketFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    marketDeployer_: string,
    priceBookDeployer_: string,
    orderTokenDeployer_: string,
    initialDaoTreasury: string,
    canceler_: string,
    initialQuoteTokenRegistrations_: string[],
    overrides?: Overrides & { from?: string }
  ): Promise<MarketFactory> {
    return super.deploy(
      marketDeployer_,
      priceBookDeployer_,
      orderTokenDeployer_,
      initialDaoTreasury,
      canceler_,
      initialQuoteTokenRegistrations_,
      overrides || {}
    ) as Promise<MarketFactory>;
  }
  override getDeployTransaction(
    marketDeployer_: string,
    priceBookDeployer_: string,
    orderTokenDeployer_: string,
    initialDaoTreasury: string,
    canceler_: string,
    initialQuoteTokenRegistrations_: string[],
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(
      marketDeployer_,
      priceBookDeployer_,
      orderTokenDeployer_,
      initialDaoTreasury,
      canceler_,
      initialQuoteTokenRegistrations_,
      overrides || {}
    );
  }
  override attach(address: string): MarketFactory {
    return super.attach(address) as MarketFactory;
  }
  override connect(signer: Signer): MarketFactory__factory {
    return super.connect(signer) as MarketFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketFactoryInterface {
    return new utils.Interface(_abi) as MarketFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MarketFactory {
    return new Contract(address, _abi, signerOrProvider) as MarketFactory;
  }
}