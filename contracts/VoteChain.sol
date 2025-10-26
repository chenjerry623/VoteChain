pragma solidity ^0.8.28;

contract VoteChain {
    string[] public candidates;
    mapping(string => uint256) public votes;
    mapping(address => bool) public hasVoted;

    constructor(string[] memory _candidates) {
        candidates = _candidates;
    }

    function vote(string memory candidate) public {
        require(!hasVoted[msg.sender], "You have already voted");
        bool valid = false;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                keccak256(abi.encodePacked(candidates[i])) ==
                keccak256(abi.encodePacked(candidate))
            ) {
                valid = true;
                break;
            }
        }
        require(valid, "Invalid candidate");
        votes[candidate] += 1;
        hasVoted[msg.sender] = true;
    }

    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }

    function getVotes(string memory candidate) public view returns (uint256) {
        return votes[candidate];
    }
}