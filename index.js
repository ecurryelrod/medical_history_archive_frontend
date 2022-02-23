const recordsLink = 'http://127.0.0.1:3000/records'
const categoriesLink = 'http://127.0.0.1:3000/categories'
const recordForm = () => document.getElementById('recordForm')

document.addEventListener('DOMContentLoaded', () => {
    buttonShow.addEventListener('click', handleClick)
    buttonNew.addEventListener('click', displayForm)
})

const handleClick = () => {
    if (recordContainer.children.length < 1) {
        fetch(recordsLink)
        .then(resp => resp.json())
        .then(records => {displayRecords(records)})
        .catch(err => alert(err))
    } else {
        recordContainer.innerHTML = ""
    }
    // getRecords();
}

// const getRecords = () => {
//     fetch(recordsLink)
//     .then(resp => resp.json())
//     .then(records => {
//         displayRecords(records)
//     })
//     .catch(handleError)
// }

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
    records.forEach(record => displayRecord(record))
}

const displayRecord = (record) => {
    const div = document.createElement('div')
    div.className = 'recordBox'
    div.innerHTML = `
        <h2 class="category">${record.category.name}</h2>
        <h4 class="docName">${record.doc_name}</h4>
        <h4 class="practiceName">${record.practice_name}</h4>
        <a href="${record.url}" target="_blank">${record.url}</a>
        <p class="phone">${phoneFormat(record.phone)}</p>
        <h4>Medications:</h4>
        <p class="meds">${record.medications}</p>
        <h4>Medication Notes:</h4>
        <p class="medNotes">${record.med_notes}</p>
        <h4>General Comments:</h4>
        <p class="comments">${record.comments}</p>
    `
    recordContainer.append(div)
}

const displayForm = () => {
    if (!recordForm()) {
        fetch(categoriesLink)
        .then(resp => resp.json())
        .then(categories => categories.map((category) => `<option value="${category.id}">${category.name}</option>`))
        .then(collection => categoryId.innerHTML = collection.join(" "))

        formContainer.insertAdjacentHTML('afterbegin', `
            <br><br>
            <form id="recordForm">
                <strong>Select a Category:</strong>
                <select id="categoryId"></select>
                <br><br>
                <input type="text" name="doc_name" id="docName" placeholder="Doctor's Name">
                <br><br>
                <input type="text" name="practice_name" id="practiceName" placeholder="Business Name">
                <br><br>
                <input type="text" name="url" id="recordUrl" placeholder="website">
                <br><br>
                <input type="date" name="date" id="recordDate">
                <br><br>
                <input type="number" name="phone" id="phone" placeholder="Phone Number"/>
                <br><br>
                <textarea name="medications" id="meds" cols="30" rows="10" placeholder="List medications"></textarea>
                <br><br>
                <textarea name="med_notes" id="medNotes" cols="30" rows="10" placeholder="Medication Notes"></textarea>
                <br><br>
                <textarea name="comments" id="comments" cols="30" rows="10" placeholder="General comments"></textarea>
                <br><br>
                <input type="submit" value="Submit"/>
            </form>
        `)
        recordForm().addEventListener('submit', handleSubmit)
    } else {
        recordForm().remove()
    }
}


const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
        doc_name: e.target.docName.value,
        practice_name: e.target.practiceName.value,
        url: e.target.recordUrl.value,
        date: e.target.recordDate.value,
        phone: e.target.phone.value,
        medications: e.target.meds.value,
        med_notes: e.target.medNotes.value,
        comments: e.target.comments.value,
        category_id: e.target.categoryId.value
    }

    fetch(recordsLink, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => handleCreateRecord(json))
}

const handleCreateRecord = (record) => {
    recordContainer.children.length < 1 ? handleClick() : displayRecord(record, record.category.id)
    recordForm().reset()
}

// handleDelete