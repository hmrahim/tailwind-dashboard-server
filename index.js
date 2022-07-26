const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app =  express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trq2z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async ()=> {
    try {
       const db = await client.connect()
       if(db){
        console.log("database connected");
       }
        // collections=============
        const studentCollection = client.db("dashboard").collection("students")



        // all routes================================
        
        // Students route==============================

        app.get("/student",async(req,res)=> {
            const data = await studentCollection.find().toArray()
            res.send(data)
        })
        app.post("/student",async(req,res)=> {
            const body = req.body
            const result = await studentCollection.insertOne(body)
            res.send(result)
            
            
        })

        app.get("/student/:id",async(req,res)=> {
            const id = req.params.id
            const data = await studentCollection.findOne({_id:ObjectId(id)})
            res.send(data)
        })
        app.delete("/student/:id",async(req,res)=> {
            const id = req.params.id
            const data = await studentCollection.deleteOne({_id:ObjectId(id)})
            res.send(data)
        })


       
 
    } finally{

    }
}


run().catch(console.dir)




app.get("/",(req,res)=> {
    res.send("hi im from home page")
})


app.listen(port , ()=> {
    console.log("server sarted on port5000");
})
