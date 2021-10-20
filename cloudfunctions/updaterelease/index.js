// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();



// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("release").where({
      classID: event.classID,
      homeworkID: event.homeworkID
    }).update({
      data: {
        date: event.date,
        deadline: event.deadline,
        title: event.title,
        type: event.type,
        correct: event.correct
      }
    })
  } catch(e) {
    console.error(e)
  }
}