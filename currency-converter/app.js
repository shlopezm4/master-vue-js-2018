new Vue({
    el: '#app',
    data: {
        currencies: {}
    },
    mounted() {
        axios.get('https://free.currconv.com/api/v7/currencies?apiKey=sample-key-do-not-use')
            .then(response => {
                this.currencies = response.data.results;
            })
    }
})