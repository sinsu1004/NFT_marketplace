// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTCollection.sol";

contract NFTMarketplace {
  uint public offerCount;
  mapping (uint => _Offer) public offers;
  mapping (address => uint) public userFunds;
  NFTCollection nftCollection;

  function _offers_pop(uint offerid) private{
    for(uint i=offerid;i<offerCount-1;i++){
      offers[i]=offers[i+1];
    }
    delete offers[offerCount];
    offerCount--;
  }
  
  struct _Offer {
    uint offerId;
    uint id;
    address user;
    uint price;
  
  }
  

  event Offer(
    uint offerId,
    uint id,
    address user,
    uint price
  );


  event OfferFilled(uint offerId, uint id, address newOwner);
  event OfferCancelled(uint offerId, uint id, address owner);
  event ClaimFunds(address user, uint amount);

  constructor(address _nftCollection) {
    nftCollection = NFTCollection(_nftCollection);
  }
  

   function makeOffer(uint _id, uint _price) public {
    nftCollection.transferFrom(msg.sender, address(this), _id);
    offerCount ++;
    offers[offerCount] = _Offer(offerCount, _id, msg.sender, _price);
    nftCollection._userTokenoffer_push(_id, msg.sender);
    nftCollection._userToken_pop(_id, msg.sender);
    emit Offer(offerCount, _id, msg.sender, _price);
  }

  function fillOffer(uint _offerId) public payable {
    _Offer storage _offer = offers[_offerId];
    require(_offer.offerId == _offerId, 'The offer must exist');
    require(_offer.user != msg.sender, 'The owner of the offer cannot fill it');
    require(msg.value == _offer.price, 'The ETH amount should match with the NFT Price');
    nftCollection.transferFrom(address(this), msg.sender, _offer.id);
    userFunds[_offer.user] += msg.value;
    nftCollection._userTokenoffer_pop(_offer.id, _offer.user);
    nftCollection._userToken_push(_offer.id, msg.sender);
    _offers_pop(_offerId);
    emit OfferFilled(_offerId, _offer.id, msg.sender);
  }

  function cancelOffer(uint _offerId) public {
    _Offer storage _offer = offers[_offerId];
    require(_offer.offerId == _offerId, 'The offer must exist');
    require(_offer.user == msg.sender, 'The offer can only be canceled by the owner');
    nftCollection.transferFrom(address(this), msg.sender, _offer.id);
    nftCollection._userTokenoffer_pop(_offer.id, _offer.user);
    nftCollection._userToken_push(_offer.id, msg.sender);
    _offers_pop(_offerId);
    
    emit OfferCancelled(_offerId, _offer.id, msg.sender);
  }

  function claimFunds() public {
    require(userFunds[msg.sender] > 0, 'This user has no funds to be claimed');
    payable(msg.sender).transfer(userFunds[msg.sender]);
    emit ClaimFunds(msg.sender, userFunds[msg.sender]);
    userFunds[msg.sender] = 0;    
  }

  // Fallback: reverts if Ether is sent to this smart-contract by mistake
  fallback () external {
    revert();
  }
}