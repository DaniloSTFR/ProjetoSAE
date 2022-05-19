import { Router } from "express";
import { CategoriasItensController } from "./controllers/CategoriasItensController";
import { CategoriasListaOpcoesController } from "./controllers/CategoriasListaOpcoesController";
import { ItensFormulariosController } from "./controllers/ItensFormulariosController";
import { ItensOpcoesController } from "./controllers/ItensOpcoesController";
import { AnalseDeDadosController } from "./controllers/AnalseDeDadosController";
import { UsuarioController }  from "./controllers/UsuarioController";
import { ProntuarioController }  from "./controllers/ProntuarioController";
import { ComentarioProntuarioController } from "./controllers/ComentarioProntuarioController";

import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAutenticarUsuario } from "./middlewares/ensureAutenticarUsuario";


const router = Router();

const categoriasItensController = new CategoriasItensController();
const categoriasListaOpcoesController = new CategoriasListaOpcoesController();
const itensFormulariosController = new ItensFormulariosController();
const itensOpcoesController = new ItensOpcoesController();
const analseDeDadosController = new AnalseDeDadosController();
const usuarioController = new UsuarioController();
const prontuarioController = new ProntuarioController();
const comentarioProntuarioContoller = new ComentarioProntuarioController();


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


router.post("/createusuarios",usuarioController.createUsuarios );
router.get("/showallusuarios", ensureAutenticarUsuario, ensureAdmin,  usuarioController.showAllUsuarios );
router.post("/autenticarusuarios",usuarioController.autenticarUsuarios );

router.post("/createprontuarios", ensureAutenticarUsuario, prontuarioController.createProntuarios );
router.post("/findprontuariocompletebyuuid", ensureAutenticarUsuario, prontuarioController.findProntuarioCompleteByUuId );
router.post("/findprontuariocompletebynumero", ensureAutenticarUsuario, prontuarioController.findProntuarioCompleteByNumero );

router.post("/createcomentarioprontuario", ensureAutenticarUsuario, comentarioProntuarioContoller.createComentarioProntuarios );



export { router}
