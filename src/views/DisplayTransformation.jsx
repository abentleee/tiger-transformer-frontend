import { Navigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { shortenContractAddress } from '../utils/StringUtil';

const DisplayTransformation = () => { 
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
        tigerContainer: { 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        tigerImage: { 
            width: 250,
            height: 250,
            margin: '2%',
            border: '1px white solid',
        },
        placeholderText: { 
            textAlign: 'left',
            fontWeight: 'bold',
            paddingBottom: '2%',
            textShadow: '2px 2px black',
        },
        bodyText: { 
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '75%',
            textShadow: '2px 2px black',
        },
        linkStyle: {
            textDecoration: 'none',
        },
        url: { 
            color: 'white',
        }
    }

    if (location.state) { 
        const transformedId = location.state.id;
        const transformedImageUrl = location.state.imageUrl;
        const transactionHash = location.state.transactionHash;

        return (
            <div style={styles.container}>
                <div style={styles.placeholderText}>
                    Your transformation is complete!
                </div>
                <div style={styles.bodyText}>
                    <div style={styles.tigerContainer}>
                    <img 
                        style={styles.tigerImage}
                        src={transformedImageUrl}
                        key={transformedId}
                        alt={transformedId}
                    />
                    <div style={styles.bodyText}>
                        {transformedId}
                        <br />
                        Confirmation:{' '}
                        <a 
                            href={`https://blockscout.com/xdai/mainnet/tx/${transactionHash}`}
                            target="_blank"
                            rel="noreferrer"
                            style={styles.url}
                        >
                            {shortenContractAddress(transactionHash)}
                        </a>
                        <br /><br />
                    </div>
                </div>
                </div>
                <div>
                    <Link to={'/'} style={styles.linkStyle}>
                        <Button text={'Home'} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <Navigate to={'/'} />
    );
};

export default DisplayTransformation;