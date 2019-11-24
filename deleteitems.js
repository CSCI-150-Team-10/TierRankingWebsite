
const {MongoClient} = require('mongodb'); 
 

    async function main()
{
    const url = "mongodb://127.0.0.1:27017"; 
    //const uri = "mongodb+srv://<username>:<password>@<clusterLocation>/test?retryWrites=true&w=majority";
   
    const client = new MongoClient(url);

    try
{
        await client.connect();
        await deleteitems(client,{Name: "test" });
    }
	finally
	{
        await client.close();
    }
}
main().catch(console.error);

async function deleteitems(client, oldItem){
    const result = await client.db("TeirRanking").collection("Notebooks").deleteOne(oldItem);
//    const result = await client.db("data").collection("items").insertOne(oldItem);
    console.log(`New Item created with _id: ${result.insertedId}`);
}