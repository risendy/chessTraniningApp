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
}
