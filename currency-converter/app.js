new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: null,
        from: '',
        to: '',
        result: 0
    },
    //mounted → Es un hook que permite que cuando se cargue la app
    // haga lo que se le está indicando
    // ver más en: https://es.vuejs.org/v2/guide/instance.html#Hooks-del-Ciclo-de-vida-de-la-Instancia
    mounted() {
        this.getCurrencies();
    },
    computed: {
        formattedCurrencies() {
            return Object.values(this.currencies);
        },
        calculateResult() {
            return (Number(this.amount) * this.result).toFixed(3);
        }
    },
    methods: {
        getCurrencies() {
            const currencies = localStorage.getItem('currencies');
            if (currencies) {
                this.currencies = JSON.parse(currencies);
                return;
            } else {
                axios.get('https://free.currconv.com/api/v7/currencies?apiKey=4730ee20c031be5fbf1a')
                    .then(response => {
                        this.currencies = response.data.results;

                        //Guardar en localStorage
                        localStorage.setItem('currencies', JSON.stringify(response.data.results));
                    })
            }
        },
        convertCurrency() {
            const key = this.from + '_' + this.to;
            axios.get('https://free.currconv.com/api/v7/convert?q=' + key + '&apiKey=4730ee20c031be5fbf1a')
                .then((response) => {
                    this.result = response.data.results[key].val;
                    console.log(this.result);
                });
        }
    }
})