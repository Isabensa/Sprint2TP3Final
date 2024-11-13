import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        const query = { [atributo]: new RegExp(valor, 'i') };
        return await SuperHero.find(query);
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({ edad: { $gt: 30 } });
    }

    // Método para guardar un nuevo superhéroe
    async guardar(superheroe) {
        return await superheroe.save();
    }

    // Método para actualizar un superhéroe por ID
    async actualizar(id, datosActualizados) {
        return await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });
    }

    // Método para borrar un superhéroe por ID
    async borrarPorId(id) {
        return await SuperHero.findByIdAndDelete(id);
    }

    // Método para borrar un superhéroe por nombre
    async borrarPorNombre(nombreSuperHeroe) {
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe });
    }
}

export default new SuperHeroRepository();
