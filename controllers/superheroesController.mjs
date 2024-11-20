import { 
    obtenerSuperheroePorId, 
    obtenerTodosLosSuperheroes, 
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30, 
    crearSuperheroe, 
    actualizarSuperheroe,
    borrarSuperheroePorId,
    borrarSuperheroePorNombre
} from '../services/superheroesService.mjs';

import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';
import { validationResult } from 'express-validator'; // Importar express-validator para validaciones

export async function obtenerSuperheroePorIdController(req, res) {
    const { id } = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if (superheroe) {
        res.send(renderizarSuperheroe(superheroe));
    } else {
        res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
    const superheroes = await obtenerTodosLosSuperheroes();
    res.send(renderizarListaSuperheroes(superheroes));
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params;
    const superheroe = await buscarSuperheroesPorAtributo(atributo, valor);

    if (superheroe.length > 0) {
        res.send(renderizarListaSuperheroes(superheroe));
    } else {
        res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    const { edad } = req.params;
    const superheroe = await obtenerSuperheroesMayoresDe30(edad);
    res.send(renderizarListaSuperheroes(superheroe));
}

// Función modificada para incluir validaciones
export async function crearSuperheroeController(req, res) {
    const errors = validationResult(req); // Verificar si hay errores de validación
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() }); // Devolver errores si los hay
    }

    const datosSuperheroe = req.body;
    const nuevoSuperheroe = await crearSuperheroe(datosSuperheroe);
    res.status(201).send(renderizarSuperheroe(nuevoSuperheroe));
}

export async function actualizarSuperheroeController(req, res) {
    const { id } = req.params;
    const datosActualizados = req.body;
    const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);

    if (superheroeActualizado) {
        res.send(renderizarSuperheroe(superheroeActualizado));
    } else {
        res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
}

export async function borrarSuperheroePorIdController(req, res) {
    const { id } = req.params;
    const superheroeBorrado = await borrarSuperheroePorId(id);

    if (superheroeBorrado) {
        res.send(renderizarSuperheroe(superheroeBorrado));
    } else {
        res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
}

/*export async function borrarSuperheroePorNombreController(req, res) {
    const { nombre } = req.params;
    const superheroeBorrado = await borrarSuperheroePorNombre(nombre);

    if (superheroeBorrado) {
        res.send(renderizarSuperheroe(superheroeBorrado));
    } else {
        res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
*/

export async function borrarSuperheroePorNombreController(req, res) {
    const { nombre } = req.params;
    console.log(`Controlador: Solicitando borrar superhéroe con nombre: ${nombre}`);
    const superheroeBorrado = await borrarSuperheroePorNombre(nombre);

    if (superheroeBorrado) {
        console.log(`Controlador: Superhéroe con nombre ${nombre} borrado exitosamente`);
        res.send(renderizarSuperheroe(superheroeBorrado));
    } else {
        console.log(`Controlador: No se encontró un superhéroe con el nombre ${nombre}`);
        res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
}