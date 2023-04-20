import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { getContract, getProvider } from '../services/Web3Service';
import { shortenContractAddress } from '../utils/StringUtil';
import Button from '../components/Button';

import xDaiTigerABI from '../assets/xDaiContractAbi.json'

const ListAllTigers = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const provider = getProvider();
    
    const xDaiTigerAddress = '0x22570d137e36099700A9c80E5DDDd4a0d353f6c2';
    const xDaiTigerContract = getContract(xDaiTigerAddress, xDaiTigerABI, provider);
    
    const [xDaiTokenIds, setXDaiTokenIds] = useState([])
    const [xDaiTigerImages, setXDaiTigerImages] = useState([]);
    
    const [selectedTiger, setSelectedTiger] = useState(0); 

    const retrieveXDaiTigers = () => { 
        xDaiTigerContract.walletOfOwner(location.state.selectedAccount)
            .then((resp) => {
                const xDaiTokenIds = resp.map(i => parseInt(i));
                setXDaiTokenIds(xDaiTokenIds);
            })
            .catch((err) => {
                console.error(`error calling walletOfOwner: ${JSON.stringify(err)}`);
            });
    };

    const resetState = () => { 
        setXDaiTokenIds([]);
        setXDaiTigerImages([]);
        setSelectedTiger(0);
    }

    useEffect(() => {
        if (xDaiTokenIds.length === 0 && location.state) { 
            retrieveXDaiTigers();
        }
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(xDaiTigerImages.length === 0) {
            xDaiTokenIds.forEach(tokenId => { 
                xDaiTigerContract.tokenURI(tokenId).then((resp) => { 
                    const ipfsHash = resp.replace('ipfs://', '')
                    fetch(`https://ipfs.io/ipfs/${ipfsHash}`)
                        .then((resp) => resp.json())
                        .then((resp) => { 
                            const imageUrl = `https://ipfs.io/ipfs/${resp.image.replace('ipfs://', '')}`;
                            setXDaiTigerImages((xDaiTigerImages) => ([...xDaiTigerImages, imageUrl]));
                        });
                });
            });
        }
    // eslint-disable-next-line
    }, [xDaiTokenIds]);

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
        contentContainer: { 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            // border: '1px blue solid',
        },
        allTigersContainer: {
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'scroll',
            border: '5px white solid',
            paddingLeft: '5%',
            paddingRight: '5%',

        },
        tigerImage: { 
            width: 150,
            height: 150,
            margin: '2%',
            border: '2px white solid',
            cursor: 'pointer',
        },
        selectedTigerContainer: { 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        selectedTigerImage: { 
            width: 150,
            height: 150,
            margin: '2%',
            border: '2px red solid',
            cursor: 'pointer',
        },
        headerText: { 
            textAlign: 'left',
            fontWeight: 'bold',
            textShadow: '2px 2px black',
        },
        bodyText: { 
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '75%',
            textShadow: '2px 2px black',
        },
        clickableLink: {
            textDecoration: 'underline', 
            cursor: 'pointer'
        },
        buttonRowContainer: {
            display: 'flex', 
            flexDirection: 'row',
        }
    }

    if (location.state) { // only render if hitting route thru app flow
        return (
            <>
                <div style={styles.connectedWalletContainer}>
                    {xDaiTigerImages.length === 0 && (
                        <div style={styles.bodyText}>
                            Wallet: {shortenContractAddress(location.state.selectedAccount)}
                        </div>
                    )}
                    {xDaiTigerImages.length > 0 && (
                        <div style={styles.bodyText}>
                            Wallet: {shortenContractAddress(location.state.selectedAccount)}
                            <br /><br />
                            Select your xDai or Gnosis Tiger you wish to transform:
                        </div>
                    )}
                </div>
                <div style={styles.contentContainer}>
                    {(xDaiTigerImages.length === 0) && (
                        <div style={styles.bodyText}>
                            Loading Tigers...    
                        </div>
                    )}
                    <div style={styles.allTigersContainer}>
                        {xDaiTigerImages.map((imageUrl, index) => { 
                                return (
                                    <>
                                        <img 
                                            src={imageUrl}
                                            key={xDaiTokenIds[index]}
                                            alt={xDaiTokenIds[index]}
                                            style={(selectedTiger === xDaiTokenIds[index]) ? styles.selectedTigerImage : styles.tigerImage}
                                            onClick={() => {
                                                if(selectedTiger === xDaiTokenIds[index]){
                                                    setSelectedTiger(0);
                                                } else { 
                                                    setSelectedTiger(xDaiTokenIds[index]);
                                                }
                                            }}
                                        />
                                    </>
                                );
                            })
                        }
                    </div>
                    <div style={styles.selectedTigerContainer}>
                        {selectedTiger !== 0 && (
                            <>
                                <div style={styles.bodyText}>
                                    {selectedTiger}
                                </div>
                                <div style={styles.buttonRowContainer}>
                                <Button 
                                    text={'TRANSFORM'}
                                    onClick={() => console.log('transform button pressed')}
                                />
                                <Button 
                                    text={'HOME'}
                                    onClick={() => {
                                        resetState();
                                        navigate('/');
                                    }}
                                />
                                </div>
                            </>
                        )}
                        {selectedTiger === 0 && (
                            <>
                                <div style={styles.buttonRowContainer}>
                                <Button 
                                    text={'TRANSFORM'}
                                    onClick={() => console.log('transform button pressed')}
                                    disabled={true}
                                />
                                <Button 
                                    text={'HOME'}
                                    onClick={() => {
                                        resetState();
                                        navigate('/');
                                    }}
                                />
                                </div>
                            </>
                        )}
                        <br />
                        <div style={styles.bodyText}>
                            Not seeing expected tigers?
                            <br/>
                            <div 
                                style={styles.clickableLink}
                                onClick={() => {
                                    resetState();
                                    retrieveXDaiTigers();
                                }}
                            >
                                Reload</div>
                            <br/>
                        </div>
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