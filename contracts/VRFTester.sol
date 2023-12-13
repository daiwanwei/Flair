// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./IHierarchicalDrawing.sol";
import "./IVRFManager.sol";

contract VRFManager is IVRFManager, AccessControl {    
    IHierarchicalDrawing public drawingContract;

    struct RequestStatus {
        bool fulfilled; // whether the request has been successfully fulfilled
        bool exists; // whether a requestId exists
        uint256[] randomWords;
    }

    /* requestId --> requestStatus */
    mapping(uint256 => RequestStatus) public s_requests; 
    
    uint256[] public requestIds;
    uint256 public lastRequestId;
    
    constructor(
        address _initialAdmin
        ) {_grantRole(DEFAULT_ADMIN_ROLE, _initialAdmin);}

    modifier onlyOwner() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Restricted to admin.");
        _;
    }

    function setDrawingContract(address _contract) external onlyOwner {
        drawingContract = IHierarchicalDrawing(_contract);
    }

    // Takes request sender as the parameter.
    function requestRandomWords(address _requester) external returns(uint256 requestId){
        requestId = uint256(keccak256(abi.encodePacked(_requester, block.timestamp)));

        s_requests[requestId] = RequestStatus({
        randomWords: new uint256[](0),
        exists: true,
        fulfilled: false
        });

        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, _requester);
        return requestId;
    }

    // Receives random values and stores them in your drawing contract.
    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) external onlyOwner {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        
        drawingContract.fulfillRandomWords(_requestId, _randomWords);
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getRequestStatus(
        uint256 _requestId
    ) external view returns (bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }
}
