import React, { useState } from "react";
import { getContract } from "./contract";

function App() {
    const [productName, setProductName] = useState("");
    const [productId, setProductId] = useState(null);
    const [qualityChecker, setQualityChecker] = useState("");
    const [distributor, setDistributor] = useState("");
    const [retailer, setRetailer] = useState("");

    const handleManufactureProduct = async () => {
        try {
            const contract = getContract();
            if (contract) {
                const tx = await contract.manufactureProduct(productName);
                await tx.wait();
                console.log("Product manufactured:", tx);
            }
        } catch (error) {
            console.error("Error manufacturing product:", error);
        }
    };

    const handleGetProductDetails = async () => {
        try {
            const contract = getContract();
            if (contract) {
                const product = await contract.getProductDetails(productId);
                console.log("Product details:", product);
            }
        } catch (error) {
            console.error("Error getting product details:", error);
        }
    };

    const handleAssignQualityChecker = async () => {
        try {
            const contract = getContract();
            if (contract) {
                const tx = await contract.assignQualityChecker(productId, qualityChecker);
                await tx.wait();
                console.log("Quality checker assigned:", tx);
            }
        } catch (error) {
            console.error("Error assigning quality checker:", error);
        }
    };

    const handleShipProduct = async () => {
        try {
            const contract = getContract();
            if (contract) {
                const tx = await contract.shipProduct(productId, distributor);
                await tx.wait();
                console.log("Product shipped:", tx);
            }
        } catch (error) {
            console.error("Error shipping product:", error);
        }
    };

    const handleDeliverToRetailer = async () => {
        try {
            const contract = getContract();
            if (contract) {
                const tx = await contract.deliverToRetailer(productId, retailer);
                await tx.wait();
                console.log("Product delivered to retailer:", tx);
            }
        } catch (error) {
            console.error("Error delivering to retailer:", error);
        }
    };

    const handleMarkAsSold = async () => {
        try {
            const contract = getContract();
            if (contract) {
                const tx = await contract.markAsSold(productId);
                await tx.wait();
                console.log("Product marked as sold:", tx);
            }
        } catch (error) {
            console.error("Error marking product as sold:", error);
        }
    };

    return (
        <div className="App">
            <h1>Electronics Supply Chain</h1>

            <h2>Manufacture Product</h2>
            <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
            />
            <button onClick={handleManufactureProduct}>Manufacture Product</button>

            <h2>Get Product Details</h2>
            <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter product ID"
            />
            <button onClick={handleGetProductDetails}>Get Product Details</button>

            <h2>Assign Quality Checker</h2>
            <input
                type="text"
                value={qualityChecker}
                onChange={(e) => setQualityChecker(e.target.value)}
                placeholder="Enter quality checker address"
            />
            <button onClick={handleAssignQualityChecker}>Assign Quality Checker</button>

            <h2>Ship Product</h2>
            <input
                type="text"
                value={distributor}
                onChange={(e) => setDistributor(e.target.value)}
                placeholder="Enter distributor address"
            />
            <button onClick={handleShipProduct}>Ship Product</button>

            <h2>Deliver to Retailer</h2>
            <input
                type="text"
                value={retailer}
                onChange={(e) => setRetailer(e.target.value)}
                placeholder="Enter retailer address"
            />
            <button onClick={handleDeliverToRetailer}>Deliver to Retailer</button>

            <h2>Mark as Sold</h2>
            <button onClick={handleMarkAsSold}>Mark Product as Sold</button>
        </div>
    );
}

export default App;
