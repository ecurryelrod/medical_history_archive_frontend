class medRecord {
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
        this.category_id = this.category_id
        medRecord.all.push(this)
    }

    static displayRecords = (records) => {
        records.forEach(record => this.displayRecord(record))
    }

    static displayRecord = (record) => {
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
}

