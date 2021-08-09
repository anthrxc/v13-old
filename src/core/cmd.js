const { readdir, readdirSync } = require("fs");
const { sep } = require("path");

process.exitCode = 1;

module.exports = (client) => {
    var dir = `${process.cwd()}${sep}src${sep}commands`;

    try {
        readdir(dir, (err, subs) => {
            if (err) throw err;

            subs.forEach(
                sub => {
                    dir = `${process.cwd()}${sep}src${sep}commands${sep}${sub}`;
                    const commands = readdirSync(dir).filter(f => f.endsWith(".js"));

                    commands.forEach(
                        command => {
                            dir = `${dir}${sep}${command}`;
                            const cmd = require(dir);

                            if (!cmd.run) {
                                console.error(`Command at "${dir}" cannot be ran as it does not export a run function.`);
                                process.exit();
                            };
                            if (!cmd.help) {
                                console.error(`Command at "${dir}" does not provide information about itself.`);
                                process.exit();
                            };

                            if (!cmd.help.name) {
                                console.error(`Command at "${dir}" does not export a name value.`);
                                process.exit();
                            };
                            if (typeof cmd.help.name !== "string") {
                                console.error(`Command at "${dir}" exports an invalid name value; it can only be a string.`);
                                process.exit();
                            };
                            if (!cmd.help.description) {
                                console.error(`Command at "${dir}" does not export a description value.`);
                                process.exit();
                            };
                            if (typeof cmd.help.description !== "string") {
                                console.error(`Command at "${dir}" exports an invalid description value; it can only be a string.`);
                                process.exit();
                            };

                            if (client.commands.get(cmd.help.name)) {
                                console.error(`Command at "${dir}" exports the same name value as another command.`);
                                process.exit();
                            };

                            if (cmd.help.aliases) {
                                if (typeof cmd.help.aliases !== "string" && typeof cmd.help.aliases !== "object") {
                                    console.error(`Command at "${dir}" exports an invalid aliases value; it can only be a string or an object.`);
                                    process.exit();
                                };

                                let aliases;
                                if (typeof cmd.help.aliases === "string") aliases = [cmd.help.aliases];
                                else aliases = cmd.help.aliases;

                                aliases.forEach(
                                    alias => {
                                        if (client.aliases.get(alias)) {
                                            console.error(`Command at "${dir}" exports the same alias value as another command.`);
                                            process.exit();
                                        };
                                        client.aliases.set(alias, cmd.help.name);
                                    }
                                );
                            };
                            if (cmd.help.ownerOnly && typeof cmd.help.ownerOnly !== "boolean") {
                                console.error(`Command at "${dir}" exports an invalid ownerOnly value; it can only be a boolean.`);
                                process.exit();
                            };

                            if (cmd.help.usage && typeof cmd.help.usage !== "string") {
                                console.error(`Command at "${dir}" exports an invalid usage value; it can only be a string.`);
                                process.exit();
                            };
                            
                            if (!cmd.help.minArgs) cmd.help.minArgs = 0;
                            if (!cmd.help.maxArgs || cmd.help.maxArgs < -1) cmd.help.maxArgs = -1;
                            
                            if (typeof cmd.help.minArgs !== "number") {
                                console.error(`Command at "${dir}" exports an invalid minArgs value; it can only be a number.`);
                                process.exit();
                            };
                            if (typeof cmd.help.maxArgs !== "number") {
                                console.error(`Command at "${dir}" exports an invalid maxArgs vlaue; it can only be a number.`);
                                process.exit();
                            };

                            if (cmd.help.minArgs > cmd.help.maxArgs && cmd.help.maxArgs !== -1) {
                                console.error(`Command at "${dir}" minimally requires more arguments than maximally allowed.`);
                                process.exit();
                            };

                            client.commands.set(cmd.help.name, cmd);
                            console.log(`Loaded "${cmd.help.name}" command.`);
                        }
                    );
                }
            );
        });
    }
    catch (e) {
        throw e;
    };
};
