import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import ABI from './ABI.json';

function App() {
    const [balance, setBalance] = useState();
    const [deposit, setDeposit] = useState(0);
    const [greeting, setGreeting] = useState();
    const [greetingValue, setGreetingValue] = useState('');
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, ABI, signer)

    const getBalance = async () => {
        const balance = await provider.getBalance(contractAddress)
        setBalance(ethers.utils.formatEther(balance))
    }

    useEffect(() => {
        const connectWallet = async () => {
            await provider.send("eth_requestAccounts", [])
        }

        const getGreeting = async () => {
            const greeting = await contract.greet()
            setGreeting(greeting)
        }

        connectWallet()
            .catch(console.error)
        getBalance()
            .catch(console.error)
        getGreeting()
            .catch(console.error)
    }, [])

    const handleDepositSubmit = async (e) => {
        e.preventDefault();
        const value = ethers.utils.parseEther(deposit)
        const transaction = await contract.deposit({value})
        await transaction.wait()
        await getBalance()
    }

    const handleGreetingSubmit = async (e) => {
        e.preventDefault();
        const greeting = await contract.setGreeting(greetingValue);
        await greeting.wait()
        setGreeting(greetingValue)
        setGreetingValue('')
    }

    return (
        <div className={"container"}>
            <div className="row mt-5">
                <div className="col">
                    <h3>Greeting: {greeting}</h3>
                    <p>Contract Balance: {balance || 'NA'}</p>
                </div>
                <div className="col">
                    <form action="" onSubmit={handleDepositSubmit}>
                        <div className="mb-3">
                            <input type="number" className={"form-control"} placeholder={0} value={deposit}
                                   onChange={e => setDeposit(e.target.value)}/>
                        </div>
                        <button type={"submit"} className={"btn btn-success"}>Deposit</button>
                    </form>

                    <form action="" className={"mt-3"} onSubmit={handleGreetingSubmit}>
                        <div className="mb-3">
                            <input type="text" className={"form-control"} placeholder={"Greeting"} value={greetingValue}
                                   onChange={e => setGreetingValue(e.target.value)}/>
                        </div>
                        <button type={"submit"} className={"btn btn-dark"}>Change</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
