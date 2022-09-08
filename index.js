const request = require('request');
const config = require('./config.json');
const b64 = require('nodejs-base64-encode');
const crypto = require('./crypto.js');
const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};

setTimeout(function() {
   console.log(colours.bg.blue, colours.fg.white, "Recent Tab Comment Spammer.", colours.reset)
}, 3000);

setTimeout(function() {
   console.log(colours.bg.magneta, colours.fg.white, colours.reset)
}, 6000);

setTimeout(function() {
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
console.log(colours.bg.black, colours.fg.white, "Fetching", colours.reset)
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
            console.log(colours.bg.red, colours.fg.white, "Error! Make sure your info is in config.json properly and is correct or wait a moment in case of cooldown.", colours.reset)
        }else{
            let args = body.split(':');

            console.log(colours.bg.green, colours.fg.white, 'Got level ID: '+args[1], colours.reset);
            console.log(colours.bg.magneta, colours.fg.white, 'Posting Comment...', colours.reset);
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
                console.log(colours.bg.red, colours.fg.white, 'Error 500 - Servers are down or you got ratelimited.', colours.reset);
            }else{
                console.log(colours.bg.green, colours.fg.white, 'You got comment number: '+body+'\n', colours.reset);
            }
        }
    );
}

 function chk(id){

   let chk = defaults.userName + defaults.comment + id + defaults.percent + "0xPT6iUrtws0J"
   chk = crypto.sha1(chk)
   chk = crypto.encrypt(chk, 29481)
   return chk

}

module.exports.defaults = defaults
}, 9000);
