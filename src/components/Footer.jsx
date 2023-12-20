import { useState } from 'react';
import Modal from 'react-modal';

const Footer = () => { 
    Modal.setAppElement('#root');

    const [modalVisible, setModalVisible] = useState(false);

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
            color: '#FFFFFF',
            cursor: 'pointer',
        },
        footerText: { 
            textAlign: 'center',
            fontSize: '60%',
            fontWeight: 'bold',
        }
    }
    return (
        <div style={styles.container}>
            <Modal 
                isOpen={modalVisible}
                style={{
                    flex: 0.25,
                    display: 'flex',
                }}
            >
                <div 
                    onClick={() => setModalVisible(false)}
                    style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'end',
                        cursor: 'pointer',
                    }}
                >
                    ❌
                </div>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    paddingTop: '20%',
                }}>
                    <div style={{
                        display: 'flex',
                        flex: 0.25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'left',
                    }}>
                        xDai/Gnosis Tigers Original Concept
                        <br/>
                        Transformer 1.0 Design
                        <br />
                        Transformer 1.0 Development
                        <br/>
                        Transformer 2.0 Design
                        <br/>
                        Transformer 2.0 Development
                    </div>
                    <div >
                        ☀ B3NNY | xDai Tigers#9736
                        <br/>
                        Contributor#1234
                        <br />
                        Contributor#1234
                        <br/>
                        <a href="https://github.com/abentleee" target="_blank" rel="noopener noreferrer">abentleee | BeachSleeper Development</a>
                        <br/>
                        <a href="https://github.com/abentleee" target="_blank" rel="noopener noreferrer">abentleee | BeachSleeper Development</a>
                    </div>
                </div>
            </Modal>
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
            <div 
                style={styles.linkText}
                onClick={() => setModalVisible(true)}
            >
                Credits
            </div>
        </div>
    );
};

export default Footer;