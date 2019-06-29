<?php
namespace AppBundle\Controller;

use AppBundle\Entity\Position;
use AppBundle\Service\MessageService;
use AppBundle\Service\StatisticalService;
use AppBundle\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\PositionService;
use Symfony\Component\HttpFoundation\JsonResponse;

class PositionController extends Controller
{
	private $positionService;
	private $userService;
    private $statisticalService;
    private $messageService;

    public function __construct(PositionService $positionService, UserService $userService, StatisticalService $statisticalService, MessageService $messageService)
    {
        $this->positionService = $positionService;
        $this->userService = $userService;
        $this->statisticalService = $statisticalService;
        $this->messageService = $messageService;
    }

    public function ajaxGetPositionAction(Request $request)
    {
        /**
         * @var Position
         */
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
                'puzzleId' => $randPosition->getIdPosition(),
                'status' => 'Ok',
                'message' => 'Success'),
            200);
    }

    public function ajaxSaveNewRatingAction(Request $request)
    {
        $positionId = $request->get('puzzleId');
        $userId = $request->get('userId');
        $puzzleResult = $request->get('puzzleResult');

        $newPuzzleRanking = $request->get('newPuzzleRating');
        $newPlayerRating = $request->get('newPlayerRating');

        if (!$positionId || !$userId)
        {
            return new JsonResponse(array(
                'status' => 'Error',
                'message' => 'Wrong parameters'),
                400);
        }

        try
        {
            $position = $this->positionService->getPositionById($positionId);
            $this->positionService->savePuzzleRating($position, $newPuzzleRanking);

            $user = $this->userService->getUserById($userId);
            $this->userService->updateUserRanking($user, $newPlayerRating);

            /**
             * Sending statistical data to rabbitMQ queue
             */
            $array = [
                "userId" => $userId,
                "userRanking" => $user->getRanking(),
                "positionId" => $userId,
                "positionRanking" => $position->getPuzzleRanking(),
                "puzzleResult" => $puzzleResult
            ];

            $message = $this->messageService->prepareStatsDtoMessage($array);

            $this->messageService->sendMessageToQueue($message);

            //$this->statisticalService->saveStatistics($user, $position, $puzzleResult);
        }
        catch (\Exception $e)
        {
            return new JsonResponse(array(
                'status' => 'Error',
                'message' => 'Error while connecting to the database. Error message: '.$e->getMessage()),
                500);
        }

        return new JsonResponse(array(
            'status' => 'Ok',
            'message' => 'Success'),
            200);
    }

}
