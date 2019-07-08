<?php
namespace AppBundle\Controller\Api;


use AppBundle\Stats\UserHistoryRankingService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;


class UserHistoryController extends AbstractFOSRestController
{
    private $userHistoryRankingService;

    public function __construct(UserHistoryRankingService $userHistoryRankingService)
    {
        $this->userHistoryRankingService = $userHistoryRankingService;
    }

    /**
     * Retrieves an random chess position
     * @Rest\Get("/user/{id}/history/ranking/limit/{limit}", name="api_get_user_history_ranking", options={"expose"=true})
     * @param $id int
     * @param $limit int
     * @return View
     */
    public function getUserHistoryAction($id, $limit): View
    {
        $userHistory = $this->userHistoryRankingService->getUserRankingHistory($id, $limit);
        $preparedData = $this->userHistoryRankingService->prepareData($userHistory);

        return View::create($preparedData, Response::HTTP_OK);
    }


}
