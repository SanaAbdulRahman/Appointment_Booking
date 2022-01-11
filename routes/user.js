var express = require('express');
const { response } = require('../app');
var router = express.Router();

const categoryHelpers=require('../helpers/category-helpers')

const userHelpers=require('../helpers/user-helpers')

/* GET home page. */
router.get('/home', function(req, res, next) {

  let user=req.session.user

  categoryHelpers.getAllCategory().then((categories)=>{
    console.log(categories)
    res.render('user/view-categories',{categories,user});
})
});

router.get('/',(req,res)=>{
  console.log(req.session.loggedIn)
  if(req.session.loggedIn)
  {
    res.redirect('/home')
  }
  else{
    res.render('user/login',{loginErr:req.session.loginErr})
    req.session.loginErr=false
}
})

router.get('/signup',(req,res)=>{
  res.render('user/signup')
})

router.post('/signup',(req,res)=>{

  userHelpers.doSignup(req.body).then((response)=>{
   
    req.session.loggedIn=true
    req.session.user=response
   // console.log(response);
    res.redirect('/home')
    
  })
})


  router.post('/login',(req,res)=>{

    userHelpers.doLogin(req.body).then((response)=>{
      if(response.status){
        req.session.loggedIn=true
        req.session.user=response.user

        res.redirect('/home')
      }
      else{
        req.session.loginErr="Invalid username or password!!"
        res.redirect('/')
      }
   

    
  })

})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})


router.get('/book-appointment/:id',async (req,res)=>{
  let category= await userHelpers.getBookingDetails(req.params.id)
  console.log(category)
  res.render('user/book-appointment',{category})
})

router.get('/confirm-appointment/:id',(req,res)=>{
  
})

module.exports = router;
