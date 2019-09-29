<template>
    <b-container>
        <b-row>
            <b-col md="6" offset-md="3" class="animated zoomIn mt-5">
                <form v-on:submit.prevent="register">
                <b-card title="สมัครสมาชิก" class="bg-dark-3 p-3"  style="border:none;" sub-title="กรุณากรอกข้อมูลให้ครบทุกช่อง">
                    <b-card-text>
                        <label>ชื่อผู้ใช้</label>
                        <b-form-input v-model="username" type="text" required autocomplete="off"></b-form-input>
                        <br>
                        <b-form-group
                        id="fieldset-1"
                        label="รหัสผ่าน"
                        label-for="input-1"
                        :invalid-feedback="invalidFeedback"
                        :valid-feedback="validFeedback"
                        :state="passtate"
                        >
                        <b-form-input v-model="password" :state="passtate" trim type="password" required autocomplete="off" aria-invalid="true" aria-describedby="input-pass-help input-pass-feedback"></b-form-input>
                        </b-form-group>
                        <label>ยืนยันรหัสผ่าน</label>
                        <b-form-input v-model="cpassword" type="password"  required autocomplete="off"></b-form-input>
                        <br>
                        <label for="auth-user">ยูสเซอร์จีคลับ</label>
                        <b-input v-model="userId" :state="validation" id="auth-user" aria-invalid="true" aria-describedby="input-gclub-help input-gclub-feedback"></b-input>
                        <b-form-invalid-feedback id="input-gclub-feedback">
                            กรุณาใช้ยูสเซอร์ที่สมัครด้วยระบบใหม่ของจีคลับเท่านั้น
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback id="input-gclub-help">
                            รหัสใช้งานสามารถใช้งานได้
                        </b-form-valid-feedback>
                        <label>รหัสผ่านจีคลับ</label>
                        <b-form-input v-model="gclub_pass" type="password" required autocomplete="off"></b-form-input>
                        <div class="text-light" style="font-size:12px;">
                            หากรหัสผ่านที่ไม่ตรงกับจีคลับระบบจะไม่สามารถใช้งานได้
                        </div>
                    </b-card-text>
                    <b-button type="submit" block variant="primary">สมัครสมาชิก</b-button>
                    <br>หากคุณมีรหัสผ่านอยู่แล้วจะมาสมัครทำไม ? เข้าสู่ระบบเลย <b-button @click="goto('/Login')" size="sm" variant="outline-primary">คลิ๊กที่นี่</b-button>
                </b-card>
                </form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
/* eslint-disable */
const { base64encode, base64decode } = require('nodejs-base64');
import api from '../backend'
export default {
    data() {

        return {
            userId: '',
            username: '',
            password: '',
            cpassword: '',
            gclub_pass: '',
            snackbar: false,
            alerttext: '',
            submit: false,
            alluser: false
        }
    },
    beforeCreate: function(){
    var promise1 = new Promise((resolve, reject) => {
        this.axios.get(api.ROOT_URL+'/getUserList', {
            
        }).then(function(response) {
            var data = response.data.replace(/99H9/g, 'H');
            var decode = base64decode(data);
            resolve(decode);
        })
    });
    promise1.then((decode) => {
        var data = JSON.parse(decode);
        var array = [];
        data.forEach((val,i) => {
            array.push(val.user);
        })
        this.alluser = array;
    })
    },
    computed: {
      validation() {
        // console.log(8-this.userId.length)
        if(8-this.userId.length<2){
            var data = this.userId.toString();
            var datas = data.substring(0, 4);
            var datax = datas.toUpperCase();
            var user = this.alluser;
            var find = user.indexOf(datax);
            if(find != -1){
                this.submit = true;
                return true;
            }else{
                this.submit = false;
                return false;
            }
        }else
        if(8-this.userId.length===4){
            var data = this.userId.toString();
            var datas = data.substring(0, 4);
            var datax = datas.toUpperCase();
            var user = this.alluser;
            var find = user.indexOf(datas);
            if(find != -1){
                this.submit = true;
                return true;
            }else{
                this.submit = false;
                return false;
            }
        }else
        {
            this.submit = false;
            return false;
        }
      },passtate() {
          if(this.password.length>6) {
                const re=new RegExp("([A-Za-z0-9]{6,20})");
                if(!re.test(this.password))
                {
                    this.submit = false;
                    return false;
                } else {
                    this.submit = true;
                    return true;
                }

        } else {
                    this.submit = false;
                    return false;
                }
      },
       invalidFeedback() {
        if (this.password.length > 6) {
          return ''
        } else if (this.password.length > 0) {
          return 'รหัสผ่านต้องมีตัวเลข หรือ ตัวหนังสือภาษอังกฤษ มากกว่า 6 ตัวอักษร ห้ามมีเครื่องหมาย'
        } else {
          return ''
        }
      },
      validFeedback() {
        return this.passtate === true ? 'รหัสผ่านสามารถใช้งานได้' : ''
      }
    },
    methods:{
        goto(str) {
            this.$router.push(str);
        },
        notify(data, classpoint) {
            this.$bvToast.toast(data, {
                title: `แจ้งเตือน`,
                variant: classpoint,
                solid: true,
                autoHideDelay: 2500,
            })
        },
        register(){

            if(this.username && this.password && this.cpassword && this.userId && this.gclub_pass){
                if(this.submit === true){
                    if(this.cpassword === this.password){
                        var promise1 = new Promise((resolve, reject) => {
                            this.axios.post(api.ROOT_URL+'/saveuser', {
                                username: this.username,
                                password: this.password,
                                gclub_user: this.userId,
                                gclub_pass: this.gclub_pass
                            }).then(function (response) {
                                resolve(response.data)
                            })
                        });
                        promise1.then((value) => {
                            if(value.status === true){
                                this.notify(value.msg,'success')
                                setTimeout(() => {
                                    window.location.href = '/';
                                }, 1500);
                            }else{
                                this.userId = '';
                                this.username = '';
                                this.cpassword = '';
                                this.password = '';
                                this.gclub_pass = '';
                                this.notify(value.msg,'danger')
                            }
                        })
                    }else{
                        this.notify('ยืนยันรหัสผ่านผิดพลาดกรุณาลองใหม่อีกครั้ง','danger')
                        this.cpassword = '';
                        this.password = '';
                    }
                }else{
                    this.notify('กรุณาตรวจสอบข้อมูลอีกครั้ง','danger')
                }
            }else{
                this.notify('กรุณากรอกข้อมูลให้ครบทุกช่อง','warning')
            }
        },
        
    }
}
</script>
