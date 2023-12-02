const manageUsersApp = {
  data() {
    return {
      users: [],
      logs: [],
      nutrition: [],
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
    }
  },
  mounted() {
    this.users = JSON.parse(document.getElementById("users").value);
    this.logs = JSON.parse(document.getElementById("logs").value);
    this.nutrition = JSON.parse(document.getElementById("nutrition").value);
  },
};

Vue.createApp(manageUsersApp).mount("#manage-users");
