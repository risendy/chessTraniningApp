<?php
/**
 * Created by PhpStorm.
 * User: Kuba
 * Date: 2019-02-26
 * Time: 18:53
 */

namespace AppBundle\Service;


use AppBundle\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function getUserById($id)
    {
        $user = $this->em->getRepository(User::class)->find($id);

        return $user;
    }

    public function updateUserRanking(User $user, $newRanking)
    {
        $updatedUser = $this->em->getRepository(User::class)->updateUserRanking($user, $newRanking);

        return $updatedUser;
    }
}