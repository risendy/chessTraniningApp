<?php
/**
 * Created by PhpStorm.
 * User: Kuba
 * Date: 2019-02-26
 * Time: 18:54
 */

namespace AppBundle\Repository;


use AppBundle\Entity\User;
use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
    public function updateUserRanking(User $user, $newUserRanking)
    {
        $em = $this->getEntityManager();

        $user->setRanking($newUserRanking);

        $em->persist($user);
        $em->flush();
    }

    public function updateUserPuzzleCount(User $user)
    {
        $em = $this->getEntityManager();

        $user->setPuzzlesSolved($user->getPuzzlesSolved()+1);

        $em->persist($user);
        $em->flush();
    }

    public function updateUserFailedPuzzleCount(User $user)
    {
        $em = $this->getEntityManager();

        $user->setPuzzlesFailed($user->getPuzzlesFailed()+1);

        $em->persist($user);
        $em->flush();
    }


}