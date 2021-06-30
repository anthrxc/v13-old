# djs-template

An easy-to-use Discord bot template made using the discord.js library.
This template brings you an awesome command handler with options defining how you'd like your command to run.

## Setup

Setting up this template is extremely simple, so that you can focus on what matters when making a bot.


The template comes with MongoDB support, so if you wish to use a different database, or use no database at all, remove mongoose from the dependencies array in the [package.json](https://github.com/aanthr0/djs-template/blob/main/package.json) file, line 3 in the [index.js](https://github.com/aanthr0/djs-template/blob/main/src/index.js#L3) file, lines 11-15 in [the same file](https://github.com/aanthr0/djs-template/blob/main/index.js#L11-L15), and lines 3-5 in [config-example.js](https://github.com/aanthr0/djs-template/blob/main/src/config-example.js#L3-L5).

Next, you'll need to edit the [config](https://github.com/aanthr0/djs-template/blob/main/src/config-example.js) file.
The first change is the name, which you need to change from `config-example` to `config`.
After that, update the values of variables to the correct information.
<br>
*If you'd like to store the bot token and MongoDB connection URI inside of a `.env` file, create the file in [src/](https://github.com/aanthr0/djs-template/tree/main/src) and add the following at the top of the [index.js](https://github.com/aanthr0/djs-template/blob/main/src/index.js) file: `require('dotenv').config({ path: `${process.cwd()}/src/.env`});`. Make sure to install dotenv through `npm i -D dotenv`!*

Once you've updated everything you need to, you're ready to run the bot!
To check for any errors before you start working on your bot, run `npm start` in the console.
If there are no errors, congratulations! You've just created a brand new bot!
If you have found errors, please look at the [contribution](https://github.com/aanthr0/djs-template/blob/main/README.md#contribution) section below.

## Contribution

If you came across an error with the template, or have any ideas you'd like to see, feel free to open [an issue](https://github.com/aanthr0/djs-template/issues).