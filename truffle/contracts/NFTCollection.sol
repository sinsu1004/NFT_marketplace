// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTCollection is ERC721, ERC721Enumerable {
  string[] public tokenURIs;
  mapping(string => bool) _tokenURIExists;
  mapping(uint => string) _tokenIdToTokenURI;

  mapping(address=>uint[]) public _userToken;
  mapping(address=>uint[]) public _userTokenoffer;
  
  function _userToken_pop(uint tokenid ,address myaddress) public{
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
  function _userTokenoffer_pop(uint tokenid ,address myaddress) public{
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
  function _userToken_push(uint tokenid, address myaddress) public{
    _userToken[myaddress].push(tokenid);
  }
  function _userTokenoffer_push(uint tokenid, address myaddress) public{
    _userTokenoffer[myaddress].push(tokenid);
  }

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
}