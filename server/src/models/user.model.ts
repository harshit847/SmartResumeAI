import mongoose, {Schema, Document} from "mongoose"

export interface IUser extends Document{
    userName:string;
    email:string;
    password:string;
} 
const userSchema: Schema<IUser> = new Schema<IUser>({
    userName: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password:{type:String, required:true}
})

const UserModel = mongoose.model<IUser>("User",userSchema);
export default UserModel;
