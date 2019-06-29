<?php
/**
 * Created by PhpStorm.
 * User: Kuba
 * Date: 2019-04-18
 * Time: 20:13
 */

namespace AppBundle\Service;


use AppBundle\Entity\Position;
use AppBundle\Entity\User;
use AppBundle\Stats\PositionStatsService;
use AppBundle\Stats\UserStatsService;
use AppBundle\Stats\UserHistoryRankingService;
use AppBundle\Stats\PositionHistoryRankingService;

class StatisticalService
{
    /**
     * @var UserStatsService
     */
    private $userStatsService;
    /**
     * @var PositionStatsService
     */
    private $positionStatsService;
    private $userHistoryRankingService;
    private $positionHistoryRankingService;

    public function __construct(UserStatsService $userStatsService, PositionStatsService $positionStatsService, UserHistoryRankingService $userHistoryRankingService,  PositionHistoryRankingService $positionHistoryRankingService)
    {
        $this->userStatsService = $userStatsService;
        $this->positionStatsService = $positionStatsService;
        $this->userHistoryRankingService = $userHistoryRankingService;
        $this->positionHistoryRankingService = $positionHistoryRankingService;
    }

    public function saveStatistics($data, $user, $position)
    {
        $this->saveUserStatisticalData($user, $data->puzzleResult);
        $this->savePositionStatisticalData($position, $data->puzzleResult);
        $this->userHistoryRankingService->addNewHistoryRecord($data, $user, $position);
        $this->positionHistoryRankingService->addNewHistoryRecord($data, $user, $position);
    }

    public function saveUserStatisticalData(User $user, $puzzleResult)
    {
        if ($this->puzzleSolved($puzzleResult))
        {
            $this->userStatsService->incrementPuzzleSolvedCounter($user);
        }
        else
        {
            $this->userStatsService->incrementPuzzleFailedCounter($user);
        }
    }

    public function savePositionStatisticalData(Position $position, $puzzleResult)
    {
        if ($this->puzzleSolved($puzzleResult))
        {
            $this->positionStatsService->incrementPuzzleSolvedCounter($position);
        }
        else
        {
            $this->positionStatsService->incrementPuzzleFailedCounter($position);
        }
    }

    public function puzzleSolved($puzzleResult)
    {
        return $puzzleResult == "true";
    }
}