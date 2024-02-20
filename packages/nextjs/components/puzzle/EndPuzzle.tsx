import React from "react";
import { useContractWrite } from "wagmi";
// Hook for writing to a contract.
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
// Icon for UI enhancement.
import DeployedContracts from "~~/contracts/deployedContracts";
// Access to deployed contract addresses and ABIs.
import { useTransactor } from "~~/hooks/scaffold-eth";
// Custom hook from scaffold-eth for transaction processing.
import { useGlobalState } from "~~/services/store/store";

// Zustand store hook for global state management.

// The `EndPuzzle` component allows users to send a transaction to mark a puzzle as completed.
const EndPuzzle: React.FC = () => {
  // Destructure moves and puzzleStatus from the global state using Zustand.
  const { moves, puzzleStatus } = useGlobalState();

  // Set up contract write functionality using wagmi's `useContractWrite` hook.
  const { writeAsync, isLoading } = useContractWrite({
    address: DeployedContracts[11155111].Puzzle.address, // Contract address.
    abi: DeployedContracts[11155111].Puzzle.abi, // Contract ABI.
    functionName: "endPuzzle", // Contract function to call.
    args: [BigInt(moves)], // Arguments for the function call, converting moves to BigInt.
  });

  // Custom hook from scaffold-eth for handling transactions.
  const writeTx = useTransactor();

  // If the puzzle isn't completed, don't render anything.
  if (puzzleStatus !== "completed") {
    return null;
  }

  // Function to handle the 'End Puzzle' action.
  const handleEndPuzzle = async () => {
    try {
      // Attempt to write the transaction using the transactor with a confirmation block.
      await writeTx(writeAsync, { blockConfirmations: 1 });
    } catch (e) {
      // Log any errors to the console.
      console.error("Unexpected error in endPuzzleWriteTx", e);
    }
  };

  // Render a button that, when clicked, calls `handleEndPuzzle`.
  // The button is disabled when `isLoading` is true, indicating a transaction is in progress.
  return (
    <button className="btn btn-primary" onClick={handleEndPuzzle} disabled={isLoading}>
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span> // Show loading spinner when isLoading is true.
      ) : (
        <>
          Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />{" "}
          {/* Display "Send" text and an icon when not loading. */}
        </>
      )}
    </button>
  );
};

export default EndPuzzle;
