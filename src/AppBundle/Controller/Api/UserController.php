<?php
namespace AppBundle\Controller\Api;

use AppBundle\Service\MessageService;
use AppBundle\Service\StatisticalService;
use AppBundle\Service\UserService;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractFOSRestController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Retrieves an random chess position
     * @Rest\Put("/user/", name="api_put_user", options={"expose"=true})
     * @param Request $request
     * @return View
     */
    public function putUserRanking(Request $request) : View
    {
        $userId = $request->get('userId');
        $newPlayerRating = $request->get('newPlayerRating');

        $user = $this->userService->getUserById($userId);

        $updatedUser = $this->userService->updateUserRanking($user, $newPlayerRating);
        return View::create($updatedUser, Response::HTTP_OK);
    }

    /**
     * Retrieves an random chess position
     * @Rest\Get("/user-info/", name="api_get_user_info", options={"expose"=true})
     * @param Request $request
     * @return View
     */
    public function getUserData(Request $request) : View
    {
        $userId = $request->get('id');
        $user = $this->userService->getUserById($userId);

        $array = [
            'highScoreAllTime' => $user->getHighScoreAllTime(),
            'status' => 'Ok',
            'message' => 'Success'
        ];

        return View::create($array, Response::HTTP_OK);
    }

    /**
     * Retrieves an random chess position
     * @Rest\Put("/user-info/", name="api_put_user_info", options={"expose"=true})
     * @param Request $request
     * @return View
     */
    public function putUserData(Request $request) : View
    {
        $userId = $request->get('userId');
        $highscoreAllTime = $request->get('highscore');
        $user = $this->userService->getUserById($userId);

       $this->userService->updateUserHighscore($user, $highscoreAllTime);

        $array = [
            'status' => 'Ok',
            'message' => 'Success'
        ];

        return View::create($array, Response::HTTP_OK);
    }
}
