import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchema1730847310341 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('customers', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropSchema('customers', true);
  }
}
