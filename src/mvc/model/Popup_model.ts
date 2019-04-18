/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Popup_model extends Scene_model{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected socket_model:Web_socket_service;
    protected ani_model:Ani_model;
    protected issue_list_info;                          //代开代开列表时代开列表的数据;
    public player_back_data;                            //用于牌局回放的数据;
    public create_room_data;                            //创建房间缓存数据;
    public constructor(){
        super();
    }
    public self_model:User_model;
    public set_model(socket_model,ani_model){
        this.socket_model=socket_model;
        this.ani_model=ani_model;
        this.port_socket();
    }
    //监听服务器给的消息;
    private port_socket(){
        //大厅战绩查询;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_achievement,this.hall_achievement.bind(this),this);
        //创建房间;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_createRoom,this.hall_createRoom.bind(this),this);
        //加入房间;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_joinRoom,this.hall_joinRoom.bind(this),this);
        //代开列表;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_currentReplaceRoom,this.hall_currentReplaceRoom.bind(this),this);
        //用户加入--代开房间用户加入房间;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_onLine_issueRoom,this.player_join_room.bind(this),this);
        //代开模式房主解散房间;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_dissolveReplaceRoom,this.hall_dissolveReplaceRoom.bind(this),this);
        //代开房间解散房间回应;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_issueRoom_delete,this.hall_issueRoom_delete.bind(this),this);
        //代开房间强制解散房间回应;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_orderDissolveReplaceRoom,this.hall_orderDissolveReplaceRoom.bind(this),this);
        //代开历史;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_historyReplaceRoom,this.hall_historyReplaceRoom.bind(this),this);
        //俱乐部我的战绩信息
        this.socket_model.add_port_event(this.PORT.CONFIG.club_get_my_info,this.get_club_get_my_info,this);
        //俱乐部创建房间
        this.socket_model.add_port_event(this.PORT.CONFIG.club_create_room,this.club_createRoom,this);
        //俱乐部加入房间
        this.socket_model.add_port_event(this.PORT.CONFIG.club_join_room,this.club_join_room,this);
        //---------俱乐部假数据监听------------
        this.socket_model.add_port_event(this.PORT.CONFIG.club_history_info,this.club_history_info,this);
    }

    //网络断开连接;
    public socket_close(){
        this.m_to_c_dis_event(this.EVENT.socket.socket_close);
    }

    public socket_unusual(str){
        this.m_to_c_dis_event(this.EVENT.socket.socket_unusual,str);
    }

    //通用浮层提示框
    public popup_float_alert(args){
        var data = {};
        data["str"] = args[0];
        data["timeN"] = args[1]?args[1]:2500;
        this.m_to_c_dis_event(this.EVENT.base.base_float_alert,data);
    }
    //zpb:俱乐部 我的信息弹窗
    public club_my_info(data){
        this.m_to_c_dis_event(this.EVENT.base.club_my_info_popup,data);
    }
    //zpb:俱乐部 申请离开
    public club_request_leave(){
        this.m_to_c_dis_event(this.EVENT.base.club_request_leave_popup);
    }
    //刷新俱乐部玩家信息
    private  current_page=0;
    public get_club_get_my_info(data){
        data.page=this.current_page;
        this.m_to_c_dis_event(this.EVENT.base_popup.club_add_my_info,data);
    }

    //zpb:关闭所有弹窗
    public close_all_popup(){

    }

    //服务器返回的----大厅战绩查询-------数据给 control;
    private hall_achievement(info){
        this.m_to_c_dis_event(this.EVENT.popup.hall_achievement,info);
    }

    //创建房间-回应;
    private hall_createRoom(info){
        //1：创建房主房间;
        if(info.reqState==1){
            //扣除房卡
            var create_money;
            if(Number(info.roomInfo.circleNum)==2){create_money=4}
            else if(Number(info.roomInfo.circleNum)==4){create_money=6}
            else if(Number(info.roomInfo.circleNum)==8){create_money=12}
            var roomId=""+info.roomInfo.roomId;
            if(roomId.length==6){
                this.m_to_c_dis_event(this.EVENT.popup.create_room_update_money,Number(create_money));
            }
            //切换场景;
            this.m_to_c_dis_event(this.EVENT.popup.create_room_ok,info);
        }
        //2:房卡不足;
        if(info.reqState==2){
            this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"房卡不足"});
        }
        //10:代开房间;
        if(info.reqState==10){
            //返回设置自己的房卡数
            var money;
            if(Number(info.roomInfo.circleNum)==2){money=4}
            else if(Number(info.roomInfo.circleNum)==4){money=6}
            else if(Number(info.roomInfo.circleNum)==8){money=12}
            //创建代开时更新自己的房卡数
            this.m_to_c_dis_event(this.EVENT.popup.create_replace_update_money,Number(money));
            this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"代开房间创建成功"});
            this.m_to_c_dis_event(this.EVENT.base.issue_success);//代开房间创建成功跳转代开界面
        }
        //代开房间超过10个;
        if(info.reqState==11){
            this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"您创建的代开房间已满10个"});
        }
        //20:俱乐部---创建房间上限已满;
        if(info.reqState==20){
            this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"俱乐部创建房间上限已满"});
        }
        //21:俱乐部房卡不足200，无法创建;
        if(info.reqState==21){
            this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"该俱乐部房卡不足200，无法创建"});
        }
        //22:俱乐部---您已达今日限额，不能再创建了;
        if(info.reqState==22){
            this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"您已经达到今日俱乐部限额，不能再创建了"});
        }
    }

    //加入房间;
    private hall_joinRoom(info){
        if(this.CONST.curr_is_silence_join){
            this.CONST.curr_is_silence_join=false;
            if(info.reqState==1){
                //正确加入房
                if(info.roomId)this.m_to_c_dis_event(this.EVENT.popup.join_room_ok,info);
            }else {
                //加入房间失败，返回大厅;
                this.m_to_c_dis_event(this.EVENT.popup.join_room_fail,info);
            }
        }else {
            switch(info.reqState){
                case 1: //正确加入房间
                    this.m_to_c_dis_event(this.EVENT.popup.join_room_ok,info);
                    break;
                case 2:
                    this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"余额不足"});
                    break;
                case 3:
                    this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"已经在其他房间中"});
                    break;
                case 4:
                    this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"房间不存在"});
                    break;
                case 5:
                    this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"房间人员已满"});
                    break;
                case 6:
                    this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"房间正在游戏中"});
                    break;
                case 13:
                    this.m_to_c_dis_event(this.EVENT.base.base_float_alert,{"str":"您已经达到今日俱乐部限额，请换其他俱乐部继续游戏"});
                    break;
                default:
                    //在这里的情况下 游戏那边去处理了 不用理会
                    break;
            }
        }
    }

    //服务器返回的----大厅代开列表-------数据给 control;
    private hall_currentReplaceRoom(info){
        this.issue_list_info=info;
        this.m_to_c_dis_event(this.EVENT.popup.issue_info,info);
    }

    //代开房间用户加入;
    private player_join_room(info){
        //"extraType":1进入 2退出 3房间解散 4离线 5上线 6房间开局;
        //代开房间开局;
        if(info.extraType){
            switch (info.extraType){
                case 1:
                case 2:
                case 3:
                    this.send_issue_info(this.CONST.USERID);
                    break;
                case 4:
                case 5:
                case 6:
                    this.m_to_c_dis_event(this.EVENT.popup.issue_room_star_game,info);
                    break
            }
        }
    }

    //代开模式房主解散房间;
    private hall_dissolveReplaceRoom(info){
        if(info.reqState==1){
            //返回设置自己的房卡数;
            this.m_to_c_dis_event(this.EVENT.popup.change_score,info.money);        //更改房卡数量;

            if(this.CONST.USERID){
                this.send_issue_info(this.CONST.USERID);
            }else {
                MyConsole.getInstance().trace("我的userId呢？？？"+this.CONST.USERID,2);
            }
        }
    }

    //代开房间解散房间;
    private hall_issueRoom_delete(info){
        if(info.extraType==1){
            this.send_issue_info(this.CONST.USERID);
        }
    }

    //代开房间解散房间回应;
    private hall_orderDissolveReplaceRoom(info){
        if(info.reqState==1){ //丹阳特有数据格式，不用合并
            this.send_issue_info(this.CONST.USERID);
        }

    }

    //代开历史;
    private hall_historyReplaceRoom(info){
        this.m_to_c_dis_event(this.EVENT.popup.issue_history,info);
    }

    //创建房间;
    public send_create_room(data){
        if(data.clubId){
            this.socket_model.club_create_room(data);
        }else{
            this.socket_model.set_create_room(data);
        }
    }
    //加入房间;
    public join_create_room(data){
        this.socket_model.join_room(data);
    }

    //向服务器请求战绩列表;
    public send_record_info(userId,pages){
        /****************用于生成假数据 别删********************/
        //假数据;
        // var data={};
        // data["userId"]=userId;
        // data["state"]=10;
        // this.socket_model.send_record_bogus_info(data);
        /*****************************************************/
        //真数据;
         this.socket_model.get_achievement_info_hyh(userId,pages);

        // //俱乐部战绩
        // var data={
        //     "userId":this.CONST.USERID,
        //     "state":10,
        //     "clubId":654072,
        //     "date":0,
        // };
        // this.socket_model.send_club_history_info(data);
    }

    //向服务器请求代开列表;
    public send_issue_info(userId){
        this.socket_model.get_issue_replace(userId);
    }

    //删除代开房间用户;
    public send_delete_user(data){
        this.socket_model.delete_user(data);
    }

    //解散房间;
    public send_dissolution_room(roomId){
        var data={};
        data["roomId"]=roomId;
        this.socket_model.delete_room(data);
    }

    //强制解散房间;
    public send_qz_dissolution_room(roomId){
        var data={};
        data["roomId"]=roomId;
        this.socket_model.order_delete_room(data);
    }

    //请求代开历史;
    public send_issue_history(data){

        /****************用于生成假数据 别删********************/
        // var info={};
        // data["userId"]=data.userId;
        // data["state"]=10;
        // this.socket_model.send_issue_history_info(data);
        /*****************************************************/

        this.socket_model.get_history_replace(data.userId,data.page);
    }
    //俱乐部创建房间
    private club_createRoom(info){
        this.hall_createRoom(info);
    }
    //俱乐部-加入房间请求---发起socket
    public club_join_room_send(roomId,userId){
        this.socket_model.club_join_room({userId:userId,roomId:roomId});
    }
    //俱乐部-加入房间---回应socket
    private club_join_room(info){
        this.hall_joinRoom(info);
    }

    //代开房间，有用户加入---变化本地数据，不去和服务器交互了;
    private issue_user_join_room(info){
        for(let i=0;i<this.issue_list_info.length;i++){
            if(this.issue_list_info[i].roomId==info.roomId){
                this.issue_list_info[i].playerInfo.push(info);
            }
        }
        this.m_to_c_dis_event(this.EVENT.popup.issue_info,this.issue_list_info);
    }

    //代开房间，有用户离开;
    private issue_user_leave_room(info){
        /*
        var data=this.issue_list_info;
        for(let i=0;i<data.length;i++){
            if(data[i].roomId==info.roomSn){

                data[i].playerInfo.push(info);
            }
        }
        */
    }

    private record_bogus_info(info){

    }

    private club_history_info(info){
  
    }
}