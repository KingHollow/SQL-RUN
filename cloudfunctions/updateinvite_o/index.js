// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("invite").where({
      playerA: event.playerA,
      playerB: event.playerB,
      state:0}).update({
      data: {
        state:4
      }//邀请状态为已过期
    })
  } catch (e) {
    console.error(e)
  }
}