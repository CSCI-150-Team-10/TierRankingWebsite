/*
 This will contain functions strictly pertaining to only modifying existing user's password from the "users"
 collection of the database.
 As this stands this is not secure and will be addressed later on
*/
const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://<username>:<password>@<clusterLocation>/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try
{
        await client.connect();
        await findUserFromUsername(client, "<uniqueUsername>");
        await updatePassword(client, "<uniqueUsername>", { password: "<newPassword>"});
    }
	finally
	{
        await client.close();
    }
}

main().catch(console.error);

async function updatePassword(client, nameOfUser, newPassword) {
    const result = await client.db("data").collection("users").updateOne({ password: "NaN" }, { $set: newPassword });

    console.log(`${result.modifiedCount} passwords were changed.`);
}

async function findUserFromUsername(client, nameOfUser) {
    const result = await client.db("data").collection("users").findOne({ username: nameOfUser });

    if (result) {
        console.log(`Found user with name '${nameOfUser}':`);
        console.log(result);
    } else {
        console.log(`No user found with the name '${nameOfUser}'`);
    }
}
