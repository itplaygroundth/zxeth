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
                       ></b-table>
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
            { key: 'date', sortable: true },
            { key: 'userid', sortable: true },
            { key: 'win_today', sortable: true },
            { key: 'lose_today', sortable: true },
            { key: 'wincredit_today', sortable: false },
            { key: 'losecredit_today', sortable: false },
            { key: 'betcredit_today', sortable: false }
            ],
            perPage: 10,
            currentPage: 1,
            filter: null,
            sortBy: 'reg_date',
            sortDesc: false,
        }
    },
    beforeCreate: function()
    {
            var promise1 = new Promise((resolve, reject) => {
                this.axios.post(api.ROOT_URL+'/getStat', {
                    
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
    //   validation() {
    //     if(this.userId.length === 7){
    //         var data = this.userId.toString();
    //         var datas = data.substring(0, 4);
    //         var datax = datas.toUpperCase();
    //         var user = this.alluser;
    //         var find = user.indexOf(datax);
    //         if(find != -1){
    //             this.submit = true;
    //             return true;
    //         }else{
    //             this.submit = false;
    //             return false;
    //         }
    //     }else{
    //         this.submit = false;
    //         return false;
    //     }
    //   }
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
                this.axios.post(api.ROOT_URL+'/getStat', {
                    
                }).then(function(response) {
                    var data = response.data;
                    //var decode = base64decode(data);
                    resolve(data);
                })
            });
            promise1.then((decode) => {
                var data = JSON.parse(decode);
                var array = [];
                data.forEach((val,i) => {
                    array.push({'row':i+1,'name':val.user});
                })
                this.alluser = array;
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
        register(){
            if(this.username){
                console.log(this.username,this.submit,api.ROOT_URL+'/add');
               
                   
                        var promise1 = new Promise((resolve, reject) => {
                            this.axios.post(api.ROOT_URL+'/add', {
                                username: this.username,
                                // password: this.password,
                                // gclub_user: this.userId,
                                // gclub_pass: this.gclub_pass
                            }).then(function (response) {
                                resolve(response.data)
                            })
                        });
                        promise1.then((value) => {
                            console.log(value)
                            if(value.status === true){
                                this.notify('บันทึกสำเร็จ','success')
                                 setTimeout(() => {
                                      this.username = '';
                                      this.reload();
                                 }, 1500);
                            }else{
                               // this.userId = '';
                                this.username = '';
                                // this.cpassword = '';
                                // this.password = '';
                                // this.gclub_pass = '';
                                // this.notify(value.msg,'danger')
                            }
                        })
                  
               
            }else{
                this.notify('กรุณากรอกข้อมูลให้ครบทุกช่อง','warning')
            }
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
