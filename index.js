const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// Middle ware
app.use(cors());
app.use(express.json());

// console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0i3pjbq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const ProductsCategories = client
      .db("ShoeFashion")
      .collection("productCategory");
    const ProductsCollection = client.db("ShoeFashion").collection("products");
    const usersCollection = client.db("ShoeFashion").collection("users");

    // Products Category

    app.get("/products/:text", async (req, res) => {
      console.log(req.params.text);
      if (req.params.text === "women" || req.params.text === "men") {
        const result = await ProductsCollection.find({
          category: req.params.text,
        }).toArray();
        // console.log(result);
        res.send(result);
      } else {
        const result = await ProductsCollection.find().toArray();
        res.send(result);
      }
    });


    // User api
    app.get('/users', async(req, res) =>{
      const body = req.body
      const require = await usersCollection.find(body).toArray()
      res.send(result)
    })

    app.post('/users', async(req, res) =>{
      const user = req.body
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Fashion sever is running");
});
app.listen(port);
