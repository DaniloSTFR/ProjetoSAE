-- -----------------------------------------------------
-- Schema projetoSAE
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `projetoSAE` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `projetoSAE` ;

-- -----------------------------------------------------
-- Table `projetoSAE`.`SAE_CategoriasListaOpcoes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `projetoSAE`.`SAE_CategoriasListaOpcoes` ;

CREATE TABLE IF NOT EXISTS `projetoSAE`.`SAE_CategoriasListaOpcoes` (
  `codCategoriasListaOpcoes` INT NOT NULL AUTO_INCREMENT,
  `codCategoriasListaOpcoesUUId` VARCHAR(45) NOT NULL,
  `descricaoCategoriasOpcoes` VARCHAR(200) NOT NULL,
  `nomeInternoCategoriasOpcoes` VARCHAR(200) NULL,
  `ordemCategoriasOpcoes` INT NULL,
  PRIMARY KEY (`codCategoriasListaOpcoes`, `codCategoriasListaOpcoesUUId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE UNIQUE INDEX `ordemCategoriasOpcoes_UNIQUE` ON `projetoSAE`.`SAE_CategoriasListaOpcoes` (`ordemCategoriasOpcoes` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `projetoSAE`.`SAE_CategoriasItens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `projetoSAE`.`SAE_CategoriasItens` ;

CREATE TABLE IF NOT EXISTS `projetoSAE`.`SAE_CategoriasItens` (
  `codCategoriasItens` INT NOT NULL AUTO_INCREMENT,
  `codCategoriasItensUUId` VARCHAR(45) NOT NULL,
  `descricaoCategoriasItens` VARCHAR(200) NOT NULL,
  `nomeInternoCategoriasItens` VARCHAR(200) NULL,
  `ordemCategoriaItens` INT NULL,
  PRIMARY KEY (`codCategoriasItens`, `codCategoriasItensUUId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE UNIQUE INDEX `ordemCategoriaItens_UNIQUE` ON `projetoSAE`.`SAE_CategoriasItens` (`ordemCategoriaItens` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `projetoSAE`.`SAE_ItensFormularios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `projetoSAE`.`SAE_ItensFormularios` ;

CREATE TABLE IF NOT EXISTS `projetoSAE`.`SAE_ItensFormularios` (
  `codItensFormularios` INT NOT NULL AUTO_INCREMENT,
  `descricaoItem` VARCHAR(500) NOT NULL,
  `ordemItem` INT NULL,
  `codCategoriasItensUUId` VARCHAR(45) NULL,
  `opcoesItensFormJSON` JSON NULL,
  PRIMARY KEY (`codItensFormularios`),
  CONSTRAINT `fk_codCategorias_Itens`
    FOREIGN KEY (`codCategoriasItensUUId`)
    REFERENCES `projetoSAE`.`SAE_CategoriasItens` (`codCategoriasItensUUId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE UNIQUE INDEX `ordemCategoria_UNIQUE` ON `projetoSAE`.`SAE_ItensFormularios` (`ordemItem` ASC) VISIBLE;

CREATE INDEX `fk_codCategorias_Itens_idx` ON `projetoSAE`.`SAE_ItensFormularios` (`codCategoriasItensUUId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `projetoSAE`.`SAE_ItensOpcoes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `projetoSAE`.`SAE_ItensOpcoes` ;

CREATE TABLE IF NOT EXISTS `projetoSAE`.`SAE_ItensOpcoes` (
  `codItensOpcoes` INT NOT NULL AUTO_INCREMENT,
  `descricaoOpcoes` VARCHAR(500) NOT NULL,
  `ordemOpcoes` INT NULL,
  `codCategoriasListaOpcoesUUId` VARCHAR(45) NULL,
  `listaOpcoesJSON` JSON NULL,
  PRIMARY KEY (`codItensOpcoes`),
  CONSTRAINT `fk_codCategorias_ListaOpcoes`
    FOREIGN KEY (`codCategoriasListaOpcoesUUId`)
    REFERENCES `projetoSAE`.`SAE_CategoriasListaOpcoes` (`codCategoriasListaOpcoesUUId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE INDEX `fk_codCategorias_ListaOpcoes_idx` ON `projetoSAE`.`SAE_ItensOpcoes` (`codCategoriasListaOpcoesUUId` ASC) VISIBLE;

CREATE UNIQUE INDEX `ordemOpcoes_UNIQUE` ON `projetoSAE`.`SAE_ItensOpcoes` (`ordemOpcoes` ASC) VISIBLE;


