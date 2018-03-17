let chuck = new Vue ({
    el: '#chuck',

    data: {
        appName: 'Chuck Facts',
        isFetching: false,
        randFact: '',
        choice: '',
        query: '',
        factDisplayed: false,
        listDisplayed: false,
        isFetching: false,
        list: [],
        categories: []

    },

    methods: {
        getCategories () {

            let viewModel = this

            axios.get('https://api.chucknorris.io/jokes/categories', {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then((response) => {
                viewModel.categories = response.data
            })
            .catch((err) => {
                alert(err)
            })
                
        },
        retrieveFact () {
            let vm = this
            vm.listDisplayed = false
            vm.isFetching = true

            axios.get(`https://api.chucknorris.io/jokes/random?category=${vm.choice}`, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then((response) => {
                vm.isFetching = false
                vm.factDisplayed = true
                vm.isFetching = false
                vm.randFact = response.data.value
            })
            .catch((err) => {
                alert(err)
            })
        },
        retrieveList () {
            let vm = this

            if (vm.query) {
                vm.isFetching = true
                vm.factDisplayed = false
                axios.get(`https://api.chucknorris.io/jokes/search?query=${vm.query}`, {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then((response) => {
                    vm.isFetching = false
                    vm.listDisplayed = true
                    vm.list = response.data.result
                })
                .catch((err) => {
                    alert(err)
                })
            }
        }
    },
    filters: {
        highlight: (phrase, match) => {
            let val = phrase.value
            if(!val) return ''
            console.log(match)
            return output = val.replace(new RegExp(match, "ig"), function (result) {
                return "<span class='highlight'>" + result + "</span>"
            })
        }
    },
    beforeMount() {
        this.getCategories()
    }

    
})