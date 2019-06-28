<?php declare(strict_types=1);

namespace Application\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190628224644 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE user_ranking_history (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, position INT DEFAULT NULL, userRanking NUMERIC(10, 2) NOT NULL, solveResult TINYINT(1) NOT NULL, INDEX IDX_3DB74AAEA76ED395 (user_id), INDEX IDX_3DB74AAE462CE4F5 (position), PRIMARY KEY(id)) DEFAULT CHARACTER SET UTF8 COLLATE UTF8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_ranking_history ADD CONSTRAINT FK_3DB74AAEA76ED395 FOREIGN KEY (user_id) REFERENCES fos_user (id)');
        $this->addSql('ALTER TABLE user_ranking_history ADD CONSTRAINT FK_3DB74AAE462CE4F5 FOREIGN KEY (position) REFERENCES positions (id_position)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE user_ranking_history');
    }
}
