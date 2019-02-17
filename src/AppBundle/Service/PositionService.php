<?php
namespace AppBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use AppBundle\Entity\Position;

class PositionService
{ 
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function getRandomPosition()
    {
        $randomPosition = $this->em->getRepository(Position::class)->findRandomPositionNativeQuery();

        return $randomPosition;
    }

}