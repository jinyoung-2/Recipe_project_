<template>
  <div class="recipe_write">
    <h1>What do you want to write recipe?</h1>
    <div id="write_wrap">
      <h3>dish</h3>
      <input type="text" v-model="dish_val" /><br />
      <h3>description</h3>
      <textarea cols="50" rows="30" v-model="description_val"></textarea><br />
      <h3>ingredient</h3>
      <textarea cols="50" rows="15" v-model="ingredient_val"></textarea><br />
      <h3>measurement</h3>
      <textarea cols="50" rows="15" v-model="measurement_val"></textarea><br />
      <hr />

      <button @click="onWrite">write recipe</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recipe_Write",
  data() {
    //데이터 생성
    return {
      dish_val: "",
      description_val: "",
      ingredient_val: "",
      measurement_val: "",
    };
  },
  methods: {
    //웹브라우저상에서 작성한 내용 -> store로 넘겨주기

    onWrite() {
      this.$store.dispatch("writefoodList", {
        dish: this.dish_val,
        description: this.description_val,
        ingredient: this.ingredient_val,
        measurement: this.measurement_val,
      });

      //웹브라우저 내용 -> console로 확인
      console.log(
        this.dish_val,
        this.description_val,
        this.ingredient_val,
        this.measurement_val
      );
    },
  },
};
</script>


