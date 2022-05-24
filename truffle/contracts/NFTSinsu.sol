// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTSinsu is ERC721, ERC721Enumerable {
  string[] public tokenURIs;
  mapping(string => bool) _tokenURIExists;
  mapping(uint => string) _tokenIdToTokenURI;
  mapping(address=>uint[]) public _userToken;
  mapping(address=>uint[]) public _userTokenoffer;

  uint public offerCount;
  mapping (uint => _Offer) public offers;
  mapping (address => uint) public userFunds;

  function _userToken_array(uint tokenid ,address myaddress) private{
      uint j=0;
      while(j<_userToken[myaddress].length){
          if(_userToken[myaddress][j]==tokenid){
              break;
          }
          j++;
      }
      for(uint i=j; i<_userToken[myaddress].length-1;i++){
          _userToken[myaddress][i]=_userToken[myaddress][i+1];
      }
      _userToken[myaddress].pop();
  }
  function _userTokenoffer_array(uint tokenid ,address myaddress) private{
      uint j=0;
      while(j<_userTokenoffer[myaddress].length){
          if(_userTokenoffer[myaddress][j]==tokenid){
              break;
          }
          j++;
      }
      for(uint i=j; i<_userTokenoffer[myaddress].length-1;i++){
          _userTokenoffer[myaddress][i]=_userTokenoffer[myaddress][i+1];
      }
      _userTokenoffer[myaddress].pop();
  }
  

  struct _Offer {
    uint offerId;
    uint id;
    address user;
    uint price;
    bool fulfilled;
    bool cancelled;
  }
  event Offer(
    uint offerId,
    uint id,
    address user,
    uint price,
    bool fulfilled,
    bool cancelled
  );

  event OfferFilled(uint offerId, uint id, address newOwner);
  event OfferCancelled(uint offerId, uint id, address owner);
  event ClaimFunds(address user, uint amount);

  constructor() 
    ERC721("sinsu Collection", "SINSU") 
  {
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function tokenURI(uint256 tokenId) public override view returns (string memory) {
    require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
    return _tokenIdToTokenURI[tokenId];
  }



  function safeMint(string memory _tokenURI) public {
    require(!_tokenURIExists[_tokenURI], 'The token URI should be unique');
    tokenURIs.push(_tokenURI);    
    uint _id = tokenURIs.length;
    _tokenIdToTokenURI[_id] = _tokenURI;
    _safeMint(msg.sender, _id);
    _tokenURIExists[_tokenURI] = true;
    _userToken[msg.sender].push(_id);
  }

  function makeOffer(uint _id, uint _price) public {
    transferFrom(msg.sender, address(this), _id);
    offerCount ++;
    offers[offerCount] = _Offer(offerCount, _id, msg.sender, _price, false, false);
    _userTokenoffer[msg.sender].push(_id);
    _userToken_array(_id, msg.sender);
    emit Offer(offerCount, _id, msg.sender, _price, false, false);
  }

  function fillOffer(uint _offerId) public payable {
    _Offer storage _offer = offers[_offerId];
    require(_offer.offerId == _offerId, 'The offer must exist');
    require(_offer.user != msg.sender, 'The owner of the offer cannot fill it');
    require(!_offer.fulfilled, 'An offer cannot be fulfilled twice');
    require(!_offer.cancelled, 'A cancelled offer cannot be fulfilled');
    require(msg.value == _offer.price, 'The ETH amount should match with the NFT Price');
    transferFrom(address(this), msg.sender, _offer.id);
    _offer.fulfilled = true;
    userFunds[_offer.user] += msg.value;
    _userTokenoffer_array(_offer.offerId, _offer.user);
    _userToken[msg.sender].push(_offer.offerId);
    
    emit OfferFilled(_offerId, _offer.id, msg.sender);
  }

  function cancelOffer(uint _offerId) public {
    _Offer storage _offer = offers[_offerId];
    require(_offer.offerId == _offerId, 'The offer must exist');
    require(_offer.user == msg.sender, 'The offer can only be canceled by the owner');
    require(_offer.fulfilled == false, 'A fulfilled offer cannot be cancelled');
    require(_offer.cancelled == false, 'An offer cannot be cancelled twice');
    transferFrom(address(this), msg.sender, _offer.id);
    _offer.cancelled = true;
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