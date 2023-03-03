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
            fontSize: '60%',
            fontWeight: 'bold',
            textDecoration: 'underline',
        },
        footerText: { 
            textAlign: 'center',
            fontSize: '60%',
            fontWeight: 'bold',
        }
    }
    return (
        <div style={styles.container}>
            <div style={styles.linkText}>
                <a 
                    href={'https://linktr.ee/xdaitigers'} 
                    style={{color: '#FFFFFF'}}
                    target='_blank'
                    rel='noreferrer'
                >
                    https://linktr.ee/xdaitigers
                </a>
            </div>
            <div style={styles.footerText}>
                &nbsp;|&nbsp;
            </div>
            <div style={styles.linkText}>
                <a 
                    href={'https://discord.com/invite/kgg7jytAyp'} 
                    style={{color: '#FFFFFF'}}
                    target='_blank'
                    rel='noreferrer'
                >
                    Discord Invite
                </a>
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