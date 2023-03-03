const ethers = require('ethers');
    
export const getProvider = () => { 
    return new ethers.providers.Web3Provider(window.ethereum);;
}

export const getContract = (address, abi, provider) => {
    return new ethers.Contract(address, abi, provider);
}
