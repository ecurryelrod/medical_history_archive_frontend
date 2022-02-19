const endPoint = 'http://127.0.0.1:3000/api/records'

document.addEventListener('DOMContentLoaded', () => {
    getRecords()
})

const getRecords = () => {
    fetch(endPoint)
    .then(resp => resp.json())
    .then(records => {
        displayRecord(records)
    })
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

const displayRecord = (records) => {
    records.data.forEach(record => {
        console.log(record)
        const recordBox = document.createElement('div')
        recordBox.className = 'recordBox'

        const category = document.createElement('h2')
        category.innerText = record.attributes.category.name
        category.className = 'category'
        recordBox.append(category)

        const docName = document.createElement('h4')
        docName.innerText = record.attributes.doc_name
        docName.className = 'doc-name'
        recordBox.append(docName)

        const practiceName = document.createElement('h4')
        practiceName.innerText = record.attributes.practice_name
        practiceName.className = 'practice-name'
        recordBox.append(practiceName)

        const url= document.createElement('a')
        url.href = record.attributes.url
        url.innerText = record.attributes.url
        url.className = 'url'
        recordBox.append(url)

        const phone = document.createElement('p')
        phone.innerText = phoneFormat(record.attributes.phone)
        phone.className = 'phone'
        recordBox.append(phone)

        const medsLabel = document.createElement('h4')
        medsLabel.innerText = 'Medications: '
        const meds = document.createElement('p')
        meds.innerText = record.attributes.medications
        meds.className = 'meds'
        recordBox.append(medsLabel, meds)

        const medNotesLabel = document.createElement('h4')
        medNotesLabel.innerText = 'Medication Notes: '
        const medNotes = document.createElement('p')
        medNotes.innerText = record.attributes.med_notes
        medNotes.className = 'med-notes'
        recordBox.append(medNotesLabel, medNotes)

        const commentLabel = document.createElement('h4')
        commentLabel.innerText = 'General Comments: '
        const comments = document.createElement('p')
        comments.innerText = record.attributes.comments
        comments.className = 'comments'
        recordBox.append(commentLabel, comments)

        recordContainer.append(recordBox)
    })
}