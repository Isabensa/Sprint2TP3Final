export function renderizarSuperheroe(superheroe) {
  return {
      Id: superheroe._id,
      Nombre: superheroe.nombreSuperHeroe,
      "Nombre Real": superheroe.nombreReal,
      Edad: superheroe.edad,
      "Planeta de Origen": superheroe.planetaOrigen,
      Debilidad: superheroe.debilidad,
      Poderes: superheroe.poderes,
      Aliados: superheroe.aliados,
      Enemigos: superheroe.enemigos,
      Creador: superheroe.Creador
  };
}

export function renderizarListaSuperheroes(superheroes) {
  return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}
