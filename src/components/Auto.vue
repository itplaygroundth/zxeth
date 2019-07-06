<template>
  <div>
      <br><br><br>
      <center><img src="../assets/ai2.png" alt="" width="30%"></center>
  </div>
</template>
<script>
/* eslint-disable */
const md5 = require('md5')
import api from '../backend'
export default {
    data() {
        return {
            redirect: true,
            myArray: [],
            render: true,
            sender: {
                username: '',
                gclubUser: '',
                gclubPass: '',
                status: true,
                multionline: 'L9,9999',
                multiurl: 'wss://multimobileroad.bacc6666.com/',
                url: false
            },
            setting: false
        }
    },
    beforeCreate: function() {
        this.$session.start();
        if (!this.$session.exists() || this.$session.get('userid') === undefined) {
            this.$router.push('/')
        } else {
            var promiseC = new Promise((resolve, reject) => {
                this.axios
                    .post(api.ROOT_URL+'/getUserInfo', {
                        userid: this.$session.get('userid')
                    })
                    .then(function(response) {
                        var username = response.data[0].username
                        var guser = response.data[0].gclub_user
                        var gpass = response.data[0].gclub_pass
                        var gclubuser = guser.charAt(0).toUpperCase() + guser.slice(1)
                        resolve({
                            status: true,
                            guser: gclubuser,
                            gpass: gpass,
                            username: username
                        })
                    })
            })
            promiseC
                .then(value => {
                    this.sender.gclubUser = value.guser
                    this.sender.gclubPass = value.gpass
                    this.sender.username = value.username
                    return true
                })
                .then(value => {
                    var gpass = md5(this.sender.gclubPass).toUpperCase()
                    this.$session.set('hashpass', gpass)
                    var promiseZ = new Promise((resolve, reject) => {
                        this.axios.get('https://ipinfo.io/ip').then(function(response) {
                            var backmultiurl = gpass + ',Web,' + response.data
                            resolve({
                                data: backmultiurl,
                                ip: response.data
                            })
                        })
                    })
                    promiseZ
                        .then(value => {
                            var fullmultiUrl =
                                'L0,' + this.sender.gclubUser + ',' + value.data
                            this.$session.set('gclubuser', this.sender.gclubUser)
                            this.$session.set('clientip', value.ip)
                            this.setting = this.$session.get('setting');
                            return fullmultiUrl
                        })
                        .then(value => {
                            this.$session.set('multiprofile', value)
                            this.multiconnect(value)
                        })
                })
        }
    },
    methods: {
        notify(data, classpoint) {
            this.$bvToast.toast(data, {
                title: `แจ้งเตือน`,
                variant: classpoint,
                solid: true,
                autoHideDelay: 5000,
            })
        },
        goto (desk) {
            setTimeout(() => {
                this.$router.push('/Panel/' + desk)
            }, 1500)
        },
        closeconnect(){
            this.multisockethome.send('!close');
            this.multisockethome.close();
            this.render = false;
        },
        multiconnect(profile) {
            this.multisockethome = new WebSocket(this.sender.multiurl)
            this.multisockethome.onopen = () => {
                this.multisockethome.send(profile)
                setInterval(() => {
                    if (this.render === true) {
                        this.multisockethome.send(this.sender.multionline)
                    }
                }, 5000)
            }
            this.multisockethome.onmessage = ({
                data
            }) => {
                var array = data.split('|')
                if (array[0] === '$All' && array[1] === 'Bacc') {

                    var all = array[3].split('*');
                    var count = parseFloat(all[0].split(':')[1]) + parseFloat(all[1].split(':')[1]) + parseFloat(all[4].split(':')[1]);

                    this.myArray.push({
                        room: array[2],
                        count: count
                    })
                    if (this.myArray.length === 6) {
                        var min = Math.min.apply(null, this.myArray.map(function(data) {
                            return data.count;
                        }))
                        this.myArray.forEach((val, i) => {
                            var total = val.count;
                            if (total.toString() === min.toString() && this.redirect === true) {
                                var data = this.setting;
                                if (min > data.gamePlay) {
                                    this.notify('กรุณารอสักครู่ ไม่พบห้องที่มีค่าน้อยกว่าที่คุณกำหนด','warning')
                                } else {
                                    this.redirect = false;
                                    this.notify('กำลังเปลี่ยนห้องไปยังห้อง : '+val.room,'info')
                                    this.closeconnect();
                                    setTimeout(() => {
                                        this.goto(val.room)
                                    },1000)
                                }
                            }
                        })
                    }
                }
            }
        }
    }
}
</script>
<style scope>
.card-body{
  padding: 0px;
}
  body{
    background: #222;
  }
</style>
