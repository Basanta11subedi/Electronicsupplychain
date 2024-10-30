// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract ElectronicsSupplyChain {
    
    // Define the struct for an electronics product
    struct ElectronicProduct {
        uint id;                       // Unique ID for each product
        string name;                   // Name of the product
        address manufacturer;          // Address of the manufacturer
        uint256 manufacturingDate;     // Manufacturing timestamp
        address qualityChecker;        // Address of the quality checker
        address distributor;           // Address of the distributor
        address retailer;              // Address of the retailer
        string status;                 // Current status of the product
    }

    // State variables
    mapping(uint => ElectronicProduct) public products; // Mapping of product ID to product
    uint public productCount;                           // Count of total products

    // Events for tracking product status
    event Manufactured(uint id, string name, address indexed manufacturer, uint256 manufacturingDate);
    event QualityChecked(uint id, address indexed qualityChecker);
    event Shipped(uint id, address indexed distributor);
    event Delivered(uint id, address indexed retailer);

    // Modifier to restrict access to the manufacturer
    modifier onlyManufacturer(uint _id) {
        require(products[_id].manufacturer == msg.sender, "Only the manufacturer can perform this action.");
        _;
    }

    // Modifier to restrict access to the quality checker
    modifier onlyQualityChecker(uint _id) {
        require(products[_id].qualityChecker == msg.sender, "Only the quality checker can perform this action.");
        _;
    }

    // Modifier to restrict access to the distributor
    modifier onlyDistributor(uint _id) {
        require(products[_id].distributor == msg.sender, "Only the distributor can perform this action.");
        _;
    }

    // Function to manufacture a new electronics product
    function manufactureProduct(string memory _name) public {
        productCount++;
        products[productCount] = ElectronicProduct({
            id: productCount,
            name: _name,
            manufacturer: msg.sender,
            manufacturingDate: block.timestamp,
            qualityChecker: address(0),
            distributor: address(0),
            retailer: address(0),
            status: "Manufactured"
        });
        emit Manufactured(productCount, _name, msg.sender, block.timestamp);
    }

    // Function to assign a quality checker and update status
    function assignQualityChecker(uint _id, address _qualityChecker) public onlyManufacturer(_id) {
        products[_id].qualityChecker = _qualityChecker;
        products[_id].status = "Assigned to Quality Check";
    }

    // Function for the quality checker to mark the product as checked
    function qualityCheck(uint _id) public onlyQualityChecker(_id) {
        products[_id].status = "Quality Checked";
        emit QualityChecked(_id, msg.sender);
    }

    // Function to ship the product to a distributor
    function shipProduct(uint _id, address _distributor) public onlyManufacturer(_id) {
        require(keccak256(abi.encodePacked(products[_id].status)) == keccak256("Quality Checked"), "Product must pass quality check first.");
        products[_id].distributor = _distributor;
        products[_id].status = "Shipped";
        emit Shipped(_id, _distributor);
    }

    // Function for the distributor to deliver the product to the retailer
    function deliverToRetailer(uint _id, address _retailer) public onlyDistributor(_id) {
        products[_id].retailer = _retailer;
        products[_id].status = "Delivered to Retailer";
        emit Delivered(_id, _retailer);
    }

    // Function for the retailer to mark the product as sold
    function markAsSold(uint _id) public {
        require(products[_id].retailer == msg.sender, "Only the assigned retailer can mark this product as sold.");
        products[_id].status = "Sold";
    }

    // Function to get detailed information of a product
    function getProductDetails(uint _id) public view returns (
        uint, string memory, address, uint256, address, address, address, string memory
    ) {
        ElectronicProduct memory p = products[_id];
        return (
            p.id, p.name, p.manufacturer, p.manufacturingDate, p.qualityChecker, p.distributor, p.retailer, p.status
        );
    }
}
