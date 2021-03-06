<?php
namespace AppBundle\Command;

use AppBundle\Entity\Position;
use AppBundle\Service\PositionService;
use Doctrine\ORM\EntityManagerInterface;
use Ryanhs\Chess\Chess;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;

class ImportGamesCommand extends ContainerAwareCommand
{
protected static $defaultName = 'app:import-puzzles';
    /**
     * @var PositionService
     */
    private $positionService;
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(PositionService $positionService, EntityManagerInterface $em)
{
    parent::__construct();
    $this->positionService = $positionService;
    $this->em = $em;
}

protected function configure()
{
    $this
        ->addArgument('filename', InputArgument::REQUIRED, 'Please provide file name with lichess csv puzzles');
}

protected function transformSolution($arr)
{
   $returnArr = [];
   $split = explode(' ', $arr);

   foreach ($split as $move) {
       $returnArr[] = substr_replace($move, '-', 2, 0);
    }

   return $returnArr;
}

protected function convertArrayToJson($arr) {
   return json_encode($arr);
}

protected function execute(InputInterface $input, OutputInterface $output)
{
    $rootDir = $this->getContainer()->get('kernel')->getRootDir();
    $fileName = $input->getArgument('filename');

    $this->em->getConfiguration()->setSQLLogger(null);
    $chessTmp = new Chess();

    $output->writeln('Starting importing puzzles...');
    $csv = fopen($rootDir.'/Resources/'.$fileName, 'r');

    $i = 0;
    $batchSize = 100;

    while (!feof($csv)) {
        $line = fgetcsv($csv);

        if ($line) {
            $chessTmp->load($line[1]);
            $solution = $this->transformSolution($line[2]);
            $solutionJson = $this->convertArrayToJson($solution);

            ($chessTmp->turn() == 'b') ? $turn = 'w' : $turn = 'b';

            $position = new Position();
            $position->setFen($line[1]);
            $position->setSolution($solutionJson);
            $position->setPuzzleRanking($line[3]);
            $position->setTheme($line[7]);
            $position->setStartingColor(strtoupper($turn));

            $this->em->persist($position);

            if (($i % $batchSize) === 0) {
                $this->em->flush();
                $this->em->clear();
            }

            $output->writeln('Importing puzzle nr '.$i);
            $i++;
        }
    }

    $this->em->flush();
    $this->em->clear();

    fclose($csv);

    $output->writeln('Finished importing puzzles');
}

}
