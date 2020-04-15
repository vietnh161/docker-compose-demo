<template>
  <div class="todo">
    <p>{{item.todo}}</p>
    <button @click="del" >delete</button>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  props: {
    item: {}
  },

  methods: {
      del(){
          this.$emit('del' , this.item.id)
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todo {
  border-bottom: solid 1px grey;
  border-radius: 5px;
  overflow: auto;
  padding: 5px;
}
.todo p {
  float: left;
  width: 80%;
  margin: 0;
}

.todo button {
  float: right;
  background-color: tomato;
  width: 15%;
  height: 30px;
  border: none;
  cursor: pointer;
}
</style>
