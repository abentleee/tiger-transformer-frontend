import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { getContract, getProvider } from '../services/Web3Service';
import { shortenContractAddress } from '../utils/StringUtil';
import xDaiTigerABI from '../assets/xDaiContractAbi.json'

const ListAllTigers = () => {
    const location = useLocation();
    const provider = getProvider();
    
    const xDaiTigerAddress = '0x22570d137e36099700A9c80E5DDDd4a0d353f6c2';
    const xDaiTigerContract = getContract(xDaiTigerAddress, xDaiTigerABI, provider);
    const [xDaiTokenIds, setXDaiTokenIds] = useState([])

    useEffect(() => {
        if (xDaiTokenIds.length === 0 && location.state) { 
            xDaiTigerContract.walletOfOwner(location.state.selectedAccount).then((resp) => {
                const tokenIds = resp.map(i => parseInt(i));
                setXDaiTokenIds(tokenIds);
            });
        }
    }, []);

    const printTokenIds = (tokenIds) => { 
        var result = '';
        tokenIds.forEach((t, i) => { 
            result += t + ","
        })
        return result.substring(0, result.lastIndexOf(','));
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

    if (location.state) { // only render if hitting route thru app flow
        return (
            <div style={styles.container}>
                <div style={styles.selectedAccountText}>
                    Wallet: {shortenContractAddress(location.state.selectedAccount)}
                    <br />
                    xDai Token IDs: {printTokenIds(xDaiTokenIds)}
                </div>
                <div style={styles.headerText}>
                    List All Tigers View (TODO)
                </div>
            </div>
        );
    }

    return (
        <Navigate to={'/'} />
    )
    
}
export default ListAllTigers;