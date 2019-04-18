/**
 * 创建者 伟大的周鹏斌大王 on 2017/6/19.
 * 丹阳特有-不用合并
 */
class Web_socket_service extends Base_service_model{
    protected game_url:string="";//游戏地址ws://192.168.1.120:8205
    protected wsw_sole_main_id=0;/*唯一的大接口id*/
    protected wsw_sole_action_id=1;/*唯一的动作（系统出牌，玩家出牌，玩家吃碰杠胡操作）*/
    protected loopSendInfoTimer={};//循环发送数据
    public constructor() {
        super();
        this.qingzhi_jie_san_room();
    }
    /*------------------------数据接口------------------------------------*/
    /*连接socket*/
    //zpb:4号机先行版 _is_mandatory_cut_url 强行切换链接 未来一个游戏需要多台服务器连接 需要根据需求进行临时跳转新的链接
    public startConnect(_is_mandatory_cut_url=false,game_url=null){
        if(game_url){//正式
            //zpb:实时更新连接
            this.game_url=game_url;//游戏地址
            this.connection(this.game_url,_is_mandatory_cut_url);
        }else{//测试
            if(this.CONST.version_type=="demo"){
                this._is_open_stand_alone=true;
                this.onSocketOpen();
            }
        }
    }
    //zpb:4号机器 获取服务器对通信字段编码定义
    public get_fields_analysis(){
        if(this.CONST.version_type!="release"){
            MyConsole.getInstance().trace("四号机:获取服务器对通信字段编码定义");
            this.sendData({
                interfaceId:this.PORT.CONFIG.fields_analysis.interfaceId,
            },true);
        }else{
            //正式版本 直接返回数据
            // this.route_model.set_fields_analysis(Route_model.DATA);
            this.m_to_c_dis_event(this.PORT.SOCKET_DATA_EVENT+this.PORT.CONFIG.fields_analysis.interfaceId);//数据广播出去
        }

    }
    /*主动获取大接口数据*/
    public main_info(openId,cId=null,_isLoading=false){
        this.sendData({
            interfaceId:this.PORT.CONFIG.mainInfo.interfaceId,
            openId:openId,cId:cId
        },_isLoading);//,userId:userId
    }
    /*发送同意 用户协议*/
    public send_user_agreement_hyh(userId){
        this.sendData({
            interfaceId:this.PORT.CONFIG.hall_consentUA.interfaceId,
            "userId":userId
        },false);
    }
    /*主动获取战绩数据*/
    public get_achievement_info_hyh(openId,page_num=null){
        this.sendData({
            interfaceId:this.PORT.CONFIG.hall_achievement.interfaceId,
            "userId":openId,"page":page_num
        },false);
    }

    /*主动发送创建房间信息*/
    public set_create_room(data){
        data["interfaceId"] = this.PORT.CONFIG.hall_createRoom.interfaceId;
        this.sendData(data,false);
    }
    /*主动发送加入房间信息*/
    public join_room(info){
        var data={};
        data["interfaceId"] = this.PORT.CONFIG.hall_joinRoom.interfaceId;
        data["userId"] = info.userId;
        data["roomId"] = info.roomId;
        this.sendData(data,false);
    }
    //获取房间回放记录列表
    public get_room_play_back_list(data){
        this.sendData({
            interfaceId:this.PORT.CONFIG.hall_roomPlaybackList.interfaceId,
            roomId:data.roomId,
            createTime:data.createTime
        },true);
    }

    //主动获取代开房间列表信息
    public get_issue_replace(openId,page_num=null){
        this.sendData({
            interfaceId:this.PORT.CONFIG.hall_currentReplaceRoom.interfaceId,
            "userId":openId
        },false);
    }

    //主动获取代开房间历史信息
    public get_history_replace(openId,page_num=null){
        this.sendData({
            interfaceId:this.PORT.CONFIG.hall_historyReplaceRoom.interfaceId,
            "userId":openId,"page":page_num
        },false);
    }
    public delete_user(data){
        this.sendData({
            interfaceId:this.PORT.CONFIG.hall_deleteUser.interfaceId,
            "userId":data.userId,"roomId":data.roomId
        },false);
    }
    public delete_room(data){
        this.sendData({
            interfaceId:this.PORT.CONFIG.hall_dissolveReplaceRoom.interfaceId,
            "roomId":data.roomId
        },false);
    }
    //强制解散代开房间
    public order_delete_room(data){
        MyConsole.getInstance().trace("---------发起--------------强制解散代开房间",888888);
        data.interfaceId = this.PORT.CONFIG.hall_orderDissolveReplaceRoom.interfaceId;
        if(this.game_url){
            this.sendData(data,false);
        }
    }
    //获取战绩
    public send_record_bogus_info(data){
        data.interfaceId = this.PORT.CONFIG.record_bogus_info.interfaceId;
        this.sendData(data,false);
    }

    //大厅-获取战绩历史
    public send_issue_history_info(data){
        data.interfaceId = this.PORT.CONFIG.issue_history_info.interfaceId;
        this.sendData(data,false);
    }
    //----------------------------俱乐部-----------------------
    //我的俱乐部列表
    public get_club_my_list(data){
        data.interfaceId = this.PORT.CONFIG.club_my_list.interfaceId;
        if(this.game_url){
            MyConsole.getInstance().trace("---------发起--------------我的俱乐部列表",888888);
            this.sendData(data,false);
        }else{
            this.sendData(data,false);
        }
    }
    //俱乐部详情
    public get_club_info(data){
        data.interfaceId = this.PORT.CONFIG.club_info.interfaceId;
        if(this.game_url){
            MyConsole.getInstance().trace("---------发起--------------俱乐部详情",888888);
            this.sendData(data,false);
        }else{
            this.sendData(data,false);
        }
    }
    //俱乐部申请加入前查询500001
    public club_request_join_before(data){
        data.interfaceId = this.PORT.CONFIG.club_request_join_before.interfaceId;
        if(this.game_url){
            MyConsole.getInstance().trace("---------发起--------------俱乐部申请加入",888888);
            this.sendData(data,false);
        }else{
            this.sendData(data,false);
        }
    }
    //俱乐部申请加入
    public club_request_join(data){
        data.interfaceId = this.PORT.CONFIG.club_request_join.interfaceId;
        if(this.game_url){
            MyConsole.getInstance().trace("---------发起--------------俱乐部申请加入",888888);
            this.sendData(data,false);
        }else{
            this.sendData(data,false);
        }
    }
    //俱乐部申请离开
    public club_request_leave(data){
        data.interfaceId = this.PORT.CONFIG.club_request_leave.interfaceId;
        if(this.game_url){
            MyConsole.getInstance().trace("---------发起--------------俱乐部申请离开",888888);
            this.sendData(data,false);
        }else{
            this.sendData(data,false);
        }
    }
    //俱乐部我的战绩信息
    public club_get_my_info(data){
        data.interfaceId = this.PORT.CONFIG.club_get_my_info.interfaceId;
        if(this.game_url){
            MyConsole.getInstance().trace("---------发起--------------俱乐部我的战绩信息",888888);
            this.sendData(data,false);
        }else{
            this.sendData(data,false);
        }
    }
    //俱乐部加入房间
    public club_join_room(data){
        data.interfaceId = this.PORT.CONFIG.club_join_room.interfaceId;
        if(this.game_url){
            MyConsole.getInstance().trace("---------发起--------------俱乐部加入房间",888888);
            this.sendData(data,false);
        }else{
            this.sendData(data,false);
        }
    }
    //俱乐部创建房间
    public club_create_room(data){
        data.interfaceId = this.PORT.CONFIG.club_create_room.interfaceId;
        if(this.game_url){
            MyConsole.getInstance().trace("---------发起--------------俱乐部创建房间",888888);
            this.sendData(data,false);
        }else{
            this.sendData(data,false);
        }
    }
    //获取俱乐部-战绩
    public send_club_history_info(data){
        data.interfaceId = this.PORT.CONFIG.club_history_info.interfaceId;
        this.sendData(data,false);
    }
    //----------------------------游戏-----------------------
    /*tyq: 发起小结算*/
    public small_settlement(data){
        data.interfaceId = this.PORT.CONFIG.game_smallSettlement.interfaceId;
        this.sendData(data,true);
    }
    /*tyq: 发起大结算*/
    public big_settlement(data){
        data.interfaceId = this.PORT.CONFIG.game_bigSettlement.interfaceId;
        this.sendData(data,true);
    }
    /*tyq: 小结算准备*/
    public small_settle_prepare(data){
        data.interfaceId = this.PORT.CONFIG.game_settlementWaitOk.interfaceId;
        this.sendData(data);
    }
    /*tyq: 执行动作*/
    public execute_action(data){
        data.interfaceId = this.PORT.CONFIG.game_executeAction.interfaceId;
        data.wsw_sole_action_id = this.wsw_sole_action_id;
        this.sendData(data);
    }
    /*tyq: 发起解散房间*/
    public sponsorDissolveRoom(data){
        data.interfaceId = this.PORT.CONFIG.game_dissolveRoom.interfaceId;
        this.sendData(data,true);
    }
    /*tyq: 同意/拒绝 解散房间操作*/
    public dissolveRoomOperation(data){
        data.interfaceId = this.PORT.CONFIG.game_dissolveRoomAgree.interfaceId;
        this.sendData(data,true);
    }
    /*tyq: 退出房间*/
    public quit_room(data){
        data.interfaceId = this.PORT.CONFIG.game_quitRoom.interfaceId;
        this.sendData(data,true);
    }
    /*tyq: 发送表情文字语音*/
    public sendChatInfo(data){
        data.interfaceId = this.PORT.CONFIG.game_chatAni.interfaceId;
        this.sendData(data,false);
    }
    //发送定位信息
    public send_position_info(data){
        data.interfaceId = this.PORT.CONFIG.positioning.interfaceId;
        this.sendData(data,false);
    }
    //获取定位信息
    public get_position_info(data){
        data.interfaceId = this.PORT.CONFIG.get_position_info.interfaceId;
        this.sendData(data,false);
    }
    /*-----------------------需要循环发送的接口-----------------------------*/
    public loopSend(data,_isLoading,time=2500,title=""){
        function send(){
            MyConsole.getInstance().trace("------循环刷新--"+title,888888);
            self.sendData(data,_isLoading);
        }
        MyConsole.getInstance().trace("------是否暂停中--"+this.CONST.PLAYBACK_PAUSE,888888);
        if(this.CONST.PLAYBACK_PAUSE){
            this.CONST.PLAYBACK_PAUSE = false;
            return ;
        }
        if(!this.CONST.PLAYBACK_MODEL){
            var self=this;          //保险起见先清理一次
            this.clearLoopSend(data.interfaceId);
            //持续发送
            this.loopSendInfoTimer[data.interfaceId]=setInterval(send,time);
            send();
        }else{
            //回放模式下数据拦截 2.1.4
            MyConsole.getInstance().trace("回放模式下数据-》拦截 2.1.4");
            this.playbackModelSendData(data);
        }

    }
    /*-----------------------转化新的ip和端口并且重新连接-----------------------------*/
    public skip_new_ip(){

    }
    /*清理循环发送接口*/
    protected clearLoopSend(interfaceId){
        if(this.loopSendInfoTimer[interfaceId]){
            clearInterval(this.loopSendInfoTimer[interfaceId]);
            this.loopSendInfoTimer[interfaceId]=null;
        }
    }
    /*清理全部循环发送接口*/
    protected clearAllLoopSend(){
        for(var i in this.loopSendInfoTimer){
            this.clearLoopSend(i);
        }
        this.loopSendInfoTimer=[];
    }
    /*-------------------------------------------------------*/
    /*接收消息查询*/
    protected selectSendInfoTips(data,interfaceId=null){
        if(!interfaceId)interfaceId=Number(data["interfaceId"]);
        if(interfaceId){
            for(var i in this.PORT.CONFIG){
                if(Number(this.PORT.CONFIG[i].interfaceId)==interfaceId){
                    MyConsole.getInstance().trace("<---收到服务器-"+this.cSocketUrl+"-v:"+this.CONST.SERVICE_VERSION+"   ["+this.PORT.CONFIG[i].tips+"]  --->",interfaceId);
                    break;
                }
            }
            MyConsole.getInstance().trace(data,interfaceId);//打印日志
        }
    }
    /*获取到数据*/
    protected onReceiveMessageOk(info,interfaceId){
        if(!this.CONST.PLAYBACK_MODEL){//回放模式下不接收任何数据 2.1.4
            //处理数据 广播后端信息
            this.radioServiceInfo(interfaceId,info);
        }
    }
    /*广播后端信息*/
    protected linshiMainInfo:any={};
    protected mainNum=0;
    protected radioServiceInfo(interfaceId,info){
        for(var i in this.PORT.CONFIG){
            if(Number(this.PORT.CONFIG[i].interfaceId)==Number(interfaceId)){
                var _isEvent=false;
                /*唯一id处理*/
                switch(this.PORT.CONFIG[i].interfaceId){
                    case this.PORT.CONFIG.mainInfo.interfaceId://大接口
                        for(var name in info){
                            this.linshiMainInfo[name]=info[name];
                        }
                        //清理全部循环动作
                        this.clearAllLoopSend();
                        /*凑齐3种数据在推送大接口*/
                        //tyq: 新版处理大接口
                        if(this.linshiMainInfo.currentUser && this.linshiMainInfo.currentUser.playStatus == this.CONST.USER_PLAY_STATUS.HALL){
                            //打印数据
                            this.selectSendInfoTips(this.linshiMainInfo,this.PORT.CONFIG.mainInfo.interfaceId);
                            //大厅
                            _isEvent=true;
                            info=this.linshiMainInfo;
                            this.linshiMainInfo={};
                            // this.wsw_sole_main_id=this.wsw_sole_action_id=1;
                            //测试数据
                            this.test_mainPortNum();
                        }else if(this.linshiMainInfo.roomInfo&&this.linshiMainInfo.currentUser&&this.linshiMainInfo.anotherUsers){
                            //游戏
                            if(!this.wsw_sole_main_id||(info.wsw_sole_main_id>=this.wsw_sole_main_id)){
                                //打印数据
                                this.selectSendInfoTips(this.linshiMainInfo,this.PORT.CONFIG.mainInfo.interfaceId);
                                _isEvent=true;
                                info=this.linshiMainInfo;
                                this.linshiMainInfo={};
                                // if(info.wsw_sole_main_id)this.wsw_sole_main_id=info.wsw_sole_main_id;//更新id
                                if(info.wsw_sole_action_id)this.wsw_sole_action_id=info.wsw_sole_action_id;
                                this.mainNum++;
                                //测试数据
                                this.test_mainPortNum();
                            }else{
                                MyConsole.getInstance().trace("  大接口id不符:当前id="+this.wsw_sole_main_id+"  服务器："+info.wsw_sole_main_id,"custom1");
                            }
                        }
                        break;
                    
                    case this.PORT.CONFIG.getSystemCard.interfaceId://zpb测试获取系统牌
                        if(egret["AH_systemSendCard"]){
                            egret["AH_systemSendCard"](info,this.CONST.SERVICE_VERSION,this.currentPosition);//获取
                            egret["AH_setSystemSendCard"]=this.setSystemSendCard.bind(this);//设置
                        }
                        break;
                    default:
                        _isEvent=true;
                        if(info.wsw_sole_action_id && info.wsw_sole_action_id>=this.wsw_sole_action_id){
                            this.wsw_sole_action_id=info.wsw_sole_action_id;
                        }else if(info.wsw_sole_action_id<this.wsw_sole_action_id){
                            _isEvent=false;
                            MyConsole.getInstance().trace("唯一动作标识出错----->当前本地: "+this.wsw_sole_action_id+" 服务端："+info.wsw_sole_action_id,0);
                        }
                        break;
                }
                if(_isEvent)this.m_to_c_dis_event(this.PORT.SOCKET_DATA_EVENT+interfaceId,info);//数据广播出去
                return;
            }
        }
        MyConsole.getInstance().trace("未知推送信息"+interfaceId,3);//打印异常
    }
    /*动作ID异常处理*/
    protected wswActionIDError(cId,sendId){
        // //异常跟踪统计  2.0.8 舍弃
        // AH_statisticService.getInstance().wswIDError();
        if(this.CONST.PLAYBACK_MODEL){
            //回放模式下不刷新大接口
            MyConsole.getInstance().trace("回放时动作ID异常:客户端:"+cId+",服务端:"+sendId,"custom3");
        }else{
            //刷新大接口
            this.m_to_c_dis_event(this.EVENT.manager.update_main_info);
        }
    }
    /*回放模式下 传输数据处理*/
    protected playbackModelSendData(data){
        this.dispatchEventWith("nextPlaybackInfo",false,data);
    }
    /*回放模式下模拟传送数据*/
    public playbackModelRadioServiceInfo(interfaceId,info,num){
        //处理数据 广播后端信息
        if(interfaceId&&info){
            //回放模式下 从跳过开房步骤 所以ID从2开始
            if(num==1 && info.wsw_sole_action_id)this.wsw_sole_action_id=info.wsw_sole_action_id-1;
            MyConsole.getInstance().trace("回放模式下数据-》模拟发送 2.1.4 "+this.wsw_sole_action_id);
            this.radioServiceInfo(interfaceId,info);
        }else{
            MyConsole.getInstance().trace("回放模式下数据-》模拟发送数据有误",0);
        }

    }
    /*------------------------------------------测试数据-------------------------------------*/
    public testPort(interfaceId,data){
        // if(this.getVersionType()!="release"){
        this.radioServiceInfo(interfaceId,data);
        // }
    }
    /*测试数据*/
    public createRoomOk(roomId){
        // if(this.getVersionType()!="release"){
        if(egret["AH_createRoomOk"]){
            egret["AH_createRoomOk"](roomId);
        }
        // }
    }
    /* 测试大接口次数统计*/
    public test_mainPortNum(num=0){
        // if(this.getVersionType()!="release"){
        if(egret["AH_mainInfoNum"]){
            egret["AH_mainInfoNum"](num);
        }
        // }
    }
    /*发牌后刷新 剩余牌*/
    protected currentPosition=0;//当前风向测试用
    public systemSendCardOk(roomId){
        if(this.CONST.version_type!="release"){
            if(egret["AH_systemSendCard"]){
                this.sendData({
                    interfaceId:this.PORT.CONFIG.getSystemCard.interfaceId,
                    roomId:roomId
                },false);
            }
        }
    }
    /*设置剩余牌*/
    public setSystemSendCard(roomId,list){
        if(this.CONST.version_type!="release"){
            this.sendData({
                interfaceId:this.PORT.CONFIG.setSystemCard.interfaceId,
                pais:list,
                roomId:roomId
            },false);
        }

    }
    /*1----更新当前玩家实时手牌信息*/
    public setPlayStopCardInfo(userId,list){
        if(this.CONST.version_type!="release"){
            var self=this;
            if(egret["AH_setPlayStopCardInfo"]){
                var arr=[];
                for(var i in list){
                    arr.push(list[i].act_code);
                }
                egret["AH_setPlayStopCardInfo"](userId,arr,function (cardList,roomId) {
                    self.sendData({
                        interfaceId:self.PORT.CONFIG.setStopCard.interfaceId,
                        userId:userId,
                        pais:JSON.stringify(cardList),
                        roomId:roomId
                    },false);
                });
            }
        }
    }
    /*2-----强制解散*/
    public qingzhi_jie_san_room(){
        if(this.CONST.version_type!="release"){
            egret["AH_testPort"] = this.testPort.bind(this);
            var self=this;
            if(!egret["qingzhi_jie_san_room"]&&this.CONST.version_type!="release"){
                egret["qingzhi_jie_san_room"]=function(roomId){
                    self.sendData({
                        interfaceId:"999800",
                        roomId:roomId
                    },false);
                }.bind(this);
            }
        }
    }
}