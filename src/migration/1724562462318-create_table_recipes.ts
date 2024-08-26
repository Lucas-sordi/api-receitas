import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableRecipes1724562462318 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'recipes',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'ingredients',
          type: 'text',
          isNullable: false,
          isArray: true,
        },
        {
          name: 'instructions',
          type: 'text',
          isNullable: false,
        },
        {
          name: 'preparationTime',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'cookingTime',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'totalTime',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'servings',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'views',
          type: 'int',
          isNullable: false,
          default: 0,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recipes');
  }

}
