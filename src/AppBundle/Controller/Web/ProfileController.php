<?php
/**
 * Created by PhpStorm.
 * User: Kuba
 * Date: 2019-03-20
 * Time: 22:03
 */

namespace AppBundle\Controller\Web;


use AppBundle\Stats\UserStatsService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\User\UserInterface;

class ProfileController extends Controller
{
    /**
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction(UserStatsService $userStatsService)
    {
        $user = $this->getUser();
        $userId= $user->getId();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }

        return $this->render('pages/profile.html.twig', array(
            'user' => $user,
            'userId' => $userId,
            'puzzlesSolved' => $userStatsService->getSolvedPuzzlesCombined($user),
        ));
     }
}