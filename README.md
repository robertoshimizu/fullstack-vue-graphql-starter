# fullstack-vue-graphql-starter
Development from the Udemy Stack by Reed Barger.

This full-stack app includes Vue, GraphQL, Apollo 2, Vuex, and Vuetify.

To run it, i) clone the git repository, ii) install dependencies described in the "package.json" file:
```
npm install or npm i
```
Take a look at the file server.js, which contains the initializers of the Apollo server, connecting the GraphQL interface to the MongoDB.

To start the npm server:
```
npm run server
```
Note that at this stage, you need to specify the schema in the Typedefs.gql and the Post.js and User.js files. The capabilities of the interface is specified via the resolvers.js file. These files will dictate what GraphQL Playground can do or not, for example queries and mutations. This is pretty cumbersome. Does it have a easier way to set up these parameters?

Vue-CLI

In order to install it, make sure you have a latest version of node, or Run update:
```
npm install -g npm
```
Now take a look at Vue-CLI (https://cli.vuejs.org/). Vue CLI aims to be the standard tooling baseline for the Vue ecosystem. It ensures the various build tools work smoothly together with sensible defaults so you can focus on writing your app instead of spending days wrangling with configurations. At the same time, it still offers the flexibility to tweak the config of each tool without the need for ejecting.

```
npm install -g @vue/cli
```

To create a project, you can either run vue create command in the shell:
```
vue create hello-world

```
or use the Vue-CLI UI
```
vue ui
```