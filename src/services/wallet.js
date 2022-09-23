class Wallet {
    constructor() {
        this.account = '';
    }

    async isLogged(checkUserExistance = false, web3 = undefined) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (accounts.length > 0) {
            this.#setAccountInfo(accounts);
            return true;
        }

        return false;
    }

    async login() {
        // check if metamask extension is present
        if (!window.ethereum) {
            alert('Please, install Metamask extension!');
            return false;
        }

        // do login
        await window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(response => this.#setAccountInfo(response));

        return true;

    }

    #setAccountInfo(account) {
        this.account = account[0];
    }

    getAccount() {
        return this.account;
    }
}

export { Wallet };