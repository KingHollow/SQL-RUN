// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {

  try{
    return await db.collection('class').get().then(res => {
      for(var i = 0; i < res.data.length; i++){
        db.collection('student').where({classID: res.data[i]}).orderby('point','desc').get().then(rm => {
          db.collection('student').where({studentID: rm.data[0].studentID}).update({
            data:{
              coin: rm.data[0].coin + 5
            }
          })
        })
      }
    })
  }catch(e){
    console.log(e)
  }

}
