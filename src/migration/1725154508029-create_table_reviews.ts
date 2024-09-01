import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableReviews1725154508029 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'review',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'avaliation',
          type: 'int',
          isNullable: false,
          width: 1,
        },
        {
          name: 'comment',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'recipeId',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'userId',
          type: 'int',
          isNullable: false,
        },
      ],
    }), true);

    await queryRunner.createForeignKey('review', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE',
    }));

    await queryRunner.createForeignKey('review', new TableForeignKey({
      columnNames: ['recipeId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'recipes',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('review');
    const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
    const foreignKeyRecipe = table.foreignKeys.find(fk => fk.columnNames.indexOf('recipeId') !== -1);

    if (foreignKeyUser) {
      await queryRunner.dropForeignKey('review', foreignKeyUser);
    }

    if (foreignKeyRecipe) {
      await queryRunner.dropForeignKey('review', foreignKeyRecipe);
    }

    await queryRunner.dropTable('review');
  }

}
