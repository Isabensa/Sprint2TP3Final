import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';
import SuperHero from '../models/SuperHero.mjs';

export async function obtenerSuperheroePorId(id) {
    return await SuperHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    return await SuperHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30(edad) {
    return await SuperHero.find({ edad: { $gt: Number(edad) } });
}

export async function crearSuperheroe(datosSuperheroe) {
    // Crear una nueva instancia del modelo SuperHero con los datos recibidos, incluyendo "creador"
    const nuevoSuperheroe = new SuperHero(datosSuperheroe);
    
    // Guardar el superhéroe en la base de datos a través del repositorio
    return await SuperHeroRepository.guardar(nuevoSuperheroe);
}

// Función para actualizar un superhéroe
export async function actualizarSuperheroe(id, datosActualizados) {
    return await SuperHeroRepository.actualizar(id, datosActualizados);
}

// Función para borrar un superhéroe por ID
export async function borrarSuperheroePorId(id) {
    return await SuperHeroRepository.borrarPorId(id);
}

// Función para borrar un superhéroe por nombre
export async function borrarSuperheroePorNombre(nombreSuperHeroe) {
    return await SuperHeroRepository.borrarPorNombre(nombreSuperHeroe);
}
