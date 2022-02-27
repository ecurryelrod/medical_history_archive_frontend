class RecordApi {
    static getRecords = () => {
        fetch(recordsLink)
        .then(resp => resp.json())
        // json comes through as data when debugger placed where MedRecord.displayRecords(json) is
        .then(json => MedRecord.displayRecords(json))
        // .then(json => {debugger})

        
        // other things I've tried... but failed...

        // .then(json => json.forEach(elem => MedRecord.all.push(elem)))
        // .then(() => MedRecord.displayRecords())
        // .then(() => MedRecord.all.forEach(record => MedRecord.displayRecord(record)))
        .catch(err => alert(err))
    }
}