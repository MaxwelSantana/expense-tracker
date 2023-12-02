// modules required for routing
const express = require('express');
const router = express.Router();
const CategoryGroups = require('../models/category-groups');
const Categories = require('../models/categories');
const Budgets = require('../models/budget');
const { requireAuth } = require('./auth');
const { DEFAULT_CATEGORY_GROUPS } = require('../helper/categories-helper');
let mongoose = require('mongoose');
const BudgetEntries = require('../models/budget-entries');

router.get('/:key', requireAuth, async function (req, res, next) {
  const key = req.params.key;
  const userId = req.userId;

  const categoryGroups = await CategoryGroups.find({ userId }).lean();
  if (!categoryGroups || !categoryGroups.length) {
    const success = createUserCategories(userId);
    if (!success) {
      res.end("Error creating user categories.");
    }
  }

  const budget = await Budgets.findOne({ key }).lean();

  if (!budget) {
    budget = createBudget(userId, key);
  }

  if (!budget) {
    res.end("Error creating budget");
  }

  const categoryGroupsWithCategories = await CategoryGroups.aggregate([
    {
      $match: { userId: mongoose.Types.ObjectId(userId) }
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "categoryGroupId", 
        as: "categories"
      }
    }]).exec();
  console.log(categoryGroupsWithCategories[0].categories)
  const categoryGroupIds = categoryGroupsWithCategories.map(({ _id }) => _id);
  const updatedCategories = await Categories.find({ categoryGroupId: { "$in": categoryGroupIds } }).lean();
  const budgetEntries = await BudgetEntries.find({ budgetId: budget._id }).lean();

  const result = { ...budget, categoryGroups: categoryGroupsWithCategories, categories: updatedCategories, budgetEntries };
  res.json(result);
});

router.post('/entry', requireAuth, async function (req, res, next) {
  const newEntry = BudgetEntries({
    budgetId: req.body.budgetId,
    categoryId: req.body.categoryId,
    assigned: req.body.assigned,
  });

  const createdEntry = await BudgetEntries.create(newEntry);
  res.json(createdEntry);
});

router.put('/entry/:id', requireAuth, async function (req, res, next) {
  const id = req.params.id;
  const entry = await BudgetEntries.findById(id).exec();

  if (!entry) {
    return res.end("Error");
  }

  entry.assigned = req.body.assigned;

  const updated = await BudgetEntries.findByIdAndUpdate(
    { _id: id },
    entry,
    { new: true }
  )
  res.json(updated);
});

router.post('/newCategory', requireAuth, async function (req,res,next){

  try{
    const catName = req.body.name;
    catgroupID = req.body.categoryGroupId
    //console.log(catgroupID);
    const catGroup = await CategoryGroups.findById(catgroupID);
    //console.log(catGroup)

    const catTarget = req.body.catTarget;
    let newCategory = new Categories({
      "categoryGroupId" : catGroup._id,
      "name" : catName,
      //"target" : catTarget
    });    
    console.log(newCategory);
    
    await Categories.create(newCategory);
    return res.status(200).json({success:true, message:"Transaction added successfully"})
    }
    catch(error){
      return res.status(500).json({error,success:false, message:"Category has not been added"})
    }   
  }
)

router.delete('/deleteCategory/:_id',requireAuth, async function (req,res,next){

  try{    
    catID = req.params._id    
    await Categories.deleteOne({"_id" : catID});

    return res.status(200).json({success:true, message:"Category has been removed"})
    }
    catch(error){
      return res.status(500).json({error,success:false, message:"Category has not been removed"})
    }   
  }
)

router.post('/editTarget', requireAuth, async function (req, res, next) {
  try{
    
    const catID = req.body._id
    console.log("first",catID);
    const newTarget = await Categories.findById(catID);
    console.log(newTarget)

    
    newTarget.target = req.body.target;
    console.log(newTarget);
    await newTarget.save()

    return res.status(200).json({success:true, message:"Transaction has been edited successfully"})
    }
    catch(error){
      return res.status(500).json({error,success:false, message:"Category has not been edited"})
    }   
  });

function createBudget(userId, key) {
  Budgets.create({ userId, key }, (err, result) => {
    if (err) {
      console.log(err);
      return null;
    }

    return result;
  });
}

function createUserCategories(userId) {
  DEFAULT_CATEGORY_GROUPS.forEach(({ name, categories }) => {
    const categoryGroup = { userId, name };
    CategoryGroups.create(categoryGroup, (err, createdCategoryGroup) => {
      if (err) {
        return false;
      }
      const categoryGroupId = createdCategoryGroup._id;
      const categoriesWithId = categories.map(category => ({ name: category, categoryGroupId }))
      Categories.insertMany(categoriesWithId, {}, (err, result) => {
        if (err) {
          return false;
        }
      });
    })
  })
  return true;
}

module.exports = router;