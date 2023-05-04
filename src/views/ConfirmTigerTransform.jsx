import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { shortenContractAddress } from '../utils/StringUtil';

const ConfirmTigerTransformation = () => { 
    const location = useLocation();
    const navigate = useNavigate();

    const styles = { 
        container: { 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        tigerContainer: { 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonRowContainer: {
            display: 'flex', 
            flexDirection: 'row',
        },
        headerText: { 
            textAlign: 'center',
            fontWeight: 'bold',
            paddingBottom: '2%',
            fontSize: '75%',
            textShadow: '2px 2px black',
        },
        bodyText: { 
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '75%',
            textShadow: '2px 2px black',
        },
        selectedTigerImage: { 
            width: 150,
            height: 150,
            margin: '2%',
            border: '2px red solid',
        },
    }

    if (location.state) {
        const selectedTiger = location.state.selectedTiger;
        const selectedAccount = location.state.selectedAccount;

        return (
            <div style={styles.container}>
                <div style={styles.headerText}>
                    Wallet: {shortenContractAddress(selectedAccount)}
                    <br /><br/>
                    Are you sure you want to transform this tiger? 
                    <br />
                    A small amount of gas will be charged to transform.
                </div>
                <div style={styles.tigerContainer}>
                    <img 
                        style={styles.selectedTigerImage}
                        src={selectedTiger.imageUrl}
                        key={selectedTiger.id}
                        alt={selectedTiger.id}
                    />
                    <div style={styles.bodyText}>
                        {selectedTiger.id}
                    </div>
                </div>
                <div style={styles.buttonRowContainer}>
                    <Button 
                        text={'TRANSFORM'}
                        onClick={() => console.log(`transform invoked!`)}
                    />
                    <Button 
                        text={'HOME'}
                        onClick={() => {
                            navigate('/');
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <Navigate to={'/'} />
    );
};

export default ConfirmTigerTransformation;