const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose=require('mongoose')
const PORT = process.env.PORT||3000
