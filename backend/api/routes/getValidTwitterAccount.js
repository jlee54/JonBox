const Twitter = require("../../twitter/twitter.js");

module.exports = async (req, res) => {
    const account_handle = req.query.account_handle;

    try {
        const user = await Twitter.getUserByUsername(account_handle);
        res.send(user);
    } catch (e){
        res.send({
            error: e.message
        });
    }

};
