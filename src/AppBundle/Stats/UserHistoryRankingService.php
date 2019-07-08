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

    public function getUserRankingHistory($idUser, $limit) {
        $userRankingHistory = $this->em->getRepository(UserRankingHistory::class)->getUserRankingHistory($idUser, $limit);

        return $userRankingHistory;
    }

    public function prepareData($data) {
        $array = [];

        foreach ( $data as $item) {
            $array['label'][] = $item->getCreated()->format('Y-m-d');;
            $array['data'][] = $item->getUserRanking();

            $array['difference'][] = ['difference'=>$item->getRankingDifference(), 'result' => $item->getSolveResult()] ;
          }

        if (sizeof($array) > 0) {
            $array['label'] = $this->reverseHistoryArray($array['label']);
            $array['data'] = $this->reverseHistoryArray($array['data']);
            $array['difference'] = $this->reverseHistoryArray($array['difference']);

        }
        
        return $array;
    }

    public function reverseHistoryArray($array) {
        return array_reverse($array);
    }
}