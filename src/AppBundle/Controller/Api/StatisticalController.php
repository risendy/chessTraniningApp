<?php
namespace AppBundle\Controller\Api;


use AppBundle\Service\MessageService;
use AppBundle\Service\UserService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\PositionService;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;

class StatisticalController extends AbstractFOSRestController
{
    private $positionService;
    private $userService;
    private $messageService;

    public function __construct(PositionService $positionService, UserService $userService, MessageService $messageService)
    {
        $this->positionService = $positionService;
        $this->userService = $userService;
        $this->messageService = $messageService;
    }

    /**
     * Sends statistical data to rabbitMQ queue
     * @Rest\Post("/statistic/queue/send", name="api_send_statistic_to_queue", options={"expose"=true})
     * @param Request $request
     * @return View
     */
    public function sendStatisticsToQueue(Request $request) : View
    {
        $positionId = $request->get('puzzleId');
        $userId = $request->get('userId');
        $newUserRanking = $request->get('newPlayerRating');
        $puzzleResult = $request->get('puzzleResult');
        $position = $this->positionService->getPositionById($positionId);
        $user = $this->userService->getUserById($userId);

        $array = [
            "userId" => $userId,
            "newUserRanking" => $newUserRanking,
            "userRanking" => $user->getRanking(),
            "positionId" => $positionId,
            "positionRanking" => $position->getPuzzleRanking(),
            "puzzleResult" => $puzzleResult
        ];

        $message = $this->messageService->prepareStatsDtoMessage($array);

        $this->messageService->sendMessageToQueue($message);
        return View::create([], Response::HTTP_NO_CONTENT);
    }
}
