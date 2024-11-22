// superheroesService.mjs
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
    const nuevoSuperheroe = new SuperHero(datosSuperheroe);
    return await SuperHeroRepository.guardar(nuevoSuperheroe);
}

export async function actualizarSuperheroe(id, datosActualizados) {
    return await SuperHeroRepository.actualizar(id, datosActualizados);
}

export async function borrarSuperheroePorId(id) {
    return await SuperHeroRepository.borrarPorId(id);
}

/*export async function borrarSuperheroePorNombre(nombre) {
    return await SuperHeroRepository.borrarPorNombre(nombre);
}*/


export async function borrarSuperheroePorNombre(nombre) {
    console.log(`Servicio: Solicitando borrar superhéroe con nombre: ${nombre}`);
    const resultado = await SuperHeroRepository.borrarPorNombre(nombre);
    if (resultado) {
        console.log(`Servicio: Superhéroe con nombre ${nombre} borrado exitosamente`);
    } else {
        console.log(`Servicio: No se encontró un superhéroe con el nombre ${nombre}`);
    }
    return resultado;
}

export const editarSuperHeroe = async (id, datosActualizados) => {
    try {
        // Encuentra y actualiza el superhéroe por ID, devolviendo el nuevo documento
        const superheroeActualizado = await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });
        if (!superheroeActualizado) {
            throw new Error('Superhéroe no encontrado');
        }
        return superheroeActualizado;
    } catch (error) {
        console.error('Error al actualizar el superhéroe:', error.message);
        throw new Error('Error al actualizar el superhéroe');
    }
};
