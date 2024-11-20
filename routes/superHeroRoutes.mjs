
// superHeroRoutes.mjs
import express from "express";
import { 
    obtenerSuperheroePorIdController, 
    obtenerTodosLosSuperheroesController, 
    buscarSuperheroesPorAtributoController, 
    obtenerSuperheroesMayoresDe30Controller, 
    crearSuperheroeController,
    actualizarSuperheroeController,
    borrarSuperheroePorIdController,
    borrarSuperheroePorNombreController
} from "../controllers/superheroesController.mjs";

const router = express.Router();

router.get("/heroes", obtenerTodosLosSuperheroesController);
router.get("/heroes/:id", obtenerSuperheroePorIdController);
router.get("/heroes/buscar/:atributo/:valor", buscarSuperheroesPorAtributoController);
router.get("/heroes/mayores/:edad", obtenerSuperheroesMayoresDe30Controller);
router.post("/heroes", crearSuperheroeController);
router.put("/heroes/:id", actualizarSuperheroeController);
router.delete("/heroes/:id", borrarSuperheroePorIdController);
//router.delete("/heroes/nombre/:nombre", borrarSuperheroePorNombreController);

router.delete("/heroes/nombre/:nombre", (req, res, next) => {
    const { nombre } = req.params;
    console.log(`Ruta: Recibiendo solicitud DELETE para superhéroe con nombre: ${nombre}`);
    borrarSuperheroePorNombreController(req, res, next);
});

export default router; 