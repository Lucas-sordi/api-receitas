import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterTableRecipesToAddUserFk1724727730056 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'recipes',
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      'recipes',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('recipes');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1
    );
    await queryRunner.dropForeignKey('recipes', foreignKey);

    await queryRunner.dropColumn('recipes', 'userId');
  }
  
}
