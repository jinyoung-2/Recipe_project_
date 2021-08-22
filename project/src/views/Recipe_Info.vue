<template>
  <div class="recipe_info"></div>
  <h1>This is a recipe page</h1>
  <button @click="updatefoodList">Update recipe</button>
  <ol>
    <li v-for="(item, index) in foodList" :key="index">
      <h3>{{ item.dish }}</h3>
      <h5>{{ item.description }}</h5>
      <h5>{{ item.ingredient }}</h5>
      <h5>{{ item.measurement }}</h5>
      <button @click="deletefoodList(item._id)">Delete recipe</button>
    </li>
  </ol>
</template>

<script>
export default {
  name: "Recipe_Info",
  computed: {
    foodList() {
      return this.$store.state.foodList;
    },
  },
  methods: {
    deletefoodList(_id) {
      console.log(_id);
      this.$store.dispatch("deletefoodList", _id);
    },
    updatefoodList() {
      this.$store.dispatch("updatefoodList");
    },
  },
  created() {
    console.log("created");
    this.$store.dispatch("updatefoodList");
  },
};
</script>

<style scoped>
/* li {
  margin-left: 0;
  margin-top: 5px;
  margin-right: 10px;
  padding: 10px;
  display: inline-block;
  border: 1px solid black;
} */
</style>