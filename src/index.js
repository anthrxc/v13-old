const { Client, Collection, Intents } = require("discord.js");
const { connect, connection } = require("mongoose");

const client = new Client({
    allowedMentions: { parse: ["users"] },
    intents: new Intents(32767)
});

client.config = require("./config");

["commands", "aliases"].forEach(x => client[x] = new Collection());
require("./core/cmd")(client);
require("./core/evt")(client);

connect(client.config.info.uri, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("Database connected.");
    }
).catch(
    err => {
        throw err;
    }
);

process.on("beforeExit", 
    () => {
        connection.close();
        console.log("Shutdown imminient; database disconnected.");
    }
);

client.login(client.config.info.token);