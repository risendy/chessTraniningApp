<?php
namespace AppBundle\Stats;


use AppBundle\Entity\UserRankingHistory;
use AppBundle\Entity\Position;
use AppBundle\Entity\User;

class UserHistoryRankingService extends AbstractStatsService
{
    public function addNewHistoryRecord(Position $position, User $user, $puzzleResult)
    {
        $user = $this->em->getRepository(UserRankingHistory::class)->addNewHistoryRecord($position, $user, $puzzleResult);

        return $user;
    }
}