/**
 * 
 * Grupo de validaciones para el formulario: Creacion de cliente
 */
var validateName = (rule,value, callback) => {
  if (!value) {
    return callback(new Error('Por favor ingresar nombre'));
  }else {
    callback();
  }
};

var validateEmail = (rule,value, callback) => {
  if (!value) {
    return callback(new Error('Por favor ingresar email'));
  }else {
    callback();
  }
};

var validateDocument = (rule,value, callback) => {
  if (!value) {
    return callback(new Error('Por favor ingresar documento'));
  } else {
    callback();
  }  
};

var validateCellphone = (rule,value, callback) => {
  if (!value) {
    return callback(new Error('Por favor ingresar número de celular'));
  }  else {
    callback();
  }   
};
