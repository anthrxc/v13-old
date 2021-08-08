module.exports = async (client) => {
    console.clear();
    console.log(`Pyxis v${require("../../package.json").version} is online.\nMade with <3 by aanthr0, inc.\n----------------------------------------`);
    setTimeout(
        () => {
            console.clear();
        },
        3500
    );
};