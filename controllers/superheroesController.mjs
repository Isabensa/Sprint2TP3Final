import { obtenerSuperheroePorId, 
    obtenerTodosLosSuperheroes, 
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30 } 
   from '../services/superheroesService.mjs';

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

/*export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
const superheroe = await obtenerSuperheroesMayoresDe30();
res.send(renderizarListaSuperheroes(superheroe));*/


export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    const { edad } = req.params; // Captura el parámetro edad de la URL
    const superheroe = await obtenerSuperheroesMayoresDe30(edad); // Pasa la edad como argumento a la función
    res.send(renderizarListaSuperheroes(superheroe));
}