import Button from '../components/Button';
import { Link, useLocation } from 'react-router-dom';

const WrongBlockchainError = () => {
    const location = useLocation();

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
            textAlign: 'center',
            fontWeight: 'bold',
            paddingBottom: '2%',
            textShadow: '2px 2px black',
        },
        linkStyle: {
            textDecoration: 'none',
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.placeholderText}>
                Wrong Blockchain Selected! {location.state.networkName}
                <br /><br />
                Please setup/select the Gnosis blockchain
                <br />
                in Metamask to use xDai - Gnosis Transformer 2.0.
            </div>
            <div>
                <Link to={'/'} style={styles.linkStyle}>
                    <Button text={'Home'} />
                </Link>
            </div>
        </div>
    );
}
export default WrongBlockchainError;