import mongoose from "mongoose"

const Schema = mongoose.Schema

//create the user schema
const UserSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})


export default mongoose.model("User", UserSchema)