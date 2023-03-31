import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getProvider } from '../services/Web3Service';
import { landingPageTexts } from '../utils/LandingPageTextUtils';

const LandingPage = () => {
    const navigate = useNavigate();

    const connectToMetamask = async () => { 
        try {         
            const provider = getProvider();
            const accounts = await provider.send("eth_requestAccounts", []);
            console.log(`accounts: ${JSON.stringify(accounts)}`)
            navigate('/list-all', {state: { selectedAccount: accounts[0]}, provider })
        } catch (ex) { 
            console.error(`exception caught during wallet connection: ${ex.reason}`);
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
        </div>
    );
}
export default LandingPage;