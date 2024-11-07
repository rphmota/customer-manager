import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCustomers1730847478151 implements MigrationInterface {
  private table = new Table({
    name: 'customers',
    schema: 'customers',
    columns: [
      { name: 'id_customer', type: 'int', isGenerated: true, isPrimary: true },
      { name: 'name', type: 'varchar', length: '20', isNullable: false },
      { name: 'company_price', type: 'numeric', precision: 10, scale: 2, isNullable: false },
      { name: 'salary', type: 'numeric', precision: 10, scale: 2, isNullable: false },     
      {
        name: 'created_at',
        type: 'timestamp with time zone',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp with time zone',
        isNullable: true,
      },
      {
        name: 'deleted_at',
        type: 'timestamp with time zone',
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
