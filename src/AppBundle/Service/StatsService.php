<?php
/**
 * Created by PhpStorm.
 * User: Kuba
 * Date: 2019-03-20
 * Time: 21:02
 */

namespace AppBundle\Service;


use AppBundle\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class StatsService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

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
        $user = $this->em->getRepository(User::class)->updateUserPuzzleCount($user);

        return $user;
    }
}