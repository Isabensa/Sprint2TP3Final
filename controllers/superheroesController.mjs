import {
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
    crearSuperheroe,
    actualizarSuperheroe,
    borrarSuperheroePorId,
    borrarSuperheroePorNombre,
    editarSuperHeroe
} from '../services/superheroesService.mjs';

import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';

// Controladores de los superhéroes
export async function obtenerSuperheroePorIdController(req, res) {
    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).send({ mensaje: "ID no válido o ausente" });
    }

    try {
        const superheroe = await obtenerSuperheroePorId(id);
        if (superheroe) {
            res.send(renderizarSuperheroe(superheroe));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error al obtener superhéroe por ID:', error);
        res.status(500).send({ mensaje: "Error del servidor al obtener el superhéroe" });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        res.render('dashboard', {
            titulo: 'Lista de Superhéroes',
            superheroes
        });
    } catch (error) {
        console.error('Error al obtener todos los superhéroes:', error);
        res.status(500).send({ mensaje: "Error del servidor al obtener la lista de superhéroes" });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params;
    try {
        const superheroe = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroe.length > 0) {
            res.send(renderizarListaSuperheroes(superheroe));
        } else {
            res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
        }
    } catch (error) {
        console.error('Error al buscar superhéroe por atributo:', error);
        res.status(500).send({ mensaje: "Error del servidor al buscar el superhéroe" });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    const { edad } = req.params;
    try {
        const superheroe = await obtenerSuperheroesMayoresDe30(edad);
        res.send(renderizarListaSuperheroes(superheroe));
    } catch (error) {
        console.error('Error al obtener superhéroes mayores de 30:', error);
        res.status(500).send({ mensaje: "Error del servidor al obtener los superhéroes" });
    }
}

export async function crearSuperheroeController(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    try {
        const datosSuperheroe = req.body;
        const nuevoSuperheroe = await crearSuperheroe(datosSuperheroe);
        res.status(201).send(renderizarSuperheroe(nuevoSuperheroe));
    } catch (error) {
        console.error('Error al crear superhéroe:', error);
        res.status(500).send({ mensaje: "Error del servidor al crear el superhéroe" });
    }
}

export async function actualizarSuperheroeController(req, res) {
    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).send({ mensaje: "ID no válido o ausente" });
    }

    try {
        const datosActualizados = req.body;
        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);
        if (superheroeActualizado) {
            res.send(renderizarSuperheroe(superheroeActualizado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error al actualizar superhéroe:', error);
        res.status(500).send({ mensaje: "Error del servidor al actualizar el superhéroe" });
    }
}

export async function borrarSuperheroePorIdController(req, res) {
    const { id } = req.params;
    if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).send({ mensaje: "ID no válido o ausente" });
    }

    try {
        const superheroeBorrado = await borrarSuperheroePorId(id);
        if (superheroeBorrado) {
            res.send(renderizarSuperheroe(superheroeBorrado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error al borrar superhéroe por ID:', error);
        res.status(500).send({ mensaje: "Error del servidor al borrar el superhéroe" });
    }
}

export async function borrarSuperheroePorNombreController(req, res) {
    const { nombre } = req.params;

    try {
        const superheroeBorrado = await borrarSuperheroePorNombre(nombre);
        if (superheroeBorrado) {
            res.send(renderizarSuperheroe(superheroeBorrado));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error('Error al borrar superhéroe por nombre:', error);
        res.status(500).send({ mensaje: "Error del servidor al borrar el superhéroe" });
    }
}

export const agregarSuperheroeController = async (req, res) => {
    try {
        const { nombreSuperheroe, nombreReal, edad, planetaOrigen, debilidad } = req.body;
        const edadNumerica = Number(edad);
        if (!nombreSuperheroe || !nombreReal || isNaN(edadNumerica) || edadNumerica <= 0 || !planetaOrigen || !debilidad) {
            return res.status(400).render('addSuperhero', {
                error: 'Todos los campos son requeridos y deben ser válidos.'
            });
        }
        const nuevoSuperheroe = {
            nombreSuperheroe,
            nombreReal,
            edad: edadNumerica,
            planetaOrigen,
            debilidad
        };
        const superheroeGuardado = await SuperHeroRepository.guardar(nuevoSuperheroe);
        res.redirect('/api/heroes');
    } catch (error) {
        console.error('Error al agregar superhéroe:', error);
        res.status(500).render('addSuperhero', {
            error: 'Hubo un error al guardar el superhéroe.'
        });
    }
};

export async function editarSuperHeroeController(req, res) {
    const { id } = req.params;
    const datosActualizados = req.body;

    if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).send({ mensaje: "ID no válido o ausente" });
    }

    try {
        const superheroeActualizado = await editarSuperHeroe(id, datosActualizados);
        if (superheroeActualizado) {
            res.redirect('/api/heroes'); // Redirigir al listado tras la edición
        } else {
            res.status(404).render('editSuperhero', {
                error: "Superhéroe no encontrado",
                superheroe: datosActualizados,
            });
        }
    } catch (error) {
        console.error("Error al editar superhéroe:", error);
        res.status(500).render('editSuperhero', {
            error: "Error del servidor al editar el superhéroe",
            superheroe: datosActualizados,
        });
    }
}

export async function renderEditarSuperheroeFormularioController(req, res) {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).send({ mensaje: "ID no válido o ausente" });
    }

    try {
        const superheroe = await obtenerSuperheroePorId(id);
        if (superheroe) {
            res.render('editSuperhero', { superheroe });
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener superhéroe para editar:", error);
        res.status(500).send({ mensaje: "Error del servidor" });
    }
}

export const eliminarSuperheroe = async (req, res) => {
    try {
        const { id } = req.params;
        await borrarSuperheroePorId(id);
        console.log("Héroe eliminado correctamente");
        res.redirect('/api/heroes');
    } catch (error) {
        console.error("Error al intentar eliminar un héroe", error);
        res.status(500).send({ error: "Ocurrió un error al eliminar el héroe" });
    }
};
