class RecordForm {
    static displayForm = (e) => {
        if (!recordForm()) {
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
            const collection = Category.all.map(category => `<option value="${category.id}">${category.name}</option>`)
            categoryId.innerHTML = collection.join("")
    
            recordForm().addEventListener('submit', this.handleSubmit)
        } else {
            recordForm().remove()
        }
    }

    static handleSubmit = (e) => {
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
        .then(json => this.handleCreateRecord(json))
    }

    // when a record is created, if all records are not displayed on page, then handleClick fn invoked so the new record, along with all existing records displays on the page. Else, if the records are already displayed, then display the new record just created alongside the others
    static handleCreateRecord = (record) => {
        recordContainer.children.length < 1 ? handleClick() : medRecord.displayRecord(record)
        // medRecord.displayRecord(record)
        recordForm().reset()
    }
}