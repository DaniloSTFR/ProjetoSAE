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


router.post("/create/categoriasitens", ensureAutenticarUsuario, ensureAdmin,categoriasItensController.createCategoriasItens );
router.get("/showall/categoriasitens", ensureAutenticarUsuario,  categoriasItensController.showAllCategoriasItens );
router.post("/find/categoriasitensbynome", ensureAutenticarUsuario,  categoriasItensController.findCategoriasItensByNome );

router.post("/create/categoriaslistaopcoes", ensureAutenticarUsuario, ensureAdmin, categoriasListaOpcoesController.createCategoriasListaOpcoes );
router.post("/find/categoriaslistaopcoesbyuuid", ensureAutenticarUsuario, categoriasListaOpcoesController.findCategoriasListaOpcoesByUuId );
router.get("/showall/categoriaslistaopcoes", ensureAutenticarUsuario, categoriasListaOpcoesController.showAllCategoriasListaOpcoes );

router.post("/create/itensformularios", ensureAutenticarUsuario, ensureAdmin, itensFormulariosController.createItensFormularios );
router.post("/find/itensformularios", ensureAutenticarUsuario, itensFormulariosController.findOneItensFormularios );
router.get("/showall/itensformularios", ensureAutenticarUsuario,itensFormulariosController.showAllItensFormularios );

router.post("/create/itensopcoes", ensureAutenticarUsuario, ensureAdmin, itensOpcoesController.createItensOpcoes );
router.get("/showall/itensopcoes", ensureAutenticarUsuario, itensOpcoesController.showAllItensOpcoes );

router.post("/analisededados", ensureAutenticarUsuario, analseDeDadosController.analisededados );
router.post("/analisediagnostico", ensureAutenticarUsuario, analseDeDadosController.analisediagnostico );

router.post("/create/usuarios",usuarioController.createUsuarios );
router.get("/showall/usuarios", ensureAutenticarUsuario, ensureAdmin,  usuarioController.showAllUsuarios );
router.post("/autenticarusuarios",usuarioController.autenticarUsuarios );
router.get("/find/usuario",ensureAutenticarUsuario, ensureAdmin,  usuarioController.getUsuarioByUuid);

router.post("/create/prontuarios", ensureAutenticarUsuario, prontuarioController.createProntuarios );
router.post("/find/prontuariocompletebyuuid", ensureAutenticarUsuario, prontuarioController.findProntuarioCompleteByUuId );
router.post("/find/prontuariocompletebynumero", ensureAutenticarUsuario, prontuarioController.findProntuarioCompleteByNumero );

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
router.post("/find/AnamneseDiagnostico", ensureAutenticarUsuario, anamneseDiagnosticoController.findAnamneseDiagnostico );


export { router}
