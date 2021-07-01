const { Client, Collection } = require("discord.js");
const mongoose = require("mongoose");

const client = new Client({ disableMentions: "everyone" });
client.config = require("./config.js");
["commands", "aliases"].forEach(x => client[x] = new Collection());

require("./handlers/command.js")(client);
require("./hanlders/event.js")(client);

mongoose.connect(client.config.database.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log("Sucessfully enabled MongoDB!");

client.login(client.config.token);