import { Router } from "express";
import { CategoriasItensController } from "./controllers/CategoriasItensController";
import { CategoriasListaOpcoesController } from "./controllers/CategoriasListaOpcoesController";
import { ItensFormulariosController } from "./controllers/ItensFormulariosController";
import { ItensOpcoesController } from "./controllers/ItensOpcoesController";
import { AnalseDeDadosController } from "./controllers/AnalseDeDadosController";
import { UsuarioController }  from "./controllers/UsuarioController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureUserLogin } from "./middlewares/ensureUserLogin";

const router = Router();

const categoriasItensController = new CategoriasItensController();
const categoriasListaOpcoesController = new CategoriasListaOpcoesController();
const itensFormulariosController = new ItensFormulariosController();
const itensOpcoesController = new ItensOpcoesController();
const analseDeDadosController = new AnalseDeDadosController();
const usuarioController = new UsuarioController();


router.post("/categoriasitens",categoriasItensController.create );
router.post("/showcategoriasitens",categoriasItensController.showcategoriasitens );
router.get("/categoriasitens",categoriasItensController.show );

router.post("/categoriaslistaopcoes",categoriasListaOpcoesController.create );
router.post("/showcategoriaslistaopcoes",categoriasListaOpcoesController.showcategoriaslistaopcoes );
router.get("/categoriaslistaopcoes",categoriasListaOpcoesController.show );

router.post("/itensformularios",itensFormulariosController.create );
router.post("/itensformulariosone",itensFormulariosController.showone );
router.get("/itensformularios",itensFormulariosController.show );

router.post("/itensopcoes",itensOpcoesController.create );
router.get("/itensopcoes",itensOpcoesController.show );

router.post("/analisededados",analseDeDadosController.analisededados );
router.post("/analisediagnostico",analseDeDadosController.analisediagnostico );


router.post("/createusuario",usuarioController.createUsuarios );
router.get("/showallUsuario", ensureUserLogin, ensureAdmin,  usuarioController.showAllUsuarios );
router.post("/autenticarUsuarios",usuarioController.autenticarUsuarios );

export { router}