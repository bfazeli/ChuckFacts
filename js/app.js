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
        categories: [],
        history: [],
        historyAsString: '',
        queryIsTooShort: false,
        alreadySearched: true,
        factAbout: '',
        lengthErr: "Search must have at least 3 letters"
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
            vm.factDisplayed = false
            vm.isFetching = true
            vm.queryIsTooShort = false

            axios.get(`https://api.chucknorris.io/jokes/random?category=${vm.choice}`, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then((response) => {
                vm.factAbout = vm.choice
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

            vm.listDisplayed = false
            vm.factDisplayed = false

            if (vm.query && vm.query.length > 2) {
                vm.queryIsTooShort = false
                vm.isFetching = true
                
                axios.get(`https://api.chucknorris.io/jokes/search?query=${vm.query}`, {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then((response) => {
                    vm.isFetching = false
                    vm.listDisplayed = true

                    console.log(vm.history.indexOf(vm.query))
                    if(vm.history.indexOf(vm.query) == -1) {
                        vm.history.push(vm.query)
                        vm.historyAsString = vm.history.join(", ")
                    }
                    
                    vm.list = response.data.result
                })
                .catch((err) => {
                    alert(err)
                })
            } else {
                vm.queryIsTooShort = true
            }
        }
    },
    filters: {
        highlight: (phrase, match) => {
            let val = phrase.value
            if(!val) return ''
            return output = val.replace(new RegExp(match, "ig"), function (result) {
                return "<span class='highlight'>" + result + "</span>"
            })
        }
    },
    beforeMount() {
        this.getCategories()
    }

    
})