// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("result").where({
      studentID: event.studentid,
      homeworkID: event.homeworkid
    }).update({
      data: {
        answer: event.answer,
        state: event.state,
        time: event.time,
        score: event.score
      }
    })
  } catch (e) {
    console.error(e)
  }
}