<?php
namespace AppBundle\Controller\Api;

use AppBundle\Entity\Position;
use AppBundle\Service\MessageService;
use AppBundle\Service\PositionThemeService;
use AppBundle\Service\StatisticalService;
use AppBundle\Service\UserService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\PositionService;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;

class PositionController extends AbstractFOSRestController
{
	private $positionService;
    /**
     * @var PositionThemeService
     */
    private $positionThemeService;

    public function __construct(PositionService $positionService, PositionThemeService $positionThemeService)
    {
        $this->positionService = $positionService;
        $this->positionThemeService = $positionThemeService;
    }

    /**
     * Retrieves an random chess position
     * @Rest\Post("/random-position/", name="api_get_random_position", options={"expose"=true})
     * @return View
     */
    public function getRandomPositionAction(Request $request) : View
    {
        $themes = [];
        $puzzleDifficulty = $request->request->get('puzzleDifficulty');
        $puzzleThemes = $request->request->get('puzzleThemes');
        $loggedUserId = $this->getUser()->getId();

        /**
         * @var Position
         */
    	$randPosition = $this->positionService->getRandomPosition($puzzleDifficulty, $puzzleThemes, $loggedUserId);

    	if ($randPosition)
        {
            $idPosition = $randPosition->getIdPosition();
            $themes = $this->positionThemeService->getThemesForPosition($idPosition);
        }

    	$array = [
            'fen' => $randPosition->getFen(),
            'pgn' => $randPosition->getPgn(),
            'solution' => $randPosition->getSolution(),
            'puzzleRanking' => $randPosition->getPuzzleRanking(),
            'puzzleId' => $randPosition->getIdPosition(),
            'puzzleTotalTries' => $randPosition->getTotalTimesTried(),
            'puzzleSuccessRate' => $randPosition->getSuccessRate(),
            'color' => $randPosition->getStartingColor(),
            'themes' => $themes,
            'status' => 'Ok',
            'message' => 'Success'
        ];

        return View::create($array, Response::HTTP_OK);
    }

    /**
     * Set position
     * @Rest\Post("/position/", name="api_set_position", options={"expose"=true})
     * @param Request $request
     * @return View
     */
    public function setPositionAction(Request $request) : View
    {
        $positionId = $request->get('puzzleId');
        $newPuzzleRanking = $request->get('newPuzzleRating');

        if (!$positionId)
        {
            return View::create('Wrong parameters',Response::HTTP_BAD_REQUEST);
        }

        try
        {
            $position = $this->positionService->getPositionById($positionId);
            $this->positionService->savePuzzleRating($position, $newPuzzleRanking);
         }
        catch (\Exception $e)
        {
            return View::create("Error while connecting to the database. Error message:'.$e->getMessage()",Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return View::create($position, Response::HTTP_OK);
    }

}
