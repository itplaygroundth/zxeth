<template>
    <b-container>
        <br>
        <br>
        <b-row>
            <b-col>
                <b-col md="6" class="my-1">
                    <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                        <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    </b-form-group>
                </b-col>
                <br>
                <b-card title="ยูสเซอร์" class="bg-dark text-white p-3">
                    <p class="mt-3">ทั้งหมด {{this.alluser.length}} รายการ</p>
                      <b-table id="my-table" responsive  striped hover
                       :items="alluser"
                       :filter="filter"
                       :fields="fields"
                        @filtered="onFiltered"
                       dark
                       :per-page="perPage"
                       :current-page="currentPage"
                       small
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                       >
                    <template slot="show_details" slot-scope="row">
                        <b-button size="sm" @click="showedit(row.item)" class="mr-2">
                        {{ row.detailsShowing ? 'ปิด' : 'แก้ไข'}}
                        </b-button>
                    </template>
                    <template slot="row-details" slot-scope="row">
                    <b-container>
                        <form v-on:submit.prevent="register(row.item)">
                        <b-card class="bg-dark text-white p-3">
                            <b-card-text>
                            <b-form-group
                            id="fieldset-0"
                            label="ชื่อผู้ใช้"
                            label-for="input-0"
                            :invalid-feedback="uinvalidFeedback"
                            :valid-feedback="uvalidFeedback"
                            :state="userstate"
                            >
                            <b-form-input v-model="username" type="text" :state="userstate" required autocomplete="off" trim aria-invalid="true"></b-form-input>
                            </b-form-group>
                            <br>
                            <b-form-group
                            id="fieldset-1"
                            label="รหัสผ่าน"
                            label-for="input-1"
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            :state="passtate"
                            >
                            <b-form-input v-model="password" :state="passtate" trim type="text" required autocomplete="off" aria-invalid="true" aria-describedby="input-pass-help input-pass-feedback"></b-form-input>
                            </b-form-group>
                        <label>ยืนยันรหัสผ่าน</label>
                        <b-form-input v-model="cpassword" type="text"  required autocomplete="off"></b-form-input>
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
                        <b-form-input v-model="gclub_pass" type="text" required autocomplete="off"></b-form-input>
                        <div class="text-light" style="font-size:12px;">
                            หากรหัสผ่านที่ไม่ตรงกับจีคลับระบบจะไม่สามารถใช้งานได้
                        </div>
                            </b-card-text>
                            <b-container>
                            <b-row>
                            <b-col>
                            <b-button  type="submit" variant="success" class="btn-block pull-left"><i class="fas fa-sign-in-alt"></i> บันทึก</b-button>
                            </b-col>
                            <b-col>
                            <b-button  @click="row.toggleDetails" variant="primary" class="btn-block pull-right"><i class="fas fa-sign-in-alt"></i> ยกเลิก</b-button>
                            </b-col>
                            </b-row>
                            <b-row class="pt-3">
                                <b-col>
                            <center><a @click="showMsgBoxTwo(row.item)" class="btn btn-danger btn-block">ลบข้อมูล</a></center>
                                </b-col>
                            </b-row>
                            </b-container>
                        </b-card>
                        </form>
                    </b-container>
                    </template>
                       </b-table>
                        <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                        size="sm"
                        align="right"
                        ></b-pagination>   <p class="mt-3">หน้าที่: {{ currentPage }} จากทั้งหมด {{rounder}} หน้า</p>

                <!-- <div v-for="(m, index) in alluser"  :key="index" ref="blocks" class="item" replace="true">{{m}}
                </div> -->
                </b-card>
            </b-col>
            <!-- <b-col>
        <form v-on:submit.prevent="register">
        <b-card title="เพิ่มยูสจีคลับ" class="bg-dark text-white p-3">
            <b-card-text>
                <label>ชื่อผู้ใช้</label>
                <b-form-input v-model="username" type="text" required autocomplete="off"></b-form-input>
            </b-card-text>
            <b-button type="submit" block variant="success">บันทึก</b-button>
            <br>
        </b-card>
        </form>
            </b-col> -->
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
            Id:'',
            userId: '',
            username: '',
            password: '',
            cpassword: '',
            gclub_pass: '',
            snackbar: false,
            alerttext: '',
            submit: false,
            alluser: [],
            fields: [
            { key: 'id', sortable: true },
            { key: 'username', sortable: true },
            { key: 'password', sortable: false },
            { key: 'gclub_user', sortable: true },
            { key: 'reg_date', sortable: true },
            { key: 'active_date', sortable: true },
            { key: 'show_details' }
            ],
            perPage: 10,
            currentPage: 1,
            filter: null,
            sortBy: 'reg_date',
            sortDesc: false,
            showDetails:false
        }
    },
    beforeCreate: function()
    {
            var promise1 = new Promise((resolve, reject) => {
                this.axios.post(api.ROOT_URL+'/getUsers', {
                    
                }).then(function(response) {
                    
                    var data = response.data;
                    //var decode = base64decode(data);
                    resolve(data);
                })
            });
            promise1.then((data) => {
                //var data = JSON.parse(decode);
                var array = [];
                data.forEach((val,i) => {
                    //console.log(val);
                    array.push(val);
                })
                this.alluser = array;
            })
        },
    computed: {
         rows() {
        return this.alluser.length
      },
       rounder(){
            return Math.ceil(this.alluser.length/this.perPage);
        },
        validation() {
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
        }else {
            this.submit = false;
            return false;
        }
      },passtate() {
          if(this.password.length>5) {
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
        if (this.password.length > 5) {
          return ''
        } else if (this.password.length > 0) {
          return 'รหัสผ่านต้องมีตัวเลข หรือ ตัวหนังสือภาษอังกฤษ ไม่น้อยกว่า 6 ตัวอักษร ห้ามมีเครื่องหมาย'
        } else {
          return ''
        }
      },
      validFeedback() {
        return this.passtate === true ? 'รหัสผ่านสามารถใช้งานได้' : ''
      },
      userstate() {
          if(this.username.length>5) {
                const re=new RegExp("([A-Za-z0-9]{6,20})");
                if(!re.test(this.username))
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
       uinvalidFeedback() {
        if (this.username.length > 5) {
          return ''
        } else if (this.username.length > 0) {
          return 'ขื่อผู้ใช้ต้องมีตัวเลข หรือ ตัวหนังสือภาษอังกฤษ ไม่น้อยกว่า 6 ตัวอักษร ห้ามมีเครื่องหมาย'
        } else {
          return ''
        }
      },
      uvalidFeedback() {
        return this.userstate === true ? 'ชื่อผู้ใช้สามารถใช้งานได้' : ''
      }
    },
    methods:{
        // goto(str) {
        //     this.$router.push(str);
        // },
        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
        },
        reload() {
            var promise1 = new Promise((resolve, reject) => {
                this.axios.post(api.ROOT_URL+'/getUsers', {
                    
                }).then(function(response) {
                    var data = response.data;
                    //var decode = base64decode(data);
                    resolve(data);
                })
            });
            promise1.then((decode) => {
                
                // var data = JSON.parse(decode);
                // var array = [];
                // data.forEach((val,i) => {
                //     array.push({'row':i+1,'name':val.user});
                // })
                this.alluser = decode;
            })
        },
        notify(data, classpoint) {
            this.$bvToast.toast(data, {
                title: `แจ้งเตือน`,
                variant: classpoint,
                solid: true,
                autoHideDelay: 2500,
            })
        },
        register(item){
            if(this.username && this.password && this.cpassword && this.userId && this.gclub_pass){
                  if(this.submit === true || (this.userstate===true && this.passtate===true)){
                    if(this.cpassword === this.password){
                        var promise1 = new Promise((resolve, reject) => {
                            this.axios.post(api.ROOT_URL+'/update', {
                                id:this.Id,
                                username: this.username,
                                password: this.password,
                                gclub_user: this.userId,
                                gclub_pass: this.gclub_pass
                            }).then(function (response) {
                                resolve(response.data)
                            })
                        });
                        promise1.then((value) => {
                           // console.log(value)
                            if(value.status === true){
                                this.notify('บันทึกสำเร็จ','success')
                                 setTimeout(() => {
                                     this.$root.$set(item, '_showDetails', !item._showDetails);
                                     this.Id='';
                                     this.userId = '';
                                     this.username = '';
                                     this.cpassword = '';
                                     this.password = '';
                                     this.gclub_pass = '';
                                     this.reload();
                                 }, 1500);
                            }else{
                                // this.Id='';
                                // this.userId = '';
                                // this.username = '';
                                // this.cpassword = '';
                                // this.password = '';
                                // this.gclub_pass = '';
                                this.notify(value.msg,'danger')
                            }
                        })
                  
                    }else{
                        this.notify('ยืนยันรหัสผ่านผิดพลาดกรุณาลองใหม่อีกครั้ง','danger')
                        this.cpassword = '';
                        //this.password = '';
                    }
                }else{
                    this.notify('กรุณาตรวจสอบข้อมูลอีกครั้ง','danger')
                }
            }else{
                this.notify('กรุณากรอกข้อมูลให้ครบทุกช่อง','warning')
            }
        },
        showedit(item)
        {
          this.Id=item.id;
          this.username=item.username;
          this.password=item.password;
          this.userId=item.gclub_user;
          this.gclub_pass=item.gclub_pass;
          this.$root.$set(item, '_showDetails', !item._showDetails);
        },
         showMsgBoxTwo(item) {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('ต้องการลบข้อมูล ใช่หรือไม่?', {
          title: 'แจ้งยืนยัน',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          okTitle: 'ใช่',
          cancelVariant: 'danger',
          cancelTitle: 'ไม่',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value){
            this.boxTwo = value
            this.delete(item)
            }else {
              
            }
            
          })
          .catch(err => {
            // An error occurred
          })
      },
        delete(item)
        {
            // console.log(item);
            var promise1 = new Promise((resolve, reject) => {
                            this.axios.post(api.ROOT_URL+'/deluser', {
                                id:this.userId,
                            }).then(function (response) {
                                resolve(response.data)
                            })
                        });
                        promise1.then((value) => {
                           // console.log(value)
                            if(value.status === true){
                                this.notify('บันทึกสำเร็จ','success')
                                 setTimeout(() => {
                                     this.$root.$set(item, '_showDetails', !item._showDetails);
                                     this.Id='';
                                     this.userId = '';
                                     this.username = '';
                                     this.cpassword = '';
                                     this.password = '';
                                     this.gclub_pass = '';
                                     this.reload();
                                 }, 1500);
                            }else{
                                this.notify(value.msg,'danger')
                            }
                        })
        }

    }
}
</script>

<style scope>
    body{
        background: #222;
        color:limegreen;
    }
</style>
