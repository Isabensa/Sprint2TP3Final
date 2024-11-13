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

export async function crearSuperheroeController(req, res) {
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

export async function   borrarSuperheroePorNombreController(req, res) {
    const { nombreSuperHeroe } = req.params;
    const superheroeBorrado = await borrarSuperheroePorNombre(nombreSuperHeroe);

    if (superheroeBorrado) {
        res.send(renderizarSuperheroe(superheroeBorrado));
    } else {
        res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
}
