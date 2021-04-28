const router = require('express').Router();
const User = require('../model/user');

router.post('/signup',(req,res)=>{
    let {name, email, password} = req.body;
    console.log(name, email, password);
    
    const newuser= new User({
        username:name,
        email:email,
        password:password
    })

    newuser.save()
        .then((result)=>{
            console.log(result);
            res.status(200).json({user:result});
        })

    
})


router.post('/login',(req,res)=>{
    
    let {email, password} = req.body;
    
    console.log( email, password);

    User.findOne({email:email},function(error,result){
        if(error){
            console.log(error);
        }else{
            console.log(result);
            if(result.password == password){
                res.status(200).json({user:result});
            }else{
                res.status(400).json({user:"Wrong Password"});
            }
            
            

        }
    })

    
})

module.exports = router;