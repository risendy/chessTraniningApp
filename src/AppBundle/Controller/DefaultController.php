<?php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Service\NbpService;
use Symfony\Component\HttpFoundation\JsonResponse;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Response as GruzzleResponse;

class DefaultController extends Controller
{
    public function indexAction()
    {
       

        return $this->render('pages/index.html.twig');
    }

}
