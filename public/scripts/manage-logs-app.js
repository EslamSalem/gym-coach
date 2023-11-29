const manageLogsApp = {
  data() {
    return {
      logs: [],
    };
  },
  methods: {
    async addLog(event) {
      event.preventDefault();

      const form = event.target;

      const formData = new FormData(form);
      const logName = formData.get("log-name");
      const csrfToken = formData.get("csrfToken");

      let response;
      try {
        response = await fetch("/admin/logs", {
          method: "POST",
          body: JSON.stringify({
            name: logName,
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        alert("Something went wrong - Could not add workout log.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not add workout log.");
        return;
      }

      const responseData = await response.json();

      const log = {
        name: responseData.addedLog.name,
        id: responseData.addedLog.id,
      };

      this.logs.push(log);
      form.firstElementChild.nextElementSibling.value = ""; 
    },
    async deleteLog(event) {
      event.preventDefault();

      const form = event.target;

      const formData = new FormData(form);
      const logID = formData.get("log-id");
      const csrfToken = formData.get("csrfToken");

      let response;
      try {
        response = await fetch(`/admin/logs/${logID}`, {
          method: "DELETE",
          body: JSON.stringify({
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });
      } catch (error) {
        alert("Something went wrong - Could not delete workout log.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not delete workout log.");
        return;
      }

      const logCard = form.parentElement.parentElement;
      logCard.style.display = "none";
    }
  },
  mounted() {
    this.logs = JSON.parse(document.getElementById("logs").value);
  }
};

Vue.createApp(manageLogsApp).mount("#manage-logs");
