const Button = ({onClick, text}) => { 
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
        }
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