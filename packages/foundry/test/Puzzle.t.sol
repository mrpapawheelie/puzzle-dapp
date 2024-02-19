// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../contracts/Puzzle.sol";  // Adjust the path as necessary

contract PuzzleTest is Test {
    Puzzle puzzle;

    function setUp() public {
        puzzle = new Puzzle();
    }

    event PuzzleEnded(address indexed player, uint256 moves);

    function testEndPuzzle(uint256) public {
        // Set up expectations for the event emission
        // Here, we specify the contract instance that we expect to emit the event
        vm.expectEmit();
        emit PuzzleEnded(address(this), 42);  // This line sets up the expectation

        // Call the function that emits the event
        puzzle.endPuzzle(42);
    }
}
