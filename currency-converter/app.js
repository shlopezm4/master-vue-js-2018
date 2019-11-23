new Vue({
    el: '#app',
    data: {
        currencies: {},
        amount: 0,
        from: '',
        to: '',
        result: 0,
        loading: false
    },
    //mounted → Es un hook que permite que cuando se cargue la app
    // haga lo que se le está indicando
    // ver más en: https://es.vuejs.org/v2/guide/instance.html#Hooks-del-Ciclo-de-vida-de-la-Instancia
    mounted() {
        this.getCurrencies();
    },
    computed: {
        // Se refrescarán cuando el dato cambie
        formattedCurrencies() {
            return Object.values(this.currencies);
        },
        calculateResult() {
            return (Number(this.amount) * this.result).toFixed(3);
        },
        disabled() {
            return this.amount === 0 || !this.amount || this.loading;
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
            this.loading = true;
            axios.get('https://free.currconv.com/api/v7/convert?q=' + key + '&apiKey=4730ee20c031be5fbf1a')
                .then((response) => {
                    this.loading = false;
                    this.result = response.data.results[key].val;
                });
        }
    },
    watch: {
        // Ven si algún dato cambia (un dropdown, ejemplo)
        from() {
            this.result = 0;
        },
        to() {
            this.result = 0;
        }

    }
})