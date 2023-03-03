import { useLocation } from 'react-router-dom';
import { shortenContractAddress } from '../utils/StringUtil';

const ListAllTigers = () => {
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
        headerText: { 
            textAlign: 'left',
            fontWeight: 'bold',
            textShadow: '2px 2px black',
        },
        selectedAccountText: { 
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: '75%',
            textShadow: '2px 2px black',
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.selectedAccountText}>
                Wallet: {shortenContractAddress(location.state.selectedAccount)}
            </div>
            <div style={styles.headerText}>
                List All Tigers View (TODO)
            </div>
        </div>
    );
}
export default ListAllTigers;