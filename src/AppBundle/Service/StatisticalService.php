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

    public function __construct(UserStatsService $userStatsService, PositionStatsService $positionStatsService)
    {
        $this->userStatsService = $userStatsService;
        $this->positionStatsService = $positionStatsService;
    }

    public function saveStatistics(User $user, Position $position, $puzzleResult)
    {
        $this->saveUserStatisticalData($user, $puzzleResult);
        $this->savePositionStatisticalData($position, $puzzleResult);
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