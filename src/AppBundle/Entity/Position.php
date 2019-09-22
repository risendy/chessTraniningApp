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
     * @ORM\Column(type="text")
     */
    private $fen;

    /**
     * @ORM\Column(type="text")
     */
    private $pgn;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $startingColor;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $solution = null;

    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    private $puzzleRanking = 1200;

    /**
     * @ORM\Column(type="integer")
     */
    private $timesSolved = 0;

    /**
     * @ORM\Column(type="integer")
     */
    private $timesFailed= 0;


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

    public function getTimesSolved()
    {
        return $this->timesSolved;
    }

    public function setTimesSolved($timesSolved)
    {
        $this->timesSolved = $timesSolved;
    }

    public function getTimesFailed()
    {
        return $this->timesFailed;
    }

    public function setTimesFailed($timesFailed)
    {
        $this->timesFailed = $timesFailed;
    }

    public function getTotalTimesTried(){
        return $this->timesFailed + $this->timesSolved;
    }

    public function getSuccessRate() {
        if ($this->timesSolved == 0) return '0';
        if ($this->timesFailed == 0) return '100';

        $percent = ($this->timesSolved/$this->timesFailed)*100;

        return number_format($percent, 2, '.', '');
    }

    /**
     * @return mixed
     */
    public function getStartingColor()
    {
        return $this->startingColor;
    }

    /**
     * @param mixed $startingColor
     */
    public function setStartingColor($startingColor): void
    {
        $this->startingColor = $startingColor;
    }

    /**
     * @return mixed
     */
    public function getPgn()
    {
        return $this->pgn;
    }

    /**
     * @param mixed $pgn
     */
    public function setPgn($pgn): void
    {
        $this->pgn = $pgn;
    }
}
