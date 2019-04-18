<?php
/**
 * Created by PhpStorm.
 * User: Kuba
 * Date: 2019-04-18
 * Time: 19:50
 */

namespace AppBundle\Stats;


use AppBundle\Entity\Position;

class PositionStatsService extends AbstractStatsService
{
    public function getSolvedPositionCombined(Position $position)
    {
        return $position->getTimesSolved() + $position->getTimesFailed();
    }

    public function incrementPuzzleSolvedCounter(Position $position)
    {
        $user = $this->em->getRepository(Position::class)->updatePositionSolvedPuzzleCount($position);

        return $user;
    }

    public function incrementPuzzleFailedCounter(Position $position)
    {
        $user = $this->em->getRepository(Position::class)->updatePositionFailedPuzzleCount($position);

        return $user;
    }
}