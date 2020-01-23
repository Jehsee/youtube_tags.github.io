const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://jehsee:dbaccess@tagsdb-qdtoy.mongodb.net/test?retryWrites=true&w=majority"
const DATABASE_NAME = "TagsDb"

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database
var collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("videos");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post('/videos/:url', (req, res) => {
    collection.insert(req.body, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result.result);
    });
});