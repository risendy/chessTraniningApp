<?php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\NbpService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;

class DefaultController extends Controller
{
    public function indexAction(UserInterface $user)
    {
       	$userRanking= $this->getUser()->getRanking();

        return $this->render('pages/index.html.twig', array (
        	"userRanking"=> $userRanking
        ));
    }

}
