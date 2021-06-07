module.exports = async (req, res) => {
    let lobby = {
        code: req.code,
        lobby: true
    };

    let ret;
    async function createLobby(code) {
      ret = await db.insert({ code: code, lobby: true });
    }

    res.send(ret);
};
