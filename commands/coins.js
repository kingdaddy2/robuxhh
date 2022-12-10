const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const data = require("../models/balance");
const sdb = require("../models/system");
const { MessageEmbed, MessageAttachment } = require('discord.js');
const talkedRecently = new Set();


module.exports.run = async (client, message, args, prefix, mes) => {
  
  
  
  let cooldown = 1
  
  if (talkedRecently.has(message.author.id)) {
            const cooldownmessage = new MessageEmbed()
    .setColor('#ec1c24')
    .setTitle(`يجب عليك الانتظار لمدة ${Number(cooldown) / 1000} ثواني ، لإعادة استخدام هذا الامر`);
    
            message.channel.send(cooldownmessage)
    .then(async (m)=> {
             setTimeout(() => {
               m.delete()
             }, 3000) 
            })
    } else {
      
      
      
      talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, cooldown);
      
  let system = await sdb.findOne({
    guildid: "868525050884685844",
  })
  if (!system) return message.channel.send("**يجب عليك تسجيل معلومات الجروب اولا ، تواصل مع اونر السيرفر لحل المشكله**");
  
  
  
   if (!message.channel.name.startsWith("ticket")) return;
  let ticketroom = "907310137818099802";
  let tranferID = system.owner;
  let price = 1
  let pricerobux = Math.floor((price * 20) / 19);
  let ch = client.channels.cache.get("1028718311476830308");

  
  
  const rr1 = new MessageEmbed()
    .setColor('#ec1c24')
    .setDescription(`**يمكنك استخدام هذا الامر في السيرفر فقط <#${ticketroom}>**`);
  
  if (message.channel.type == "dm")
    return message.channel.send(rr1);
  let price2 = args[1] * pricerobux;
  let priceNow = Math.floor(price2 - price2 * (5 / 100));

  
    const rr2 = new MessageEmbed()
    .setColor('#ec1c24')
    .setDescription("**ألرجاء كتابة عدد الكريديت المراد الشراء به بعد الأمر\n!buy [عدد الكريديت اللي هتشتري بيه]**");
  if (!args[1])
    return message.channel.send(rr2);
  
    const rr3 = new MessageEmbed()
    .setColor('#ec1c24')
    .setDescription(`**الرجاء كتابة رقم صحيح بعد الامر\n!coins [عدد الكريديت اللي هتشتري بيه]**`);
  if (!args[1] || args[1].includes('.') || args[1].includes('-') || args[1].includes('+') || args[1].includes('e') || !Number(Number(args[1])))
    return message.channel.send(rr3);
      
      
      const rr4 = new MessageEmbed()
    .setColor('#ec1c24')
    .setDescription(`**اقل عدد من الكريديت يمكنك تحويله لكوينز هو 10000\n!coins [عدد الكريديت اللي هتشتري بيه]**`);
  if (Number(args[1]) < 10000)
    return message.channel.send(rr4);

  
  
      const embed = new MessageEmbed()
    .setColor('black')
    .setTitle('Robux Communtiy')
    .setDescription(`**قم بتحويل ${price2} لـ <@${tranferID}>**\n` + '```' + `c ${tranferID} ${price2}` + '```\n**لديك 5 دقائق فقط للتحويل**')
    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));

  



  message.channel
    .send(embed)
    .then(async m => {
      const filter = response =>
        response.content.startsWith(
          `**:moneybag: | ${message.author.username}, has transferred `
        ) &&
        response.content.includes(`${tranferID}`) &&
        response.author.id === "282859044593598464" &&
        response.content.includes(priceNow);
      m.channel
        .awaitMessages(filter, {
          max: 1,
          time: 60 * 1000 * 5,
          errors: ["time"]
        })
        .then(async memem => {
          if (!memem.first()) return;


            const rr5 = new MessageEmbed()
    .setColor('black')
    .setDescription(`**سوف يتم تحويل \`${Number(args[1]) * 0.5}coins\` لك برجاء الانتظار**`);
        message.channel.send("<@822881298620219422>",rr5)

          ch.send(`**تم شراء \`${Number(args[1]) * 0.5}coins\` بواسطة <@${message.author.id}>**`)



  }
          
        )
        .catch(async err => {
          m.channel.send("انتهت مهلة التحويل تم الغاء العملية").then(err => {
            setTimeout(() => {
              err.delete();
              m.delete();
            }, 5000);
          });
        });
    });
  }


    };
  module.exports.config = {
  name: "coins",
  aliases: []
};