require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" //match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // array of private keys
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}` // Url to an Ethereum node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 4
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // array of private keys
          `https://ropsten.infura.io/v3/77e93dc848694ac9b68718c1ed243ca1` // Url to an Ethereum node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 3
    }
  },
  contracts_directory: './contracts',
  contracts_build_directory: './abis',

  // Configure your compilers
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "^0.8.0" 
    }
  }
};