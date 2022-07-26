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
        const teacherCollection = client.db("dashboard").collection("teachers")



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

        // Teachers================

        app.get("/teacher",async(req,res)=> {
            const data = await teacherCollection.find().toArray()
            res.send(data)
        })
        app.post("/teacher",async(req,res)=> {
            const body = req.body
            const result = await teacherCollection.insertOne(body)
            res.send(result)
            
            
        })

        app.get("/teacher/:id",async(req,res)=> {
            const id = req.params.id
            const data = await teacherCollection.findOne({_id:ObjectId(id)})
            res.send(data)
        })
        app.delete("/teacher/:id",async(req,res)=> {
            const id = req.params.id
            const data = await teacherCollection.deleteOne({_id:ObjectId(id)})
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
