<?php
namespace AppBundle\Controller\Web;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\NbpService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;

class DefaultController extends Controller
{
    /**
     * @param User $user
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(UserInterface $user)
    {
        /**
         * @var User
         */
        $user = $this->getUser();

       	$userRanking= $user->getRanking();
       	$userId= $user->getId();

        return $this->render('pages/index.html.twig', array (
        	"userRanking"=> $userRanking,
            "userId" => $userId
        ));
    }

}
