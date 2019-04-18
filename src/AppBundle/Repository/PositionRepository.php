<?php
namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;
use AppBundle\Entity\Position;

class PositionRepository extends EntityRepository
{
    public function findRandomPositionNativeQuery()
    {
    	$sql = 'SELECT id_position from positions ORDER BY RAND() LIMIT 1';

    	$em = $this->getEntityManager();
    	$stmt = $em->getConnection()->prepare($sql);
    	$stmt->execute();

    	$random_ids = array();
    	while ($val = $stmt->fetch()) {
    	    $random_ids[] = $val['id_position'];
    	}

    	if ($random_ids)
    	{
    		  	$randomPosition = $em->createQuery("
    		  		SELECT tt
    			    FROM AppBundle:Position tt
    			    WHERE tt.idPosition in (:ids)")
    			    ->setParameter('ids', $random_ids)
    			    ->getOneOrNullResult();

    			if ($randomPosition instanceof Position)
    			{
    				return $randomPosition;
    			}
    	}

    	return null;
    }

    public function updatePuzzleRanking(Position $position, $newPuzzleRanking)
    {
        $em = $this->getEntityManager();

        $position->setPuzzleRanking($newPuzzleRanking);

        $em->persist($position);
        $em->flush();
    }

    public function updatePositionSolvedPuzzleCount(Position $position)
    {
        $em = $this->getEntityManager();

        $position->setTimesSolved($position->getTimesSolved()+1);

        $em->persist($position);
        $em->flush();
    }

    public function updatePositionFailedPuzzleCount(Position $position)
    {
        $em = $this->getEntityManager();

        $position->setTimesFailed($position->getTimesFailed()+1);

        $em->persist($position);
        $em->flush();
    }
}