const LandingPage = () => {
    const styles = {
        container: { 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '15%',
            marginRight: '15%',
            marginBottom: '5%',
        },
        placeholderText: { 
            textAlign: 'left',
        },
        buttonContainer: {
            border: '3px white solid',
            color: 'white',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            margin: '5%',
            borderRadius: 10,
            fontWeight: 'bold',
            cursor: 'pointer'             
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.placeholderText}>
                Placeholder text explaining how to use the transformer tool, including links to contract(s) on Blockscout.  Here's a few more sentences with some nonsense words to fill out the description a bit more.    
            </div>
            <div style={styles.buttonContainer}>
                Connect Wallet
            </div>
        </div>
    );
}
export default LandingPage;