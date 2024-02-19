//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/// @title Puzzle Contract
/// @dev This contract manages the puzzle game and records the final score
contract Puzzle {
    event PuzzleEnded(address indexed player, uint256 moves);

    /// @notice Ends a puzzle and records the final score
    /// @param moves The number of moves it took to complete the puzzle
    function endPuzzle(uint256 moves) external {
        emit PuzzleEnded(msg.sender, moves);
    }
}