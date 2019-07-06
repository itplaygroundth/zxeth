<template>
    <div style="background: #222;" class="col-md-4 offset-md-4">
    <b-container style="background: #222;">
        <b-row style="background: #222;">
            <b-col class="p-0" v-for="(n, x) in rows" :key="x">
                <div v-bind:style="{ height: height + 'px' }" v-for="(m, index) in items" :id="getid(n, index, rows.length)" :key="index" ref="blocks" class="item" :class="[classobj]" replace="true">
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-row>
                    <b-col class="card p-0">
                        <img v-bind:src="require(`../assets/card/${card1}.png`)" width="100%">
                    </b-col>
                    <b-col class="card p-0">
                        <img v-bind:src="require(`../assets/card/${card2}.png`)" width="100%">
                    </b-col>
                    <b-col class="card p-0">
                        <img v-bind:src="require(`../assets/card/${card3}.png`)" width="100%">
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-row>
                    <b-col class="card p-0">
                        <img v-bind:src="require(`../assets/card/${card4}.png`)" width="100%">
                    </b-col>
                    <b-col class="card p-0">
                        <img v-bind:src="require(`../assets/card/${card5}.png`)" width="100%">
                    </b-col>
                    <b-col class="card p-0">
                        <img v-bind:src="require(`../assets/card/${card6}.png`)" width="100%">
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="p-0">
                <b-button variant="primary" squared class="w-100">Player <b-badge variant="light"><span id="scoreplayer"></span></b-badge></b-button>
            </b-col>
            <b-col class="p-0">
                <b-button variant="danger" squared class="w-100">Banker <b-badge variant="light"><span id="scorebanker"></span></b-badge></b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="p-0">
                <b-tabs>
                    <b-tab title="ชุดคำสั่ง" active>
                        <b-list-group>
                            <b-list-group-item class="d-flex justify-content-between align-items-center rounded-0">
                                เวลา
                                <b-badge variant="success" pill>{{ roomStats.time }}</b-badge>
                            </b-list-group-item>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                คำสั่งแทง
                                <b-badge ref="nextbet" variant="dark" pill><span id="nextbet">รอ</span></b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                ทบเงิน
                                <b-badge variant="dark" pill><span id="double">0</span></b-badge>
                            </b-list-group-item>
                        </b-list-group>
                    </b-tab>
                    <b-tab title="สถิติ">
                        <b-list-group>
                            <b-list-group-item class="d-flex justify-content-between align-items-center rounded-0">
                                ผู้ชนะ
                                <b-badge variant="dark" pill><span id="winner">รอ</span></b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                บอทชนะ
                                <b-badge variant="danger" pill><span id="wincount">0</span></b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center rounded-0">
                                บอทแพ้
                                <b-badge variant="success" pill><span id="losecount">0</span></b-badge>
                            </b-list-group-item>
                        </b-list-group>
                    </b-tab>
                    <b-tab title="โปรไฟล์">
                        <b-list-group>
                            <b-list-group-item class="d-flex justify-content-between align-items-center rounded-0">
                                รหัสใช้งาน
                                <b-badge variant="secondary" pill>{{ sender.gclubUser }}</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                ห้องที่เลือก
                                <b-badge variant="warning" pill>{{ $route.params.Panel }}</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center rounded-0">
                                ยอดเงินในบัญชี
                                <b-badge variant="secondary" pill><span id="profilemoney">loading...</span></b-badge>
                            </b-list-group-item>
                        </b-list-group>
                    </b-tab>
                    <b-tab title="การแทง">
                        <b-list-group>
                            <b-list-group-item class="d-flex justify-content-between align-items-center rounded-0">
                                เดิมพันต่ำสุด
                                <b-badge variant="secondary" pill>{{ profile.minbet }}</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                เดิมพันสูงสุด
                                <b-badge variant="warning" pill>{{ profile.maxbet }}</b-badge>
                            </b-list-group-item>
                            <b-list-group-item class="d-flex justify-content-between align-items-center rounded-0">
                                เดิมพันปัจจุบัน
                                <b-badge variant="secondary" pill><span id="nowbet">-</span></b-badge>
                            </b-list-group-item>
                        </b-list-group>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="p-0">
                <b-tabs>
                    <b-tab title="การทำงานของบอท" active>
                        <div id="ailogs" style="height:200px; overflow-y:auto; background:#222;color:#FFF">

                        </div>
                    </b-tab>
                    <b-tab title="ข้อความจากระบบ">
                        <div id="serverlogs" style="height:200px; overflow-y:auto; background:#222;color:#FFF">

                        </div>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
        <div class="fixed-bottom col-md-4 offset-md-4">
            <b-row>
                <b-button @click="logout" variant="danger" squared class="w-100">ปิดโปรแกรม</b-button>
            </b-row>
        </div>
    </b-container>
    </div>
</template>

<script>
/* eslint-disable */
const moment = require('moment');
export default {
    data() {
        return {
            render: true,
            count: 0,
            classobj: '',
            items:[0,1,2,3,4,5],
            rows:[1,2,3,4,5,6,7,8,9,10,11,12],
            logs: [],
            bottomNav: 'recent',
            height: 0,
            global:{
                double: 0,
                newgame: true,
                lastgame: 0,
                RoadMapData: [],
                RoadMapData2: [],
                letin: false,
                nowbet: true,
                wincount: 0,
                losecount: 0
            },
            sender:{
                gclubUser: '',
                status: true,
                multiprofile: '',
                profile: '',
                multionline: 'L9,9999',
                online: '9999',
                RoadMap: '',
                currentRoom: '',
                multiurl: 'wss://multimobileroad.bacc6666.com/',
                url: false,
            },
            roomStats: {
                time: '',
                scorePlayer: '',
                scoreBanker: '',
                Winner: '',
                TimeStamp: '',
                status:false
            },
            card1: 'cardp',
            card2: 'cardp',
            card3: 'cardp',
            card4: 'cardb',
            card5: 'cardb',
            card6: 'cardb',
            aiBet: {
                status: false,
                balance: 0,
            },
            profile: {
                rate: false,
                minbet: false,
                maxbet: false,
                money: false,
                bet: false,
            },
            setting: false,
            fx: {
                'p,p,p,p':'p',
                'b,b,b,b':'b',
                'p,p,b,b':'p',
                'b,b,p,p':'b',
                'b,p,b,p':'b',
                'p,b,p,b':'p',
                'p,b,p,p':'p',
                'b,p,b,b':'b',
                'p,p,b,p':'p',
                'b,b,p,b':'b',
                'p,b,b,p':'p',
                'b,p,p,b':'b',
                'p,p,p,b':'b',
                'b,b,b,p':'p',
                'p,b,b,b':'b',
                'b,p,p,p':'p'
            }
        }
    },
    beforeCreate: function() {
        this.$session.start();
        if (!this.$session.exists()) {
            this.$router.push('/')
        }

    },
    created() {
        window.addEventListener('beforeunload', this.handler)
        this.sender.currentRoom = this.$route.params.Panel;
        this.sender.url = "wss://mobilegs"+this.sender.currentRoom+".bacc6666.com";
        var setUp = new Promise((resolve,reject) => {
            var gclubuser = this.$session.get('gclubuser')
            var gclubpass = this.$session.get('hashpass')
            console.log(gclubpass);
            var ip = this.$session.get('clientip');
            var multiprofile = this.$session.get('multiprofile');
            this.sender.multiprofile = multiprofile;
            this.sender.profile = '!login,'+gclubuser+','+gclubpass+',Web,1,'+ip+',H1,WebH5'
            this.sender.RoadMap = '!road,'+gclubuser;
            this.sender.gclubUser = gclubuser;
            this.setting = this.$session.get('setting');
            this.profile.rate = parseFloat(this.setting.rate);
            this.profile.bet = parseFloat(this.setting.bet);
            resolve(true);
        })
        setUp.then((value) => {
            if(value === true && this.setting != false){
                this.connect();
                this.multiconnect();
            }else{
                alert(this.setting);
                this.$router.push('../Home');
            }
        })
    },
    methods: {
        beforePageDestroyed: function (event) {
            this.closeconnect();
        },
        logout() {
            this.closeconnect();
            this.notify('กำลังเปิดโปรแกรม','danger')
            setTimeout(() => {
                this.$router.push('../Home');
            }, 3500);
        },
        notify(data, classpoint) {
            this.$bvToast.toast(data, {
                title: `แจ้งเตือน`,
                variant: classpoint,
                solid: true,
                autoHideDelay: 3000,
            })
        },
        multiconnect() {
            this.multisocket = new WebSocket(this.sender.multiurl);
            this.multisocket.onopen = () => {
                this.multisocket.send(this.sender.multiprofile);
                setInterval(() => {
                    if(this.render === true){
                        this.multisocket.send(this.sender.multionline);
                    }
                },3500)
            };
            this.multisocket.onmessage = ({data}) => {
                var array = data.split('|');
                if(array[0] === '$New' && array[1] === 'Bacc'){
                    var currentRoom = this.sender.currentRoom;
                    var cRoom = currentRoom.toUpperCase();
                    if(array[2] === cRoom){
                        var status = array[3].split(':')[1];
                        this.roomStats.status = status.toString();
                        if(status.toString() === '4'){
                            this.sendLogs('serverlogs','ห้องนี้อยู่ในช่วงเวลาพักครึ่ง')
                            this.notify('ห้องนี้อยู่ในช่วงเวลาพักครึ่ง','warning');
                            this.closeconnect();
                            setTimeout(() => {
                                this.$router.push('../Home');
                            },3000)
                        }
                    }
                }
                
            }
            this.multisocket.onclose = () => {
                console.log('closed connection multiroom service');
            }
        
        },
        sendLogs(elm,data){
            var parent = document.getElementById(elm);
            var p = document.createElement("div");
            parent.prepend('['+moment().format('DD-MM-YYYY HH:mm:ss')+'] '+data, p);
        },
        sendBet(){
            var rates = this.profile.rate;
            if(this.global.double === 0){
                var ratex = 1;
            }else if(this.global.double === 1){
                var ratex = this.profile.rate;
            }else if(this.global.double === 2){
                var ratex = parseFloat(rates * 2);
            }else if(this.global.double === 3){
                var ratex = parseFloat(rates * 4);
            }else if(this.global.double === 4){
                var ratex = parseFloat(rates * 8);
            }else if(this.global.double === 5){
                var ratex = parseFloat(rates * 16);
            }else if(this.global.double === 6){
                var ratex = parseFloat(rates * 32);
            }
            /* calculation rate money */
            var betbalance = parseFloat(this.profile.bet*ratex);
            if(this.roomStats.status != false && this.profile.money != false && this.profile.maxbet != false){
                if(this.aiBet.status === false){
                    if(this.roomStats.status === '1'){
                        if(this.global.letin === 'p' || this.global.letin === 'b'){
                            var letindata = this.global.letin;
                            var letinpointer = letindata.toUpperCase();
                            if(betbalance < this.profile.money){
                                if(betbalance > this.profile.maxbet){
                                    if(parseFloat(this.roomStats.time) > 0){
                                        this.socket.send('!b,'+letinpointer+':'+this.profile.maxbet);
                                    }else{
                                        setTimeout(() => {
                                            this.sendBet();
                                        },3000)
                                    }
                                }else{
                                    if(parseFloat(this.roomStats.time) > 0){
                                        this.socket.send('!b,'+letinpointer+':'+betbalance);
                                    }else{
                                        setTimeout(() => {
                                            this.sendBet();
                                        },3000)
                                    }
                                }
                            }else{
                                if(this.setting.overBet === false){
                                    this.sendLogs('ailogs','เดิมพันผิดพลาด : ยอดเงินคงเหลือไม่พอสำหรับเดิมพัน');
                                }else{
                                    this.sendLogs('ailogs','แทงทั้งหมดของเงินที่มี : ตามการตั้งค่าสูตรเมื่อเงินไม่พอเดินเงิน');
                                    if(parseFloat(this.roomStats.time) > 0){
                                        this.socket.send('!b,'+letinpointer+':'+this.profile.maxbet);
                                    }else{
                                        setTimeout(() => {
                                            this.sendBet();
                                        },3000)
                                    }
                                }
                            }
                        }else{
                            this.sendLogs('ailogs','กรุณารอสักครู่.. : ไม่มีสูตรเข้าในตอนนี้');
                        }
                    }else{
                        setTimeout(() => {
                            this.sendBet();
                        },3000)
                    }
                }else{
                    this.sendLogs('ailogs','เดิมพันผิดพลาด : มีการเดิมพันอยู่ในระบบ');
                }
            }else{
                var global = {
                    roomStatus: this.roomStats.status,
                    profilemoney: this.profile.money,
                    profilemaxbet: this.profile.maxbet
                }
                this.sendLogs('ailogs','ระบบอาจมีข้อผิดพลาด หากพบปัญหากรุณา Refresh หากไม่พบปัญหาในการแทงสามารถเปิดต่อได้');
                this.notify('ระบบอาจมีข้อผิดพลาด หากพบปัญหากรุณา Refresh หากไม่พบปัญหาในการแทงสามารถเปิดต่อได้','warning')
            }
        },
        closeconnect(){
            var promise1 = new Promise((resolve,reject) => {
                this.render = false;
                resolve(true);
            })
            promise1.then((value) => {
                console.log('send close connection room service');
                this.socket.send('!close');
                this.socket.close();
                return true;
            }).then((value) => {
                console.log('send close connection multiroom service');
                this.multisocket.send('!close');
                this.multisocket.close();
            })
        },
        connect() {
            this.socket = new WebSocket(this.sender.url);
            this.socket.onopen = () => {
               
                this.socket.send(this.sender.profile);
                this.socket.send(this.sender.RoadMap);
                setInterval(() => {
                    if(this.render === true){
                        this.socket.send(this.sender.online);
                    }
                },1000)
                setInterval(() => {
                    this.$nextTick(() => {
                        if(this.render === true){
                            this.height = this.$refs.blocks[0].clientWidth;
                        }
                    });
                },250)
            };
            this.socket.onmessage = ({data}) => {
                var array = data.split(',');
                if (array[1] === '-1||0|0') {
                    this.sendLogs('serverlogs','เข้าสู่ระบบผิดพลาด กรุณาลองใหม่อีกครั้ง อาจมีเดิมพันค้างไว้ห้องอื่น หรือ คุณระบุรหัสผ่านของจีคลับผิด');
                    this.notify('เข้าสู่ระบบผิดพลาด กรุณาลองใหม่อีกครั้ง อาจมีเดิมพันค้างไว้ห้องอื่น หรือ คุณระบุรหัสผ่านของจีคลับผิด','danger');
                    this.sender.status = false;
                    this.closeconnect();
                    setTimeout(() => {
                        this.$router.push('../Home');
                    },3000)
                } else if (array[1] === '-4||0|0') {
                    this.sendLogs('serverlogs','ตรวจพบการออนไลน์ รหัสใช้งานนี้กำลังออนไลน์อยู่ในอุปกรณ์อื่น');
                    this.notify('ตรวจพบการออนไลน์ รหัสใช้งานนี้กำลังออนไลน์อยู่ในอุปกรณ์อื่น','danger');
                    this.sender.status = false;
                    this.closeconnect();
                    setTimeout(() => {
                        this.$router.push('../Home');
                    },3000)
                } else if (array[1] === '-8||0|0') {
                    this.sendLogs('serverlogs','บัญชีของคุณถูกล็อคกรุณาติดต่อเอเย่น');
                    this.notify('บัญชีของคุณถูกล็อคกรุณาติดต่อเอเย่น','danger');
                    this.sender.status = false;
                    this.closeconnect();
                    setTimeout(() => {
                        this.$router.push('../Home');
                    },3000)
                } else if (array[1] === '-7||0|0') {
                    this.notify('บัญชีของคุณถูกหยุดใช้','danger');
                    this.sendLogs('serverlogs','บัญชีของคุณถูกหยุดใช้');
                    this.sender.status = false;
                    this.closeconnect();
                    setTimeout(() => {
                        this.$router.push('../Home');
                    },3000)
                }else{ 
                    if(array[18] === '998'){
                        this.genCard(1, array[3]);
                        this.genCard(2, array[5]);
                        this.genCard(3, array[7]);
                        this.genCard(4, array[4]);
                        this.genCard(5, array[6]);
                        this.genCard(6, array[8]);
                        this.roomStats.time = array[14];
                        function setscore(str1,str2){
                            if(str2 != ''){
                                document.getElementById(str1).innerHTML = str2;
                            }else{
                                document.getElementById(str1).innerHTML = '0';
                            }
                        }
                        setscore('scorebanker',array[9])
                        setscore('scoreplayer',array[10])
                        if (array[15] === '') {
                            document.getElementById("winner").innerHTML = 'รอ';
                        } else {
                            this.aiBet.status = false;
                            if (array[15] === '1' && array[12] != 4) {
                                var response_score = array[10];
                                document.getElementById("winner").innerHTML = 'ผู้เล่นชนะ';
                                this.notify('ผู้เล่นชนะ','primary');
                            }
                            if (array[15] === '2' && array[12] != 4) {
                                var response_score = array[9];
                                document.getElementById("winner").innerHTML = 'เจ้ามือชนะ';
                                this.notify('เจ้ามือชนะ','danger');
                            }
                            if (array[15] === '3' && array[12] != 4) {
                                var response_score = array[10];
                                document.getElementById("winner").innerHTML = 'เสมอชนะ';
                                this.notify('เสมอชนะ','success');
                            }
                            var setArray = this.global.RoadMapData;
                            var setArray2 = this.global.RoadMapData2;
                            var datas = {
                                gameNo : array[2],
                                type   : this.typeofwinner(array[15]),
                                score  : response_score
                            }

                            var promise1 = new Promise((resolve, reject) => {
                                this.bet(datas.type,datas.score);
                                resolve({status: true});
                            });

                            promise1.then(value => {
                                if(value.status === true){
                                    setArray.push(datas);
                                    if(this.setting.tieFocus === false){
                                        if(datas.type != 't'){
                                            setArray2.push(datas);
                                        }
                                    }else{
                                        setArray2.push(datas);
                                    }
                                    return {status: true};
                                }
                            }).then(value => {
                                if(value.status === true){
                                    var returns = this.checkFxResp(datas);
                                    return returns;
                                }
                            }).then(value => {
                                if(value.status === true){
                                    return this.checkValueFormular(setArray2);
                                }else{
                                    return {status: false};
                                }
                            }).then(value => {
                                var nextbet = this.$refs.nextbet;
                                if(value.status === true){
                                    this.global.letin = value.data;
                                    if(value.data === 'p'){
                                        document.getElementById("nextbet").innerHTML = 'ตานี่แทงผู้เล่น';
                                        this.$nextTick(() => {
                                            nextbet.className='badge badge-primary';
                                        })
                                    }else{
                                        document.getElementById("nextbet").innerHTML = 'ตานี่แทงเจ้ามือ';
                                        this.$nextTick(() => {
                                            nextbet.className='badge badge-danger';
                                        })
                                    }
                                    return {status: true};
                                }else{
                                    this.global.letin = false;
                                    document.getElementById("nextbet").innerHTML = 'ยังไม่มีสูตรเข้า';
                                    this.$nextTick(() => {
                                        nextbet.className='badge badge-dark';
                                    })
                                    return {status: true};
                                }
                            }).then(value => {
                                if(value.status === true){
                                    var setArray = this.global.RoadMapData;
                                    console.log(setArray.length+' & '+this.setting.maxPlay)
                                    if(setArray.length >= this.setting.maxPlay){
                                        this.sendLogs('serverlogs','ห้องนี้มีจำนวนเกมส์มากกว่าที่คุณตั้งไว้ กรุณาเปลี่ยนห้อง');
                                        this.notify('ห้องนี้มีจำนวนเกมส์มากกว่าที่คุณตั้งไว้ กรุณาเปลี่ยนห้อง','danger');
                                        this.sender.status = false;
                                        this.closeconnect();
                                        setTimeout(() => {
                                            this.$router.push('../Auto');
                                        },3500)
                                    }else{
                                        this.sendBet();
                                    }
                                }
                            });
                        }

                    }else{
                        var roadPoint = array[0].split(':')[0];
                        if(roadPoint === 'Count'){
                            var roadData = array[2].split(':')[1];
                            var roadMap  = roadData.split('$');
                            var setArray = this.global.RoadMapData;
                            var setArray2 = this.global.RoadMapData2;
                            if(this.global.newgame === true){
                                this.global.newgame = false;
                                roadMap.forEach((val, i) => {
                                    var types = this.typeofwinner(val.split('|')[1]);
                                    var datas = {
                                        gameNo : val.split('|')[0],
                                        type   : types,
                                        score  : val.split('|')[4]
                                    }
                                    setArray.push(datas);
                                    if(this.setting.tieFocus === false){
                                        if(datas.type != 't'){
                                            setArray2.push(datas);
                                        }
                                    }else{
                                        setArray2.push(datas);
                                    }
                                })
                                var promise1 = new Promise((resolve, reject) => {
                                    var returns = this.renderFx(setArray);
                                    resolve(returns);
                                });

                                promise1.then(value => {
                                    if(value.status === true){
                                        return this.checkValueFormular(setArray2);
                                    }else{
                                        return {status: false};
                                    }
                                }).then(value => {
                                    var nextbet = this.$refs.nextbet;
                                    if(value.status === true){
                                        this.global.letin = value.data;
                                        if(value.data === 'p'){
                                            document.getElementById("nextbet").innerHTML = 'ตานี่แทงผู้เล่น';
                                            this.$nextTick(() => {
                                                nextbet.className='badge badge-primary';
                                            })
                                        }else{
                                            document.getElementById("nextbet").innerHTML = 'ตานี่แทงเจ้ามือ';
                                            this.$nextTick(() => {
                                                nextbet.className='badge badge-danger';
                                            })
                                        }
                                        return {status: true};
                                    }else{
                                        this.global.letin = false;
                                        document.getElementById("nextbet").innerHTML = 'ยังไม่มีสูตรเข้า';
                                            this.$nextTick(() => {
                                            nextbet.className='badge badge-dark';
                                        })
                                        return {status: true};
                                    }
                                }).then((value) => {
                                    if(value.status === true){
                                        console.log(setArray.length+' & '+this.setting.maxPlay)
                                        if(setArray.length >= this.setting.maxPlay){
                                            this.sendLogs('serverlogs','ห้องนี้มีจำนวนเกมส์มากกว่าที่คุณตั้งไว้ กรุณาเปลี่ยนห้อง');
                                            this.notify('ห้องนี้มีจำนวนเกมส์มากกว่าที่คุณตั้งไว้ กรุณาเปลี่ยนห้อง','danger');
                                            this.sender.status = false;
                                            this.closeconnect();
                                            setTimeout(() => {
                                                this.$router.push('../Auto');
                                            },3000)
                                        }
                                    }
                                });
                            }
                        } else if (array[0] === '$LR') {
                            this.profile.money = parseFloat(array[1].split('|')[2]);
                            this.sendLogs('ailogs','ยอดเงินคงเหลือจากระบบ : '+this.profile.money)
                            this.setMoney();
                        } else if (array[0] === '$br') {
                            var betmoney = array[1].split('$')[1];
                            var betconfirm = array[1].split(':')[1].split('$')[0];
                            var betbranch = array[1].split(':')[0];

                            function bb_(str) {
                                if (str === 'P') {
                                    return 'ผู้เล่น';
                                } else {
                                    return 'เจ้ามือ';
                                }
                            }
                            if (parseFloat(betconfirm) === 1) {
                                var nowbet = betmoney;
                                document.getElementById("nowbet").innerHTML = this.profile.money;
                                this.aiBet.status = true;
                                if (betbranch === 'P') {
                                    this.sendLogs('ailogs',"เดิมพัน : " + bb_(betbranch) + " " + betmoney + " บาท");
                                } else {
                                    this.sendLogs('ailogs',"เดิมพัน : " + bb_(betbranch) + " " + betmoney + " บาท");
                                }
                                var showmoney = this.profile.money;
                                var cals = parseFloat(showmoney) - parseFloat(betmoney);
                                this.profile.money = cals;
                                document.getElementById("nowbet").innerHTML = betmoney;
                                this.setMoney();
                            }else{
                                this.sendLogs('ailogs','เดิมพันผิดพลาดกรุณาลองอีกครั้ง')
                            }

                        } else if (array[0] === '$LT') {
                            this.profile.minbet = parseFloat(array[1].split('|')[0].split(':')[1])
                            this.profile.maxbet = parseFloat(array[1].split('|')[1].split(':')[1]);
                        } else if(array[0] === '$W'){
                            //this.aiBet.status = false;
                            if(array[1].split(':')[1] != undefined){
                                var winlose = array[1].split(':')[1];
                                this.profile.money = parseFloat(winlose)+parseFloat(this.profile.money)
                                this.sendLogs('ailogs','ยอดเงินคงเหลือ : '+this.profile.money+' (+'+parseFloat(winlose)+')');
                                this.setMoney();
                            }

                        }
                    }
                }
            }
            this.socket.onclose = () => {
                console.log('closed connection room service');
            }
        
        },
        disconnect() {
            this.closeconnect();
        },
        setMoney(){
            document.getElementById("profilemoney").innerHTML = this.profile.money;
        },
        genCard(pointer,data) {
            if(pointer === 1){
                this.card1 = namecard(data);
            }else if(pointer === 2){
                this.card2 = namecard(data);
            }else if(pointer === 3){
                this.card3 = namecard(data);
            }else if(pointer === 4){
                this.card4 = namecard(data);
            }else if(pointer === 5){
                this.card5 = namecard(data);
            }else if(pointer === 6){
                this.card6 = namecard(data);
            }
            function namecard(str) {
                if(str != '' && str != undefined){
                    if (str[0] === '1') {
                        var card = excard(str[1]) + 'h';
                    }
                    if (str[0] === '2') {
                        var card = excard(str[1]) + 's';
                    }
                    if (str[0] === '3') {
                        var card = excard(str[1]) + 'd';
                    }
                    if (str[0] === '4') {
                        var card = excard(str[1]) + 'c';
                    }
                }else{
                    var card = 'cardp';
                }
                return card.toLowerCase();
            }
            function excard(str) {
                if (str === 'A') {
                    return '10';
                } else if (str === '1') {
                    return 'A';
                } else {
                    return str;
                }
            }
        },
        bet(str,score) {
            const block = this.$refs.blocks[this.count];
            if(this.count < 60){
                this.$nextTick(() => {
                    //block.innerHTML=score;
                    block.className='item ' +str;
                    this.count = this.count+1;
                })
            }

        },
        getid (n, index, length) {
            return n + index + length
        },
        renderFx(str){
            this.renderTable(str);
            if(str.length > 3){
                var returns = {
                    status: true,
                    data: str
                };
            }else{
                var returns = {
                    status: false
                }
            }
            return returns;
        },
        renderTable(str){
            if(str[0] != undefined){
                str.forEach((val, i) => {
                    setTimeout(() => {
                        this.bet(val.type.toString(),val.score.toString());
                    },i*0)
                })
            }
        },
        checkValueFormular(str){
            if(str.length > 3){
                var val1 = str[str.length-4].type;
                var val2 = str[str.length-3].type;
                var val3 = str[str.length-2].type;
                var val4 = str[str.length-1].type;
                var checkval = val1+','+val2+','+val3+','+val4;
                var fx = this.fx;
                if(this.global.double === 0){
                    if(fx[checkval] != undefined){
                        var returns = {status: true , data: fx[checkval]};
                    }else{
                        var returns = {status: false , data: checkval};
                    }
                    return returns;
                }else{
                    if(this.setting.dynamic === true){
                        if(fx[checkval] != undefined){
                            var returns = {status: true , data: fx[checkval]};
                        }else{
                            var returns = {status: false , data: checkval};
                        }
                        return returns;
                    }else{
                        var returns = {status: true , data: this.global.letin};
                        return returns;
                    }
                }
            }else{
                return {status: false , data: 'length < 3'};
            }
        },
        checkFxResp(data){
            if(this.global.letin != false){
                if(data.type === this.global.letin){
                    this.global.wincount++;
                    document.getElementById("wincount").innerHTML = this.global.wincount;
                    this.sendLogs('ailogs','สูตรชนะ');
                    this.global.double = 0;
                    document.getElementById("double").innerHTML = this.global.double;
                    return {status: true, msg: 'type == letin && win'};
                }else{
                    if(data.type != 't'){
                        if(parseFloat(this.global.double) === parseFloat(this.setting.double)){
                            this.global.losecount++;
                            document.getElementById("losecount").innerHTML = this.global.losecount;
                            this.sendLogs('ailogs','สูตรแพ้');
                            this.global.double = 0;
                            document.getElementById("double").innerHTML = this.global.double;
                            return {status: true, msg: 'type != letin && lose'};
                        }else{
                            this.global.double++;
                            document.getElementById("double").innerHTML = this.global.double;
                            this.sendLogs('ailogs','ทบเงินเพิ่ม');
                            return {status: true, msg: 'double money'};
                        }
                    }else{
                        return {status: true, msg: 'tie game | continue..'};
                    }
                }
            }else{
                return {status: true, msg: 'letin false'};
            }
        },
        typeofwinner(str){
            if(str === '1'){
                var types = 'p';
            }else if(str === '2'){
                var types = 'b';
            }else{
                var types = 't';
            }
            return types;
        }
    }
}
</script>

<style scope>
    .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
        color: #fefefe !important;
        background-color: #ff0039 !important;
        border-color: #222 !important;
    }
    .list-group-item {
        background: #222 !important;
        color: #FFF !important;
    }
    .nav-tabs .nav-link {
        background: #333 !important;
        border: 1px solid #333 !important;
        color: #FFF !important;
    }
    .nav-tabs {
        border-bottom: 1px solid #222 !important;
    }
    .nav{
        background: #333 !important;
    }
    #ailogs,#serverlogs{
        padding-left: 5%;
        font-size:12px;
    }
    .card-body{
        padding:0px !important;
    }
    .card{
        background: #000;
        color:#000;
    }
    .t{
        background-color: #3FB618;
    }
    .p{
        background-color: #2780E3;
    }
    .b{
        background-color: #FF0039;
    }
    #control{
        width: 500px;
        height: 50px;
        margin: auto;
    }
    #player{
        float: left;
        background-color:#000066;
        width: 200px;
        height: 50px;
    }
    #tie{
        float: left;
        background-color:#006600;
        width: 100px;
        height: 50px;
    }
    #banker{
        float: left;
        background-color:#660000;
        width: 200px;
        height: 50px;
    }
    .item{
        text-align: center;
        color:#FFF;
        margin: 5px;
    }
    body{
        background-color:#222;
        margin: 0px;
    }
</style>