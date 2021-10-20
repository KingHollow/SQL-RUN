const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("student").where({
      studentID: event.studentID,
    }).update({
      data: {
        experience: event.experience,
        point: event.point,
        challenge: event.challenge,
        answer: event.answer,
        random: event.random,
        race: event.race,
        rockets: event.rockets,
        peals: event.peals,
        cards: event.cards,
        coin: event.coin
      }
    })
  } catch(e) {
    console.error(e)
  }
}