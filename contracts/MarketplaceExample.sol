// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IHierarchicalDrawing.sol";

contract MarketplaceReceiver is Ownable {
    event PackPurchased(address indexed buyer, uint32 amount);

    struct PackInfo {
        uint256 basePrice;
        uint32[] poolsID;
        uint32[] amounts;
    }
    mapping (address => uint256) public totalAmount;
    mapping (uint32 => PackInfo) public packsInfo;

    address public basePaymentToken;
    IHierarchicalDrawing public drawContract;
    
    constructor(
        address _basePaymentToken,
        address _initialAdmin
    ) Ownable(_initialAdmin){
        basePaymentToken = _basePaymentToken;
    }
    
    function setDrawContract(address _drawContract) public onlyOwner {
        drawContract = IHierarchicalDrawing(_drawContract);
    }

    // @dev Function to set the pack
    function setPack(uint32 _packID, uint256 _packPrice, uint32[] memory _poolsID, uint32[] memory _amounts) external onlyOwner {
        packsInfo[_packID].basePrice = _packPrice;
        packsInfo[_packID].poolsID = _poolsID;
        packsInfo[_packID].amounts = _amounts;
    }

    // Function to purchase a game pack
    function purchasePack(address _token, uint32 _packID, uint32 _packAmounts) external {
        uint256 basePrice = packsInfo[_packID].basePrice;
        uint256 totalPayment;
        address purchaser = msg.sender;
        ERC20 paymentToken = ERC20(_token);

        require(_packAmounts > 0, "Pack amount must be greater than 0");

        totalPayment = _packAmounts*basePrice;
        
        // Check if the purchaser has enough allowance and balance
        require(
            paymentToken.allowance(purchaser, address(this)) >= totalPayment,
            "Insufficient allowance"
        );
        require(
            paymentToken.balanceOf(purchaser) >= totalPayment,
            "Insufficient balance"
        );

        // Transfer tokens from buyer to contract
        require(
            paymentToken.transferFrom(purchaser, address(this), totalPayment),
            "Token transfer failed"
        );

        setPurchasedInfo(purchaser, _packID, _packAmounts);
        emit PackPurchased(purchaser, _packAmounts);
    }

    function setPurchasedInfo(
        address _purchaser, 
        uint32 _packID,
        uint32 _packAmounts
    ) internal {
        uint32[] memory _pools = packsInfo[_packID].poolsID;
        uint32[] memory _amounts = packsInfo[_packID].amounts;
        uint32[] memory totalAmounts = new uint32[](_amounts.length);

        uint32 curDrawable;
        for(uint256 i; i<_amounts.length; i++) {
            curDrawable = drawContract.getUserDrawable(_purchaser, _pools[i]);
            totalAmounts[i] = curDrawable + _amounts[i]*_packAmounts;
        }
        // Call the setUserDrawable function in the Drawing contract
        drawContract.setUserDrawable(_purchaser, _pools, totalAmounts); 
    }
    
    // Function for the owner to withdraw funds from the contract
    function withdrawFunds(address _token, uint256 _amount) external onlyOwner {
        ERC20 withdrawToken = ERC20(_token);
        require(
            withdrawToken.balanceOf(address(this)) >= _amount,
            "Insufficient contract balance"
        );

        // Transfer funds to the owner
        require(
            withdrawToken.transfer(owner(), _amount),
            "Token transfer failed"
        );
    }

    // Function to withdraw Native from the contract (only owner)
    function withdrawNative() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}