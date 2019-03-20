<?php
// src/AppBundle/Entity/User.php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="decimal", scale=2)
     */
    protected $ranking = 1200;

    /**
     * @ORM\Column(type="integer")
     */
    protected $puzzlesSolved = 0;

    /**
     * @ORM\Column(type="integer")
     */
    protected $puzzlesFailed = 0;

    public function __construct()
    {
        parent::__construct();
        // your own logic
    }

    public function getId() 
    {
        return $this->id;
    }

    public function getRanking() 
    {
        return $this->ranking;
    }

    public function setId($id) 
    {
        $this->id = $id;
    }

    public function setRanking($ranking) 
    {
        $this->ranking = $ranking;
    }

    /**
     * @return mixed
     */
    public function getPuzzlesSolved()
    {
        return $this->puzzlesSolved;
    }

    /**
     * @param mixed $puzzlesSolved
     */
    public function setPuzzlesSolved($puzzlesSolved)
    {
        $this->puzzlesSolved = $puzzlesSolved;
    }

    /**
     * @return mixed
     */
    public function getPuzzlesFailed()
    {
        return $this->puzzlesFailed;
    }

    /**
     * @param mixed $puzzlesFailed
     */
    public function setPuzzlesFailed($puzzlesFailed)
    {
        $this->puzzlesFailed = $puzzlesFailed;
    }
}