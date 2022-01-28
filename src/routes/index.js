const express = require("express");
const router = express.Router();
const apiUse = require("../lib/indexAPI.js")
const apiConfig = require("../config/api.js");
const { cookie } = require("request");

let nickname
let apikey = '?api_key=' + apiConfig.apiToken;


router.get("/", (req,res) =>
    res.render("index.html")
);

router.get("/infoplayer", async(req,res) => {
    let inforeturn = await apiUse.getInfoPlayer(nickname, apikey)
    res.render("infoplayer.html", {nickname, inforeturn})
});


router.post("/", (req,res) =>{
    nickname = req.body.nickname;

    if (nickname == ""){
        res.status(400).send("Ingrese un nick")
    }

    const cookies = "user=hussein; samesite=none; segure"
    res.setHeader("set-cookie", [cookies])
    res.redirect("/infoplayer")
});


module.exports = router;


