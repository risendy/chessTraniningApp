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
            "startingColor" => "W",
            "fen" => "8/8/p3k1rN/1p5R/1P3P1K/2r5/P7/8 w - - 5 45",
            "pgn" => "[Event \"Rated Rapid game\"]
[Site \"https://lichess.org/ItbDQjmK\"]
[Date \"2016.10.23\"]
[Round \"-\"]
[White \"topsoul\"]
[Black \"Monyassa\"]
[Result \"1/2-1/2\"]
[UTCDate \"2016.10.23\"]
[UTCTime \"20:51:43\"]
[WhiteElo \"2043\"]
[BlackElo \"2167\"]
[WhiteRatingDiff \"+3\"]
[BlackRatingDiff \"-4\"]
[Variant \"Standard\"]
[TimeControl \"300+7\"]
[ECO \"B20\"]
[Opening \"Sicilian Defense: Bowdler Attack\"]
[Termination \"Normal\"]
[Annotator \"lichess.org\"]

1. e4 c5 2. Bc4 { B20 Sicilian Defense: Bowdler Attack } d6 3. c3 Nf6 4. Qe2 Nc6 5. Bb3 e6 6. d3 Be7 7. h3 O-O 8. Nf3 d5 9. Ng5? { (-0.11 → -1.16) Mistake. Best move was O-O. } (9. O-O b5 10. Bf4 a5 11. a4 b4 12. Nbd2 Ba6 13. c4 d4 14. Ne5 Bb7 15. Bg3 Nxe5) 9... dxe4?! { (-1.16 → -0.17) Inaccuracy. Best move was b5. } (9... b5 10. O-O a5 11. Nf3 a4 12. Bc2 b4 13. Re1 Bb7 14. Qd1 b3 15. axb3 axb3 16. Rxa8) 10. dxe4 h6 11. Nf3 a6? { (-0.16 → 0.97) Mistake. Best move was e5. } (11... e5 12. O-O Qc7 13. Nh4 Rd8 14. Nf5 a6 15. Be3 Bxf5 16. exf5 e4 17. Nd2 Qe5 18. Nc4) 12. g4? { (0.97 → -0.48) Mistake. Best move was e5. } (12. e5) 12... b5 13. g5 hxg5 14. Nxg5?! { (-0.83 → -1.50) Inaccuracy. Best move was Rg1. } (14. Rg1 g4 15. hxg4 c4 16. Bc2 e5 17. g5 Nd7 18. Be3 Nc5 19. Bxc5 Bxc5 20. Nbd2 Ba7) 14... c4 15. Bc2 Ne5 16. Kf1 Nd3 17. Nd2?! { (-1.77 → -2.47) Inaccuracy. Best move was Bxd3. } (17. Bxd3) 17... Nd7?! { (-2.47 → -1.82) Inaccuracy. Best move was e5. } (17... e5 18. Bxd3 cxd3 19. Qf3 a5 20. Rg1 Qd7 21. Rg2 Bb7 22. Kg1 a4 23. Rg3 Rfd8 24. Rg2) 18. h4 N7c5?? { (-1.75 → Mate in 5) Checkmate is now unavoidable. Best move was e5. } (18... e5 19. Bxd3 cxd3 20. Qxd3 Nc5 21. Qxd8 Rxd8 22. Ngf3 Nd3 23. h5 Bg4 24. h6 g6 25. Kg2) 19. Ndf3?? { (Mate in 5 → -2.87) Lost forced checkmate sequence. Best move was Qh5. } (19. Qh5 Bxg5 20. hxg5 f5 21. g6 Qh4 22. Rxh4 Nxc1 23. Qh7#) 19... Bb7?? { (-2.87 → -1.07) Blunder. Best move was f6. } (19... f6 20. Nh3 e5 21. b4 Na4 22. Bxa4 bxa4 23. Ne1 a5 24. b5 Qd7 25. h5 Qxb5 26. Be3) 20. b4?! { (-1.07 → -1.66) Inaccuracy. Best move was Ne5. } (20. Ne5 g6 21. b4 Nxe4 22. Nxe4 Qd5 23. Nxd3 Qxe4 24. Qxe4 Bxe4 25. Rh3 Bf5 26. Rf3 cxd3) 20... Nxc1? { (-1.66 → -0.28) Mistake. Best move was f6. } (20... f6 21. bxc5 fxg5 22. Bxg5 Bxg5 23. hxg5 Rf4 24. Rd1 Qf8 25. Bxd3 cxd3 26. Rxd3 Bxe4 27. Nd4) 21. Rxc1 Nd3?! { (-0.56 → 0.00) Inaccuracy. Best move was f6. } (21... f6 22. Rd1) 22. Rd1 Qc7 23. Bxd3 cxd3 24. Rxd3 Rad8 25. Nd4 Qf4 26. Qh5? { (0.28 → -0.88) Mistake. Best move was Rf3. } (26. Rf3 Qe5 27. Rg1 Bxg5 28. Rxg5 Qxe4 29. Qxe4 Bxe4 30. Rfg3 g6 31. h5 Rd5 32. hxg6 Rxg5) 26... Bxe4 27. Rf3 Qc1+ 28. Kg2 Bxf3+?! { (-0.98 → 0.00) Inaccuracy. Best move was Qf4. } (28... Qf4 29. Kf1 Rxd4 30. cxd4 Qc1+ 31. Kg2 Bxf3+ 32. Qxf3 Qc2 33. a3 Qg6 34. Qe4 Qxe4+ 35. Nxe4) 29. Ndxf3?? { (0.00 → -2.08) Blunder. Best move was Qxf3. } (29. Qxf3 Qd2 30. Qh5 Qd3 31. Rd1 Qg6 32. Qxg6 fxg6 33. Ngxe6 Bxh4 34. Nxf8 Rxf8 35. Nf3 Bf6) 29... Qc2 30. Ne5? { (-2.11 → -4.23) Mistake. Best move was Nd4. } (30. Nd4 Rxd4 31. cxd4 f6 32. Nh3 Bxb4 33. Nf4 Bd6 34. Qe2 Qxe2 35. Nxe2 Rc8 36. Rc1 Rc4) 30... Bxg5?? { (-4.23 → 8.91) Blunder. Best move was Rd2. } (30... Rd2 31. Qf3 Bf6 32. Re1 Qf5 33. Qxf5 exf5 34. Nc6 Bxc3 35. Ne7+ Kh8 36. a3 Ra2 37. Rd1) 31. hxg5 Qe4+ 32. Nf3 f5 33. gxf6?? { (8.09 → -3.86) Blunder. Best move was Rh4. } (33. Rh4 Qg4+ 34. Rxg4 fxg4 35. Qxg4 Rf5 36. Nd4 Rxd4 37. cxd4 Kf7 38. Qh5+ Ke7 39. Qg6 Kf8) 33... Rxf6 34. Rh4 Rg6+?? { (-3.49 → 0.57) Blunder. Best move was Qg6+. } (34... Qg6+ 35. Qxg6) 35. Kh2 Qf5?? { (0.33 → 4.90) Blunder. Best move was Qc2. } (35... Qc2 36. Qh8+ Kf7 37. Ne5+ Ke7 38. Nc6+ Kd6 39. Qxd8+ Kxc6 40. Qc8+ Kb6 41. Qb8+ Kc6 42. Qa7) 36. Qxf5?? { (4.90 → -3.49) Blunder. Best move was Qh8+. } (36. Qh8+ Kf7 37. Qxd8 Rf6 38. Rh3 Rh6 39. Qc7+ Kg6 40. Rxh6+ Kxh6 41. Kg3 Qg6+ 42. Kf4 Qc2) 36... exf5 37. Nd4 Rf6?! { (-3.60 → -2.73) Inaccuracy. Best move was Kf7. } (37... Kf7) 38. Kg3? { (-2.73 → -4.39) Mistake. Best move was Rh3. } (38. Rh3 Rc8 39. Kg2 Kf7 40. Rf3 g6 41. Re3 Rd6 42. Kg3 Kf6 43. f4 Rh8 44. Re1 Kf7) 38... g5?? { (-4.39 → -2.05) Blunder. Best move was Rc8. } (38... Rc8) 39. Rh5 g4?! { (-1.98 → -1.14) Inaccuracy. Best move was Kf7. } (39... Kf7 40. Rxg5 Rc8 41. Ne2 Rg6 42. Rxg6 Kxg6 43. Kf3 Kf6 44. Ke3 Rh8 45. Nf4 Rh1 46. Kd4) 40. Nxf5 Rd3+ 41. Kxg4 Rxc3 42. f4? { (-0.87 → -2.31) Mistake. Best move was Kg5. } (42. Kg5) 42... Rg6+ 43. Kh4 Kf7 44. Nh6+ Ke6??",
            "solution" => '{"array":["f4-f5", "e6-f6", "f5-g6"]}'
        ],
        [
            "startingColor" => "W",
            "fen" => "r1bqkb1r/4pppp/p1p2n2/4p3/2B5/2N5/PPP2PPP/R1BQK2R w KQkq - 0 9",
            "pgn" => "[Event \"Rated Rapid game\"]
[Site \"https://lichess.org/5WJne5YV\"]
[Date \"2016.09.03\"]
[Round \"-\"]
[White \"caiexeu\"]
[Black \"jaye\"]
[Result \"1-0\"]
[UTCDate \"2016.09.03\"]
[UTCTime \"21:55:16\"]
[WhiteElo \"1959\"]
[BlackElo \"1864\"]
[WhiteRatingDiff \"+8\"]
[BlackRatingDiff \"-8\"]
[Variant \"Standard\"]
[TimeControl \"600+0\"]
[ECO \"B50\"]
[Opening \"Sicilian Defense\"]
[Termination \"Normal\"]
[Annotator \"lichess.org\"]

1. e4 c5 2. Nf3 d6 { B50 Sicilian Defense } 3. Bc4 Nc6 4. d4 cxd4 5. Nxd4 a6 6. Nc3 Nf6 7. Nxc6 bxc6 8. e5 dxe5??",
            "solution" => '{"array":["c4-f7", "e8-f7", "d1-d8"]}'
        ],
        [
            "startingColor" => "B",
            "fen" => "r4r2/ppq2N2/2n2kpp/5P2/8/1QP4P/PP4P1/R5K1 w - - 0 24",
            "pgn" => "[Event \"Rated Rapid game\"]
[Site \"https://lichess.org/NVEjUNmx\"]
[Date \"2016.11.26\"]
[Round \"-\"]
[White \"boos2016\"]
[Black \"parviz61\"]
[Result \"1-0\"]
[UTCDate \"2016.11.26\"]
[UTCTime \"05:48:26\"]
[WhiteElo \"2097\"]
[BlackElo \"2008\"]
[WhiteRatingDiff \"+7\"]
[BlackRatingDiff \"-8\"]
[Variant \"Standard\"]
[TimeControl \"420+2\"]
[ECO \"A45\"]
[Opening \"Indian Game\"]
[Termination \"Normal\"]
[Annotator \"lichess.org\"]

1. d4 Nf6 { A45 Indian Game } 2. Bf4 g6 3. e3 Bg7 4. c3 O-O 5. Be2 c5?! { (-0.44 → 0.09) Inaccuracy. Best move was d6. } (5... d6 6. Nf3 b6 7. c4 Nbd7 8. O-O Bb7 9. Nc3 Ne4 10. Nxe4) 6. Nf3 cxd4 7. exd4 d5 8. Nbd2 Nc6 9. h3 Ne4 10. O-O f6 11. Bd3?? { (1.03 → -1.03) Blunder. Best move was Nxe4. } (11. Nxe4 dxe4 12. Nd2 f5 13. Qb3+ Kh8 14. Nc4 e5 15. Nxe5 Nxe5 16. dxe5 Qh4 17. g3 Qe7) 11... e5 12. dxe5 fxe5 13. Bg3? { (-1.49 → -2.97) Mistake. Best move was Bh2. } (13. Bh2 Nc5 14. Be2 e4 15. Ne1 a5 16. a4 b6 17. Bb5 Na7 18. Nb3 Nxb5 19. axb5 Bb7) 13... Nxg3 14. fxg3 e4 15. Bxe4 dxe4 16. Qb3+ Kh8 17. Nxe4 Qc7 18. Nfg5 h6?! { (-3.06 → -2.08) Inaccuracy. Best move was Bf5. } (18... Bf5) 19. Nf7+ Kh7 20. Nf6+?? { (-2.43 → -7.16) Blunder. Best move was g4. } (20. g4 Ne5) 20... Bxf6 21. Rxf6 Bf5?! { (-6.77 → -4.27) Inaccuracy. Best move was Qe7. } (21... Qe7 22. Rf2 Be6 23. Re1 Bxb3 24. Rxe7 Nxe7 25. axb3 Nf5 26. Ne5 Nxg3 27. Nf3 Rae8 28. Kh2) 22. g4 Kg7?? { (-3.94 → -0.15) Blunder. Best move was Qe7. } (22... Qe7 23. gxf5) 23. gxf5 Kxf6??",
            "solution" => '{"array":["b3-e6", "f6-g7", "e6-g6"]}'
        ],
        [
            "startingColor" => "B",
            "fen" => "r5r1/1pR1bk2/1P2p1pp/4Rn2/p2q4/P2Q4/5PPP/6K1 w - - 2 27",
            "pgn" => "[Event \"Hourly Blitz Arena\"]
[Site \"https://lichess.org/bwyHieXZ\"]
[Date \"2016.10.11\"]
[Round \"-\"]
[White \"cool_chess\"]
[Black \"shirly\"]
[Result \"1-0\"]
[UTCDate \"2016.10.11\"]
[UTCTime \"23:33:57\"]
[WhiteElo \"1922\"]
[BlackElo \"1899\"]
[WhiteRatingDiff \"+12\"]
[BlackRatingDiff \"-11\"]
[Variant \"Standard\"]
[TimeControl \"300+0\"]
[ECO \"B12\"]
[Opening \"Caro-Kann Defense: Advance Variation\"]
[Termination \"Normal\"]
[Annotator \"lichess.org\"]

1. e4 c6 2. d4 d5 3. e5 { B12 Caro-Kann Defense: Advance Variation } Bf5 4. c3 e6 5. Bd3 Bxd3 6. Qxd3 c5 7. Ne2 Nc6 8. a3 Qb6 9. O-O Nge7 10. b4 cxd4 11. cxd4 a5 12. b5 Nb8 13. Nbc3 a4 14. Be3 g6 15. Bg5 h6 16. Bf6 Rg8 17. Nf4 Nf5 18. Ncxd5 exd5 19. Nxd5 Qa5 20. b6 Qxd5 21. Rac1 Nc6 22. e6 fxe6 23. Rfe1 Kf7 24. Be5 Nxe5 25. Rxe5 Qxd4 26. Rc7+ Be7",
            "solution" => '{"array":["e5-f5", "g6-f5", "d3-d4"]}'
        ],
        [
            "startingColor" => "B",
            "fen" => "rq3r2/1pp2pQ1/p3p1n1/4b3/6kP/1P2P3/P2P1PK1/R7 w - - 0 24",
            "pgn" => "[Event \"Rated Rapid game\"]
[Site \"https://lichess.org/tQqkNmcu\"]
[Date \"2016.09.30\"]
[Round \"-\"]
[White \"Sandens\"]
[Black \"Vanril\"]
[Result \"0-1\"]
[UTCDate \"2016.09.30\"]
[UTCTime \"12:43:31\"]
[WhiteElo \"2085\"]
[BlackElo \"1947\"]
[WhiteRatingDiff \"-15\"]
[BlackRatingDiff \"+15\"]
[Variant \"Standard\"]
[TimeControl \"480+0\"]
[ECO \"A07\"]
[Opening \"King's Indian Attack\"]
[Termination \"Normal\"]
[Annotator \"lichess.org\"]

1. Nf3 d5 2. g3 { A07 King's Indian Attack } e6 3. Bg2 Nf6 4. O-O Nc6 5. c4 dxc4 6. Qa4 Bd7 7. Qxc4 Qb8 8. Nc3 Bd6 9. b3 O-O 10. Bb2 a6 11. e3 Ne7 12. Ne2 Bb5 13. Qh4 Bxe2 14. Bxf6 gxf6 15. Qxf6 Bxf1 16. Ng5 Ng6 17. Qf3 Bxg2 18. Qh5 Kg7 19. Qxh7+ Kf6 20. Kxg2 Kxg5 21. Qg7 Be5 22. h4+ Kf5 23. g4+ Kxg4",
            "solution" => '{"array":["f2-f3", "g4-f5", "e3-e4", "f5-f4", "g7-h6"]}'
        ],
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
            $position->setStartingColor(self::$fenArray[$key]['startingColor']);
            $position->setFen(self::$fenArray[$key]['fen']);
            $position->setPgn(self::$fenArray[$key]['pgn']);
            $position->setSolution(self::$fenArray[$key]['solution']);
            $manager->persist($position);
        }

        $manager->flush();
    }
}
