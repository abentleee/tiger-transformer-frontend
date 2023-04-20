const Button = ({onClick, text, disabled}) => { 
    const styles = { 
        buttonContainer: {
            border: '1px white solid',
            color: 'white',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: '5%',
            borderRadius: 10,
            fontWeight: 'bold',
            cursor: 'pointer',
            textShadow: '2px 2px black',
            backgroundColor: '#5F6964',
            boxShadow: '2px 2px black',
        },
        disabledButtonContainer: {
            border: '1px white solid',
            color: 'white',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: '5%',
            borderRadius: 10,
            fontWeight: 'bold',
            textShadow: '2px 2px black',
            cursor: 'not-allowed',
            backgroundColor: '#BEBEBE',
            boxShadow: '2px 2px black',
        }
    }
    
    if (disabled) { 
        return (
            <div style={styles.disabledButtonContainer}>
                {text}
            </div>
        );
    }

    return (
        <div 
            style={styles.buttonContainer}
            onClick={onClick}
        >
            {text}
        </div>
    );
}
export default Button;