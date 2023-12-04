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
          },
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
          },
        });
      } catch (error) {
        alert("Something went wrong - Could not update user's diet plan.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not update user's diet plan.");
        return;
      }
    },
    async toggleAccess(event, index) {
      const userID = this.users[index].id;

      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const csrfToken = formData.get("csrfToken");

      this.users[index].hasAccess = !this.users[index].hasAccess;
      
      if (this.users[index].hasAccess) {
        const subscriptionDate = new Date();
        subscriptionDate.setMonth(subscriptionDate.getMonth() + 1); //Change subscription to expiry

        this.users[index].expiryDate = subscriptionDate;
      } else {
        this.users[index].expiryDate = null;
      }

      let response;
      try {
        response = await fetch(`/admin/users/${userID}/toggleAccess`, {
          method: "PATCH",
          body: JSON.stringify({
            access: this.users[index].hasAccess,
            expiryDate: this.users[index].expiryDate,
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        alert("Something went wrong - Could not toggle user's access.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not toggle user's access.");
        return;
      }

      if (this.users[index].hasAccess) {
        this.users[index].expiryDate = new Date(
          this.users[index].expiryDate
        ).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } else {
        this.users[index].expiryDate = null;
      }
    },
  },
  mounted() {
    this.users = JSON.parse(document.getElementById("users").value);
    for (const user of this.users) {
      if (user.expiryDate) {
        user.expiryDate = new Date(user.expiryDate).toLocaleDateString(
          "en-US",
          {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
      }
    }
    this.logs = JSON.parse(document.getElementById("logs").value);
    this.nutrition = JSON.parse(document.getElementById("nutrition").value);
  },
};

Vue.createApp(manageUsersApp).mount("#manage-users");
