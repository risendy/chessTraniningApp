<?php

namespace AppBundle\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use AppBundle\Entity\Position;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class AppFixtures extends Fixture implements FixtureInterface, ContainerAwareInterface
{
    public $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    static $fenArray = [
        [
            "fen" => "rn1qkbnr/p1pbpppp/3p4/1p6/2B1P3/3P4/PPP2PPP/RNBQK1NR w KQkq - 0 4",
            "solution" => '{"array":["c4-f7","e8-f7","d1-h5","g7-g6","h5-d5"]}'        
        ],
        [
            "fen" => "1r1q3k/2p4p/p2pb3/4brp1/2p3P1/1QN5/PP3P1P/3RRBK1 w - - 0 23",
            "solution" => '{"array":["b3-c2","f5-f4","e1-e5"]}'        
        ],
        [
            "fen" => "r1b2rk1/1p3ppp/2p1pn2/p7/P1Pq2P1/1P1p3P/3K4/b2QNB1R b - - 1 19",
            "solution" => '{"array":["f6-e4","d2-c1","d4-b2"]}'        
        ],
        [
            "fen" => "r2qr1k1/1p1b2bp/p2N1pp1/3Pn1B1/8/1B3P2/PP1Q2PP/R4RK1 b - - 0 18",
            "solution" => '{"array":["d8-b6","g5-e3","b6-d6"]}'        
        ],
        [
            "fen" => "r3k2r/ppp2ppp/2nb4/6q1/1PPP2b1/P6P/1BQN1PP1/R3KB1R b KQkq - 0 13",
            "solution" => '{"array":["g5-e3","f1-e2","e3-e2"]}'        
        ],
        [
            "fen" => "r1b1k2r/p4ppp/3P4/1p1K4/1q2PP2/5Q1P/P1P3P1/R1B2B1R b kq - 0 22",
            "solution" => '{"array":["c8-b7","d5-e5","b4-c5"]}'        
        ],
        [
            "fen" => "8/R3R2p/5pk1/6p1/1P4Pn/P5KP/5P2/3r4 b - - 4 42",
            "solution" => '{"array":["d1-g1","g3-h2","h5-f3"]}'        
        ],
        [
            "fen" => "8/4R3/8/rBpk4/P7/2n5/3r4/5RK1 w - - 7 45",
            "solution" => '{"array":["e2-d2","d4-e3","d2-d7"]}'        
        ],
        [
            "fen" => "2k5/pn3p2/6b1/4Npqr/PPPP4/8/5PQ1/2b2K2 w - - 0 31",
            "solution" => '{"array":["g2-c6","c8-b8","e5-d7","b8-a8","c6-c8"]}'        
        ],
        [
            "fen" => "1k4Q1/1pp4p/p7/8/8/4q2P/PP3rP1/3R1RK1 b - - 1 32",
            "solution" => '{"array":["f2-f8","g1-h1","f8-g8"]}'        
        ]
    ];

    static $users = [
        [
            "username" => "user1",
            "email" => "email@domain.com",
            "password" => "pass1",
            "role" => ["ROLE_ADMIN"]
        ]
    ];

    public function load(ObjectManager $manager)
    {
        $userManager = $this->container->get('fos_user.user_manager');

        foreach (self::$users as $key => $value) {
            $user = $userManager->createUser();
            $user->setUsername(self::$users[$key]['username']);
            $user->setEmail(self::$users[$key]['email']);
            $user->setPlainPassword(self::$users[$key]['password']);
            $user->setEnabled(true);
            $user->setRoles(self::$users[$key]['role']);

            $userManager->updateUser($user, true);
        }

        foreach (self::$fenArray as $key => $value) {
            $position = new Position();
            $position->setFen(self::$fenArray[$key]['fen']);
            $position->setSolution(self::$fenArray[$key]['solution']);
            $manager->persist($position);
        }

        $manager->flush();
    }
}
