<template>
    <v-app>
        <v-container>
            <v-layout>
                <v-flex md1 xs1 v-for="(n, x) in rows" :key="x">
                    <div v-bind:style="{ height: height + 'px' }" v-for="(m, index) in items" :id="getid(n, index, rows.length)" :key="index" ref="blocks" class="item" :class="[classobj]" replace="true">
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex md12 xs12>
                    <v-layout row>
                        <v-flex md6 xs6>
                            <v-btn
                            block
                            color="info"
                            ><span id="scoreplayer"></span> แต้ม</v-btn>
                        </v-flex>
                        <v-flex md6 xs6>
                            <v-btn
                            block
                            color="error"
                            ><span id="scorebanker"></span> แต้ม</v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex md12 xs12>
                            <v-layout row class="grey">
                                <v-flex md2 xs2 id="card1" class="card">
                                    <img v-bind:src="require(`../assets/card/${card1}.png`)" width="80%">
                                </v-flex>
                                <v-flex md2 xs2 id="card2" class="card">
                                    <img v-bind:src="require(`../assets/card/${card2}.png`)" width="80%">
                                </v-flex>
                                <v-flex md2 xs2 id="card3" class="card">
                                    <img v-bind:src="require(`../assets/card/${card3}.png`)" width="80%">
                                </v-flex>
                                <v-flex md2 xs2 id="card4" class="card">
                                    <img v-bind:src="require(`../assets/card/${card4}.png`)" width="80%">
                                </v-flex>
                                <v-flex md2 xs2 id="card5" class="card">
                                    <img v-bind:src="require(`../assets/card/${card5}.png`)" width="80%">
                                </v-flex>
                                <v-flex md2 xs2 id="card6" class="card">
                                    <img v-bind:src="require(`../assets/card/${card6}.png`)" width="80%">
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex md3 xs3 >
                            <v-btn block color="error" dark large>
                                {{ $route.params.home }} {{roomStats.time}} วินาที
                            </v-btn>
                        </v-flex>
                        <v-flex md6 xs6>
                            <v-btn block color="black" dark large>
                                คำสั่งแทง : <span id="nextbet"> รอผล</span>
                            </v-btn>
                        </v-flex>
                        <v-flex md3 xs3>
                            <v-btn block color="secondary"  dark large>
                                <span id="winner">รอ</span>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex md3 xs3>
                            <v-btn block color="success" dark>ชนะ [<span id="wincount">0</span>]</v-btn>
                        </v-flex>
                        <v-flex md6 xs6>
                            <v-btn block color="purple" dark>ทบ [<span id="double">0</span>]</v-btn>
                        </v-flex>
                        <v-flex md3 xs3>
                            <v-btn block color="red" dark>แพ้ [<span id="losecount">0</span>] </v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex md12 xs12>
                            <v-btn block color="secondary" dark>สถานะห้อง : <span id="roomstatus">รอ</span></v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
              <v-layout row>
                        <v-flex md12 xs12>
                            <v-btn block dark>ห้อง : <span id="roomstatus">{{roomid}}</span></v-btn>
                        </v-flex>
                    </v-layout>
        </v-container>
    </v-app>
</template>

<script>
/* eslint-disable */
import {sync} from 'vuex-pathify'
export default {
    name:'app-room',
    computed: {
    roomid: sync('roomid'),
    },
    data() {
        return {
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
                status: true,
                multiprofile: 'L0,Ahma888,AE614C557843B1DF326CB29C57225459,Web,184.22.111.152',
                profile: '!login,Ahma888,AE614C557843B1DF326CB29C57225459,Web,1,184.22.111.152,H1,WebH5',
                multionline: 'L9,9999',
                online: '9999',
                RoadMap: '!road,Ahma888',
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
                rate: 2,
                minbet: false,
                maxbet: false,
                money: false,
                bet: 50,
            }
        }
    },
    beforeCreate: function() {
        
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    created() {
        
        window.addEventListener('beforeunload', this.handler)
        
        this.sender.currentRoom =   this.$store.get('roomid')//this.roomid;// this.$route.params.home;
        this.sender.url = "wss://mobilegs"+this.sender.currentRoom+".bacc6666.com";
        this.connect();
        this.multiconnect();
    },
    methods: {
        beforePageDestroyed: function (event) {
            this.socket.send('!close');
        },
        refresh () {
            this.socket.send('!close');
            this.socket.close();
            //this.$session.destroy()
        },
        logout() {
            this.socket.send('!close');
            this.socket.close();
            this.$session.destroy()
            this.$router.push('/')
        },
        multiconnect() {
            this.multisocket = new WebSocket(this.sender.multiurl);
            this.multisocket.onopen = () => {
                this.multisocket.send(this.sender.multiprofile);
                setInterval(() => {
                    this.multisocket.send(this.sender.multionline);
                },5000)
            };
            this.multisocket.onmessage = ({data}) => {
                var array = data.split('|');
                if(m_array[0] === '$New' && m_array[1] === 'Bacc'){
                    var currentRoom = this.sender.currentRoom;
                    var cRoom = currentRoom.toUpperCase();
                    if(array[2] === cRoom){
                        var status = m_array[3].split(':')[1];
                        this.roomStats.status = status.toString();
                        if(status.toString() === '4'){
                            console.log('ห้องนี้อยู่ในช่วงเวลาพักครึ่ง')
                        }
                    }
                }else{
                    console.log(array);
                }
                
            }
        
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
                                    setTimeout(() => {
                                            this.socket.send('!b,'+letinpointer+':'+this.profile.maxbet);
                                    },5000)
                                }else{
                                    setTimeout(() => {
                                            this.socket.send('!b,'+letinpointer+':'+betbalance);
                                    },5000)
                                }
                            }else{
                                console.log('เดิมพันผิดพลาด : ยอดเงินคงเหลือไม่พอสำหรับเดิมพัน');
                            }
                        }else{
                            console.log('เดิมพันผิดพลาด : ไม่มีสูตรเข้าในตอนนี้');
                        }
                    }else{
                        console.log('เดิมพันผิดพลาด : พบการเปิดไพ่');
                    }
                }else{
                    console.log('เดิมพันผิดพลาด : มีการเดิมพันอยู่ในระบบ');
                }
            }else{
                var global = {
                    roomStatus: this.roomStats.status,
                    profilemoney: this.profile.money,
                    profilemaxbet: this.profile.maxbet
                }
                console.log(global);
            }
        },
        connect(renew=false) {
            this.socket = new WebSocket(this.sender.url);
            this.socket.onopen = () => {
               
                this.socket.send(this.sender.profile);
                this.socket.send(this.sender.RoadMap);
                setInterval(() => {
                    if(this.sender.status === true){
                        this.socket.send(this.sender.online);
                    }
                },1000)
                setInterval(() => {
                    this.$nextTick(() => {
                        this.height = this.$refs.blocks[0].clientWidth;
                    });
                },250)
            };
            this.socket.onmessage = ({data}) => {
                var array = data.split(',');
                if (array[1] === '-1||0|0') {
                    var errorlog = {
                        status: false,
                        msg: 'เข้าสู่ระบบผิดพลาด กรุณาลองใหม่อีกครั้ง'
                    }
                    console.log(errorlog);
                    this.sender.status = false;
                    this.socket.send("!close");
                } else if (array[1] === '-4||0|0') {
                    var errorlog = {
                        status: false,
                        msg: 'ตรวจพบการออนไลน์ รหัสใช้งานนี้กำลังออนไลน์อยู่ในอุปกรณ์อื่น'
                    }
                    console.log(errorlog);
                    this.sender.status = false;
                    this.socket.send("!close");
                } else if (array[1] === '-8||0|0') {
                    var errorlog = {
                        status: false,
                        msg: 'บัญชีของคุณถูกล็อคกรุณาติดต่อเอเย่น'
                    }
                    console.log(errorlog);
                    this.sender.status = false;
                    this.socket.send("!close");
                } else if (array[1] === '-7||0|0') {
                    var errorlog = {
                        status: false,
                        msg: 'บัญชีของคุณถูกหยุดใช้'
                    }
                    console.log(errorlog);
                    this.sender.status = false;
                    this.socket.send("!close");
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
                            if (array[15] === '1' && array[12] != 4) {
                                var response_score = array[10];
                                document.getElementById("winner").innerHTML = 'ผู้เล่นชนะ';
                            }
                            if (array[15] === '2' && array[12] != 4) {
                                var response_score = array[9];
                                document.getElementById("winner").innerHTML = 'เจ้ามือชนะ';
                            }
                            if (array[15] === '3' && array[12] != 4) {
                                var response_score = array[10];
                                document.getElementById("winner").innerHTML = 'เสมอชนะ';
                            }
                            var setArray = this.global.RoadMapData;
                            var setArray2 = this.global.RoadMapData2;
                            var datas = {
                                gameNo : array[2],
                                type   : this.typeofwinner(array[15]),
                                score  : response_score
                            }

                            var promise1 = new Promise((resolve, reject) => {
                                this.bet(datas.type);
                                resolve({status: true});
                            });

                            promise1.then(value => {
                                if(value.status === true){
                                    setArray.push(datas);
                                    if(datas.type != 't'){
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
                                if(value.status === true){
                                    this.global.letin = value.data;
                                    document.getElementById("nextbet").innerHTML = value.data;
                                    return {status: true};
                                }else{
                                    this.global.letin = false;
                                    document.getElementById("nextbet").innerHTML = 'รอ';
                                    return {status: true};
                                }
                            }).then(value => {
                                if(value.status === true){
                                    setTimeout(() => {
                                        this.sendBet();
                                    },10000)
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
                                    if(datas.type != 't'){
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
                                    if(value.status === true){
                                        this.global.letin = value.data;
                                        document.getElementById("nextbet").innerHTML = value.data;
                                        return {status: true};
                                    }else{
                                        this.global.letin = false;
                                        document.getElementById("nextbet").innerHTML = 'รอ';
                                        return {status: true};
                                    }
                                }).then(value => {
                                    /*console.log('sendbet resp count')
                                    if(value.status === true){
                                        setTimeout(() => {
                                            this.sendBet();
                                        },10000)
                                    }*/
                                });
                            }
                        } else if (array[0] === '$LR') {
                            this.profile.money = parseFloat(array[1].split('|')[2]);
                            console.log('ยอดเงินคงเหลือจากระบบ : '+this.profile.money)
                        } else if (array[0] === '$br') {
                            console.log(array);
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
                                this.aiBet.status = true;
                                if (betbranch === 'P') {
                                    console.log("เดิมพัน : " + bb_(betbranch) + " " + betmoney + " บาท");
                                } else {
                                    console.log("เดิมพัน : " + bb_(betbranch) + " " + betmoney + " บาท");
                                }
                                var showmoney = this.profile.money;
                                var cals = parseFloat(showmoney) - parseFloat(betmoney);
                                this.profile.money = cals;
                                console.log('ยอดเงินคงเหลือหลังจากแทง : '+cals+' :: ['+parseFloat(showmoney)+' - '+parseFloat(betmoney)+']');
                            }else{
                                console.log('เดิมพันผิดพลาดกรุณาลองอีกครั้ง')
                            }

                        } else if (array[0] === '$LT') {
                            this.profile.minbet = parseFloat(array[1].split('|')[0].split(':')[1])
                            this.profile.maxbet = parseFloat(array[1].split('|')[1].split(':')[1]);
                        } else if(array[0] === '$W'){
                            this.aiBet.status = false;
                            console.log(array);
                            if(array[1].split(':')[1] != undefined){
                                var winlose = array[1].split(':')[1];
                                this.profile.money = parseFloat(winlose)+parseFloat(this.profile.money)
                                console.log('ยอดเงินคงเหลือ : '+this.profile.money)
                            }
                            /*this.socket.send(this.sender.RoadMap)*/
                        }
                    }
                }
            }
        
        },
        disconnect() {
            this.socket.send('!close');
            this.socket.close();
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
        bet(str) {
            const block = this.$refs.blocks[this.count];
            if(this.count < 60){
                this.$nextTick(() => {
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
            str.forEach((val, i) => {
                setTimeout(() => {
                    this.bet(val.type.toString());
                },i*0)
            })
        },
        checkValueFormular(str){
            
            if(str.length > 3){
                var val1 = str[str.length-4].type;
                var val2 = str[str.length-3].type;
                var val3 = str[str.length-2].type;
                var val4 = str[str.length-1].type;
                var checkval = val1+','+val2+','+val3+','+val4;
                var fx = {
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
                    'p,p,p,b':'p',
                    'b,b,b,p':'b',
                }
                if(fx[checkval] != undefined){
                    var returns = {status: true , data: fx[checkval]};
                    console.log('สูตรเข้า : ต่อไปให้แทง => '+fx[checkval])
                }else{
                    var returns = {status: false , data: checkval};
                    console.log('ยังไม่มีสูตรเข้าในตอนนี้ : pattern => '+checkval)
                }
                return returns;
            }else{
                return {status: false , data: 'length < 3'};
            }
        },
        checkFxResp(data){
            if(this.global.letin != false){
                if(data.type === this.global.letin){
                    this.global.wincount++;
                    document.getElementById("wincount").innerHTML = this.global.wincount;
                    document.getElementById("roomstatus").innerHTML = 'สูตรชนะ';
                    this.global.double = 0;
                    document.getElementById("double").innerHTML = this.global.double;
                    return {status: true, msg: 'type == letin && win'};
                }else{
                    if(this.global.double === 4){
                        this.global.losecount++;
                        document.getElementById("losecount").innerHTML = this.global.losecount;
                        document.getElementById("roomstatus").innerHTML = 'สูตรแพ้';
                        this.global.double = 0;
                        document.getElementById("double").innerHTML = this.global.double;
                        return {status: true, msg: 'type != letin && lose'};
                    }else{
                        if(data.type != 't'){
                            this.global.double++;
                            document.getElementById("double").innerHTML = this.global.double;
                            document.getElementById("roomstatus").innerHTML = 'ทบเงินเพิ่ม';
                            console.log('ทบเงินเพิ่ม');
                            return {status: true, msg: 'type != letin && double'};
                        }else{
                            return {status: true, msg: 'tie game | continue..'};
                        }
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

<style>
    body{
        background-color:#333;
    }
    .card{
        background:#FFF;
        color:#000;
    }
    .t{
        background-color: #006600;
    }
    .p{
        background-color: #000066;
    }
    .b{
        background-color: #660000;
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
        border-radius: 20%;
        margin: 5px;
    }
    body{
        margin: 0px;
    }
</style>