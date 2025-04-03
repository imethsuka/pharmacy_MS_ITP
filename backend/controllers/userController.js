import { text } from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import { from } from "rxjs";
export const create = async(req, res)=>{
    try {
        const userData = new User(req.body);
        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }
        await userData.save();
        res.status(200).json({msg: "User created successfully"});
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getAll = async(req, res) =>{
    try {
        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg:"User data not found"});
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getOne = async(req, res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const update = async(req, res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"User not found"});
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "User updated successfully"});
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const deleteUser = async(req, res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not exist"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error});
    }
}



export const forgetPassword = async(req, res) =>{
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
          }
        const checkUser = await
        User.findOne({ email });

        if(!checkUser){
            return res.status(404).json({msg: "User not found please register"});
        }
        const token=jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "20m"});
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: 'sethsiripharmacypro@gmail.com',
                pass: 'qxqhlxsysbeuiphf'
            }
        }); 
        const receiver={
            from: "sethsiripharmacypro@gmail.com",
            to:email,
            subject: "Password Reset",
            text: "Click the link to reset your password",
            html: `<h1>Click the link to reset your password</h1><p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
        };
        await transporter.sendMail(receiver);

    return res.status(200).send({
      message: "Password reset link send successfully on your gmail account",
    });


    }catch(error){
        res.status(500).json({error: error});
    }   
}
const resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
  
      if (!password) {
        return res.status(400).send({ message: "Please provide password" });
      }
  
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
      const user = await User.findOne({ email: decode.email });
  
      const newhashPassword = await hashPassword(password);
  
      user.password = newhashPassword;
      await user.save();
  
      return res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
      return res.status(500).send({ message: "Something went wrong" });
    }
  };
  