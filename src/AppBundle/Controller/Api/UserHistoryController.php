<?php
namespace AppBundle\Controller\Api;

use AppBundle\Entity\Position;
use AppBundle\Service\MessageService;
use AppBundle\Service\StatisticalService;
use AppBundle\Service\UserService;
use AppBundle\Stats\UserHistoryRankingService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\PositionService;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserHistoryController extends Controller
{
    private $userHistoryRankingService;

    public function __construct(UserHistoryRankingService $userHistoryRankingService)
    {
        $this->userHistoryRankingService = $userHistoryRankingService;
    }

    public function getUserHistoryAction($id)
    {
        $userHistory = $this->userHistoryRankingService->getUserRankingHistory($id);

        var_dump($userHistory);
        die;

        return new JsonResponse(array(
            'userRankingHistory' => $userHistory,
            'status' => 'Ok',
            'message' => 'Success'),
            200);
    }
}
