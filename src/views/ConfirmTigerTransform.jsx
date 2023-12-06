import { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { shortenContractAddress } from '../utils/StringUtil';
import { getContract, getProvider } from '../services/Web3Service';
import transformContractABI from '../assets/transformContractAbi.json';
import xDaiTigerABI from '../assets/xDaiContractAbi.json';
import gnosisTigerABI from '../assets/gnosisContractAbi.json';
import { Dna } from 'react-loader-spinner';
import { logSuccessfulTigerTransformation } from '../utils/MetricUtils';

const ConfirmTigerTransformation = () => { 
    const location = useLocation();
    const navigate = useNavigate();
    const provider = getProvider();

    const xDaiTigerAddress = '0x22570d137e36099700A9c80E5DDDd4a0d353f6c2';
    const gnosisTigerAddress = '0x789Ad63C76940E6D48c6A795f572528752451290';
    const transformContractAddress = '0xb41C2115ee5481ce9036Bcf69eb8fB75Bb7e74EF';

    const [isTransforming, setIsTransforming] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');

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
            width: 250,
            height: 250,
            margin: '2%',
            border: '2px red solid',
        },
        linkStyle: { 
            color: 'white',
        }
    }

    if (location.state) {
        const selectedTiger = location.state.selectedTiger;
        const selectedAccount = location.state.selectedAccount;
        
        const xDaiTigerContract = getContract(xDaiTigerAddress, xDaiTigerABI, provider);
        const gnosisTigerContract = getContract(gnosisTigerAddress, gnosisTigerABI, provider);
        

        if (isTransforming) { 
            return (
                <div style={styles.container}>
                    <div style={styles.headerText}>
                        Your tiger is being transformed, just a moment...
                    </div>
                    <div style={styles.tigerContainer}>
                        <Dna
                            visible={true}
                            height='250'
                            width='250'
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                        {transactionHash !== '' && (
                            <div style={styles.headerText}> 
                                Confirmation: 
                                <br/>
                                <a 
                                    href={`https://blockscout.com/xdai/mainnet/tx/${transactionHash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={styles.linkStyle}
                                >
                                    {shortenContractAddress(transactionHash)}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )
        }

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
                        onClick={async () => {
                            setIsTransforming(true);

                            if (selectedTiger.isXDaiTiger) { 
                                console.log("calling Nft2Dto3D contract");

                                const signer = await provider.getSigner(selectedAccount);
                                const transformContract = getContract(transformContractAddress, transformContractABI, signer);

                                transformContract.Nft2DTo3D(selectedTiger.id)
                                    .then((resp) => {
                                        const txHash = resp.hash;
                                        setTransactionHash(txHash);
                                        provider.waitForTransaction(txHash)
                                            .then((receipt) => {
                                                console.log(`transaction receipt for ${txHash}: ${JSON.stringify(receipt)}`);
                                                gnosisTigerContract.tokenURI(selectedTiger.id)
                                                    .then((resp) => {
                                                        logSuccessfulTigerTransformation(
                                                            selectedAccount,
                                                            txHash,
                                                            selectedTiger.id,
                                                            false,
                                                        );

                                                        const ipfsHash = resp.replace('ipfs://', '');
                                                        fetch(`https://ipfs.io/ipfs/${ipfsHash}`)
                                                        .then((resp) => resp.json())
                                                        .then((resp) => { 
                                                            const imageUrl = `https://ipfs.io/ipfs/${resp.image.replace('ipfs://', '')}`;
                                                            navigate('/display-transformation', {
                                                                state: { 
                                                                    id: selectedTiger.id,
                                                                    imageUrl,
                                                                    transactionHash: txHash,
                                                                }
                                                            });
                                                            setIsTransforming(false);
                                                            setTransactionHash('');
                                                        }).catch((error) => {
                                                            // retry image load once, then bail if it don't work
                                                            const ipfsHash = resp.replace('ipfs://', '');
                                                            fetch(`https://ipfs.io/ipfs/${ipfsHash}`)
                                                            .then((resp) => resp.json())
                                                            .then((resp) => { 
                                                                const imageUrl = `https://ipfs.io/ipfs/${resp.image.replace('ipfs://', '')}`;
                                                                navigate('/display-transformation', {
                                                                    state: { 
                                                                        id: selectedTiger.id,
                                                                        imageUrl,
                                                                        transactionHash: txHash,
                                                                    }
                                                                });
                                                                setIsTransforming(false);
                                                                setTransactionHash('');
                                                            }).catch((error) => { 
                                                                // TODO: figure out what to do if it dies here
                                                            });
                                                        });
                                                    })
                                            })
                                    }).catch(err => {
                                        console.log('error caught on Nft2D->3D transform');
                                        console.error(err);
                                        setIsTransforming(false);
                                    });
                            }
                            else { 
                                console.log("calling Nft3Dto32 contract");
                                
                                const signer = await provider.getSigner(selectedAccount);
                                const transformContract = getContract(transformContractAddress, transformContractABI, signer);

                                transformContract.Nft3DTo2D(selectedTiger.id)
                                    .then((resp) => {
                                        console.log('3D->2D response: '+JSON.stringify(resp));
                                        const txHash = resp.hash;
                                        setTransactionHash(txHash);
                                        provider.waitForTransaction(txHash)
                                            .then((receipt) => {
                                                console.log(`transaction receipt for ${txHash}: ${JSON.stringify(receipt)}`);
                                                xDaiTigerContract.tokenURI(selectedTiger.id)
                                                    .then((resp) => {
                                                        logSuccessfulTigerTransformation(
                                                            selectedAccount,
                                                            txHash,
                                                            selectedTiger.id,
                                                            true,
                                                        );

                                                        const ipfsHash = resp.replace('ipfs://', '');
                                                        fetch(`https://ipfs.io/ipfs/${ipfsHash}`)
                                                        .then((resp) => resp.json())
                                                        .then((resp) => { 
                                                            const imageUrl = `https://ipfs.io/ipfs/${resp.image.replace('ipfs://', '')}`;
                                                            navigate('/display-transformation', {
                                                                state: { 
                                                                    id: selectedTiger.id,
                                                                    imageUrl,
                                                                    transactionHash: txHash
                                                                }
                                                            });
                                                            setIsTransforming(false);
                                                            setTransactionHash('');
                                                        }).catch((error) => { 
                                                            // retry image load once, then bail if it don't work
                                                            const ipfsHash = resp.replace('ipfs://', '');
                                                            fetch(`https://ipfs.io/ipfs/${ipfsHash}`)
                                                            .then((resp) => resp.json())
                                                            .then((resp) => { 
                                                                const imageUrl = `https://ipfs.io/ipfs/${resp.image.replace('ipfs://', '')}`;
                                                                navigate('/display-transformation', {
                                                                    state: { 
                                                                        id: selectedTiger.id,
                                                                        imageUrl,
                                                                        transactionHash: txHash,
                                                                    }
                                                                });
                                                                setIsTransforming(false);
                                                                setTransactionHash('');
                                                            }).catch((error) => { 
                                                                // TODO: figure out what to do if it dies here
                                                            });
                                                        });
                                                    })
                                            });
                                    }).catch(err => {
                                        console.log('error caught on Nft3D->2D transform');
                                        console.error(err);
                                        setIsTransforming(false);
                                    });
                            } 

                            
                            
                    }}
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