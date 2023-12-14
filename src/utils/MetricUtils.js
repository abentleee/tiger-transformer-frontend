import { Buffer } from 'buffer';

export const logSuccessfulTigerTransformation = async (
    walletAddress, 
    txHash, 
    tigerId, 
    is3DTo2DTransformation
) => {
    console.log(`Wallet ${walletAddress} successfully transformed tiger ${tigerId} ${is3DTo2DTransformation ? 'from 3D to 2D' : 'from 2D to 3D'} with transaction hash ${txHash}`);
    
    // send request with creds in env
    const host = `${process.env.REACT_APP_TIGER_TRANSFORMER_FEEDBACK_API_HOST}/api/v1/success`;
    const username = process.env.REACT_APP_TIGER_TRANSFORMER_FEEDBACK_API_USER;
    const password = process.env.REACT_APP_TIGER_TRANSFORMER_FEEDBACK_API_PASSWORD;

    const authorization = `Basic ${base64Encode(username + ':' + password)}`;
    const requestBody = {
        browserInfo: navigator.userAgent,
        walletAddress,
        txHash,
        tigerId,
        is3DTo2DTransformation,
        authorization
    };
    const options = {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    };

    await fetch(host, options);    
}

export const logError = async (
    walletAddress, 
    txHash, 
    tigerId, 
    is3DTo2DTransformation,
    error
) => {
    console.log(`logging error for wallet ${walletAddress} transforming tiger ${tigerId} ${is3DTo2DTransformation ? 'from 3D to 2D' : 'from 2D to 3D'} with transaction hash ${txHash}: ${error}`);

    // send request with creds in env
    const host = `${process.env.REACT_APP_TIGER_TRANSFORMER_FEEDBACK_API_HOST}/api/v1/error`;
    const username = process.env.REACT_APP_TIGER_TRANSFORMER_FEEDBACK_API_USER;
    const password = process.env.REACT_APP_TIGER_TRANSFORMER_FEEDBACK_API_PASSWORD;

    const authorization = `Basic ${base64Encode(username + ':' + password)}`;
    const requestBody = {
        browserInfo: navigator.userAgent,
        walletAddress,
        txHash,
        tigerId,
        is3DTo2DTransformation,
        error,
        authorization
    };
    const options = {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    };

    await fetch(host, options);    
}

const base64Encode = (str) => {
    return Buffer.from(str).toString('base64');
}