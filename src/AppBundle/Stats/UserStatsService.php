<?php
/**
 * Created by PhpStorm.
 * User: Kuba
 * Date: 2019-03-20
 * Time: 21:02
 */

namespace AppBundle\Stats;


use AppBundle\Entity\User;

class UserStatsService extends AbstractStatsService
{
    public function getSolvedPuzzlesCombined(User $user)
    {
        return $user->getPuzzlesSolved() + $user->getPuzzlesFailed();
    }

    public function incrementPuzzleFailedCounter(User $user)
    {
        $user = $this->em->getRepository(User::class)->updateUserFailedPuzzleCount($user);

        return $user;
    }

    public function incrementPuzzleSolvedCounter(User $user)
    {
        $user = $this->em->getRepository(User::class)->updateUserSolvedPuzzleCount($user);

        return $user;
    }
}