var db=require('../config/connection')

var collection=require('../config/collections')


var objectId=require('mongodb').ObjectID

module.exports={
    addCategory:(category,callback)=>{
        db.get().collection('category').insertOne(category).then((data)=>{
            callback(data.insertedId)
        })

    },
    getAllCategory:()=>{
        return new Promise(async (resolve,reject)=>{
            let categories=await db.get().collection(collection.CATEGORY_COLLECTION).find().toArray()
            resolve(categories)
        })
    },
    deleteCategory:(prodId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CATEGORY_COLLECTION).deleteOne({_id:objectId(prodId)}).then((response)=>{
                resolve(response)
            })
        })

    },
    getCategoryDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CATEGORY_COLLECTION).findOne({_id:objectId(proId)}).then((category)=>{
                resolve(category)
            })
        })
    },
    updateCategory:(proId,categoryDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.CATEGORY_COLLECTION)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:categoryDetails.Name,
                    Department:categoryDetails.Department,
                    FromDate:categoryDetails.FromDate,
                    ToDate:categoryDetails.ToDate,
                    FromTime:categoryDetails.FromTime,
                    ToTime:categoryDetails.ToTime

                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}