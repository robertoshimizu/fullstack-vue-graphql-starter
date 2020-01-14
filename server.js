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
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// create an ApolloServer object taking the typeDefs (schema) and resolvers (mutation) to
// fetch GraphQL API to manipulate Users and Posts 
const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");
const User = require("./models/User");
const Post = require("./models/Post");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

// And finally spin a nodejs web server

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});

// To start server: npm run