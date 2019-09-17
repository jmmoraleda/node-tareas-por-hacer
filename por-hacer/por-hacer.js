const fs = require('fs');

let listadoPorHacer = [];

// La función guardará las nuevas tareas en el archivo data.json
const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer); // Convierto un objeto a un formato JSON válido

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

//  Obtenemos el JSON y lo cargo en listadoPorHacer
const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json'); // El require detecta que es un formato JSON y lo serializa convirtiéndolo en 
        // un objeto javascript para poder usarlo

    } catch (error) { // Si no hay datos capturamos el error e inicializamos la lista
        listadoPorHacer = [];
    }

}



const crear = (descripcion) => {

    cargarDB(); // Cargamos los datos anteriores que haya en el json persistente

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB(); // Guardamos en el JSON persistente

    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}