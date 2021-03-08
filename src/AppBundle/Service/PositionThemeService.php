<?php
namespace AppBundle\Service;

use AppBundle\Entity\Position;
use AppBundle\Entity\PositionTheme;
use Doctrine\ORM\EntityManagerInterface;

class PositionThemeService
{ 
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function getThemesForPosition($positionId)
    {
        return $this->em->getRepository(PositionTheme::class)->findBy(["products"=>$positionId]);
    }

}
