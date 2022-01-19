import {MigrationInterface, QueryRunner} from "typeorm";

export class brandCreatedAt1642559312607 implements MigrationInterface {
    name = 'brandCreatedAt1642559312607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "brand"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "brand" DROP COLUMN "createdAt"
        `);
    }

}
