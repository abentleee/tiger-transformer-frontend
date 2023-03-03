import Button from '../components/Button';
import { Link } from 'react-router-dom';

const NotFound = () => {
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
                Link Not Found!
            </div>
            <div>
                <Link to={'/'} style={styles.linkStyle}>
                    <Button text={'Home'} />
                </Link>
            </div>
        </div>
    );
}
export default NotFound;