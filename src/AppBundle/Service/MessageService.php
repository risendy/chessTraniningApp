<?php


namespace AppBundle\Service;


use AppBundle\Producer\StatProducer;

class MessageService
{
    private $producer;

    public function __construct(StatProducer $producer)
    {
        $this->producer = $producer;
    }

    public function prepareStatsMessage($userId, $positionId, $puzzleResult)
    {
        $message = [
            "userId"=>$userId,
            "positionId"=>$positionId,
            "puzzleResult"=>$puzzleResult
        ];

        return json_encode($message);
    }

    public function sendMessageToQueue($message)
    {
        $this->producer->publish($message);
    }

    public function decodeMessage($message)
    {
        return json_decode($message->getBody());
    }
}