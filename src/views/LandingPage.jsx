import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getProvider } from '../services/Web3Service';

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
                Behold, the Portal of Transformation, where magic and technology converge to bring forth a wondrous creation: The Transformer. This incredible device enables your tigers to seamlessly transition between the 2D and 3D metaverses, opening up a whole new world of possibilities.
                <br/><br/>
                Through the power of the Transformer, your tigers can enter the portal and emerge in a completely different dimension, able to explore and interact with their surroundings in ways they never thought possible.
                <br/><br/>
                So step forth, brave tiger owner, and unleash the power of the Portal of Transformation. Your tigers will thank you for it, and you will be forever changed by the journey that awaits you.  
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