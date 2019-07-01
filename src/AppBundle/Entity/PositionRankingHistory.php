<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PositionRankingHistory
 *
 * @ORM\Table(name="position_ranking_history")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\PositionRankingHistoryRepository")
 */
class PositionRankingHistory
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="positionRanking", type="decimal", scale=2)
     */
    private $positionRanking;

    /**
     * @var boolean
     *
     * @ORM\Column(name="solveResult", type="boolean")
     */
    private $solveResult;

    /**
     * @var string
     *
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     */
    private $user;

    /**
     * @var string
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Position")
     * @ORM\JoinColumn(name="position", referencedColumnName="id_position")
     */
    private $position;

    /**
     * @var Datetime
     *
     * @ORM\Column(name="modified_at", type="datetime", nullable=true)
     */
    private $modified = null;

    /**
     * @var Datetime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $created = null;

    public function __construct()
    {
        $this->setCreated(new \DateTime());
        if ($this->getModified() == null) {
            $this->setModified(new \DateTime());
        }
    }

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

     /**
     * Set solveResult.
     *
     * @param boolean $solveResult
     *
     * @return UserRankingHistory
     */
    public function setSolveResult($solveResult)
    {
        $this->solveResult = $solveResult;

        return $this;
    }

    /**
     * Set positionRanking.
     *
     * @param string $positionRanking
     *
     * @return PositionRankingHistory
     */
    public function setPositionRanking($positionRanking)
    {
        $this->positionRanking = $positionRanking;

        return $this;
    }

    /**
     * Get positionRanking.
     *
     * @return string
     */
    public function getPositionRanking()
    {
        return $this->positionRanking;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getPosition(): ?Position
    {
        return $this->position;
    }

    public function setPosition(?Position $position): self
    {
        $this->position = $position;

        return $this;
    }

    private function setCreated(\DateTime $param)
    {
        $this->created = $param;
    }

    private function setModified(\DateTime $param)
    {
        $this->modified = $param;
    }

    private function getModified()
    {
        return $this->modified;
    }

}
