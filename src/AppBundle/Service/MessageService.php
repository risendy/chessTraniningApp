<?php


namespace AppBundle\Service;


use AppBundle\Producer\StatProducer;
use AppBundle\DTO\StatisticalDTO;
use AppBundle\Serializer\SerializerHelper;

class MessageService
{
    private $producer;
    private $serializer;

    public function __construct(StatProducer $producer, SerializerHelper $serializer)
    {
        $this->producer = $producer;
        $this->serializer = $serializer->getSerializer();
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

    public function prepareStatsDtoMessage($array)
    {
        $message = new StatisticalDTO(
            $array
        );

        return $this->serializer->serialize($message, 'json');
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