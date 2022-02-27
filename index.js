const recordsLink = 'http://127.0.0.1:3000/records'
const categoriesLink = 'http://127.0.0.1:3000/categories'
const recordForm = () => document.getElementById('recordForm')
const recordBox = () => document.getElementsByName('recordBox')
// const editRecord = () => document.getElementById('editRecord')
// const deleteRecord = () => document.getElementById('deleteRecord')

// code used with classes that doesn't work when try to add eventListener to my recordBox div when the records are displayed
document.addEventListener('DOMContentLoaded', () => {
    buttonShow.addEventListener('click', handleClick)
    buttonNew.addEventListener('click', RecordForm.displayForm)
    CategoryApi.fetchCategories()
    // RecordApi.getRecords()

})

const handleClick = () => {
    if (recordContainer.children.length < 1) {
        // MedRecord.displayRecords()
        RecordApi.getRecords()
    } else {
        recordContainer.innerHTML = ""
    }
}


// code that works when all functions are in this index.js file

// document.addEventListener('DOMContentLoaded', () => {
//     buttonShow.addEventListener('click', handleClick)
//     // buttonNew.addEventListener('click', displayForm)
// })

// const handleClick = () => {
//     if (recordContainer.children.length < 1) {
//         fetch(recordsLink)
//         .then(resp => resp.json())
//         .then(json => displayRecords(json))
//         .catch(err => alert(err))
//     } else {
//         recordContainer.innerHTML = ""
//     }
// }

// const phoneFormat = (input) => {
//     if(!input || isNaN(input)) return `input must be a number was sent ${input}`
//     if(typeof(input) !== 'string') input = input.toString()
//     if(input.length === 10){
//         return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
//     } else if(input.length < 10) {
//         return 'was not supplied enough numbers please pass a 10 digit number'
//     } else if(input.length > 10) {
//         return 'was supplied too many numbers please pass a 10 digit number'
//     }else{
//         return 'something went wrong'
//     }
// }

// const date = (input) => {
//     // const splitDate = input.split('-')
//     // debugger
//     input.innerHTML = splitDate[1]+'-'+splitDate[2]+'-'+splitDate[0]
// }

// const displayRecords = (records) => {
//     // records arg DOES recognize json data from fetch here
//     debugger
//     records.forEach(record => {
//         const div = document.createElement('div')
//         div.className = 'recordBox'
//         div.innerHTML = `
//             <h2 class="category">${record.category.name}</h2>
//             <h4 class="date">${record.date}</h4>
//             <h4 class="docName">${record.doc_name}</h4>
//             <h4 class="practiceName">${record.practice_name}</h4>
//             <a href="${record.url}" target="_blank" class="url">${record.url}</a>
//             <p class="phone">${phoneFormat(record.phone)}</p>
//             <h4>Medications:</h4>
//             <p class="meds">${record.medications}</p>
//             <h4>Medication Notes:</h4>
//             <p class="medNotes">${record.med_notes}</p>
//             <h4>General Comments:</h4>
//             <p class="comments">${record.comments}</p>
//             <button class="editRecord" data-id="${record.id}">Edit</button>
//             <button class="deleteRecord" data-id="${record.id}">Delete</button>
//         `
//         const splitDate = record.date.split('-')

//         recordContainer.append(div)
// //         // these eventlistners/querySelectors do NOT throw any errors when rcords displayed
// //         document.querySelector(`button.deleteRecord[data-id="${record.id}"]`).addEventListener('click', handleDeleteRecord)
// //         document.querySelector(`button.editRecord[data-id="${record.id}"]`).addEventListener('click', handleEditButton)
//     })
// }

// const displayForm = () => {
//     if (!recordForm()) {
//         fetch(categoriesLink)
//         .then(resp => resp.json())
//         .then(categories => categories.map((category) => `<option value="${category.id}">${category.name}</option>`))
//         .then(collection => categoryId.innerHTML = collection.join(" "))

//         formContainer.insertAdjacentHTML('afterbegin', `
//             <br><br>
//             <form id="recordForm">
//                 <strong>Select a Category:</strong>
//                 <select id="categoryId"></select>
//                 <br><br>
//                 <input type="text" name="doc_name" id="docName" placeholder="Doctor's Name">
//                 <br><br>
//                 <input type="text" name="practice_name" id="practiceName" placeholder="Business Name">
//                 <br><br>
//                 <input type="text" name="url" id="recordUrl" placeholder="website">
//                 <br><br>
//                 <input type="date" name="date" id="recordDate">
//                 <br><br>
//                 <input type="text" name="phone" id="phone" placeholder="Phone Number">
//                 <br><br>
//                 <textarea name="medications" id="meds" cols="30" rows="10" placeholder="List medications"></textarea>
//                 <br><br>
//                 <textarea name="med_notes" id="medNotes" cols="30" rows="10" placeholder="Medication Notes"></textarea>
//                 <br><br>
//                 <textarea name="comments" id="comments" cols="30" rows="10" placeholder="General comments"></textarea>
//                 <br><br>
//                 <input type="submit" value="Submit"/>
//             </form>
//         `)
//         recordForm().addEventListener('submit', handleSubmit)
//     } else {
//         recordForm().remove()
//     }
// }

// const handleSubmit = (e) => {
//     e.preventDefault()

//     const data = {
//         doc_name: e.target.docName.value,
//         practice_name: e.target.practiceName.value,
//         url: e.target.recordUrl.value,
//         date: e.target.recordDate.value,
//         phone: e.target.phone.value,
//         medications: e.target.meds.value,
//         med_notes: e.target.medNotes.value,
//         comments: e.target.comments.value,
//         category_id: e.target.categoryId.value
//     }

//     fetch(recordsLink, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(resp => resp.json())
//     .then(json => handleCreateRecord(json))
// }

// const handleCreateRecord = (record) => {
//     recordContainer.children.length < 1 ? handleClick() : displayRecord(record, record.category.id)
//     recordForm().reset()
// }

// const handleDeleteRecord = (e) => {
//     fetch(`http://127.0.0.1:3000/records/${e.target.dataset.id}`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'}
//     })
//     .then(resp => resp.json())
//     .then(json => {
//         e.target.parentElement.remove()
//         alert(json.message)
//     })
// }

// const handleEditButton = (e) => {
//     if (e.target.innerText === "Edit") {
//         const recordId = e.target.dataset.id
//         const categoryName = e.target.parentElement.querySelector('.category').innerText
//         const docName = e.target.parentElement.querySelector('.docName').innerText
//         const practiceName = e.target.parentElement.querySelector('.practiceName').innerText
//         const url = e.target.parentElement.querySelector('.url').innerText
//         const phone = e.target.parentElement.querySelector('.phone').innerText.split('-').join('')
//         const meds = e.target.parentElement.querySelector('.meds').innerText
//         const medNotes = e.target.parentElement.querySelector('.medNotes').innerText
//         const comments = e.target.parentElement.querySelector('.comments').innerText
    
//         e.target.parentElement.innerHTML = `
//             <h2>${categoryName}</h2>
//             <h4 class="docName">Doctor's Name:</h4>
//             <input type="text" name="doc_name" id="docName" value="${docName}">
//             <label for="date">Date: </label>
//             <h4 class="practiceName">Business Name:</h4>
//             <input type="text" name="practice_name" id="practiceName" value="${practiceName}">
//             <h4 class="url">Website:</h4>
//             <input type="text" name="url" id="recordUrl" value="${url}">
//             <h4 class="phone">Contact Number:</h4>
//             <input type="text" name="phone" id="phone" value="${phone}">
//             <h4 class="meds">Medications:</h4>
//             <textarea name="medications" id="meds" cols="20" rows="5">${meds}</textarea>
//             <h4 class="medNotes">Medication Notes:</h4>
//             <textarea name="med_notes" id="medNotes" cols="20" rows="5">${medNotes}</textarea>
//             <h4 class="comments">General Comments:</h4>
//             <textarea name="comments" id="comments" cols="20" rows="5">${comments}</textarea>
//             <button class="update-record" data-id="${recordId}">Update</button>
//         `
//         document.querySelector(`button.update-record[data-id="${recordId}"]`).addEventListener('click', handleEditButton)
//     } else {
//         handleUpdateRecord(e)
//     }
// }

// const handleUpdateRecord = (e) => {
//     const data = {
//         doc_name: e.target.parentElement.querySelector('#docName').value,
//         practice_name: e.target.parentElement.querySelector('#practiceName').value,
//         url: e.target.parentElement.querySelector('#recordUrl').value,
//         // date: ,
//         phone: e.target.parentElement.querySelector('#phone').value,
//         medications: e.target.parentElement.querySelector('#meds').value,
//         med_notes: e.target.parentElement.querySelector('#medNotes').value,
//         comments: e.target.parentElement.querySelector('#comments').value
//     }

//     fetch(`http://127.0.0.1:3000/records/${e.target.dataset.id}`, {
//         method: 'PATCH',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(data)
//     })
//     .then(resp => resp.json())
//     .then(json => replaceRecord(json, e.target.parentElement))
// }

// const replaceRecord = (record, recordBox) => {
//     recordBox.innerHTML = `
//         <h2 class="category">${record.category.name}</h2>
//         <h4 class="docName">${record.doc_name}</h4>
//         <h4 class="practiceName">${record.practice_name}</h4>
//         <a href="${record.url}" target="_blank" class="url">${record.url}</a>
//         <p class="phone">${phoneFormat(record.phone)}</p>
//         <h4>Medications:</h4>
//         <p class="meds">${record.medications}</p>
//         <h4>Medication Notes:</h4>
//         <p class="medNotes">${record.med_notes}</p>
//         <h4>General Comments:</h4>
//         <p class="comments">${record.comments}</p>
//         <button class="editRecord" data-id="${record.id}">Edit</button>
//         <button class="deleteRecord" data-id="${record.id}">Delete</button>
//     `
//     document.querySelector(`button.deleteRecord[data-id="${record.id}"]`).addEventListener('click', handleDeleteRecord)
//     document.querySelector(`button.editRecord[data-id="${record.id}"]`).addEventListener('click', handleEditButton)
// }
