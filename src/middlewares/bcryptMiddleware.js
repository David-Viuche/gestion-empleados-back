const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/config');

const codificar = async (pass) => {
    const hashPass = await bcrypt.hash(pass, saltRounds);
    
    return  hashPass;
}

const comparar = (pass, passBD) => {
    bcrypt.compare(pass, passBD, function (err, result) {
        return result;
    });
}

module.exports = {
    codificar,
    comparar
}