const workoutsCollectionApp = {
  data() {
    return {
      workouts: [],
    };
  },
  methods: {
    async addWorkout(event) {
      event.preventDefault();

      const form = event.target;

      const formData = new FormData(form);
      const workoutName = formData.get("workout-name");
      const csrfToken = formData.get("csrfToken");

      let response;
      try {
        response = await fetch("/admin/logs/workouts", {
          method: "POST",
          body: JSON.stringify({
            name: workoutName,
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        alert("Something went wrong - Could not add workout.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not add workout.");
        return;
      }

      const responseData = await response.json();

      const workout = {
        name: responseData.addedWorkout.name,
        id: responseData.addedWorkout.id,
      };

      this.workouts.push(workout);
      form.firstElementChild.nextElementSibling.value = "";
    },
    async updateWorkout(event) {
      event.preventDefault();

      const form = event.target;

      const formData = new FormData(form);
      const workoutID = formData.get("workout-id");
      const workoutName = formData.get("workout-name");
      const csrfToken = formData.get("csrfToken");

      let response;
      try {
        response = await fetch(`/admin/logs/workouts/${workoutID}/update`, {
          method: "PATCH",
          body: JSON.stringify({
            name: workoutName,
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        alert("Something went wrong - Could not update workout.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not update workout.");
        return;
      }

      const responseData = await response.json();

      const workoutTitle = form.previousElementSibling;
      workoutTitle.textContent = responseData.updatedWorkout.name;

      const workoutInput = form.lastElementChild.previousElementSibling;
      workoutInput.value = "";

      form.classList.add("invisible");
    },
    async deleteWorkout(event) {
      event.preventDefault();

      const form = event.target;

      const formData = new FormData(form);
      const workoutID = formData.get("workout-id");
      const csrfToken = formData.get("csrfToken");

      let response;
      try {
        response = await fetch(`/admin/logs/workouts/${workoutID}/delete`, {
          method: "DELETE",
          body: JSON.stringify({
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });
      } catch (error) {
        alert("Something went wrong - Could not delete workout.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not delete workout.");
        return;
      }

      const workoutCard = form.parentElement.parentElement;
      workoutCard.style.display = "none";
    },
    showEditForm(event) {
      const pressedButton = event.target;
      const editWorkoutForm =
        pressedButton.parentElement.previousElementSibling;
      const editWorkoutInput =
        pressedButton.parentElement.previousElementSibling.lastElementChild.previousElementSibling;;

      editWorkoutForm.classList.remove("invisible");
      editWorkoutInput.focus();
    },
    hideEditForm(event) {
      const editWorkoutForm = event.target.parentElement.parentElement;
      const editWorkoutInput =
        editWorkoutForm.lastElementChild.previousElementSibling;

      editWorkoutForm.classList.add("invisible");
      editWorkoutInput.value = "";
    },
  },
  mounted() {
    this.workouts = JSON.parse(document.getElementById("workouts").value);
  },
};

Vue.createApp(workoutsCollectionApp).mount("#workouts-collection");
