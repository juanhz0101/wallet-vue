/**
 * 
 * Grupo de validaciones para el formulario: Creacion de cliente
 */
var validateName = (value, callback) => {
  if (!value) {
    return callback(new Error('Por favor ingresar nombre'));
  }else {
    callback();
  }
};

var validateEmail = (value, callback) => {
  if (!value) {
    return callback(new Error('Por favor ingresar email'));
  }else {
    callback();
  }
};

var validateDocument = (value, callback) => {
  if (!value) {
    return callback(new Error('Por favor ingresar documento'));
  } else {
    callback();
  }  
};

var validateCellphone = (value, callback) => {
  if (!value) {
    return callback(new Error('Por favor ingresar número de celular'));
  }  else {
    callback();
  }   
};
