import React, {useState, useEffect} from "react";
import {ethers} from "ethers";

function App() {
    const [balance, setBalance] = useState();
    const [deposit, setDeopsit] = useState();
    const [greeting, setGreeting] = useState();
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner()

    useEffect(() => {
        const connectWallet = async () => {
            await provider.send("eth_requestAccounts", [])
        }
        const getBalance = async () => {
            const balance = await provider.getBalance(contractAddress)
            setBalance(ethers.utils.formatEther(balance))
        }

        connectWallet()
            .catch(console.error)
        getBalance()
            .catch(console.error)
    }, [])

    const handleDepositSubmit = (e) => {
        e.preventDefault();
    }

    const handleGreetingSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={"container"}>
            <div className="row mt-5">
                <div className="col">
                    <h3>Greeting</h3>
                    <p>Contract Balance: {balance || 'NA'}</p>
                </div>
                <div className="col">
                    <form action="" onSubmit={handleDepositSubmit}>
                        <div className="mb-3">
                            <input type="number" className={"form-control"} placeholder={0} value={deposit}
                                   onChange={e => setDeopsit(e.target.value)}/>
                        </div>
                        <button type={"submit"} className={"btn btn-success"}>Deposit</button>
                    </form>

                    <form action="" className={"mt-3"} onSubmit={handleGreetingSubmit}>
                        <div className="mb-3">
                            <input type="text" className={"form-control"} placeholder={"Greeting"} value={greeting}
                                   onChange={e => setGreeting(e.target.value)}/>
                        </div>
                        <button type={"submit"} className={"btn btn-dark"}>Change</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
