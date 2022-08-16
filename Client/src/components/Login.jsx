const Transactions =  () => {

    function sayHello() {
        alert('You clicked me!');
    }

    return (
        <button className="btn md:btn-lg" onClick={sayHello}> Login with Metamask </button>
    );
}

export default Transactions;