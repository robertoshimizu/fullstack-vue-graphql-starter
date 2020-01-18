// dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
// The process.env property returns an object containing the user environment.
// config will read your .env file, parse the contents, assign it to process.env, and return an Object 
// with a parsed key containing the loaded content or an error key if it failed.
// https://www.npmjs.com/package/dotenv
// https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa


require("dotenv").config({ path: "variables.env" });

// Use mongoose to connect our app to the mongodb running in the cloud
// note that process.env.Mongo_URI resides in the variables.env file
const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGO_URI,
    { useUnifiedTopology:true,
      useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

mongoose.set('useCreateIndex', true)  

// With Apollo you can simplify app development by combining APIs, databases, and microservices
// into a single data graph that you can query with GraphQL
// create an ApolloServer object taking the typeDefs (schema) and resolvers (mutation) to
// fetch GraphQL API to manipulate Users and Posts 
const { ApolloServer, AuthenticationError } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "typeDefs.gql");

// TypeDefs contains the GraphQL Schema
const typeDefs = fs.readFileSync(filePath, "utf-8");

// resolvers
const resolvers = require("./resolvers");

// MongoDB models -> also a schema
const User = require("./models/User");
const Post = require("./models/Post");

// Verify JWT Token passed from client, the one that was stored in local Storage
const jwt = require('jsonwebtoken');

const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new AuthenticationError(
        "Your session has ended. Please sign in again."
      );
    }
  }
};

// Create Apollo/GraphQL Server using typeDefs, resolvers, and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    return { User, Post, currentUser: await getUser(token) };
  }
});

// And finally we spin the Server (nodejs)

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});

// To start server: npm run server