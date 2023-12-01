const updateNutritionApp = {
  data() {
    return {
      nutrition: "",
      mealDescriptions: [],
    };
  },
  methods: {
    addMealInput() {
      this.nutrition.meals.push("");
    },
    removeMealInput(index) {
      this.nutrition.meals.splice(index, 1);
    },
    updateName(event) {
      this.nutrition.name = event.target.value;
    },
    updateMeal(index) {
      //used a v-model for the nutrition update instead of event.target
      //because textarea does not have a value property
      //can't set conditions with v-bind and ternary operator
      this.nutrition.meals[index] = this.mealDescriptions[index];
    },
    async updateNutrition(event) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const csrfToken = formData.get("csrfToken");

      let response;
      try {
        response = await fetch(`/admin/nutrition/${this.nutrition.id}/update`, {
          method: "PATCH",
          body: JSON.stringify({
            name: this.nutrition.name,
            meals: this.nutrition.meals,
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });
      } catch (error) {
        alert("Something went wrong - Could not update nutrition plan.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not update nutrition plan.");
        return;
      }

      window.location.href = "/admin/nutrition";
    }
  },
  mounted() {
    this.nutrition = JSON.parse(document.getElementById("nutrition").value);
    this.mealDescriptions = this.nutrition.meals;
  }
};

Vue.createApp(updateNutritionApp).mount("#update-nutrition");
