<?php

namespace AppBundle\Consumer;

use AppBundle\Entity\Position;
use AppBundle\Entity\User;
use AppBundle\Service\MessageService;
use AppBundle\Service\PositionService;
use AppBundle\Service\StatisticalService;
use AppBundle\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use Psr\Log\LoggerInterface;

class StatisticalConsumer implements ConsumerInterface
{
    private $logger;
    /**
     * @var StatisticalService
     */
    private $statisticalService;
    /**
     * @var EntityManagerInterface
     */
    private $em;
    /**
     * @var MessageService
     */
    private $messageService;
    /**
     * @var UserService
     */
    private $userService;
    /**
     * @var PositionService
     */
    private $positionService;

    public function __construct(LoggerInterface $logger, EntityManagerInterface $em, StatisticalService $statisticalService, MessageService $messageService, UserService $userService, PositionService $positionService)
    {
        $this->logger = $logger;
        $this->em = $em;
        $this->statisticalService = $statisticalService;
        $this->messageService = $messageService;
        $this->userService = $userService;
        $this->positionService = $positionService;
    }

    public function execute(AMQPMessage $msg)
    {
        $this->logger->info('Starting processing message');

        try
        {
            $data = $this->messageService->decodeMessage($msg);

            $this->logger->info('Received data: userID: '.$data->userId.' positionId: '.$data->positionId.' puzzleResult: '.$data->puzzleResult);

            $user = $this->userService->getUserById($data->userId);
            $position = $this->positionService->getPositionById($data->positionId);

            if ($user instanceof User && $position instanceof Position) {
                $this->statisticalService->saveStatistics($user, $position, $data->puzzleResult);
            }
            else
            {
                throw new \Exception('There was an error during fetching data from database');
            }
        }
        catch (\Exception $exception) {

            $this->logger->error('Error during processing a message. Error message: '.$exception->getMessage());
            return false;
        }

        $this->logger->info('Message processed successfully');

        return true;
    }
}