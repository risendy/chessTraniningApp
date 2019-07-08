<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use AppBundle\Entity\User;
use AppBundle\Entity\Position;

/**
 * UserRankingHistory
 *
 * @ORM\Table(name="user_ranking_history")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRankingHistoryRepository")
 */
class UserRankingHistory
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
     * @var float
     *
     * @ORM\Column(name="userRanking", type="decimal", scale=2)
     */
    private $userRanking;

    /**
     * @var boolean
     *
     * @ORM\Column(name="solveResult", type="boolean")
     */
    private $solveResult;

    /**
     * @var float
     *
     * @ORM\Column(name="rankingDifference", type="decimal", scale=2)
     */
    private $rankingDifference;

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

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Position")
     * @ORM\JoinColumn(name="position", referencedColumnName="id_position")
     */
    private $position;

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
     * Set userRanking.
     *
     * @param float $userRanking
     *
     * @return UserRankingHistory
     */
    public function setUserRanking($userRanking)
    {
        $this->userRanking = $userRanking;

        return $this;
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
     * Get userRanking.
     *
     * @return float
     */
    public function getUserRanking()
    {
        return $this->userRanking;
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

    public function setCreated(\DateTime $param)
    {
        $this->created = $param;
    }

    public function setModified(\DateTime $param)
    {
        $this->modified = $param;
    }

    public function getModified()
    {
        return $this->modified;
    }

    public function getCreated()
    {
        return $this->created;
    }

    /**
     * @return float
     */
    public function getRankingDifference(): float
    {
        return $this->rankingDifference;
    }

    /**
     * @param float $rankingDifference
     */
    public function setRankingDifference(float $rankingDifference): void
    {
        $this->rankingDifference = $rankingDifference;
    }

    /**
     * @return int
     */
    public function getSolveResult()
    {
        return $this->solveResult;
    }
}
