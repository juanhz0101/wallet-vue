// 1. Definición de Componentes.

/**
 * Componete: Crear cliente
 */
const clientsCreate = Vue.component("clients-create-component",
{
    template: "#clients-create",
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
 * Componete: Consultar saldo en la billetera
 */
const walletBalance = Vue.component("wallet-balance-component",
{
    template: "#wallet-balance",
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
 * Componete: Cargar dinero en la billetera
 */
const walletsCharge = Vue.component("wallets-charge-component",
{
    template: "#wallets-charge",
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
