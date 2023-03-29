import { useEffect, useState } from 'react';

const Fader = ({text}) => { 
    const [fadeProp, setFadeProp] = useState('fade-in');

    useEffect(() => { 
        setInterval(() => { 
            setFadeProp(fadeProp === 'fade-in' ? 'fade-out' : 'fade-in');
        }, [3000]);
    }, [fadeProp]);

    const styles = {
        fadeIn: { 
            transition: "opacity 1s ease",
        },
        fadeOut: { 
            opacity: 0,
            transition: "opacity 0.5s ease",
        }
    }

    return (
        <div style={fadeProp === 'fade-out' ? styles.fadeOut : styles.fadeIn}>
            {text}
        </div>
    );
}

export default Fader;