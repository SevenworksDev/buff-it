const request = require('request');
const config = require('./config.json');
const b64 = require('nodejs-base64-encode');
const crypto = require('./crypto.js');

console.log("\n
 ▄▄▄▄    █    ██   █████▒ █████▒    ██▓▄▄▄█████▓\n
▓█████▄  ██  ▓██▒▓██   ▒▓██   ▒    ▓██▒▓  ██▒ ▓▒\n
▒██▒ ▄██▓██  ▒██░▒████ ░▒████ ░    ▒██▒▒ ▓██░ ▒░\n
▒██░█▀  ▓▓█  ░██░░▓█▒  ░░▓█▒  ░    ░██░░ ▓██▓ ░ \n
░▓█  ▀█▓▒▒█████▓ ░▒█░   ░▒█░       ░██░  ▒██▒ ░ \n
░▒▓███▀▒░▒▓▒ ▒ ▒  ▒ ░    ▒ ░       ░▓    ▒ ░░   \n
▒░▒   ░ ░░▒░ ░ ░  ░      ░          ▒ ░    ░    \n
 ░    ░  ░░░ ░ ░  ░ ░    ░ ░        ▒ ░  ░      \n
 ░         ░                        ░           \n
      ░                                         \n
")
console.log("Written by TheOnyxGuy, SaturnGMD2 and Sevenworks.")
setInterval(function(){fetchRecents();}, config.timing);

var defaults = {
    "gameVersion":"21",
    "binaryVersion":"35",
    "gjp": crypto.encrypt(config.password, 37526),
    "userName": config.username,
    "comment": b64.encode(config.comment, 'base64'),
    "secret":"Wmfd2893gb7",
    "percent": config.percent,
    "accountID": config.accountID
}

fetchRecents()

function fetchRecents(){
console.log("Fetching...");
request.post({
    url: 'http://www.boomlings.com/database/getGJLevels21.php',

    form:{
        "gameVersion": defaults.gameVersion,
        "binaryVersion": defaults.binaryVersion,
        "gdw":"0",
        "type":"4",
        "str":"",
        "diff":"-",
        "len":"-",
        "page":"0",
        "total":"0",
        "uncompleted":"0",
        "onlyCompleted":"0",
        "featured":"0",
        "original":"0",
        "twoPlayer":"0",
        "coins":"0",
        "epic":"0",
        "secret": defaults.secret
    }

    }, function (err, httpResponse, body) {
        if(err){
            console.log("Error!");
            console.log(err.message);
        }else{
            let args = body.split(':');

            console.log('Got level ID: '+args[1]);
            console.log('Posting Comment...');
            postComment(args[1]); //------------------------------------------------
        }
});
}

function postComment(lvlID){

    request.post({
        url: 'http://www.boomlings.com/database/uploadGJComment21.php',
    
        form:{
            "gameVersion": defaults.gameVersion,
            "binaryVersion": defaults.binaryVersion,
            "gdw": "0",
            "accountID": defaults.accountID,
            "gjp": defaults.gjp,
            "userName": defaults.userName,
            "comment": defaults.comment,
            "secret": defaults.secret,
            "levelID": lvlID,
            "percent": defaults.percent,
            "chk": chk(lvlID)
        }
    
        }, function (err, httpResponse, body) {
            if(err){
                console.log(err.message);
            }else if(httpResponse.statusCode == 500){
                console.log('Error!');
                console.log('500 - Server Side Problem.\nDid you configure the timing in milliseconds and make it over 20000?');
            }else{
                console.log('You got comment number: '+body+'\n');
            }
        }
    );
}

function chk(id){

    let chk = defaults.userName + defaults.comment + id + defaults.percent + "0xPT6iUrtws0J"
    chk = crypto.sha1(chk)
    chk = crypto.encrypt(chk, 29481)
    console.log('CHK hash: '+chk);
    return chk

}

module.exports.defaults = defaults
