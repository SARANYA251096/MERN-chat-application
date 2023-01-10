const express = require("express");
const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register API:
const register = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.password) {
      return res.status(400).send({ message: "Password is required..." });
    }
    const hashValue = await bcrypt.hash(payload.password, 10);
    payload.hashedPassword = hashValue;
    delete payload.password;

    // For New Users:
    let newUser = new Users(payload);

    newUser.save((err, data) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "Error While registering.", error: err });
      }
      res.status(201).send({
        message: "User has been registered successfully",
        userId: data._id,
      });
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    // console.log(error)
  }
};

//Sign-in API:
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUSer = await Users.findOne({ email: email });

    if (existingUSer) {
      const isValidUser = await bcrypt.compare(
        password,
        existingUSer.hashedPassword
      );
      if (isValidUser) {
        const token = jwt.sign({ _id: existingUSer._id }, process.env.SECRET_KEY);
        res.cookie('accessToken', token, { expire: new Date() + 86400000 })
        
        return res.status(201).send({message:'User Signed-in successfully'})
      }
      return res.status(401).send({ message: "Invalid Credentials" });
    }
    res.status(400).send({ message: "User does not exist" });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error', error: error });
    console.log(error);
  }
};

// Sign-out API:
const signout = async(req, res) => {
  try {
    await res.clearCookie("accessToken");
    res.status(500).send({ message: "User Signed out successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" })
    console.log(error)
  }
};

module.exports = { register, signin, signout };
