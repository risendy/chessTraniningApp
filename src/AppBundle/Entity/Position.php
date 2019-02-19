<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PositionRepository")
 * @ORM\Table(name="positions")
 */
class Position
{ 
    /**
     * @ORM\Column(type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $idPosition;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $fen;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $solution = null;

    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    private $puzzleRanking = 1200;


    public function getIdPosition()
    {
        return $this->idPosition;
    }

    public function getFen()
    {
        return $this->fen;
    }

    public function setIdPosition($idPosition)
    {
        $this->idPosition = $idPosition;
    }

    public function setFen($fen)
    {
        $this->fen = $fen;
    }

    public function getSolution()
    {
        return $this->solution;
    }

    public function setSolution($solution)
    {
        $this->solution = $solution;
    }

    public function getPuzzleRanking()
    {
        return $this->puzzleRanking;
    }

    public function setPuzzleRanking($puzzleRanking)
    {
        $this->puzzleRanking = $puzzleRanking;
    }
}