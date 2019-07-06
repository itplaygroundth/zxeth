<template>
    <b-container>
        <b-row>
            <b-col>
                <br>
                <form v-on:submit.prevent="setup">
                <b-card class="bg-dark text-white" b-card header="ตั้งค่าบอท" header-tag="header">
                    <b-card-text class="p-3">
                        <label>จำนวนทบ</label>
                        <b-form-select v-model="doubleSelected" :options="doubleOptions" required></b-form-select>
                        <hr>
                        <label>การเดินเงิน</label>
                        <b-form-select v-model="rateSelected" :options="rateOptions" required></b-form-select>
                        <hr>
                        <label>เล่นสูงสุด</label>
                        <b-form-select v-model="maxPlaySelected" :options="maxPlayOptions" required></b-form-select>
                        <hr>
                        <label>ตาเสมอ</label>
                        <b-form-select v-model="tieFocusSelected" :options="tieFocusOptions" required></b-form-select>
                        <hr>
                        <label>แทงสลับ / ทบตัวเดิม</label>
                        <b-form-select v-model="dynamicSelected" :options="dynamicOptions" required></b-form-select>
                        <hr>
                        <label>เมื่อเงินไม่พอแทง</label>
                        <b-form-select v-model="overbetSelected" :options="overbetOptions" required></b-form-select>
                        <hr>
                        <label>เดินเงิน</label>
                        <b-form-select v-model="betSelected" :options="betOptions" required></b-form-select>
                        <hr>
                    </b-card-text>
                    <b-button type="submit" block variant="success">บันทึก</b-button>
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
            doubleSelected: 6,
            rateSelected: 2.0,
            maxPlaySelected: 30,
            tieFocusSelected: false,
            dynamicSelected: true,
            overbetSelected: true,
            betSelected: 50,
            doubleOptions: [
                { value: null, text: 'ตั้งค่าส่วนนี้' },
                { value: 1, text: 'ทบ 1 ไม้' },
                { value: 2, text: 'ทบ 2 ไม้' },
                { value: 3, text: 'ทบ 3 ไม้' },
                { value: 4, text: 'ทบ 4 ไม้' },
                { value: 5, text: 'ทบ 5 ไม้' },
                { value: 6, text: 'ทบ 6 ไม้' }
            ],
            rateOptions: [
                { value: null, text: 'ตั้งค่าส่วนนี้' },
                { value: 1.5, text: 'เดินเงินแบบ 1.5' },
                { value: 2.0, text: 'เดินเงินแบบ 2.0' },
            ],
            maxPlayOptions: [
                { value: null, text: 'ตั้งค่าส่วนนี้' },
                { value: 15, text: '15 ตา' },
                { value: 20, text: '20 ตา' },
                { value: 25, text: '25 ตา' },
                { value: 30, text: '30 ตา' },
                { value: 35, text: '35 ตา' },
                { value: 40, text: '40 ตา' },
                { value: 45, text: '45 ตา' },
            ],
            tieFocusOptions: [
                { value: null, text: 'ตั้งค่าส่วนนี้' },
                { value: true, text: 'คำณวณตาเสมอ' },
                { value: false, text: 'ไม่คำณวณตาเสมอ' },
            ],
            dynamicOptions: [
                { value: null, text: 'ตั้งค่าส่วนนี้' },
                { value: true, text: 'แทงสลับ' },
                { value: false, text: 'ทบตัวเดิม' },
            ],
            overbetOptions: [
                { value: null, text: 'ตั้งค่าส่วนนี้' },
                { value: true, text: 'แทงทั้งหมด' },
                { value: false, text: 'หยุดเล่น' },
            ],
            betOptions: [
                { value: 50, text: '50 บาท' },
                { value: 100, text: '100 บาท' },
                { value: 150, text: '150 บาท' },
                { value: 200, text: '200 บาท' },
                { value: 250, text: '250 บาท' },
                { value: 300, text: '300 บาท' },
                { value: 350, text: '350 บาท' },
                { value: 400, text: '400 บาท' },
                { value: 450, text: '450 บาท' },
                { value: 500, text: '500 บาท' },
                { value: 600, text: '600 บาท' },
                { value: 700, text: '700 บาท' },
                { value: 800, text: '800 บาท' },
                { value: 900, text: '900 บาท' },
                { value: 1000, text: '1000 บาท' },
                { value: 1100, text: '1100 บาท' },
                { value: 1200, text: '1200 บาท' },
                { value: 1300, text: '1300 บาท' },
                { value: 1400, text: '1400 บาท' },
                { value: 1500, text: '1500 บาท' },
                { value: 2000, text: '2000 บาท' },
                { value: 2500, text: '2500 บาท' },
                { value: 3000, text: '3000 บาท' },
                { value: 3500, text: '3500 บาท' },
                { value: 4000, text: '4000 บาท' },
                { value: 5000, text: '5000 บาท' },
                { value: 7500, text: '7500 บาท' },
                { value: 10000, text: '10000 บาท' },
                { value: 20000, text: '20000 บาท' },
                { value: 30000, text: '30000 บาท' },
                { value: 40000, text: '40000 บาท' },
                { value: 50000, text: '50000 บาท' },
                { value: 75000, text: '75000 บาท' },
                { value: 100000, text: '100000 บาท' },
            ]
        }
    },
    beforeCreate: function(){
        var promise1 = new Promise((resolve, reject) => {
            this.axios.post(api.ROOT_URL+'/getSetting', {
                userid: this.$session.get('userid'),
            }).then(function (response) {
                resolve(JSON.parse(response.data[0].setting));
            })
        });
        promise1.then((value) => {
            this.doubleSelected = value.double;
            this.rateSelected = value.rate;
            this.maxPlaySelected = value.maxPlay;
            this.tieFocusSelected = value.tieFocus;
            this.dynamicSelected = value.dynamic;
            this.overbetSelected = value.overbet;
            this.betSelected = value.bet;
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
                double: parseFloat(this.doubleSelected),
                rate: this.rateSelected,
                maxPlay: parseFloat(this.maxPlaySelected),
                tieFocus: this.tieFocusSelected,
                dynamic: this.dynamicSelected,
                overbet: this.overbetSelected,
                bet: this.betSelected
            }
            var Promise1 = new Promise((resolve,reject) => {
                this.axios.post(api.ROOT_URL+'/saveSetting', {
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
