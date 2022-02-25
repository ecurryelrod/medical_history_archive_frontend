class CategoryApi {
    static fetchCategories = () => {
        fetch(categoriesLink)
        .then(resp => resp.json())
        .then(json => json.map(category => Category.all.push(category)))
    }
}