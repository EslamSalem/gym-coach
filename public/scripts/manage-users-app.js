const manageUsersApp = {
  data() {
    return {
      users: [],
      logs: [],
      nutrition: [],
      searchUsersInput: "",
    };
  },
  methods: {
    async addLog(event, index) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      const logID = formData.get("log-select");
      const logName =
        form.firstElementChild.nextElementSibling.options[
          form.firstElementChild.nextElementSibling.selectedIndex
        ].text;
      const csrfToken = formData.get("csrfToken");
      
      //reset drop down menu selected option
      form.firstElementChild.nextElementSibling.selectedIndex = 0;

      const log = {
        id: logID,
        name: logName,
      };

      this.users[index].logs.push(log);
      
      await this.sendPatchLogsRequest(index, csrfToken);
    },
    async removeLog(event, index, logIndex) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const csrfToken = formData.get("csrfToken");
      
      this.users[index].logs.splice(logIndex, 1);

      await this.sendPatchLogsRequest(index, csrfToken);
    },
    async sendPatchLogsRequest(index, csrfToken) {
      const userID = this.users[index].id;

      let response;
      try {
        response = await fetch(`/admin/users/${userID}/updateLogs`, {
          method: "PATCH",
          body: JSON.stringify({
            logs: this.users[index].logs,
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });
      } catch (error) {
        alert("Something went wrong - Could not update user's workout logs.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not update user's workout logs.");
        return;
      }
    },
    async addNutrition(event, index) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      const nutritionID = formData.get("nutrition-select");
      const nutritionName =
        form.firstElementChild.nextElementSibling.options[
          form.firstElementChild.nextElementSibling.selectedIndex
        ].text;
      const csrfToken = formData.get("csrfToken");

      //reset drop down menu selected option
      form.firstElementChild.nextElementSibling.selectedIndex = 0;

      const nutrition = {
        id: nutritionID,
        name: nutritionName,
      };

      this.users[index].nutrition = nutrition;
      
      await this.sendPatchNutritionRequest(index, csrfToken);
    },
    async removeNutrition(event, index) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const csrfToken = formData.get("csrfToken");
      
      this.users[index].nutrition = null;

      await this.sendPatchNutritionRequest(index, csrfToken);
    },
    async sendPatchNutritionRequest(index, csrfToken) {
      const userID = this.users[index].id;

      let response;
      try {
        response = await fetch(`/admin/users/${userID}/updateNutrition`, {
          method: "PATCH",
          body: JSON.stringify({
            nutrition: this.users[index].nutrition,
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });
      } catch (error) {
        alert("Something went wrong - Could not update user's diet plan.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not update user's diet plan.");
        return;
      }
    }
  },
  mounted() {
    this.users = JSON.parse(document.getElementById("users").value);
    this.logs = JSON.parse(document.getElementById("logs").value);
    this.nutrition = JSON.parse(document.getElementById("nutrition").value);
  },
};

Vue.createApp(manageUsersApp).mount("#manage-users");
