const express = require('express')
const router = express.Router()
const mongodb = require ('mongodb');

const DB_NAME = 'lfood';
const ORDERS_COLLECTION_NAME = 'orders';

const DB_URI = 'mongodb+srv://Alex:Nordhoff@webengineering0-vwh99.mongodb.net/admin?retryWrites=true&w=majority' 
const MongoClient = mongodb.MongoClient;
const client = new MongoClient(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useNewUrlParser: true});


//GET request
router.get('/', function(req, res){
    client.connect(function(err, connection){
        if(err){
            return res.status(500).send({message: "Something went wrong"});
        }
    
            const db = connection.db(DB_NAME); // Connection to the Bookstore DB
            db.collection(ORDERS_COLLECTION_NAME)
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
    if(!req.body.items || !req.body.user || !req.body.payment)
            return res.status(400).send({ message: "title, author, price, ISBN, and stock required."})
    
    
        if(!req.body || req.body.length === 0)
            return res.status(400).send({message: "Book data is required"})
    
        console.log(req.body); //print an object
        //data is in req.body
    
        client.connect(function(err, connection){
            const db = connection.db(DB_NAME);
            db.collection(ORDERS_COLLECTION_NAME)
            .insertOne(req.body, function(insert_error, data){
                if(insert_error)
                    return res.status(500).send({message: "Something went wrong"});
                
                connection.close();
                return res.status(200).send({message: "Record inserted successfully"});
            })
        });
})

//PUT requests
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
            item: req.body.item,
            user: req.body.user,
            payment: req.body.payment
        }
        db.collection(ORDERS_COLLECTION_NAME).updateOne({"_id" : objectId(req.params.id)},                 
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
            return res.status(400).send({message: "Genre ID is required."})
        var id = req.params.id
    
        client.connect(function(err, connection){
            if(err){
                return res.status(500).send({message: "Something went wrong."})
            }
            const db = connection.db(DB_NAME);
            assert.equal(null, err);
                db.collection(ORDERS_COLLECTION_NAME).deleteOne({"_id": objectId(id)}, function(del_err, result){
                    if (del_err){
                        return res.status(500).send({message: "Something went wrong."})
                    }
                    assert.equal(null, err);
                    return res.status(200).send({message: 'Deleted successfully'})
                })
        })
})
module.exports = router