<?php declare(strict_types=1);

namespace Application\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190629073204 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE position_ranking_history (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, position INT DEFAULT NULL, positionRanking NUMERIC(10, 2) NOT NULL, solveResult TINYINT(1) NOT NULL, INDEX IDX_D74E358EA76ED395 (user_id), INDEX IDX_D74E358E462CE4F5 (position), PRIMARY KEY(id)) DEFAULT CHARACTER SET UTF8 COLLATE UTF8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE position_ranking_history ADD CONSTRAINT FK_D74E358EA76ED395 FOREIGN KEY (user_id) REFERENCES fos_user (id)');
        $this->addSql('ALTER TABLE position_ranking_history ADD CONSTRAINT FK_D74E358E462CE4F5 FOREIGN KEY (position) REFERENCES positions (id_position)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE position_ranking_history');
    }
}
