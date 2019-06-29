<?php
namespace AppBundle\Stats;


use AppBundle\Entity\UserRankingHistory;
use AppBundle\Entity\Position;
use AppBundle\Entity\User;

class UserHistoryRankingService extends AbstractStatsService
{
    public function addNewHistoryRecord($data, User $user, Position $position)
    {
        $user = $this->em->getRepository(UserRankingHistory::class)->addNewHistoryRecord($data, $user, $position);

        return $user;
    }
}