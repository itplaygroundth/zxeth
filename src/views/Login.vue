<template>
    <v-app>
        <v-snackbar
            v-model="snackbar"
            bottom
            :timeout="5000"
            >
            {{ alerttext }}
            <v-btn
                color="info"
                flat
                @click="snackbar = false"
            >
                ปิด
            </v-btn>
        </v-snackbar>
        <v-container grid-list-md text-xs-center>
            <v-layout row>
                <v-flex xs12 md6 offset-md3>
                    <v-card>
                        <v-toolbar dark color="dark">
                            <v-toolbar-title>เข้าสู่ระบบ</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-flex xs12 md12>
                                <form @submit="login">
                                    <v-text-field v-model="username" label="Username" autocomplete="off" required > </v-text-field>
                                    <v-text-field v-model="password" label="Password" autocomplete="off" required > </v-text-field>
                                    <v-btn block  color="success" type="submit">Login</v-btn>
                                </form>
                            </v-flex>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            username: '',
            password: '',
            snackbar: false,
            alerttext: ''
        }
    },
    methods:{
        login(){
            if(this.username === 'admin' && this.password === 'password'){
                this.$session.start();
                this.$session.set('username',this.username);
                this.$session.set('password',this.password);
                this.$router.push('Home');
            }else{
                this.snackbar = true;
                this.alerttext = 'เข้าสู่ระบบผิดพลาด';
                return false;
            }
        }
    }
}
</script>

<style scope>
    @import url('https://fonts.googleapis.com/css?family=Kanit&display=swap');
    div{
        font-family: 'Kanit', sans-serif;
    }
</style>
