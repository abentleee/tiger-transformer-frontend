import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getProvider } from '../services/Web3Service';
import { landingPageTexts } from '../utils/LandingPageTextUtils';
import packageJson from '../../package.json'

const LandingPage = () => {
    const navigate = useNavigate();

    console.log(`ipfs gateways: ${process.env.REACT_APP_IPFS_GATEWAYS}`);

    const connectToMetamask = async () => { 
        try {         
            const provider = getProvider();
            console.log(`provider: ${JSON.stringify(provider)}`)
            const accounts = await provider.send("eth_requestAccounts", []);
            console.log(`accounts: ${JSON.stringify(accounts)}`)

            const network = await provider.getNetwork();
            console.log(`network: ${JSON.stringify(network)}`);

            if(network.name === 'xdai') {
                navigate('/list-all', {state: { selectedAccount: accounts[0]}, provider })
            } else { 
                navigate('/wrong-blockchain-error', {state: {networkName: network.name}});
            }
        } catch (ex) { 
            console.error(`exception caught during wallet connection: ${ex}`);
            if(ex.reason === 'missing provider') { 
                navigate('/metamask-error')
            }
        }
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
        appVersionText: { 
            textAlign: 'left',
            fontWeight: 'bold',
            textShadow: '2px 2px black',
            fontSize: '60%',
            padding: '1%',
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.placeholderText}>
                {/*
                TODO: figure out how to handle this properly later 
                <Fader 
                    text={landingPageTexts}
                /> 
                */}
                {landingPageTexts[0]}
                <br /><br />
                {landingPageTexts[3]}
                <br /><br />
                {landingPageTexts[4]}
                <br />
            </div>
            <Button 
                text={'Connect Wallet'}
                onClick={() => {
                    console.log('wallet connection button pressed!');
                    connectToMetamask();
                }}
            />
            <div style={styles.appVersionText}>
                v{packageJson.version}
            </div>
        </div>
    );
}
export default LandingPage;