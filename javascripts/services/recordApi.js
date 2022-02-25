class RecordApi {
    static getRecords = () => {
        fetch(recordsLink)
        .then(resp => resp.json())
        .then(records => {medRecord.displayRecords(records)})
        .catch(err => alert(err))
    }
}