const manageNutritionApp = {
  data() {
    return {
      nutrition: [],
    };
  },
  methods: {
    async addNutrition(event) {
      event.preventDefault();

      const form = event.target;

      const formData = new FormData(form);
      const nutritionName = formData.get("nutrition-name");
      const csrfToken = formData.get("csrfToken");

      let response;
      try {
        response = await fetch("/admin/nutrition", {
          method: "POST",
          body: JSON.stringify({
            name: nutritionName,
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        alert("Something went wrong - Could not add nutrition plan.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not add nutrition plan.");
        return;
      }

      const responseData = await response.json();

      const nutritionPlan = {
        name: responseData.addedNutrition.name,
        id: responseData.addedNutrition.id,
      };

      this.nutrition.push(nutritionPlan);
      form.firstElementChild.nextElementSibling.value = "";
    },
    async deleteNutrition(event) {
      event.preventDefault();

      const form = event.target;

      const formData = new FormData(form);
      const nutritionID = formData.get("nutrition-id");
      const csrfToken = formData.get("csrfToken");

      let response;
      try {
        response = await fetch(`/admin/nutrition/${nutritionID}`, {
          method: "DELETE",
          body: JSON.stringify({
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });
      } catch (error) {
        alert("Something went wrong - Could not delete nutrition plan.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not delete nutrition plan.");
        return;
      }

      const nutritionPlanCard = form.parentElement.parentElement;
      nutritionPlanCard.style.display = "none";
    }
  },
  mounted() {
    this.nutrition = JSON.parse(document.getElementById("nutrition").value);
  }
};

Vue.createApp(manageNutritionApp).mount("#manage-nutrition");