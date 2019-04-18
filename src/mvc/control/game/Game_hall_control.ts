/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Game_hall_control extends Base_control{
    public EVENT:Game_hall_event_model=new Game_hall_event_model();//事件常量
    protected model:Game_hall_model;
    protected view:Hall_view;
    public constructor(model){
        super(model,null);
        this.model=model;
        //监听其他control发来的广播;
        this.add_radio_event();
        //对model的监听;
        this.model_add_event();
    }
    //添加视图
    public add_view(){
        this.view=new Hall_view(this.model);
        super.add_view();

        //-------------------事件侦听--------------------
        //头像点击---用户信息弹窗
        //this.view.v_to_v_add_event(this.EVENT.hall_popup.look_user_info,this.view_look_user_info_event,this);
        //房卡点击
        //this.view.v_to_v_add_event(this.EVENT.hall_popup.pay_user_money,this.pay_user_money_popup,this);
        //创建房间
        this.view.v_to_v_add_event(this.EVENT.hall_popup.create_room,this.create_room_popup,this);
        //加入房间
        this.view.v_to_v_add_event(this.EVENT.hall_popup.join_room,this.join_room_popup,this);
        //俱乐部
        this.view.v_to_v_add_event(this.EVENT.hall_popup.skip_club,this.skip_club,this);
        //查看用户信息
        this.view.v_to_v_add_event(this.EVENT.hall_popup.look_user_info,this.look_user_info,this);
        //充值
        this.view.v_to_v_add_event(this.EVENT.hall_popup.pay_user_money,this.pay_user_money,this);
        //战绩
        this.view.v_to_v_add_event(this.EVENT.hall_popup.record,this.add_record_view,this);
        //代开
        this.view.v_to_v_add_event(this.EVENT.hall_popup.issue,this.add_issue_view,this);
        //规则--帮助
        this.view.v_to_v_add_event(this.EVENT.hall_popup.help,this.add_help_view,this);
        //分享
        this.view.v_to_v_add_event(this.EVENT.hall_popup.share,this.add_share_view,this);
        //规则--设置
        this.view.v_to_v_add_event(this.EVENT.hall_popup.setting,this.add_setting_view,this);
        //加入房间
        //俱乐部
        //设置
        //战绩
        //代开
        //玩法
        //分享
        //-------------------主动触发--------------------
        //捕获加入俱乐部
        if(this.CONST.CLUB_SHARE_ID){
            this.c_to_c_event_radio(this.EVENT.base.hall_to_club_join_id,this.CONST.CLUB_SHARE_ID);
            this.CONST.CLUB_SHARE_ID=null;//注销下次加入
        }else{
            //捕获用户协议
            if(!this.model.get_userAgree()){
                var self_model=this.model.get_user_info_popup_info();
                var userId=self_model.userId;
                this.c_to_c_event_radio(this.EVENT.base_popup.add_user_Agree_pop,userId);
            }
        }

        //是否弹出回放pop;
        this.c_to_c_event_radio(this.EVENT.base.is_show_player_back_pop);
        
        //设置分享
        Weixin_JSSDK_model.getInstance().hallShare();//游戏中只能分享大厅信息
        //播放声音
        Sound_model.playBackSound("bg_dating");// 大厅背景音乐
        //动态更新个人数据;
        var info=this.model.get_user_model_info();
        this.view.updata_userInfo(info);

        //动态更新跑马灯;
        var notice_text=info.notice;
        this.view.update_notice_text(notice_text);
    }
    //--------------------事件侦听-------------------

    //对model的监听;
    private model_add_event(){
        this.model.m_to_c_add_event(this.EVENT.issue.h_issue_delete_player,this.hall_delete_player,this);
    }

    //监听其他control发来的广播;
    private add_radio_event(){
        //监听房卡数量的改变;
        this.c_to_c_add_radio_event(this.EVENT.pop_to_hall.pop_change_money,this.view_change_money,this);
        //同意用户协议;
        this.c_to_c_add_radio_event(this.EVENT.pop_to_hall.user_agree_back,this.user_agree_back,this);
        //创建房间监听;
        this.c_to_c_add_radio_event(this.EVENT.pop_to_hall.game_create_room_back,this.create_room_back,this);
        //加入房间监听;
        this.c_to_c_add_radio_event(this.EVENT.pop_to_hall.join_room_back,this.join_room_back,this);
        //代开房间创建成功跳转代开界面
        this.c_to_c_add_radio_event(this.EVENT.base.issue_success,this.add_issue_view,this);
	    //创建房间时更新房卡
	    this.c_to_c_add_radio_event(this.EVENT.popup.create_room_update_money,this.create_room_update_money,this);
	    //监听房间改变房卡数量;
	    this.c_to_c_add_radio_event(this.EVENT.room_to_hall.room_change_money,this.room_change_money,this);
        //创建代开时-更新大厅房卡
        this.c_to_c_add_radio_event(this.EVENT.popup.create_replace_update_money,this.create_replace_update_money,this)
    }

    //改变房卡的值;
    private view_change_money(num){
        this.view.update_money_text(num); //更新房卡视图
        this.model.self_model.money=num; //更新自己的房卡
    }
    //解散房间时更新大厅房卡;
    private room_change_money(data){
        var roomId = "" + data.roomId;
        if(roomId.length==6){
            var user_money=this.model.self_model.money;
            var user_newest_money=Number(user_money)+Number(data.money_num);
            this.model.self_model.money=user_newest_money;
            this.view.update_money_text(user_newest_money); //更新房卡--丹阳特有--放营口里面会报错
        }
    }

    //同意用户协议;
    private user_agree_back(userId){
        //发送同意用户协议;
        this.model.send_user_agree(userId);
        this.model.self_model.userAgree = true;
    }

    //创建房间回调;
    private create_room_back(info){
        this.model.send_create_room(info);
    }

    //加入房间回调;
    private join_room_back(info){
        this.model.join_create_room(info);
    }

    //--------------------弹窗-------------------
    private pay_user_money_popup(){//充值
        //给弹出窗层--执行视图
        this.c_to_c_event_radio(this.EVENT.base_popup.pay_user_info);
    }

    //创建房间
    private create_room_popup(){
        //给弹出窗层--执行视图
        this.c_to_c_event_radio(this.EVENT.base_popup.add_create_room_pop,this.model.get_self_user_id());
    }
    //加入房间
    private join_room_popup(){
        //给弹出窗层--执行视图
        this.c_to_c_event_radio(this.EVENT.base_popup.add_join_room_pop,this.model.get_self_user_id());
    }
    //俱乐部
    private skip_club(){
        //切换俱乐部场景
        this.c_to_c_event_radio(this.EVENT.base.hall_to_club_cut_scene);
    }
    //查看用户信息
    private look_user_info(){
        //获取个人信息所需要的数据;
        var user_model_info=this.model.get_user_model_info();
        var user_info={"userId":user_model_info.userId,"userName":user_model_info.userName,"userImg":user_model_info.userImg,"userIp":user_model_info.ip,"userMoney":user_model_info.money,"gender":user_model_info.gender};
        //给弹出窗层--执行视图
        this.c_to_c_event_radio(this.EVENT.base_popup.look_user_info,user_info);
    }

    //充值;
    private pay_user_money(){
        var str=this.model.get_user_model_info().notice;
        // var str="推广员咨询请加官方微信：dymikf文明娱乐，禁止赌博";
        var cutStr = str.replace(/^[\'\"]+|[\'\"]+$/g,"");//正则表达式，去掉字符串中的引号
        this.c_to_c_event_radio(this.EVENT.base_popup.pay_user_money,cutStr.replace(",","\n\n　　　")); //添加换行符
    }

    //广播战绩;
    private add_record_view(){
        var userId=this.model.get_self_user_id();
        this.c_to_c_event_radio(this.EVENT.base_popup.record,userId);
    }

    //广播代开；
    private add_issue_view(){
        var userId=this.model.get_self_user_id();
        this.c_to_c_event_radio(this.EVENT.base_popup.issue,userId);
    }
    
    //创建房间时更新房卡
    private create_room_update_money(create_money){
        var user_money=this.model.self_model.money;
        var user_newest_money=user_money-create_money;
        this.model.self_model.money=user_newest_money;
    }
    //创建代开时更新房卡
    private create_replace_update_money(money){
        var user_money=this.model.self_model.money; //获取当前这个玩家的个人信息
        var user_newest_money=Number(user_money)-money; //得到这个玩家的最新 money
        this.model.self_model.money=user_newest_money;
        this.view.update_money_text(user_newest_money); //更新房卡
    }
    //广播帮助;
    private add_help_view(){
        this.c_to_c_event_radio(this.EVENT.base_popup.help);
    }

    //广播分享;
    private add_share_view(){
        this.c_to_c_event_radio(this.EVENT.base_popup.share);
    }

    //广播设置;
    private add_setting_view(info){
        this.c_to_c_event_radio(this.EVENT.base_popup.setting,info);
    }


    //代开房间踢人的大厅处理;
    private hall_delete_player(info){
        if(this.view){      //说明现在游戏是在大厅里面，如果this.view是null的话，现在就在游戏里面，则不需要处理;
            this.c_to_c_event_radio(this.EVENT.hall_issue.hall_issue_delete_player,info);
        }
    }


    //移除视图
    public remove_view(){
        //移除view事件
        //头像点击---用户信息弹窗
        //房卡点击
        //创建房间
        //加入房间
        //俱乐部
        //设置
        //战绩
        //代开
        //玩法
        //分享
        super.remove_view();
    }
}