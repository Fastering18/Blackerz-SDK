// Routing resources
const editBot = require("./Bots/editBot")

const Resources = {
    bot: class botData {
        constructor(Auth, authorID, id) {
            if (!Auth) return TypeError("new blackerz.bot(auth, authorID) require authorization v1 parameter!");
            if (!authorID) return TypeError("new blackerz.bot(auth, authorID) require Discord author id for bot author!");

            this.AuthorizationV1 = Auth
            this.authorID = authorID
            if (id) this.botID = id;
        };
        botId(id) {
            this.botID = id
        }
        edit(data) {
            return new Promise((resolve, reject) => {
                if (!this.botID) return reject(TypeError("this function require bot id parameter! bot.botId(yourbotid)"));
                let editData = data;
                editData["id"] = this.botID;
                editData["v1Auth"] = this.AuthorizationV1;
                editData["authorID"] = this.authorID

                editBot.edit(editData).then(result => {
                    resolve(result)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}

module.exports = Resources;