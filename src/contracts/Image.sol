// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

contract Image is ERC721, IERC721Enumerable {

    uint[] public imageIds;
    // ImageData newImage;

    struct ImageData {
        string name;
        string description;
        string image_uri;
    }

    mapping (uint => ImageData) public imageIdToImageData;
    mapping (uint => address) public imageIdToOwner;

    constructor() ERC721("Image", "IMG") {
    }

    function mint(string memory name, string memory description, string memory image_uri) external {
        ImageData memory newImage = ImageData(name, description, image_uri);
        uint tokenId = imageIds.length;
        imageIds.push(tokenId);
        _safeMint(msg.sender, tokenId);
        imageIdToImageData[tokenId] = newImage;
        imageIdToOwner[tokenId] = msg.sender;
    }

    function totalSupply() external view override returns (uint256) {
        return imageIds.length;
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) external view override returns (uint256 ) {}

    function tokenByIndex(uint256 index) external view override returns (uint256 ) {}
}