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
            textShadow: '2px 2px black',
        },
    }

    return (
        <div style={styles.container}>
            <div style={styles.placeholderText}>
                Link not found!
            </div>
        </div>
    );
}
export default NotFound;