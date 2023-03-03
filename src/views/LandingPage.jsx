import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const ethers = require('ethers');

const LandingPage = (props) => {
    const navigate = useNavigate();
    const [selectedAccount, setSelectedAccount] = useState(undefined);

    const connectToMetamask = async () => { 
        try {         
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const accounts = await provider.send("eth_requestAccounts", []);
            console.log(`accounts: ${JSON.stringify(accounts)}`)
            setSelectedAccount(accounts[0]);
        } catch (ex) { 
            console.error(`exception caught during wallet connection: ${ex.reason}`);
            if(ex.reason === 'missing provider') { 
                navigate('/metamask-error')
            }
        }
    }

    const shortenAddressString = (contractAddress) => { 
        return contractAddress.substring(0, 10)+"...";
    }

    const styles = {
        container: { 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '5%',
            marginBottom: '5%',
            marginLeft: '15%',
            marginRight: '15%',
        },
        placeholderText: { 
            textAlign: 'left',
            fontWeight: 'bold',
            textShadow: '2px 2px black',
        },
    }

    return (
        <div style={styles.container}>
            <div style={styles.placeholderText}>
                Placeholder text explaining how to use the transformer tool,
                including links to contract(s) on Blockscout. 
                
                Here's a few more sentences with some nonsense words 
                to fill out the description a bit more.    
            </div>
            {selectedAccount && (
                <div style={styles.placeholderText}>
                    Selected Account: {shortenAddressString(selectedAccount)}
                </div>
            )}
            {!selectedAccount && (
            <Button 
                text={'Connect Wallet'}
                onClick={() => {
                    console.log('wallet connection button pressed!');
                    connectToMetamask();
                }}
            />
            )}
        </div>
    );
}
export default LandingPage;