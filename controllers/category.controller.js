const categoryServices = require('../services/category.services');

async function getAll(req,res){
    const allCategory = await categoryServices.getAll()
    // const len = allCategory.length
    console.log(allCategory);
    res.json({
        message : `Category Found `,
        data : allCategory
    })
}

async function insertCategory(req, res){
    const data = req.body
    const category = await categoryServices.insertCategory({
        Name: data.Name,
        c_id: data.c_id
    });
    res.json({
        message: "Category Added",
        data: category
    })
}

async function findSubCategory(req, res){
    const data = req.query;
    const category = await categoryServices.findSubCategory({
        cat_id: data.cat_id
    });
    res.json({
        data: category
    })
}

async function deleteCategory(req,res){
    const data = req.body;
    const category = await categoryServices.deleteCategory({
        id: data.cat_id
    })
    res.json({
        message : `Details from id= ${data.id} deleted`,
        data: category
    })
}

async function deleteSubCategory(req,res){
    const Name= req.params.Name
    const category = await categoryServices.deleteSubCategory({
        Name: Name
    })
    res.json({
        message : `${Name} deleted`,
        data: category
    })
}

async function updateCategory(req,res){
    const data= req.body;
    const category = await categoryServices.updateCategory({
        id:data.id,
        Name: data.Name
    })
    res.json({
        message : `${data.id} Updated`,
        data : category
    })
}

module.exports = {
    getAll,
    insertCategory,
    findSubCategory,
    deleteCategory,
    deleteSubCategory,
    updateCategory
}