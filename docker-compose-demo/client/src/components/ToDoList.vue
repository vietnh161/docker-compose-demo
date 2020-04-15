<template>
  <div class="todo-list">
    <div class="title">Todo App</div>
    <div class="add-todo">
      <input type="text" v-model="itemAdd"/>
      <button @click="addTodo">Add</button>
    </div>
    <div class="main">
      <ToDo v-for="item in items.data" :key="item.id" :item="item" @del="deleteToDo" />
    </div>
  </div>
</template>

<script>
import ToDo from "./ToDo.vue";
import axios from "axios";

export default {
  name: "ToDoList",
  components: {
    ToDo
  },
  data() {
    return {
      items: [{}],
      itemAdd: ""
    };
  },

  props: {
    msg: String
  },
  mounted() {
    axios
      .get("http://localhost:3000/get")
      .then(res => {
        this.items = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    addTodo() {
      if (this.itemAdd != "") {
        axios
          .post("http://localhost:3000/add", { todo: this.itemAdd })
          .then(res => {
            this.itemAdd = "";
            console.log(res);
            this.refresh();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    deleteToDo(id) {
      if (id) {
        axios
          .delete("http://localhost:3000/delete/" + id)
          .then(res => {
            console.log(res);
            this.refresh();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    refresh() {
      axios
        .get("http://localhost:3000/get")
        .then(res => {
          this.items = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo-list {
  border: solid 2px grey;
  border-radius: 5px;
  width: 500px;
  margin: auto;
}
.title {
  border-bottom: solid 2px grey;
  font-style: bold;
  font-size: 30px;
  padding: 10px;
}
.add-todo {
  padding: 10px;
  border-bottom: solid 2px grey;
  border-radius: 5px;
}
.add-todo button {
  background-color: steelblue;
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
.add-todo input {
  margin-right: 5px;
  width: 220px;
  height: 26px;
  border-radius: 2px;
}
</style>
