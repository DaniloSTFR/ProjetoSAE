import {MigrationInterface, QueryRunner, Table, TableIndex,TableColumn, TableForeignKey} from "typeorm";

export class CreateSAECategoriasItens1621181133893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "SAE_CategoriasItens",
                columns: [
                    {
                        name: "codCategoriasItens",
                        type: "int",
                        isPrimary: true,
                        generationStrategy:"increment", 

                    },
                    {
                      name: 'codCategoriasItensUUId',
                      type: 'varchar',
                      isPrimary: true,
                      generationStrategy: 'uuid',

                    },
                    {
                      name: "descricaoCategorias",
                      type: "varchar(200)"
                    },
                    {
                      name: "nomeInternoCategorias",
                      type: "varchar(200)"
                    },
                    {
                      name: "ordemCategoria",
                      type: "int"
                    }
                  ]    
            })         
        );
        await queryRunner.createIndex("SAE_CategoriasItens", new TableIndex({
            name: "IDX_ORDEMCATEGORIA",
            columnNames: ["ordemCategoria"]
        }));

        await queryRunner.query( "ALTER TABLE projetosae.sae_categoriasitens CHANGE COLUMN codCategoriasItens codCategoriasItens INT(11) NOT NULL AUTO_INCREMENT;" );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("SAE_CategoriasItens");
    }

}
