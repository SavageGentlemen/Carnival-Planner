// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CarnivalPassport
 * @notice ERC-1155 multi-token for Carnival Planner stamps and achievements.
 *
 * Token ID ranges:
 *   1–999     → Event Stamps (one token type per event)
 *   1000+     → Achievements (one token type per achievement)
 *
 * Only the owner (deployer / Cloud Functions wallet) can mint.
 * Users receive tokens gaslessly via server-side minting.
 */
contract CarnivalPassport is ERC1155, Ownable {
    string public name = "Carnival Passport";
    string public symbol = "CPASS";

    /// @notice Track total supply per token ID
    mapping(uint256 => uint256) public totalSupply;

    /// @notice Track minted users per token to prevent duplicates
    mapping(uint256 => mapping(address => bool)) public hasMinted;

    event StampMinted(address indexed to, uint256 indexed tokenId, uint256 edition);
    event AchievementMinted(address indexed to, uint256 indexed tokenId);

    constructor(string memory baseURI) ERC1155(baseURI) Ownable(msg.sender) {}

    /**
     * @notice Mint a stamp token to a user. Only callable by owner.
     * @param to     Recipient wallet address
     * @param tokenId Token ID (1–999 for stamps)
     * @param data   Optional extra data
     */
    function mintStamp(
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external onlyOwner {
        require(tokenId >= 1 && tokenId <= 999, "Invalid stamp token ID");
        require(!hasMinted[tokenId][to], "Already minted this stamp");

        totalSupply[tokenId] += 1;
        hasMinted[tokenId][to] = true;
        _mint(to, tokenId, 1, data);

        emit StampMinted(to, tokenId, totalSupply[tokenId]);
    }

    /**
     * @notice Mint an achievement token to a user. Only callable by owner.
     * @param to      Recipient wallet address
     * @param tokenId Token ID (1000+ for achievements)
     */
    function mintAchievement(
        address to,
        uint256 tokenId
    ) external onlyOwner {
        require(tokenId >= 1000, "Invalid achievement token ID");
        require(!hasMinted[tokenId][to], "Already minted this achievement");

        totalSupply[tokenId] += 1;
        hasMinted[tokenId][to] = true;
        _mint(to, tokenId, 1, "");

        emit AchievementMinted(to, tokenId);
    }

    /**
     * @notice Update the base metadata URI. Only callable by owner.
     */
    function setURI(string memory newURI) external onlyOwner {
        _setURI(newURI);
    }
}
