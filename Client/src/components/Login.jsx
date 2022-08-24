const Transactions =  () => {

    function sayHello() {
        // Asking if metamask is already present or not
        if (window.ethereum) {
            // res[0] for fetching a first wallet
            window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) => accountChangeHandler(res[0]));
        } 
        else{
            alert("install metamask extension!!");
        }
    };
        
    // getbalance function for getting a balance in
    // a right format with help of ethers
    const getbalance = (address) => {
        // Requesting balance method
        window.ethereum.request({ 
            method: "eth_getBalance", 
            params: [address, "latest"] 
        }).then((balance) => {
            // Setting balance
            setdata({
                Balance: ethers.utils.formatEther(balance),
            });
            });
        };
        
        // Function for getting handling all events
        const accountChangeHandler = (account) => {
        // Setting an address data
        setdata({
            address: account,
        });
        
        // Setting a balance
        getbalance(account);
        };
    

    return (
        <button className="btn md:btn-lg" onClick={sayHello}> Login with Metamask </button>
    );
}

export default Transactions;