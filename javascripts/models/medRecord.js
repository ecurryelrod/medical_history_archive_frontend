class MedRecord {
    // all and constructor literally do nothing when MedRecord instance created through form
    // not sure if it's supposed to though the way my code is set up currently
    static all = []

    constructor(id, doc_name, practice_name, url, date, phone, medications, med_notes, comments, category_id) {
        this.id = id
        this.doc_name = doc_name
        this.practice_name = practice_name
        this.url = url
        this.date = date
        this.phone = phone
        this.medications = medications
        this.med_notes = med_notes
        this.comments = comments
        this.category_id = category_id
        MedRecord.all.push(this)
    }
     
    static displayRecords = (records) => {
        // records arg does NOT recognize json data from fetch here
        // debugger
        records.forEach(record => {
        // this.all.forEach(record => {
            const div = document.createElement('div')
            div.className = 'recordBox'
            div.innerHTML = `
                <h2 class="category">${record.category.name}</h2>
                <h4 class="docName">${record.doc_name}</h4>
                <h4 class="practiceName">${record.practice_name}</h4>
                <a href="${record.url}" target="_blank">${record.url}</a>
                <p class="phone">${this.phoneFormat(record.phone)}</p>
                <h4>Medications:</h4>
                <p class="meds">${record.medications}</p>
                <h4>Medication Notes:</h4>
                <p class="medNotes">${record.med_notes}</p>
                <h4>General Comments:</h4>
                <p class="comments">${record.comments}</p>
                <button class="editRecord" data-id="${record.id}">Edit</button>
                <button class="deleteRecord" data-id="${record.id}">Delete</button>
            `
            recordContainer.append(div)
            // this line seems to be what's throwing the error and therefore won't load the records properly to the page
            document.querySelector(`.deleteRecord[data-id="${record.id}"]`).addEventListener('click', this.handleDeleteRecord)
            document.querySelector(`.editRecord[data-id="${record.id}"]`).addEventListener('click', this.handleEditButton)
        }) 
    }

    static phoneFormat = (input) => {
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

    static handleEditButton = (e) => {
        // instance or class method???
        debugger
    }

    static handleDeleteRecord = (e) => {
        debugger
        // fetch(`http://127.0.0.1:3000/records/${e.target.dataset.id}`, {
        //     method: 'DELETE',
        //     headers: {'Content-Type': 'application/json'}
        // })
        // .then(resp => resp.json())
        // .then(json => {
        //     e.target.parentElement.remove()
        //     alert(json.message)
        // })
    }
}

