pragma solidity ^0.5.0;

contract GeneScience {
    function isGeneScience() public pure returns (bool) {
        return true;
    }

    /// @dev given genes of kitten 1 & 2, return a genetic combination - may have a random factor
    /// @param genes1 genes of mom
    /// @param genes2 genes of sire
    /// @return the genes that are supposed to be passed down the child
    function mixGenes(uint256 genes1, uint256 genes2, uint256 targetBlock) public pure returns (uint256) {
        return (genes1 + genes2) + targetBlock;
    }
}