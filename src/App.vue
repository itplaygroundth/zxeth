<template>
  <div id="app">
    <head-app :currentPath="currentPath"/>
    <router-view/>
    <footer>
      <div style="text-align:center;color:#AAA;">
          <hr>
          Version 1.2 at 05-07-2019
          <br>
          <br>
          <br>
      </div>
  </footer>
  </div>
</template>
<script>
/* eslint-disable */
const moment = require('moment-timezone');
moment().tz("Asia/Bangkok").format();
import Head from './components/Head'
export default {
    components: {
        'head-app':Head
    },
    data () {
        return {
            currentPath:'/Users'
        }
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Kanit&display=swap');
div {
    font-family: 'Kanit', sans-serif;
}

 :root {
    --blue: #2780E3;
    --indigo: #6610f2;
    --purple: #613d7c;
    --pink: #e83e8c;
    --red: #FF0039;
    --orange: #f0ad4e;
    --yellow: #FF7518;
    --green: #3FB618;
    --teal: #20c997;
    --cyan: #9954BB;
    --white: #fff;
    --gray: #868e96;
    --gray-dark: #373a3c;
    --primary: #2780E3;
    --secondary: #373a3c;
    --success: #3FB618;
    --info: #9954BB;
    --warning: #FF7518;
    --danger: #FF0039;
    --light: #f8f9fa;
    --dark: #373a3c;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: "Segoe UI", "Source Sans Pro", Calibri, Candara, Arial, sans-serif;
    --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.b-toast-success .toast .toast-header {
    color: #FFF !important;
    background-color: #3FB618!important;
    border-bottom-color: green!important;
}

.b-toast-danger .toast .toast-header {
    color: #FFF!important;
    background-color: #FF0039!important;
    border-bottom-color: red!important;
}

.b-toast-primary .toast .toast-header {
    color: #FFF!important;
    background-color: #2780E3!important;
    border-bottom-color: blue!important;
}

.toast,
.toast-header {
    border: none !important;
}
</style>
