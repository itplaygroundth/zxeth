<template>
  <b-container>
    <br>
    <br>
    <form v-on:submit.prevent="login">
      <b-card
        title="เข้าสู่ระบบ เซียนเก๋า"
        class="bg-dark text-white p-3"
      >
        <b-card-text>
          <div>ชื่อผู้ใช้</div>
          <b-form-input
            v-model="username"
            type="text"
            required
            placeholder="กรอกรหัสใช้งานของคุณ"
            autocomplete="off"
          ></b-form-input>
          <hr>
          <div>รหัสผ่าน</div>
          <b-form-input
            v-model="password"
            type="password"
            required
            placeholder="**********"
            autocomplete="off"
          ></b-form-input>
        </b-card-text>
        <b-button
          type="submit"
          block
          variant="primary"
        >เข้าสู่ระบบ</b-button>
      </b-card>
    </form>
  </b-container>
</template>

<script>
import { setTimeout } from "timers";
import api from "../backend";
/* eslint-disable */
export default {
  data() {
    return {
      username: "",
      password: "",
      snackbar: false,
      alerttext: ""
    };
  },
  methods: {
    goto(str) {
      this.$router.push(str);
    },
    notify(data, classpoint) {
      this.$bvToast.toast(data, {
        title: `แจ้งเตือน`,
        variant: classpoint,
        solid: true,
        autoHideDelay: 2500
      });
    },
    login() {
      var promise1 = new Promise((resolve, reject) => {
        // this.axios
        //   .post(api.ROOT_URL + "/login", {
        //     username: this.username,
        //     password: this.password
        //   })
        //   .then(function(response) {
        //     resolve(response.data);
        //   });
        resolve({
          status: this.username === "admin" && this.password === "admin",
          userid: this.username
        });
      });
      promise1.then(value => {
        if (value.status === true) {
          this.$session.start();
          this.$session.set("userid", value.userid);
          this.notify("เข้าสู่ระบบสำเร็จ", "success");
          this.$store.set("loggedIn", true);
          setTimeout(() => {
            this.$router.push("Users");
          }, 1500);
        } else {
          this.notify("เข้าสู่ระบบผิดพลาด", "danger");
        }
      });
    }
  }
};
</script>
<style scope>
body {
  background: #222;
}
</style>

