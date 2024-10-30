

import { ethers } from "ethers"; // Import ethers at the top


import contractABI from "./contractABI.json";

const contractAddress = "0x262BA7b35C0863Db8f0ceFcB7d02592642906e20"; 

// Create a provider
const provider = new ethers.BrowserProvider(window.ethereum); // Using BrowserProvider for a web environment

// Get the signer from the provider
const getSigner = async () => {
    if (!window.ethereum) {
        console.error("Ethereum provider not found");
        return null;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
    return provider.getSigner(); // Get the signer
};

// Create a contract instance
const getContract = async () => {
    const signer = await getSigner();
    if (!signer) return null; // Ensure we have a signer
    return new ethers.Contract(contractAddress, contractABI, signer);
};

// Export the contract instance function
export { getContract };
