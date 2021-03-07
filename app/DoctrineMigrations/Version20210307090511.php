<?php declare(strict_types=1);

namespace Application\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210307090511 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE positions_theme (id INT AUTO_INCREMENT NOT NULL, id_position INT DEFAULT NULL, name VARCHAR(100) NOT NULL, INDEX IDX_EDBE36F116F70860 (id_position), PRIMARY KEY(id)) DEFAULT CHARACTER SET UTF8 COLLATE `UTF8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE positions_theme ADD CONSTRAINT FK_EDBE36F116F70860 FOREIGN KEY (id_position) REFERENCES positions (id_position)');
        $this->addSql('ALTER TABLE positions DROP theme');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE positions_theme');
        $this->addSql('ALTER TABLE positions ADD theme VARCHAR(200) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`');
    }
}
