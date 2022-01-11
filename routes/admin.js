const { response } = require('express');
var express = require('express');
var router = express.Router();
const categoryHelpers=require('../helpers/category-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  categoryHelpers.getAllCategory().then((categories)=>{
    console.log(categories)
    res.render('admin/view-categories',{admin:true,categories});
})
});
router.get('/add-category',(req,res)=>{
  res.render('admin/add-category',{admin:true})
})
router.post('/add-category',(req,res)=>{
  categoryHelpers.addCategory(req.body,(id)=>{
 let image=req.files.Image
 image.mv('./public/category-images/'+id+'.jpg',(err)=>{
   if(!err){
     res.redirect("/admin");
   }
   else{
      console.log(err)
  }
 })
  })
})
router.get('/delete-category/:id',(req,res)=>{
let proId=req.params.id
categoryHelpers.deleteCategory(proId).then((response)=>{
  res.redirect('/admin')
})
})
router.get('/edit-category/:id',async (req,res)=>{
  let category=await categoryHelpers.getCategoryDetails(req.params.id)
  console.log(category)
  res.render('admin/edit-category',{category})
})

router.post('/edit-category/:id',(req,res)=>{
 categoryHelpers.updateCategory(req.params.id,req.body).then(()=>{
   res.redirect('/admin')
 })
})
module.exports = router;
