class Category {
    static all = []

    constructor(id, name, records = []) {
        this.id = id
        this.name = name
        this.records = records
        Category.all.push(this)
    }

    static getAll = () => {
        this.all
    }
}