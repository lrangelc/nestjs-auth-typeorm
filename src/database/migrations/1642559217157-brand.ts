import {MigrationInterface, QueryRunner} from "typeorm";

export class brand1642559217157 implements MigrationInterface {
    name = 'brand1642559217157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "brand" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "image" character varying(255) NOT NULL,
                CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "brand"
        `);
    }

}
