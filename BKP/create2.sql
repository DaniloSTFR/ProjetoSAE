CREATE TABLE IF NOT EXISTS `projetoSAE`.`SAE_CategoriasListaOpcoes` (
  `codCategoriasListaOpcoesUUId` VARCHAR(45) NOT NULL,
  `descricaoCategoriasOpcoes` VARCHAR(200) NOT NULL,
  `nomeInternoCategoriasOpcoes` VARCHAR(200) NULL,
  `ordemCategoriasOpcoes` INT NULL,
  PRIMARY KEY ( `codCategoriasListaOpcoesUUId`),
  UNIQUE INDEX `ordemCategoriasOpcoes_UNIQUE` (`ordemCategoriasOpcoes` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `projetoSAE`.`SAE_CategoriasItens` (
  `codCategoriasItensUUId` VARCHAR(45) NOT NULL,
  `descricaoCategoriasItens` VARCHAR(200) NOT NULL,
  `nomeInternoCategoriasItens` VARCHAR(200) NULL,
  `ordemCategoriaItens` INT NULL,
  PRIMARY KEY (`codCategoriasItensUUId`),
  UNIQUE INDEX `ordemCategoriaItens_UNIQUE` (`ordemCategoriaItens` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `projetoSAE`.`SAE_ItensFormularios` (
  `codItensFormularios` INT NOT NULL AUTO_INCREMENT,
  `descricaoItem` VARCHAR(500) NOT NULL,
  `ordemItem` INT NULL,
  `codCategoriasItensUUId` VARCHAR(45) NOT NULL,
  `opcoesItensFormJSON` JSON NULL,
  UNIQUE INDEX `ordemCategoria_UNIQUE` (`ordemItem` ASC) ,
  PRIMARY KEY (`codItensFormularios`),
  CONSTRAINT `fk_codCategoriasItensUUId`
    FOREIGN KEY (`codCategoriasItensUUId`)
    REFERENCES `projetoSAE`.`SAE_CategoriasItens` (`codCategoriasItensUUId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `projetoSAE`.`SAE_ItensOpcoes` (
  `codItensOpcoes` INT NOT NULL AUTO_INCREMENT,
  `descricaoOpcoes` VARCHAR(500) NOT NULL,
  `ordemOpcoes` INT NULL,
  `codCategoriasListaOpcoesUUId` VARCHAR(45) NOT NULL,
  `listaOpcoesJSON` JSON NULL,
  PRIMARY KEY (`codItensOpcoes`),
  UNIQUE INDEX `ordemOpcoes_UNIQUE` (`ordemOpcoes` ASC),
  CONSTRAINT `fk_codCategoriasListaOpcoesUUId`
    FOREIGN KEY (`codCategoriasListaOpcoesUUId`)
    REFERENCES `projetoSAE`.`SAE_CategoriasListaOpcoes` (`codCategoriasListaOpcoesUUId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;
