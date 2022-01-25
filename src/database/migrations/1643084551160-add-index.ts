import {MigrationInterface, QueryRunner} from "typeorm";

export class addIndex1643084551160 implements MigrationInterface {
    name = 'addIndex1643084551160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_b3234b06e4d16f52b384dfa4dd" ON "product" ("price")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0decfc62b4e4834e2024a9d9c4" ON "product" ("price", "stock")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_0decfc62b4e4834e2024a9d9c4"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b3234b06e4d16f52b384dfa4dd"
        `);
    }

}
