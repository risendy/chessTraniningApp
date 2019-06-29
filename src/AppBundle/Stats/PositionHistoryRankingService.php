<?php
namespace AppBundle\Stats;


use AppBundle\Entity\PositionRankingHistory;
use AppBundle\Entity\Position;
use AppBundle\Entity\User;

class PositionHistoryRankingService extends AbstractStatsService
{
    public function addNewHistoryRecord($data, User $user, Position $position)
    {
        $user = $this->em->getRepository(PositionRankingHistory::class)->addNewHistoryRecord($data, $user, $position);

        return $user;
    }
}