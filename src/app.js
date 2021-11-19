const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const { request } = require("http");
const { response } = require("express");
const CONNECTION_URL = 'mongodb://127.0.0.1:27017/Employee';
const DATABASE_NAME = "Employee";


var app = Express();+
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("Employees");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/Employees", (request, response) => {
    collection.insert(request.body, (error, result) => { 
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/Employees", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});





app.put('/Employees/:name', (request, response)=>{
    let query={name:(+request.params.name)}
    let EmpDetail={
               Id:request.body.Id,
               name:request.body.name,
               technology:request.body.technology,
               address:request.body.address
    }
    let dataSet={
        $set:EmpDetail
    }
   database.collection('Employees').updateOne(query,dataSet,(error,result)=>{
       if(error){ throw error}
       response.send(EmpDetail);
   })
});

app.delete('/Employees/:name',(request, response) => {
    database.collection('Employees').deleteOne({name:(request.params.name)}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
     }
        response.send('Record is Deleted')
    })
});








