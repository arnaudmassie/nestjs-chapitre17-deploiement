import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741081293022 implements MigrationInterface {
    name = 'Migration1741081293022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD \`role\` varchar(255) ('student', 'teacher', 'admin') NOT NULL DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP COLUMN \`role\``);
    }

}
