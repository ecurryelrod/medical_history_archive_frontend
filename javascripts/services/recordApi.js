class RecordApi {
    static getRecords = () => {
        fetch(recordsLink)
        .then(resp => resp.json())
        // json comes through as data when debugger placed where MedRecord.displayRecords(json) is
        .then(json => MedRecord.displayRecords(json))
        // .then(json => json.forEach(record => MedRecord.all.push(record)))
        .catch(err => alert(err))
    }
}