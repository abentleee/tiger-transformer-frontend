import { useLocation, Navigate } from 'react-router-dom';

const ConfirmTigerTransformation = () => { 
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
            textAlign: 'center',
            fontWeight: 'bold',
            paddingBottom: '2%',
            textShadow: '2px 2px black',
        }
    }

    if (location.state) {
        return (
            <div style={styles.container}>
                <div style={styles.headerText}>
                    Confirm Tiger Transform View
                </div>
                {location.state.selectedTiger.id} | {location.state.selectedTiger.imageUrl}
            </div>
        );
    }

    return (
        <Navigate to={'/'} />
    );
};

export default ConfirmTigerTransformation;