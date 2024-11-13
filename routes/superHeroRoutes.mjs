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
router.put("/heroes/:id", actualizarSuperheroeController); // Ruta para actualizar superhéroe por ID
router.delete("/heroes/:id", borrarSuperheroePorIdController); // Ruta para borrar superhéroe por ID
router.delete("/heroes/nombreSuperHeroe/:nombreSuperHeroe", borrarSuperheroePorNombreController);  // Ruta para borrar superhéroe por nombre


export default router;
