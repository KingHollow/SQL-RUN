// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {

  try{
    return await db.collection('student').get().then(res => {
      db.collection("student").skip(res.data.length).get().then(rm => {
        for(var i = 0; i < res.data.length; i++){
          db.collection("student").where({studentID: res.data[i].studentID}).update({
            data: {
              point: 0,
              answer: 0,
              challenge: 0,
              race: 0,
              random: 0
            }
          })
        }
        for(var i = 0; i < rm.data.length; i++){
          db.collection("student").where({studentID: rm.data[i].studentID}).update({
            data: {
              point: 0,
              answer: 0,
              challenge: 0,
              race: 0,
              random: 0
            }
          })
        }
      })
    })
  }catch(e){
    console.log(e)
  }

}
