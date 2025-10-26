// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MultiVoteChain {
    struct Election {
        string name;
        string[] candidates;
        mapping(string => uint256) votes;
        mapping(address => bool) hasVoted;
        bool exists;
    }

    mapping(uint256 => Election) private elections;
    uint256 public electionCount;

    event ElectionCreated(uint256 electionId, string name, string[] candidates);
    event Voted(uint256 electionId, address voter, string candidate);

    function createElection(string memory _name, string[] memory _candidates) public {
        electionCount++;
        Election storage e = elections[electionCount];
        e.name = _name;
        e.candidates = _candidates;
        e.exists = true;

        emit ElectionCreated(electionCount, _name, _candidates);
    }

    function vote(uint256 electionId, string memory candidate) public {
        Election storage e = elections[electionId];
        require(e.exists, "Election not found");
        require(!e.hasVoted[msg.sender], "Already voted");

        bool valid = false;
        for (uint256 i = 0; i < e.candidates.length; i++) {
            if (
                keccak256(abi.encodePacked(e.candidates[i])) ==
                keccak256(abi.encodePacked(candidate))
            ) {
                valid = true;
                break;
            }
        }
        require(valid, "Invalid candidate");

        e.votes[candidate]++;
        e.hasVoted[msg.sender] = true;

        emit Voted(electionId, msg.sender, candidate);
    }

    function getCandidates(uint256 electionId) public view returns (string[] memory) {
        require(elections[electionId].exists, "Election not found");
        return elections[electionId].candidates;
    }

    function getVotes(uint256 electionId, string memory candidate) public view returns (uint256) {
        require(elections[electionId].exists, "Election not found");
        return elections[electionId].votes[candidate];
    }

    function getElectionName(uint256 electionId) public view returns (string memory) {
        require(elections[electionId].exists, "Election not found");
        return elections[electionId].name;
    }

    function getAllElections() public view returns (string[] memory names, uint256[] memory ids) {
        names = new string[](electionCount);
        ids = new uint256[](electionCount);
        for (uint256 i = 0; i < electionCount; i++) {
            uint256 id = i + 1;
            names[i] = elections[id].name;
            ids[i] = id;
        }
    }
}