<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
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
}