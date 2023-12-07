const programApp = {
  data() {
    return {
      user: "",
    };
  },
  methods: {

  },
  mounted() {
    this.user = JSON.parse(document.getElementById("user").value);
  }
};

Vue.createApp(programApp).mount("#program");