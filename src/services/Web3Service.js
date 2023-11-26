const { ethers } = require('ethers');
    
export const getProvider = () => { 
    return new ethers.BrowserProvider(window.ethereum);
}

export const getContract = (address, abi, provider) => {
    return new ethers.Contract(address, abi, provider);
}
