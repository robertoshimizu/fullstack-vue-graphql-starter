const { ApolloServer, gql } = require("apollo-server");
const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});
const User = require('./models/User');
const Post = require('./models/Post');

mongoose
  .connect(process.env.MONGO_URI,{ useNewUrlParser: true })
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err))

// TypeDefs will be descripted in another file: typeDefs.gql

const server = new ApolloServer({
  typeDefs,
  context:{
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});