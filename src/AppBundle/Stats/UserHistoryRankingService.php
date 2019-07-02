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

    public function getUserRankingHistory($idUser) {
        $userRankingHistory = $this->em->getRepository(UserRankingHistory::class)->getUserRankingHistory($idUser);

        return $userRankingHistory;
    }

    public function prepareData($data) {
        $array = [];

        foreach ( $data as $item) {
            $array['label'][] = $item->getCreated()->format('Y-m-d');;
            $array['data'][] = $item->getUserRanking();
        }

        return $array;
    }
}