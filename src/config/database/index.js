const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const connect = async () =>{
    try {
        await mongoose.connect(process.env.DATABASE,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })
        console.log('connect success')
    } catch (error) {
        console.log(error)
        console.log('connect fail')
    }
}
module.exports = {connect}