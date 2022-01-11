var db=require('../config/connection')

var collection=require('../config/collections')

const bcrypt=require('bcrypt')
const { reject } = require('bcrypt/promises')
const { ObjectId } = require('mongodb')

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
           
                userData.Password=await bcrypt.hash(userData.Password,10)
               db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                   db.get().collection(collection.USER_COLLECTION).findOne({_id:ObjectId(data.insertedId)}).then((user)=>{
                       resolve(user)
                   })
               })

        })
    
   

    },

    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{

            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})

            if(user)
            {
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status)
                    {
                        console.log('login success');
                        response.user=user
                        response.status=true
                        resolve(response)
                    }
                    else{
                        console.log('login failed');
                        resolve({status:false})
                    }

                })
            }else{
                console.log('login failed');
                resolve({status:false})
            }

        })
    },

    getBookingDetails:(categId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CATEGORY_COLLECTION).findOne({_id:ObjectId(categId)}).then((category)=>{
                resolve(category)
            })
        })
    },

}