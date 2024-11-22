import express from 'express';
import { 
    obtenerSuperheroePorIdController, 
    obtenerTodosLosSuperheroesController, 
    buscarSuperheroesPorAtributoController, 
    obtenerSuperheroesMayoresDe30Controller, 
    crearSuperheroeController, 
    actualizarSuperheroeController, 
    borrarSuperheroePorIdController, 
    borrarSuperheroePorNombreController,
    agregarSuperheroeController,
    editarSuperHeroeController,
    renderEditarSuperheroeFormularioController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

// Ruta para mostrar el formulario de agregar superhéroe
router.get('/heroes/add', (req, res) => {
    res.render('addSuperhero', { titulo: 'Agregar Superhéroe' });
});

// Ruta específica: dashboard
router.get('/heroes/dashboard', (req, res) => {
    res.send({ mensaje: "Página del dashboard" });
});

// Ruta para agregar un nuevo superhéroe
router.post('/heroes/agregar', agregarSuperheroeController);

// Ruta para obtener todos los superhéroes
router.get('/heroes', obtenerTodosLosSuperheroesController);

// Ruta para buscar superhéroes por un atributo específico
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

// Ruta para obtener superhéroes mayores de una edad específica
router.get('/heroes/mayores/:edad', obtenerSuperheroesMayoresDe30Controller);

// Ruta para obtener un superhéroe por ID
router.get('/heroes/:id', obtenerSuperheroePorIdController);

// Ruta para crear un nuevo superhéroe
router.post('/heroes', crearSuperheroeController);

// Ruta para actualizar un superhéroe existente
router.put('/heroes/:id', actualizarSuperheroeController);

// Ruta para eliminar un superhéroe por ID
router.delete('/heroes/:id', borrarSuperheroePorIdController);

// Ruta para eliminar un superhéroe por nombre
router.delete('/heroes/nombre/:nombre', borrarSuperheroePorNombreController);

// Mostrar el formulario de edición
router.get('/heroes/:id/edit', renderEditarSuperheroeFormularioController);

// Procesar la edición
router.post('/heroes/:id/edit', editarSuperHeroeController);

router.post('/heroes/:id/eliminar', async (req, res) => {
    await superheroesController.eliminarSuperheroe(req, res);
});

// Exportar el router para que sea usado en `app.mjs`
export default router;
