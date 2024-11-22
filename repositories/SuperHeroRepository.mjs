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

    async guardar(superheroe) {
        // Verificar si el objeto es una instancia del modelo de Mongoose
        if (!(superheroe instanceof SuperHero)) {
            superheroe = new SuperHero(superheroe); // Convertir el objeto plano en una instancia del modelo
        }
        return await superheroe.save();
    }

    async actualizar(id, datosActualizados) {
        return await SuperHero.findByIdAndUpdate(id, datosActualizados, { new: true });
    }

    async borrarPorId(id) {
        return await SuperHero.findByIdAndDelete(id);
    }

    async borrarPorNombre(nombre) {
        console.log(`Repositorio: Intentando borrar superhéroe con nombre: ${nombre}`);
        const resultado = await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
        if (resultado) {
            console.log(`Repositorio: Superhéroe ${nombre} borrado exitosamente`);
        } else {
            console.log(`Repositorio: Superhéroe ${nombre} no encontrado`);
        }
        return resultado;
    }
}

export default new SuperHeroRepository();
