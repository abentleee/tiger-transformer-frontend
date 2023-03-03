import Button from '../components/Button';

const LandingPage = () => {
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
                Placeholder text explaining how to use the transformer tool,
                including links to contract(s) on Blockscout. 
                
                Here's a few more sentences with some nonsense words 
                to fill out the description a bit more.    
            </div>
            <Button 
                text={'Connect Wallet'}
                onClick={() => console.log('wallet connection button pressed!')}
            />
        </div>
    );
}
export default LandingPage;