import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { getContract, getProvider } from '../services/Web3Service';
import { shortenContractAddress } from '../utils/StringUtil';
import Button from '../components/Button';
import { Tiger } from '../models/Tiger';

import xDaiTigerABI from '../assets/xDaiContractAbi.json';
import gnosisTigerABI from '../assets/gnosisContractAbi.json';
import { logError } from '../utils/MetricUtils';

const ListAllTigers = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const provider = getProvider();
    
    const xDaiTigerAddress = '0x22570d137e36099700A9c80E5DDDd4a0d353f6c2';
    const xDaiTigerContract = getContract(xDaiTigerAddress, xDaiTigerABI, provider);
    const [xDaiTigers, setXDaiTigers] = useState([]);

    const gnosisTigerAddress = '0x789Ad63C76940E6D48c6A795f572528752451290';
    const gnosisTigerContract = getContract(gnosisTigerAddress, gnosisTigerABI, provider);
    const [gnosisTigers, setGnosisTigers] = useState([]);
    
    const [selectedTiger, setSelectedTiger] = useState({}); 
    const [isLookupCallComplete, setIsLookupCallComplete] = useState(false);

    const ipfsGateways = process.env.REACT_APP_IPFS_GATEWAYS.split(',');

    const retrieveTigers = async () => { 
        //confirm state reset each time we load tigers
        await resetState();

        xDaiTigerContract.walletOfOwner(location.state.selectedAccount)
            .then((resp) => {
                const xDaiTokenIds = resp.map(i => parseInt(i));
                xDaiTokenIds.forEach(tokenId => { 
                    xDaiTigerContract.tokenURI(tokenId).then((resp) => { 
                        const ipfsHash = resp.replace('ipfs://', '')
                        fetch(`${ipfsGateways[0]}/ipfs/${ipfsHash}`)
                            .then((resp) => resp.json())
                            .then((resp) => { 
                                const imageUrl = `${ipfsGateways[0]}/ipfs/${resp.image.replace('ipfs://', '')}`;
                                const xDaiTiger = new Tiger(tokenId, imageUrl, true);
                                setXDaiTigers((xDaiTigers) => ([...xDaiTigers, xDaiTiger]));
                            })
                            .catch(e => {
                                console.error(`error fetching 2d tiger images: ${JSON.stringify(e)}`);
                                logError(location.state.selectedAccount,'N/A',tokenId, false, e.message);
                            });
                    });
                });
            })
            .then(() => {
                gnosisTigerContract.walletOfOwner(location.state.selectedAccount)
                    .then((resp) => {
                        const gnosisTokenIds = resp.map(i => parseInt(i));
                        gnosisTokenIds.forEach((tokenId => { 
                            gnosisTigerContract.tokenURI(tokenId).then((resp) => { 
                            const ipfsHash = resp.replace('ipfs://', '')
                            fetch(`${ipfsGateways[0]}/ipfs/${ipfsHash}`)
                                .then((resp) => resp.json())
                                .then((resp) => { 
                                    const imageUrl = `${ipfsGateways[0]}/ipfs/${resp.image.replace('ipfs://', '')}`;
                                    const gnosisTiger = new Tiger(tokenId, imageUrl, false);
                                    setGnosisTigers((gnosisTigers) => ([...gnosisTigers, gnosisTiger]));
                                })
                                .catch(e => {
                                    console.error(`error fetching 3d tiger images: ${JSON.stringify(e)}`);
                                    logError(location.state.selectedAccount,'N/A',tokenId, true, e.message);
                                });
                                
                            });
                        }));
                        setIsLookupCallComplete(true);
                    })
                    .catch((err) => {
                        console.error(`error calling 3d walletOfOwner: ${JSON.stringify(err)}`);
                        logError(location.state.selectedAccount,'N/A','N/A', true, err.message);
                    });
            })
            .catch((err) => {
                console.error(`error calling 2d walletOfOwner: ${JSON.stringify(err)}`);
                logError(location.state.selectedAccount,'N/A','N/A', false, err.message);
            });
    };

    const resetState = async () => { 
        setXDaiTigers([]);
        setGnosisTigers([]);
        setSelectedTiger({});
        setIsLookupCallComplete(false);
    }

    useEffect(() => {
        const fetchAllTigers = async () => { 
            if ((xDaiTigers.length === 0 && gnosisTigers.length === 0) && location.state) { 
                await retrieveTigers();
            }   
        }
        fetchAllTigers();
    // eslint-disable-next-line
    }, []);

    const styles = {
        connectedWalletContainer: { 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
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
        },
        allTigersContainer: {
            display: 'flex',
            flexDirection: 'row',

            // TODO: figure out how to handle
            // overflowX without extra images
            // getting cut off
            flexWrap: 'wrap',
            // overflowX: 'scroll', 
            
            width: '90%',
            border: '5px white solid',
            marginLeft: '25%',
            marginRight: '25%',
            justifyContent: 'center',
        },
        tigerImage: { 
            width: 150,
            height: 150,
            margin: '1%',
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
            margin: '1%',
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
                    {(xDaiTigers.length === 0 && gnosisTigers.length === 0) && (
                        <div style={styles.bodyText}>
                            Wallet: {shortenContractAddress(location.state.selectedAccount)}
                            <br />
                        </div>
                    )}
                    {(xDaiTigers.length > 0 || gnosisTigers.length > 0) && (
                        <div style={styles.bodyText}>
                            Wallet: {shortenContractAddress(location.state.selectedAccount)}
                            <br /><br />
                            Select your xDai or Gnosis Tiger you wish to transform:
                        </div>
                    )}
                </div>
                <div style={styles.contentContainer}>
                    {(xDaiTigers.length === 0 && gnosisTigers.length === 0 && !isLookupCallComplete) && (
                        <div style={styles.bodyText}>
                            Loading Tigers...    
                        </div>
                    )}
                    {(xDaiTigers.length === 0 && gnosisTigers.length === 0 && isLookupCallComplete) && (
                        <div style={styles.bodyText}>
                            No tigers found connected to wallet!
                        </div>
                    )}
                    <div style={styles.allTigersContainer}>
                        {xDaiTigers.map((xDaiTiger) => { 
                                return (
                                    <>
                                        <img 
                                            src={xDaiTiger.imageUrl}
                                            key={xDaiTiger.id}
                                            alt={xDaiTiger.id}
                                            style={(selectedTiger.id === xDaiTiger.id) ? styles.selectedTigerImage : styles.tigerImage}
                                            onClick={() => {
                                                if(selectedTiger.id === xDaiTiger.id){
                                                    setSelectedTiger({});
                                                } else { 
                                                    setSelectedTiger(xDaiTiger);
                                                }
                                            }}
                                        />
                                    </>
                                );
                            })
                        }
                        {gnosisTigers.map((gnosisTiger) => { 
                                return (
                                    <>
                                        <img 
                                            src={gnosisTiger.imageUrl}
                                            key={gnosisTiger.id}
                                            alt={gnosisTiger.id}
                                            style={(selectedTiger.id === gnosisTiger.id) ? styles.selectedTigerImage : styles.tigerImage}
                                            onClick={() => {
                                                if(selectedTiger.id === gnosisTiger.id){
                                                    setSelectedTiger({});
                                                } else { 
                                                    setSelectedTiger(gnosisTiger);
                                                }
                                            }}
                                        />
                                    </>
                                );
                            })
                        }
                    </div>
                    <div style={styles.selectedTigerContainer}>
                        {selectedTiger.id && (
                            <>
                                <div style={styles.bodyText}>
                                    {selectedTiger.id}
                                </div>
                                <div style={styles.buttonRowContainer}>
                                    <Button 
                                        text={'TRANSFORM'}
                                        onClick={() => {
                                            console.log(`selectedAccount: ${location.state.selectedAccount}`);
                                            const state = {
                                                state: {
                                                    selectedTiger, 
                                                    selectedAccount: location.state.selectedAccount,
                                                }
                                            };
                                            navigate('/confirm-tiger-transform', state)
                                        }}
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
                        {!selectedTiger.id && (
                            <>
                                <div style={styles.buttonRowContainer}>
                                <Button 
                                    text={'TRANSFORM'}
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
                                    retrieveTigers();
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