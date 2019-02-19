<?php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\PositionService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;

class PositionController extends Controller
{
	private $positionService;

    public function __construct(PositionService $positionService)
    {
        $this->positionService = $positionService;
    }

    public function ajaxGetPositionAction(Request $request)
    {
    	$randPosition = $this->positionService->getRandomPosition(); 

    	if (!$request->isXmlHttpRequest()) {
    	        return new JsonResponse(array(
    	            'status' => 'Error',
    	            'message' => 'Not an ajax request'),
    	        400);
    	    }

    	 return new JsonResponse(array(
                'fen' => $randPosition->getFen(),
                'solution' => $randPosition->getSolution(),
                'puzzleRanking' => $randPosition->getPuzzleRanking(),
                'status' => 'Ok',
                'message' => 'Success'),
            200);
    }

}
