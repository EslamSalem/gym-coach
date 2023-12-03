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
    console.log(this.user);
  }
};

Vue.createApp(programApp).mount("#program");