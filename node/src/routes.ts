import { Router } from "express";
import { CategoriasItensController } from "./controllers/CategoriasItensController";

const router = Router();

const categoriasItensController = new CategoriasItensController();

router.post("/categoriasitens",categoriasItensController.create );

export { router}