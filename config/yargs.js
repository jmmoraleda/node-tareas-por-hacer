const descripcion = {
    demand: true, // Será obligatorio
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
    default: true, // Valor por defecto
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
};


// Configuramos los comandos que va a tener la aplicación
const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea', {
        descripcion
    })
    .help()
    .argv;

// Para poder usarlo desde fuera de este archivo
module.exports = {
    argv
}