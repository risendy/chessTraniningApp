<?php
namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;
use AppBundle\Entity\Position;

class PositionRepository extends EntityRepository
{
    public function findRandomPositionAtRangeNativeQuery($puzzleRanking, $loggedUserId)
    {
        $sql = '';
        $endSql = 'ORDER BY RAND() LIMIT 1';

        $sql = 'SELECT p.id_position from positions p LEFT JOIN positions_theme pt ON pt.id_position=p.id_position, fos_user u WHERE (p.puzzle_ranking BETWEEN (? - 50) AND (? + 50))';

        $sql.='AND u.id = ? ';
        $sql.=$endSql;

        $em = $this->getEntityManager();
        $stmt = $em->getConnection()->prepare($sql);

        $stmt->bindValue(1, $puzzleRanking);
        $stmt->bindValue(2, $puzzleRanking);
        $stmt->bindValue(3, $loggedUserId);

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

    public function findRandomPositionNativeQuery($puzzleDifficulty, $puzzleThemes, $loggedUserId)
    {
        $bindValue = 1;

        $sql = '';
        $themeSql = '';
        $endSql = 'ORDER BY RAND() LIMIT 1';

        if ($puzzleThemes) {
            $themeSql .= " AND (";
        }
        else
        {
            $themeSql .= '';
        }

        if ($puzzleDifficulty == 'easy') {
            $sql = 'SELECT p.id_position from positions p LEFT JOIN positions_theme pt ON pt.id_position=p.id_position, fos_user u WHERE (p.puzzle_ranking BETWEEN (u.ranking - 200) AND (u.ranking - 100))'.$themeSql;
        }
        if ($puzzleDifficulty == 'medium') {
            $sql = 'SELECT p.id_position from positions p LEFT JOIN positions_theme pt ON pt.id_position=p.id_position, fos_user u WHERE (p.puzzle_ranking BETWEEN (u.ranking - 100) AND (u.ranking + 100))'.$themeSql;
        }
        if ($puzzleDifficulty == 'hard') {
            $sql = 'SELECT p.id_position from positions p LEFT JOIN positions_theme pt ON pt.id_position=p.id_position, fos_user u WHERE (p.puzzle_ranking BETWEEN (u.ranking - 50) AND (u.ranking + 200))'.$themeSql;
        }

        foreach ($puzzleThemes as $key => $theme) {
            if ($key == count($puzzleThemes) - 1) {
                $sql .= 'pt.name = ? ) ';
            }
            else
            {
                $sql .= 'pt.name = ? OR ';
            }
        }

        $sql.='AND u.id = ? ';
        $sql.=$endSql;

    	$em = $this->getEntityManager();
    	$stmt = $em->getConnection()->prepare($sql);

        foreach ($puzzleThemes as $theme) {
            $stmt->bindValue($bindValue, $theme['name']);

            $bindValue++;
        }
        $stmt->bindValue($bindValue, $loggedUserId);

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
