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
}