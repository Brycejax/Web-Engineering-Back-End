const express = require('express')
const router = express.Router()
const mongodb = require ('mongodb');

const DB_NAME = 'lfood';
const USERS_COLLECTION_NAME = 'users';
const assert = require('assert');
const DB_URI = 'mongodb://localhost:27017'
const MongoClient = mongodb.MongoClient;
const client = new MongoClient(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useNewUrlParser: true});
var objectId = require('mongodb').ObjectID;
//GET requests
router.get('/', function(req, res){
    client.connect(function(err, connection){
        if(err){
            return res.status(500).send({message: "Something went wrong"});
        }
    
            const db = connection.db(DB_NAME); // Connection to the Bookstore DB
            db.collection(USERS_COLLECTION_NAME)
            .find({})
            .toArray(function(find_err, records){
            if(find_err){
                return res.status(500).send({message: "Something went wrong"});
            }
    
                    return res.status(200).send(records);
            })
        })
})

//POST requests
router.post('/', function(req, res){
    if(!req.body.username || !req.body.password || !req.body.fullname || !req.body.creditcard || !req.body.cart)
            return res.status(400).send({ message: "username, password, fullname, credit card, or cart required."})
    
    
        if(!req.body || req.body.length === 0)
            return res.status(400).send({message: "Book data is required"})
    
        console.log(req.body); //print an object
        //data is in req.body
    
        client.connect(function(err, connection){
            const db = connection.db(DB_NAME);
            db.collection(USERS_COLLECTION_NAME)
            .insertOne(req.body, function(insert_error, data){
                if(insert_error)
                    return res.status(500).send({message: "Something went wrong"});
                
                connection.close();
                return res.status(200).send({message: "Record inserted successfully"});
            })
        });
})

router.put('/:id', function(req, res){
    if(!req.params.id || req.params.id.length === 0)
                return res.status(400).send({message: "Request ID is required."})
    client.connect(function(err, connection){
            if (err){
                return res.status(500).send({message: "Something went wrong!"})
            }
            
        const db = connection.db(DB_NAME);
        const data = 
        {
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            creditcard: req.body.creditcard,
            cart: req.body.cart

        }
        db.collection(BOOK_COLLECTION_NAME).updateOne({"_id" : objectId(req.params.id)},                 
        {$set: data},function(err, result) {
            if (err){
                return res.status(500).send({message: "Something went wrong!"})
            }

            assert.equal(null, err);
            return res.status(200).send({message: 'Updated successfully'})

    });
  });
})


//DELETE requests
router.delete('/:id', function(req, res){
    if(!req.params.id || req.body.length === 0)
            return res.status(400).send({message: "User ID is required."})
        var id = req.params.id
    
        client.connect(function(err, connection){
            if(err){
                return res.status(500).send({message: "Something went wrong."})
            }
            const db = connection.db(DB_NAME);
            assert.equal(null, err);
                db.collection(USERS_COLLECTION_NAME).deleteOne({"_id": objectId(id)}, function(del_err, result){
                    if (del_err){
                        return res.status(500).send({message: "Something went wrong."})
                    }
                    assert.equal(null, err);
                    return res.status(200).send({message: 'Deleted successfully'})
                })
        })
})


module.exports = router