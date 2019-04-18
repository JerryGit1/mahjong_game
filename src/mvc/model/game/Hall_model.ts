/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Game_hall_model extends Scene_model{
    public EVENT:Game_event_model=new Game_event_model();//事件常量
    protected curr_is_silence_join=false;//当前是否静默加入房间状态
    public constructor(){
        super();
    }
    public self_model:User_model;
    protected socket_model:Web_socket_service;
    public set_model(self_model,socket_model){
        this.self_model=self_model;
        this.socket_model=socket_model;

        //侦听服务器事件
        this.port_socket();
    }

    //---------------------监听服务器给的消息--------------------;
    private port_socket(){
        //删除用户--代开房间踢人;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_deleteUser,this.delete_user.bind(this),this);
    }
    //------------------------获取数据--------------------------
    public get_userAgree(){
        return this.self_model.userAgree;
    }
    public get_self_user_id(){
        return this.self_model.userId;
    }
    //------------------------设置数据----------------------------

    //zpb 获取用户弹窗信息
    public get_user_info_popup_info(){
        return this.self_model;
    }

    //个人信心界面需要的数据;
    public get_user_model_info(){
        return {
            "userImg":this.self_model.userImg,
            "userName":this.self_model.userName,
            "userId":this.self_model.userId,
            "gender":this.self_model.gender,
            "ip":this.self_model.ip,
            "money":this.self_model.money,
            "notice":this.self_model.notice
        };
    }

    //hyh 发送加入房间信息 _is_silence_join 是否静默加入（通过分享房间号码）
    public join_room(data){
        data["userId"] = this.self_model.userId;
        if(data._is_jing_mo_join_new_room_type){
            this.CONST.curr_is_silence_join=data._is_jing_mo_join_new_room_type;//静默状态
        }
        this.socket_model.join_room(data);
    }


    //---------------------像服务器发送请求------------------
    //告诉服务器，同意用户协议;
    public send_user_agree(userId){
        this.socket_model.send_user_agreement_hyh(userId);
    }

    //创建房间;
    public send_create_room(data){
        this.socket_model.set_create_room(data);
    }

    //加入房间;
    public join_create_room(data){
        this.socket_model.join_room(data);
    }

    //---------------------接收服务器下行-------------------
    //接收踢人下行;
    private delete_user(info){
        //代开房间踢人成功;
        if(info.reqState==1){
            if(this.CONST.USERID){
                //this.send_issue_info(this.CONST.USERID);
                //重新请求刷新代开列表;
                this.m_to_c_dis_event(this.EVENT.issue.h_issue_delete_player,this.CONST.USERID);
            }else {
                MyConsole.getInstance().trace("我的userId呢？？？"+this.CONST.USERID,2);
            }
            //文字提示;
            this.m_to_c_dis_event(this.EVENT.popup.float_alert,{"str":"踢出玩家成功"});
        }
    }

    //-----------------------------------------------------
    
}