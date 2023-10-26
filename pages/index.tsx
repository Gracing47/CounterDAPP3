import { NextPage } from "next";
import { ConnectWallet, Web3Button, useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../constants/addresses";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: counter, isLoading: isCounterLoading } = useContractRead(contract, "getCounter");
  const { data: owner, } = useContractRead(contract, "owner");


  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <h1>Counter Dapp3</h1>
            <div className={styles.counterContainer}>
                <ConnectWallet />

                {isCounterLoading ? (
                    <p style={{
                        fontSize: "5rem", fontWeight: "bold",
                    }}>Loading...</p>
                ) : (
                    <p style={{
                        fontSize: "5rem", fontWeight: "bold",
                    }}>{counter ? counter.toNumber() : 'Loading...'}</p>
                )}

                {address && (  // Überprüfung, ob eine Wallet verbunden ist
                    <div className={styles.buttonContainer}>  
                        <Web3Button
                            className={styles.web3Button}
                            contractAddress={CONTRACT_ADDRESS}
                            action={(contract) => contract.call("decrement")}
                            onError={(error) => alert(error)}
                        >
                            -
                        </Web3Button>
                        <Web3Button
                            className={styles.web3Button}
                            contractAddress={CONTRACT_ADDRESS}
                            action={(contract) => contract.call("increment")}
                            onSuccess={() => alert( "incremented successfull" )}
                        >
                            +
                        </Web3Button>
                    </div>
                )}

                {/* Logik für die Anzeige des Reset-Buttons oder der Nachrichten */}
                {address == owner ? (
                    <Web3Button
                        className={styles.resetButton}  // Stil für den Reset-Button
                        contractAddress={CONTRACT_ADDRESS}
                        action={(contract) => contract.call("reset")}
                    >
                        Reset
                    </Web3Button>
                ) : address ? (
                    <p className={styles.notOwnerMessage}>You are not the owner of this contract.</p>  // Stil für die Nicht-Besitzer-Nachricht
                ) : (
                    <p className={styles.connectWalletMessage}>Connect your wallet to interact with the counter!</p>  // Stil für die Connect-Wallet-Nachricht
                )}
            </div>
        </div>
    </main>
);
                };

export default Home;