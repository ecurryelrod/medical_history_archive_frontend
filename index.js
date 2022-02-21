const recordsLink = 'http://127.0.0.1:3000/api/records'
const categoriesLink = 'http://127.0.0.1:3000/api/categories'
const recordForm = () => document.getElementById('record-form')

document.addEventListener('DOMContentLoaded', () => {
    buttonShow.addEventListener('click', handleClick)
    buttonNew.addEventListener('click', displayForm)
})

const handleClick = () => {
    getRecords();
}

const getRecords = () => {
    fetch(recordsLink)
    .then(resp => resp.json())
    .then(records => {
        displayRecords(records)
    })
    .catch(handleError)
}

const handleError = (error) => {
    console.log(error)
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

const displayRecords = (records) => {
    records.data.forEach(record => {

        if (recordContainer.children.length < 1) {
            const recordBox = document.createElement('div')
            recordBox.className = 'recordBox'
            recordBox.innerHTML = `    
                <h2 class="category">${record.attributes.category.name}</h2>
                <h4 class="docName">${record.attributes.doc_name}</h4>
                <h4 class="practiceName">${record.attributes.practice_name}</h4>
                <a href="${record.attributes.url}" target="_blank">${record.attributes.url}</a>
                <p class="phone">${phoneFormat(record.attributes.phone)}</p>
                <h4>Medications:</h4>
                <p class="meds">${record.attributes.medications}</p>
                <h4>Medication Notes:</h4>
                <p class="medNotes">${record.attributes.med_notes}</p>
                <h4>General Comments:</h4>
                <p class="comments">${record.attributes.comments}</p>
            `
            recordContainer.append(recordBox)
        } else {
            recordContainer.innerHTML = ""
        }
    })
}

const displayForm = () => {
    if (!recordForm()) {
        fetch(categoriesLink)
        .then(resp => resp.json())
        .then(categories => categories.data.map((category) => `<option value="${category.id}">${category.attributes.name}</option>`))
        .then(collection => categoryId.innerHTML = collection.join(" "))

        formContainer.insertAdjacentHTML('afterbegin', `
            <br><br>
            <form id="record-form">
                <strong>Select a Category:</strong>
                <select id="categoryId"></select>
                <br><br>
                <input type="text" name="doc_name" placeholder="Doctor's Name">
                <br><br>
                <input type="text" name="practice_name" placeholder="Business Name">
                <br><br>
                <input type="text" name="url" placeholder="website">
                <br><br>
                <input type="date" name="date">
                <br><br>
                <input type="text" name="phone" placeholder="Phone Number"/>
                <br><br>
                <textarea name="medications" id="" cols="30" rows="10" placeholder="List medications"></textarea>
                <br><br>
                <textarea name="med_notes" id="" cols="30" rows="10" placeholder="Medication Notes"></textarea>
                <br><br>
                <textarea name="comments" id="" cols="30" rows="10" placeholder="General comments"></textarea>
                <br><br>
                <input type="submit" value="Submit"/>
            </form>
        `)
    } else {
        recordForm().remove()
    }
}
