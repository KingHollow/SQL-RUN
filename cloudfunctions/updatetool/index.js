// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  tool = event.tool;
  if (tool == "rockets") {
    try {
      return await db.collection("student").where({studentID: event.id}).update({
        data: {
          coin: event.coin,
          rockets:event.tooln,
        }
      })
    } catch (e) {
      console.error(e)
    }
  } else if (tool == "peals"){
    try {
      return await db.collection("student").where({studentID: event.id}).update({
        data: {
          coin: event.coin,
          peals:event.tooln,
        }
      })
    } catch (e) {
      console.error(e)
    }
  } else {
    try {
      return await db.collection("student").where({studentID: event.id}).update({
        data: {
          coin: event.coin,
          cards:event.tooln,
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}