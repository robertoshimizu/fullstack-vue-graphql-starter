const { ApolloServer } = require("apollo-server");
const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');

// Import typeDefs and resolvers

const filePath = path.join(__dirname,'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath,'utf-8');
const resolvers = require('./resolvers');

// Import Environment Variables and Mongoose Models

require('dotenv').config({path: 'variables.env'});
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to MongoDB database

mongoose
  .connect(process.env.MONGO_URI,{ useNewUrlParser: true })
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err))

// Create Apollo/GraphQL Server using typeDefs, resolvers and context objects

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:{
    User,
    Post
  }
});

// Listening on port 4000

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});