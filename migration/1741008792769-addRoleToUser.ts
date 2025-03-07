import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUser1741008792769 implements MigrationInterface {
  name = 'AddRoleToUser1741008792769';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE \`user_entity\` ADD \`role\` varchar(255) ('student', 'teacher', 'admin') NOT NULL DEFAULT 'admin'`);
    await queryRunner.query(
      `ALTER TABLE \`user_entity\` ADD \`role\` ENUM('student', 'teacher', 'admin') NOT NULL DEFAULT 'admin'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`role\``);
  }
}
