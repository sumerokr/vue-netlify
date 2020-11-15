<template>
  <div id="app">
    <h1>Todo App</h1>
    <input type="text" v-model="name" placeholder="Todo name" />
    <input type="text" v-model="description" placeholder="Todo description" />
    <button v-on:click="createTodo">Create Todo</button>

    <div v-for="item in todos" :key="item.id">
      <h3>{{ item.title }}</h3>
      <p>{{ item.compeleted }}</p>
    </div>
  </div>
</template>

<script>
import netlifyIdentity from "netlify-identity-widget";

export default {
  name: "App",
  data() {
    return {
      name: "",
      description: "",
      todos: [],
    };
  },
  methods: {
    async createTodo() {
      // const response = await fetch("/.netlify/functions/createTodo", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     query: `mutation CreateATodo {
      //       createTodo(data: {
      //       title: "${this.name}"
      //       completed: false
      //       }) {
      //           title
      //           completed
      //       }
      //     }`,
      //   }),
      //   headers: {
      //     authorization:
      //       "",
      //   },
      // });
      const response = await fetch("/.netlify/functions/createTodo");
      const json = await response.json();
      this.todos.push(json.data.createTodo);

      this.name = "";
    },
    async getTodos() {
      const response = await fetch("https://graphql.fauna.com/graphql", {
        method: "POST",
        body: JSON.stringify({
          query: `query FindAllTodos {
            allTodos {
              data {
                _id
                title
                completed
              }
            }
          }`,
        }),
        headers: {
          authorization:
            "",
        },
      });

      const json = await response.json();
      this.todos = json.data.allTodos.data;
    },
  },
  async created() {
    this.getTodos();
  },
  mounted() {
    netlifyIdentity.init({
      APIUrl: "https://hungry-hawking-4b86a8.netlify.app/.netlify/identity",
    });
    netlifyIdentity.open();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
