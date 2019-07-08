<?php
namespace AppBundle\DTO;

class StatisticalDTO implements \JsonSerializable
{
    public $userId;
    public $userRanking;
    public $newUserRanking;
    public $positionId;
    public $positionRanking;
    public $puzzleResult;
    public $rankingDifference;

    public function __construct(array $data)
    {
        $this->userId = isset($data['userId']) ? (int)$data['userId'] : null;
        $this->userRanking = isset($data['userRanking']) ? (string)$data['userRanking'] : '';
        $this->newUserRanking = isset($data['newUserRanking']) ? (string)$data['newUserRanking'] : '';
        $this->positionId = isset($data['positionId']) ? (string)$data['positionId'] : '';
        $this->positionRanking = isset($data['positionRanking']) ? (string)$data['positionRanking'] : '';
        $this->puzzleResult = isset($data['puzzleResult']) ? (string)$data['puzzleResult'] : '';
        $this->rankingDifference = isset($data['rankingDifference']) ? (string)$data['rankingDifference'] : '';
    }
 
    public function jsonSerialize()
    {
        return $this;
    }
}
 