new Vue({
    el: '#app',
    data: {
        currencies: {}
    },
    //mounted → Es un hook que permite que cuando se cargue la app
    // haga lo que se le está indicando
    // ver más en: https://es.vuejs.org/v2/guide/instance.html#Hooks-del-Ciclo-de-vida-de-la-Instancia
    mounted() {
        this.getCurrencies();
    },
    methods: {
        getCurrencies() {
            const currencies = localStorage.getItem('currencies');
            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=sample-key-do-not-use')
                .then(response => {
                    this.currencies = response.data.results;

                    //Guardar en localStorage
                    localStorage.setItem('currencies', JSON.stringify(response.data.results));
                })
        }
    }
})