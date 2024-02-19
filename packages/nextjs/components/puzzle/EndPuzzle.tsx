import React from "react";
import { useContractWrite } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";

const EndPuzzle: React.FC = () => {
  const { moves, puzzleStatus } = useGlobalState(); // Accessing the Zustand store

  const { writeAsync, isLoading } = useContractWrite({
    address: DeployedContracts[11155111].Puzzle.address,
    abi: DeployedContracts[11155111].Puzzle.abi,
    functionName: "endPuzzle",
    args: [BigInt(moves)],
  });

  const writeTx = useTransactor();

  if (puzzleStatus !== "completed") {
    return null; // Return null if the puzzle is not completed
  }

  const handleEndPuzzle = async () => {
    try {
      await writeTx(writeAsync, { blockConfirmations: 1 });
    } catch (e) {
      console.error("Unexpected error in endPuzzleWriteTx", e);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleEndPuzzle} disabled={isLoading}>
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <>
          Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
        </>
      )}
    </button>
  );
};

export default EndPuzzle;
