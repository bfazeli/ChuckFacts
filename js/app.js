let chuck = new Vue ({
    el: '#chuck',

    data: {
        appName: 'Chuck Facts',
        isFetching: false,
        randFact: '',
        choice: '',
        query: '',
        categories: ["hi", "bye"]
    },

    methods: {
        getCategories () {

            let viewModel = this
            console.log(this.appName)

            axios.get('https://api.chucknorris.io/jokes/categories', {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then((response) => {
                console.log(response)
                viewModel.categories = response.data
                console.log(viewModel.categories)
                viewModel.randFact = response.data[0]
                console.log(viewModel.appName)
            })
            .catch((err) => {
                alert(err)
            })
                
        },
        retrieveFact () {
            let vm = this
            console.log(this.appName)

            axios.get(`https://api.chucknorris.io/jokes/random?category=${vm.choice}`, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then((response) => {
                vm.randFact = response.data.value
            })
            .catch((err) => {
                alert(err)
            })
        },
        retrieveList () {
            let vm = this
            console.log(this.appName)

            axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then((response) => {
                vm.randFact = response.data.value
            })
            .catch((err) => {
                alert(err)
            })
        }
    },
    filters: {
        highlight: (phrase) => {
            if(!phrase) return ''
            let result
        }
    },
    beforeMount() {
        this.getCategories()
    }

    
})