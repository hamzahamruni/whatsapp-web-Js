//______________________________________
const express = require("express")
const app = express();
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
//const {Client,LocalAuth} = require("whatsapp-web.js")
//const port =3001;
//______________________________________
// const allSessionsObject = {};
// const client = new Client({
//     puppeteer:{
//         headless:false,
//     },
//     authStrategy: new LocalAuth({
//         clientId:"YOUR_CLIENT_ID"
//     })
// });
const client = new Client();
//______________________________________
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});
//______________________________________
client.on('ready',()=>{
    console.log("client ready");
    sendmsg()
})
async function sendmsg(){
    const numbers =
    [
       {
        number: "911234567",
        msg :  "msg"
       }
    ];// add phone numbers you want send message
    numbers.map( async (index)=>{
        var sanitized_number = index.number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
        var final_number = `218${sanitized_number.substring(sanitized_number.length - 10)}`; // add 218 before the number here 91 is country code of Libya
        console.log("final_number = "+final_number);
        var number_details = await client.getNumberId(final_number); // get mobile number details

        if (number_details) {
            var sendMessageData = await client.sendMessage(number_details._serialized, index.msg); // send message
            console.log(final_number)
        }
        else
        {
            console.log(final_number, "Mobile number is not registered");
        }
    });
}
//______________________________________
client.initialize();

