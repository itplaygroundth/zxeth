<template>
    <b-container>
        <b-row>
            <b-col>
                <br>
                <form v-on:submit.prevent="setup">
                <b-card class="bg-dark text-white" b-card header="ตั้งค่าบอท" header-tag="header">
                    <b-card-text class="p-3">
                        <label>รหัสผ่านจีคลับ</label>
                        <b-form-input v-model="gpass" type="text" required placeholder="กรุณาระบุรหัสผ่านใหม่ของจีคลับ" autocomplete="off"></b-form-input>
                    </b-card-text>
                    <b-button type="submit" block variant="success">บันทึก</b-button>
                    <b-button block variant="primary" @click="goto('/Home')">กลับหน้าหลัก</b-button>
                </b-card>
                </form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
/* eslint-disable */
import api from '../backend'
export default {
    data() {

        return {
            gpass: ''
        }
    },
    beforeCreate: function(){
        var promise1 = new Promise((resolve, reject) => {
            this.axios.post(api.ROOT_URL+'/getGpass', {
                userid: this.$session.get('userid'),
            }).then(function (response) {
                resolve(response.data[0].gclub_pass)
            })
        });
        promise1.then((value) => {
            this.gpass = value;
        })
    },
    methods:{
        notify (data, classpoint) {
            this.$bvToast.toast(data, {
                title: `แจ้งเตือน`,
                variant: classpoint,
                solid: true,
                autoHideDelay: 2500
            })
        },
        goto(str){
            this.$router.push(str);
        },
        setup(){
            var data = {
                gpass: this.gpass
            }
            var Promise1 = new Promise((resolve,reject) => {
                this.axios.post(api.ROOT_URL+'/saveGpass', {
                    data: data, userid: this.$session.get('userid')
                }).then(function (response) {
                    resolve(response.data)
                })
            })
            Promise1.then((value) => {
                if(value.status === true){
                    this.notify('บันทึกข้อมูลสำเร็จ','success');
                    setTimeout(() => {
                        this.$router.push('/Home');
                    },3000)
                }else{
                    this.notify('บันทึกข้อมูลไม่สำเร็จ','error');
                }
            })
        }
    }
}
</script>

<style scope>
    body{
        background: #222;
    }
</style>
