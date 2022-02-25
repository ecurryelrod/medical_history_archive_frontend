const recordsLink = 'http://127.0.0.1:3000/records'
const categoriesLink = 'http://127.0.0.1:3000/categories'
const recordForm = () => document.getElementById('recordForm')

document.addEventListener('DOMContentLoaded', () => {
    buttonShow.addEventListener('click', handleClick)
    buttonNew.addEventListener('click', RecordForm.displayForm)
    CategoryApi.fetchCategories()
})

const handleClick = () => {
    if (recordContainer.children.length < 1) {
        RecordApi.getRecords()
    } else {
        recordContainer.innerHTML = ""
    }
}

const phoneFormat = (input) => {
    if(!input || isNaN(input)) return `input must be a number was sent ${input}`
    if(typeof(input) !== 'string') input = input.toString()
    if(input.length === 10){
        return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if(input.length < 10) {
        return 'was not supplied enough numbers please pass a 10 digit number'
    } else if(input.length > 10) {
        return 'was supplied too many numbers please pass a 10 digit number'
    }else{
        return 'something went wrong'
    }
}

// handleDelete