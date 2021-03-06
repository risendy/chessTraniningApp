<?php
namespace AppBundle\Controller\Api;


use AppBundle\Entity\Position;
use AppBundle\Entity\User;
use AppBundle\Service\MessageService;
use AppBundle\Service\StatisticalService;
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
    /**
     * @var statisticalService
     */
    private $statisticalService;

    public function __construct(PositionService $positionService, UserService $userService, MessageService $messageService, statisticalService $statisticalService)
    {
        $this->positionService = $positionService;
        $this->userService = $userService;
        $this->messageService = $messageService;
        $this->statisticalService = $statisticalService;
    }

    /**
     * Sends statistical data to rabbitMQ queue
     * @Rest\Post("/statistic/save", name="api_save_statistic", options={"expose"=true})
     * @param Request $request
     * @return View
     */
    public function sendStatisticsToQueue(Request $request) : View
    {
        $positionId = $request->get('puzzleId');
        $userId = $request->get('userId');
        $newUserRanking = $request->get('newPlayerRating');
        $puzzleResult = $request->get('puzzleResult');
        $rankingDifference = $request->get('rankingDifference');
        $position = $this->positionService->getPositionById($positionId);
        $user = $this->userService->getUserById($userId);

        $array = [
            "userId" => $userId,
            "newUserRanking" => $newUserRanking,
            "userRanking" => $user->getRanking(),
            "positionId" => $positionId,
            "positionRanking" => $position->getPuzzleRanking(),
            "puzzleResult" => $puzzleResult,
            "rankingDifference" => $rankingDifference
        ];

        $user = $this->userService->getUserById($userId);
        $position = $this->positionService->getPositionById($positionId);

        if ($user instanceof User && $position instanceof Position) {
            $this->statisticalService->saveStatistics((object) $array, $user, $position);
        }

        return View::create([], Response::HTTP_NO_CONTENT);
    }
}
