const Header = () => { 
    const styles = { 
        container: { 
            marginTop: '3vh',
            marginRight: '2%',
            textAlign: 'right',
        },
        headerText: { 
            fontWeight: 'bold',
            fontSize: '150%',
        }
    }
    return (
        <div style={styles.container}>
            <div style={styles.headerText}>
                xDai - Gnosis<br/>Transformer 2.0
            </div>
        </div>
    );
};

export default Header;