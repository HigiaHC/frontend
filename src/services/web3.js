import Web3 from 'web3';
import configuration from '../abis/References.json';

export class Web3Service {
    constructor() {
        this.configuration = configuration;
        this.contract_address = configuration.networks['5777'].address;
        this.contract_abi = configuration.abi;

        this.web3 = new Web3(
            Web3.givenProvider || 'http://localhost:8545'
        );

        this.contract = new this.web3.eth.Contract(
            this.contract_abi, this.contract_address
        );
    }
}