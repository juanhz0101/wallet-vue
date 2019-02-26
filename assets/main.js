//0. Funciones de ayuda
const apiUri = "http://localhost:3000";

/**
 * Funcion utilizada para convertir el objeto de parametros a un estructura entendible por el servicio de node en una peticion http GET --> [Metodo Externo]
 */
const jsonToQueryString = function(json) {
  return '?' + 
      Object.keys(json).map(function(key) {
          return encodeURIComponent(key) + '=' +
              encodeURIComponent(json[key]);
      }).join('&');
}

/**
 * Funcion utilizad para dar formato de valor tipo pesos del saldo consultado --> [Metodo Externo]
 */
var formatNumber = {
  separador: ".", // separador para los miles
  sepDecimal: ',', // separador para los decimales
  formatear: function(num) {
      num += '';
      var splitStr = num.split('.');
      var splitLeft = splitStr[0];
      var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
      var regx = /(\d+)(\d{3})/;
      while (regx.test(splitLeft)) {
          splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
      }
      return this.simbol + splitLeft + splitRight;
  },
  new: function(num, simbol) {
      this.simbol = simbol || '';
      return this.formatear(num);
  }
}
/**
 * Funcion utilizada para preparar las peticiones http que seran enviadas al servicio de node
 */
const executeApiRequest = function(method,route,params,instance,formName) {

  switch (method) {
    case 'POST':
      axios.post(`${apiUri}${route}`,params)
      .then((response) => {
          const result = response.data;
          if (result.status_code === 200) {
            instance.$refs[formName].resetFields();
            instance.$notify({
              title: 'Satisfactorio',
              message: result.message_success,
              type: 'success',
              offset: 129
            });
          }      
      }).catch(error => {
        const result = error.response.data;
        if (result.status_code === 400) {
          instance.$notify({
            title: 'Advertencia',
            message: result.message_error,
            type: 'warning',
            offset: 129
          });      
        }else if (result.status_code === 500) {
          instance.$notify({
            title: 'Error',
            message: result.message_error,
            type: 'error',
            offset: 129
          });
        }
      });
      break;
  
    case 'GET': 
    //Para esta peticion se configuran unas respuestas mas personalizadas ya que solo se utiliza en la consulta del saldo
    var querystringParams = jsonToQueryString(params);
      axios.get(`${apiUri}${route}${querystringParams}`)
      .then((response) => {
          const result = response.data;
          if (result.status_code === 200) {
            instance.$notify({
              title: 'Satisfactorio',
              message: 'Saldo en pantalla',
              type: 'success',
              offset: 129
            });

            instance.showBalance = true;
            instance.walletBalance = formatNumber.new(result.message_success.balance);
          }      
      }).catch(error => {
        const result = error.response.data;
        if (result.status_code === 400) {
          instance.$notify({
            title: 'Advertencia',
            message: result.message_error,
            type: 'warning',
            offset: 129
          });      
        }else if (result.status_code === 500) {
          instance.$notify({
            title: 'Error',
            message: result.message_error,
            type: 'error',
            offset: 129
          });
        }
      });
    
      break;
  }

  
};

// 1. Definición de Componentes.
/**
 * Componete: Crear cliente
 */
const clientsCreate = Vue.component("clients-create-component",
{
  template: "#clients-create",
  data() {
    return {
      formClientsCreate: {
        name: '',
        email: '',
        document: '',
        cell_phone: '',
      },
      rulesClientsCreate: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        document: [
          { validator: validateDocument, trigger: 'blur' }
        ],
        cell_phone: [
          { validator: validateCellphone, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      
        this.$refs[formName].validate((valid) => {                    
        if (valid) {
          executeApiRequest('POST','/clients/create',this.formClientsCreate,this,formName);   
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
});
/**
 * Componete: Consultar saldo en la billetera
 */
const walletBalance = Vue.component("wallet-balance-component",
{
  template: "#wallet-balance",
  data() {
    return {
      formWalletBalance: {
        document: '',
        cell_phone: '',
      },
      rulesWalletBalance: {
        document: [
          { validator: validateDocument, trigger: 'blur' }
        ],
        cell_phone: [
          { validator: validateCellphone, trigger: 'blur' }
        ]
      },
      showBalance: false,
      walletBalance : ''
    };
  },
  methods: {
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {                    
        if (valid) {
          //Limpiar zona de consulta del saldo
          this.showBalance = false;
          this.walletBalance = '';
          executeApiRequest('GET','/clients/wallet/balance',this.formWalletBalance,this,formName);   
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.showBalance = false;
      this.walletBalance = '';
    }
  }
});
/**
 * Componete: Cargar dinero en la billetera
 */
const walletsCharge = Vue.component("wallets-charge-component",
{
  template: "#wallets-charge",
  data() {
    return {
      formWalletsCharge: {
        document: '',
        cell_phone: '',
      },
      rulesWalletsCharge: {
        document: [
          { validator: validateDocument, trigger: 'blur' }
        ],
        cell_phone: [
          { validator: validateCellphone, trigger: 'blur' }
        ],
        value: [
          { validator: validateValue, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {      
      this.$refs[formName].validate((valid) => {                    
        if (valid) {
          executeApiRequest('POST','/wallets/charge',this.formWalletsCharge,this,formName);   
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
});

/**
 * Componete: Solicitar pago 
 */
const walletsPayrequest = Vue.component("wallets-payrequest-component",
{
    template: "#wallets-payrequest",
    data: function() {
      return {
          institute: "prueba"
      }
  }, 
  mounted() {
     
  },
  methods: {

  }

});

/**
 * Componete: Confirmar pago 
 */
const walletsPaycheck = Vue.component("wallets-paycheck-component",
{
    template: "#wallets-paycheck",
    data: function() {
      return {
          institute: "prueba"
      }
  }, 
  mounted() {
     
  },
  methods: {

  }

});

// 2. Definición de rutas
const routes = [
  { path: '/clients/create', component: clientsCreate },
  { path: '/clients/wallet/balance', component: walletBalance },
  { path: '/wallets/charge', component: walletsCharge },
  { path: '/wallets/payrequest', component: walletsPayrequest },
  { path: '/wallets/paycheck', component: walletsPaycheck }
]

// 3. Creación de instacia de rutas y asignacion de rutas configuradas
const router = new VueRouter({
  routes
})

// 4. Creación de instancia de Vue y asignacion de instacia de rutas
const app = new Vue({
  router
}).$mount('#app')
