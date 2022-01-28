const fetch = require('node-fetch');


module.exports.getInfoPlayer = async function getInfoPlayer (name, urlapi){
    try{
    const userInfo = await fetch("https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + urlapi);
    const dataUser = await  userInfo.json();
    
    let userid = dataUser.id;
    let level =  dataUser.summonerLevel;
    let profileIconId = dataUser.profileIconId;
    let imgPlayer = "https://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/"+ profileIconId +".png";

    const leagueurl = await fetch("https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/" + userid + urlapi);
    const dataleague = await leagueurl.json();
    
    let tier
    let rank
    let perjeWins
    
    for await(x of dataleague) {
        if (x.queueType === "RANKED_SOLO_5x5"){
            tier = x.tier
            rank = x.rank
            perjeWins = Math.round((x.wins/((x.losses)+(x.wins)))*100)
        }
      }

    const bestChampsurl = await fetch("https://la2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + userid + urlapi)
    const datachamps = await bestChampsurl.json();

    let champIDs = [datachamps[0].championId, datachamps[1].championId];
    let champLVLs = [datachamps[0].championLevel, datachamps[1].championLevel];
    let champPoints = [datachamps[0].championPoints, datachamps[1].championPoints];

    const namChampurl = await fetch("http://ddragon.leagueoflegends.com/cdn/12.1.1/data/en_US/champion.json")
    const datanamCham = await namChampurl.json();

    let nameChamp1
    let nameChamp2

    for (let key of Object.keys(datanamCham.data)){
        let value = datanamCham.data[key]
        for await (let x of Object.keys(value)){
            if(x=="key"){
                if(value[x] == champIDs[0])
                nameChamp1 = value.name
            }
        }
    }

    for (let key of Object.keys(datanamCham.data)){
        let value = datanamCham.data[key]
        for await (let x of Object.keys(value)){
            if(x=="key"){
                if(value[x] == champIDs[1])
                nameChamp2 = value.name
            }
        }
    }


    let champLVL1 = champLVLs[0]
    let champPoint1 = champPoints[0]
    let imgchamp1 = "https://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/"+nameChamp1+".png"

    let champLVL2 = champLVLs[1]
    let champPoint2 = champPoints[1]
    let imgchamp2 = "https://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/"+nameChamp2+".png"

    let infoplayer = {
        level,
        imgPlayer,
        tier,
        rank,
        perjeWins,
        nameChamp1,
        nameChamp2,
        champLVL1,
        champLVL2,
        champPoint1,
        champPoint2,
        imgchamp1,
        imgchamp2
    }   


    if (userInfo.ok) {
    return {infoplayer}}}

    catch(err){
        return err;
    }
    
}