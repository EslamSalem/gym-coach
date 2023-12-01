const updateLogsApp = {
  data() {
    return {
      log: "",
      workouts: [],
    };
  },
  methods: {
    addExerciseInput() {
      const exercise = {
        workoutID: "",
        name: "",
        sets: "",
        reps: "",
      };
      this.log.exercises.push(exercise);
    },
    removeExerciseInput(index) {
      this.log.exercises.splice(index, 1);
    },
    updateLogName(event) {
      this.log.name = event.target.value;
    },
    updateExerciseWorkout(event, index) {
      this.log.exercises[index].workoutID = event.target.value;
      
      //Set exercise name on update from the selected drop down option
      this.log.exercises[index].name = event.target.options[event.target.selectedIndex].text;
    },
    updateExerciseSets(event, index) {
      this.log.exercises[index].sets = event.target.value;
    },
    updateExerciseReps(event, index) {
      this.log.exercises[index].reps = event.target.value;
    },
    async updateLog(event) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const csrfToken = formData.get("csrfToken");

      let response;
      try {
        response = await fetch(`/admin/logs/${this.log.id}/update`, {
          method: "PATCH",
          body: JSON.stringify({
            name: this.log.name,
            exercises: this.log.exercises,
            csrfToken: csrfToken,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        });
      } catch (error) {
        alert("Something went wrong - Could not update workout log.");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong - Could not update workout log.");
        return;
      }

      window.location.href = "/admin/logs";
    }
  },
  mounted() {
    this.log = JSON.parse(document.getElementById("log").value);
    this.workouts = JSON.parse(document.getElementById("workouts").value);
  }
};

Vue.createApp(updateLogsApp).mount("#update-logs");
