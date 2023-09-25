import mongoose from 'mongoose'

export const connectDb = async() =>{
   try{
    const url = `mongodb://localhost:27017/post`
    await mongoose.connect(url);
    console.log('connected')
   }
   catch(err){
    console.log(err)
   }
}
