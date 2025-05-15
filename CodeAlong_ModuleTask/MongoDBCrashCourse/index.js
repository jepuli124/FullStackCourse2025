const { mongoClient } = requre("mongodb")

const uri = "";

const client = new mongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect((err) => {
    const collection = client.db("test").collection("stuff")

    const pipe = [{
        '$id' : 1
    }]

    client.close()
})
