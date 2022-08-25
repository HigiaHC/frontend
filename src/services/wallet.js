class Wallet {
    login() {
        // check if metamask extension is present
        if (!window.ethereum) {
            alert('Please, install Metamask extension!');
            return;
        }

        // do login
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(response => this.#setAccountInfo(response));
    }

    #setAccountInfo(account) {
        console.log(account);
    }
}

export { Wallet };