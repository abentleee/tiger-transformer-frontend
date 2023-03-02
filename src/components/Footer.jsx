const Footer = () => { 
    const styles = { 
        container: { 
            marginBottom: '4vh',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
        },
        linkText: { 
            textAlign: 'center',
            fontSize: '75%',
            fontWeight: 'bold',
            textDecoration: 'underline',
        },
        footerText: { 
            textAlign: 'center',
            fontSize: '75%',
            fontWeight: 'bold',
        }
    }
    return (
        <div style={styles.container}>
            <div style={styles.linkText}>
                <a href={'/todo'} style={{color: '#FFFFFF'}}>https://linktr.ee/tigers</a>
            </div>
            <div style={styles.footerText}>
                &nbsp;|&nbsp;
            </div>
            <div style={styles.linkText}>
                <a href={'/todo'} style={{color: '#FFFFFF'}}>Discord Invite</a>
            </div>
            <div style={styles.footerText}>
                &nbsp;|&nbsp;
            </div>
            <div style={styles.linkText}>
                <a href={'/todo'} style={{color: '#FFFFFF'}}>Credits</a>
            </div>
        </div>
    );
};

export default Footer;