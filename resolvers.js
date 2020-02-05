// Resolvers provide the instructions for turning a GraphQL operation (a query, mutation, or subscription) into data. 
// They either return the same type of data we specify in our schema or a promise for that data

// This file is in fact the data fetching logic that hooks up MongoDB with the GraphQL API
// Note that we need to add methods to the data source that correspond to the queries and mutations
// our graph API needs to fetch, according to our Schema specified in TypeDefs



// module to validate usersignin password with that stored in the database
const bcrypt = require('bcrypt');


// JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact
// and self-contained way for securely transmitting information between parties as a JSON object. 
// https://jwt.io/introduction/
// Once the user is logged in, each subsequent request will include the JWT, allowing the user to 
// access routes, services, and resources that are permitted with that token.

const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
}

// Below it was specified the resolver function + fetching logic
//https://www.apollographql.com/docs/tutorial/resolvers/ recommends keep resolvers functions simpler and concise
// and define the data fetching logic in another js file (enable safely refactor without worrying about breaking the API)

module.exports = {
  Query: {
    getUsers: async (_, args, { User }) => {
      const users = await User.find({})
        .sort({ joinDate: "desc" })
        .populate({
          path: "favorites",
          model: "Post"
        });
      return users;
    },
    getCurrentUser: async (_, args, { User, currentUser }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "favorites",
        model: "Post"
      });
      return user;
    },
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: "desc" })
        .populate({
          path: "createdBy",
          model: "User"
        });
      return posts;
    }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save();
      return newPost;
    },
    signinUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },
    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    }
  }
};