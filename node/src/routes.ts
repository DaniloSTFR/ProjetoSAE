import { Router } from "express";
import { CategoriasItensController } from "./controllers/CategoriasItensController";
import { CategoriasListaOpcoesController } from "./controllers/CategoriasListaOpcoesController";
import { ItensFormulariosController } from "./controllers/ItensFormulariosController";
import { ItensOpcoesController } from "./controllers/ItensOpcoesController";
import { AnalseDeDadosController } from "./controllers/AnalseDeDadosController";
import { UsuarioController }  from "./controllers/UsuarioController";
import { ProntuarioController }  from "./controllers/ProntuarioController";
import { ComentarioProntuarioController } from "./controllers/ComentarioProntuarioController";
import { NotificacaoUsuarioController } from "./controllers/NotificacaoUsuarioController";
import { RascunhoProntuarioController } from "./controllers/RascunhoProntuarioController";
import { AnamneseDiagnosticoController } from "./controllers/AnamneseDiagnosticoController";

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
const notificacaoUsuarioController = new NotificacaoUsuarioController();
const rascunhoProntuarioController = new RascunhoProntuarioController();
const anamneseDiagnosticoController = new AnamneseDiagnosticoController();


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

router.post("/analisededados", ensureAutenticarUsuario, analseDeDadosController.analisededados );
router.post("/analisediagnostico", ensureAutenticarUsuario, analseDeDadosController.analisediagnostico );

router.post("/create/usuarios",usuarioController.createUsuarios );
router.get("/showall/usuarios", ensureAutenticarUsuario, ensureAdmin,  usuarioController.showAllUsuarios );
router.post("/autenticarusuarios",usuarioController.autenticarUsuarios );

router.post("/create/prontuarios", ensureAutenticarUsuario, prontuarioController.createProntuarios );
router.get("/find/prontuariocompletebyuuid", ensureAutenticarUsuario, prontuarioController.findProntuarioCompleteByUuId );
router.get("/find/prontuariocompletebynumero", ensureAutenticarUsuario, prontuarioController.findProntuarioCompleteByNumero );

router.post("/create/comentarioprontuarios", ensureAutenticarUsuario, comentarioProntuarioContoller.createComentarioProntuarios );

router.post("/create/notificacaousuarios", ensureAutenticarUsuario, notificacaoUsuarioController.createNotificacaoUsuarios );
router.post("/create/comentarionotificacaousuarios", ensureAutenticarUsuario, notificacaoUsuarioController.createComentarioNotificacaoUsuarios );
router.get("/showall/notificacoesusuario", ensureAutenticarUsuario, notificacaoUsuarioController.showAllNotificacoesUsuarioNaoVistas );
router.patch("/update/statusnotificacaousuariovista", ensureAutenticarUsuario, notificacaoUsuarioController.updateStatusNotificacaoUsuarioVista );

router.post("/create/rascunhoprontuarios", ensureAutenticarUsuario, rascunhoProntuarioController.createRascunhoProntuarios );
router.get("/showall/rascunhoprontuarios", ensureAutenticarUsuario, rascunhoProntuarioController.showAllRascunhoProntuarios );
router.patch("/update/rascunhoprontuarios", ensureAutenticarUsuario, rascunhoProntuarioController.updateRascunhoProntuarios );
router.delete("/delete/rascunhoprontuarios", ensureAutenticarUsuario, rascunhoProntuarioController.deleteRascunhoProntuarios );

router.post("/create/anamnesediagnosticos", ensureAutenticarUsuario, anamneseDiagnosticoController.createAnamneseDiagnosticos );
router.patch("/update/anamnesediagnosticos", ensureAutenticarUsuario, anamneseDiagnosticoController.updateAnamneseDiagnosticos );
router.get("/find/AnamneseDiagnostico", ensureAutenticarUsuario, anamneseDiagnosticoController.findAnamneseDiagnostico );


export { router}
