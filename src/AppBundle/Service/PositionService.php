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

    /**
     * @return Position mixed|null
     */
    public function getRandomPosition()
    {
        $randomPosition = $this->em->getRepository(Position::class)->findRandomPositionNativeQuery();

        return $randomPosition;
    }

    public function getPositionById($id)
    {
        $position = $this->em->getRepository(Position::class)->find($id);

        return $position;
    }

    public function savePuzzleRating(Position $position, $newRating)
    {
        $position = $this->em->getRepository(Position::class)->updatePuzzleRanking($position, $newRating);

        return $position;
    }

}
