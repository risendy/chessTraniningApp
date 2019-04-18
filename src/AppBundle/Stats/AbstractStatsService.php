<?php
/**
 * Created by PhpStorm.
 * User: Kuba
 * Date: 2019-04-18
 * Time: 19:48
 */

namespace AppBundle\Stats;


use Doctrine\ORM\EntityManagerInterface;

abstract class AbstractStatsService
{
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
}