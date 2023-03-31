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
    const [xDaiTigerImages, setXDaiTigerImages] = useState([]);

    useEffect(() => {
        if (xDaiTokenIds.length === 0 && location.state) { 
            xDaiTigerContract.walletOfOwner(location.state.selectedAccount).then((resp) => {
                const xDaiTokenIds = resp.map(i => parseInt(i));
                setXDaiTokenIds(xDaiTokenIds);
            });
        }
    }, []);

    useEffect(() => {
        if(xDaiTigerImages.length === 0) {
            xDaiTokenIds.forEach(tokenId => { 
                console.log(`getting metadata for token: ${tokenId}`);
                xDaiTigerContract.tokenURI(tokenId).then((resp) => { 
                    const ipfsHash = resp.replace('ipfs://', '')
                    fetch(`https://ipfs.io/ipfs/${ipfsHash}`)
                        .then((resp) => resp.json())
                        .then((resp) => { 
                            const imageUrl = `https://ipfs.io/ipfs/${resp.image.replace('ipfs://', '')}`;
                            console.log(`imageUrl: ${imageUrl}`);
                            setXDaiTigerImages((xDaiTigerImages) => ([...xDaiTigerImages, imageUrl]))
                        });
                });
            });
        }
    }, [xDaiTokenIds]);

    const printTokenIds = (tokenIds) => { 
        var result = '';
        tokenIds.forEach((t, i) => { 
            result += t + ","
        })
        return result.substring(0, result.lastIndexOf(','));
    }

    const styles = {
        connectedWalletContainer: { 
            flex: 0.1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '15%',
            marginRight: '15%',
        },
        listTigersContainer: { 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '15%',
            marginRight: '15%',
            border: '1px red solid',
        },
        tigerImagesContainer: {
            display: 'flex',
            flexDirection: 'row',
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
        },
        tigerImage: { 
            width: 150,
            height: 150,
            marginRight: '5%',
            border: '5px white solid'
        }
    }

    if (location.state) { // only render if hitting route thru app flow
        return (
            <>
                <div style={styles.connectedWalletContainer}>
                    <div style={styles.selectedAccountText}>
                        Wallet: {shortenContractAddress(location.state.selectedAccount)}
                    </div>
                </div>
                <div style={styles.listTigersContainer}>
                    <div style={styles.selectedAccountText}>
                        xDai Token IDs: {printTokenIds(xDaiTokenIds)}
                    </div>
                    <div style={styles.tigerImagesContainer}>
                        {
                            xDaiTigerImages.map((imageUrl, index) => { 
                                return (
                                    <img 
                                        src={imageUrl}
                                        key={index}
                                        style={styles.tigerImage}
                                    />

                                );
                            })
                        }
                    </div>
                </div>
            </>
        );
    }

    return (
        <Navigate to={'/'} />
    )
    
}
export default ListAllTigers;