/*
	In order to run NodeJS and the MongoDB Client need to be installed
	Also the uri needs slight modifications to connect to the database
*/
const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://<username>:<password>@<clusterLocation>/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try
{
        await client.connect();

        await userExists(client, "<uniqueUsername>");
        await deleteExistingUser(client, "<uniqueUsername>");
        await userExists(client, "<uniqueUsername>");

    }
	finally 
	{
        await client.close();
    }
}

main().catch(console.error);

async function deleteExistingUser(client, username) {
    const result = await client.db("data").collection("users").deleteOne({ name: username });
    console.log(`${result.deletedCount} documents were deleted.`);
}

async function userExists(client, username) {
    const result = await client.db("data").collection("users").findOne({ name: username });

    if (result)
	{
		console.log(`Found user in the collection with the username '${username}'`);
	} 
	else 
	{
        console.log(`No user found with the username '${username}'`);
    }
}
