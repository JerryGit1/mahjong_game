/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Popup_view extends Base_view{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected model:Popup_model;
    private record_view;                //战绩pop;
    private issue_view:Issue_popup;     //代开pop;
    public popup_name="";//弹窗名字
    private dissolution_room_pop;
    private float_alert_sp_arr;             //浮层;
    public constructor(){
        super();
        this.float_alert_sp_arr=[];
    }

    /*------------------------------------通用弹窗-------------------------------------------*/
    public  add_test_popup(){//演示
        var base_popup=new Test_popup();
        base_popup.addEventListener("close",this.close_popup_view,this);
        this.addChild(base_popup);
    }
    //通用弹窗;
    public add_hint_view(...args){
        var str=args[0];
        var backFunc = args[1];
        var _isAddCloseBtn = args[2];
        var hint_pop=new Hint_popup(str,backFunc,_isAddCloseBtn);
        hint_pop.addEventListener("close",this.close_popup_view,this);
        this.addChild(hint_pop);
    }
    //显示分享Pop;
    public show_share_popup(){
        var share_pop=new Share_popup();
        share_pop.addEventListener("close",this.close_popup_view,this);
        this.addChild(share_pop);
    }
    //设置弹窗;
    public add_setting_view(info){
        var set_pop=new Setting_popup(info);
        set_pop.v_to_v_add_event(this.EVENT.popup.room_dissolution_room,this.room_dissolution_room,this);
        set_pop.addEventListener("close",this.close_popup_view,this);
        this.addChild(set_pop);
    }
    //游戏-发起-解散房间
    private room_dissolution_room(){
        //讲roomId与userId在这边传过去;
        this.v_to_v_dis_event(this.EVENT.popup.room_dissolution_room);
    }
    //浮层框
    private float_alert(data){
        this.v_to_v_dis_event(this.EVENT.popup.float_alert,data);
    }

    //tyq: 通用浮层提示框
    public popup_float_alert(data){
        var str = data.str;
        var time = data.timeN;

        var sp=new egret.Sprite(),txt=new egret.TextField(),w,h;
        this.addChild(sp);
        sp.addChild(txt);
        txt.textColor=0xffffff;
        txt.height = 40;
        txt.multiline = true;
        txt.textFlow = (new egret.HtmlTextParser()).parse(str);
        txt.size=25;
        txt.textAlign = "center";
        w=txt.textWidth+10;
        h=txt.textHeight+20;
        txt.x = w/2 - txt.width/2;
        txt.y = h/2 - txt.height/2+5;
        sp.graphics.beginFill(0x000000,.5);
        sp.graphics.drawRoundRect(0,0,w,h,10,10);
        sp.graphics.endFill();
        sp.x = Main.stageWidth/2-w/2;
        sp.y = Main.stageHeight/2-h/2+20;
        sp.alpha=0;
        this.float_alert_sp_arr.push(sp);
        egret.Tween.get(sp).to({y:sp.y-120,alpha:1},300,egret.Ease.sineOut).wait(time).to({alpha:0},200).call(function(){
            this.removeChild(sp);
            sp=null;
            this.float_alert_sp_arr.splice(0,1);
        },this)
    }


    /*--------------------------------------大厅弹窗-----------------------------------------*/
    public create_user_Agree(userId){
        var user_agree=new User_agree_popup(userId);
        user_agree.v_to_v_add_event(this.EVENT.popup.user_agree,this.user_agree,this);
        user_agree.addEventListener("close",this.close_popup_view,this);
        this.addChild(user_agree);
    }

    //创建房间Pop;      room_data:
    public create_room_popup(userId,clubId=null,room_data=null){
        //创建房间Popup;
        var create_room_view=new Create_room_popup(userId,clubId,room_data);
        create_room_view.v_to_v_add_event(this.EVENT.popup.create_room,this.create_room,this);
        this.addChild(create_room_view);
        create_room_view.addEventListener("close",this.close_popup_view,this);
    }
    //加入房间Pop;
    public join_room_popup(userId){
        //加入房间Pop;;
        var join_room_view=new Join_room_popup(userId);
        this.addChild(join_room_view);
        join_room_view.v_to_v_add_event(this.EVENT.popup.join_room,this.join_room,this);
        join_room_view.addEventListener("close",this.close_popup_view,this);
    }
    //查看用户信息Pop;
    public look_user_info(user_info){
        var user_info_view=new User_info_popup(user_info);
        this.addChild(user_info_view);
        user_info_view.addEventListener("close",this.close_popup_view,this);
    }

    //充值Pop;
    public pay_user_money(str){
        var tip_view=new Tip_popup(str);
        this.addChild(tip_view);
        tip_view.addEventListener("close",this.close_popup_view,this);
    }

    //战绩Pop;
    public add_record_view(userId){
        this.record_view=new Record_popup();
        this.record_view.addEventListener("close",this.close_popup_view,this);
        this.record_view.v_to_v_add_event(this.EVENT.popup.hall_achievement,this.hall_achievement,this);            //监听获取战绩;
        this.record_view.v_to_v_add_event(this.EVENT.popup.share,this.show_share_popup,this);                       //弹出分享战绩;
        this.record_view.v_to_v_add_event(this.EVENT.popup.play_back_info,this.play_back_info_popup_view,this);     //牌局回放;
        this.addChild(this.record_view);
        this.record_view.init_content(userId);
    }

    //代开Pop;
    public add_issue_view(userId){
        this.issue_view=new Issue_popup(userId);
        this.addChild(this.issue_view);
        this.issue_view.addEventListener("close",this.close_popup_view,this);
        this.issue_view.v_to_v_add_event(this.EVENT.popup.delete_user,this.delete_user,this);                   //代开删除用户;
        this.issue_view.v_to_v_add_event(this.EVENT.popup.dissolution_room,this.dissolution_room,this);         //代开解散房间;
        this.issue_view.v_to_v_add_event(this.EVENT.popup.qz_dissolution_room,this.qz_dissolution_room,this);   //代开强制解散房间;
        this.issue_view.v_to_v_add_event(this.EVENT.popup.issue_history,this.issue_history,this);               //代开历史;
        this.issue_view.v_to_v_add_event(this.EVENT.popup.share,this.show_share_popup,this);                    //邀请;
        this.issue_view.v_to_v_add_event(this.EVENT.popup.play_back_info,this.play_back_info_popup_view,this);  //记录按钮;
        this.v_to_v_dis_event(this.EVENT.popup.issue_info,userId);                                              //告诉contro我要代开列表数据;
    }
    //帮助弹窗;
    public add_help_view(){
        var help_pop=new Help_popup();
        help_pop.addEventListener("close",this.close_popup_view,this);
        this.addChild(help_pop);
    }
    
    //同意用户协议;
    private user_agree(userId){
        this.v_to_v_dis_event(this.EVENT.popup.user_agree,userId);
        //this.model.send_user_agree(userId);
    }

    //创建房间;
    private create_room(info){
        this.v_to_v_dis_event(this.EVENT.popup.create_room,info);
    }

    //加入房间;
    private join_room(info){
        this.v_to_v_dis_event(this.EVENT.popup.join_room,info);
    }

    //监听获取战绩;
    private hall_achievement(userId){
        this.v_to_v_dis_event(this.EVENT.popup.hall_achievement,userId);
    }

    //派发分享战绩View;
    private share_record_popup_view(){
        this.v_to_v_dis_event(this.EVENT.popup.share_achievement);
    }

    //牌局回放;
    private play_back_info_popup_view(data){
        this.v_to_v_dis_event(this.EVENT.popup.play_back_info,data);
    }

    //代开删除用户;
    private delete_user(data){
        this.v_to_v_dis_event(this.EVENT.popup.delete_user,data);
    }

    //代开解散房间;
    private dissolution_room(data){
        this.v_to_v_dis_event(this.EVENT.popup.dissolution_room,data);
    }


    //代开强制解散房间;
    private qz_dissolution_room(data){
        this.v_to_v_dis_event(this.EVENT.popup.qz_dissolution_room,data);
    }
    //代开历史;
    private issue_history(data){
        this.v_to_v_dis_event(this.EVENT.popup.issue_history,data);
    }

    //显示牌局回放界面;
    public init_play_back_info(data){
        var play_back_pop= new Playback_record_popup(data);
        play_back_pop.addEventListener("close",this.close_popup_view,this);
        play_back_pop.v_to_v_add_event(this.EVENT.popup.play_back_info,this.play_back_info_popup_view,this);
        play_back_pop.v_to_v_add_event(this.EVENT.player_back.show_player,this.pop_show_player,this);
        play_back_pop.v_to_v_add_event(this.EVENT.popup.share,this.show_share_popup,this);
        this.addChild(play_back_pop);
      
    }
    private pop_show_player(data){
        this.v_to_v_dis_event(this.EVENT.player_back.show_player,data);
    }

    //更新战绩列表;
    public update_record_list(info){
        this.record_view.add_record_list(info.infos);
    }

    //更新代开历史;
    public update_history_list(info){
        this.issue_view.updata_history_cell(info);
    }

    //更新代开列表;
    public update_issue_list(info){
        if(this.issue_view){
            this.issue_view.updata_list_cell(info);
        }
        //this.record_view.add_record_list(info.info);
    }
    
    //更新代开房间;
    public update_issue_list_room(info){
        if(this.issue_view){
            this.issue_view.update_list_room_data(info);
        }
    }
    /*--------------------------------------房间弹窗-----------------------------------------*/
    //聊天弹框
    public chitchat_popup(){
        var chat_view = new Chat_popup();
        chat_view.addEventListener("close",this.close_popup_view,this);
        chat_view.v_to_v_add_event(this.EVENT.chat.send_chat_status,this.send_chat_status,this);     //发送聊天;
        this.addChild(chat_view);
    }
    //定位弹框
    public location_popup(location_model:Location_model){
        var location_view=new Location_popup(location_model);
        location_view.addEventListener("close",this.close_popup_view,this);
        this.addChild(location_view);
    }
    //规则弹框
    public rule_popup(info){
        var rule_view=new Rule_tip_pop(info);
        rule_view.addEventListener("close",this.close_popup_view,this);
        this.addChild(rule_view);
    }
    //小结算弹框
    public xjs_popup(XJS_model:XJS_model){
        var xjs_view = new XJS_popup(XJS_model);
        xjs_view.v_to_v_add_event(this.EVENT.popup.share,this.show_share_popup,this);//分享
        xjs_view.v_to_v_add_event(this.EVENT.popup_room.XJS_wait_ok,this.wait_ok,this);//准备Ok
        xjs_view.addEventListener("close",this.close_popup_view,this);
        this.addChild(xjs_view);
    }
    //大结算弹框
    public djs_popup(info){
        var Big_settle_view = new Big_settle_popup(info);
        this.addChild(Big_settle_view);
        Big_settle_view.v_to_v_add_event(this.EVENT.popup.share,this.show_share_popup,this);//分享
        Big_settle_view.v_to_v_add_event(this.EVENT.popup.back_hall,this.back_hall,this);//返回大厅
        Big_settle_view.addEventListener("close",this.close_popup_view,this);
    }
    //四人-解散房间-弹框
    public update_dissolution_room(dis_model:Dissolve_room_model){
        if(!this.dissolution_room_pop){
            this.dissolution_room_pop = new Dissolve_room_popup(dis_model);
            this.addChild(this.dissolution_room_pop);
            this.dissolution_room_pop.addEventListener("close",this.close_popup_view,this);
            this.dissolution_room_pop.v_to_v_add_event(this.EVENT.dissolution_room.is_agree_diss_room,this.is_agree_diss_room,this);        //是否同意解散房间;
            this.dissolution_room_pop.v_to_v_add_event(this.EVENT.popup_room.sponsor_DJS,this.sponsor_DJS,this);                             //发起大结算;
            this.dissolution_room_pop.v_to_v_add_event(this.EVENT.popup.float_alert,this.float_alert,this);                                 //浮层;
        }
        this.dissolution_room_pop.update_view(dis_model);
    }
    /*-----------------------------房间--事件--回应------------------------------*/
    //发起-聊天
    private send_chat_status(info){
        this.v_to_v_dis_event(this.EVENT.chat.send_chat_status,info);
    }
    //小结算-》发起-准备
    private wait_ok(){
        this.v_to_v_dis_event(this.EVENT.popup_room.XJS_wait_ok);
    }
    //大结算-》返回大厅
    private back_hall(){
        this.v_to_v_dis_event(this.EVENT.popup.back_hall);
    }
    //同意or拒绝
    private is_agree_diss_room(num){
        this.v_to_v_dis_event(this.EVENT.dissolution_room.is_agree_diss_room,num);
    }
    //房间解散成功-》请求大结算
    private sponsor_DJS(){
        this.v_to_v_dis_event(this.EVENT.popup_room.sponsor_DJS);
    }
    /*--------------------------------------俱乐部弹窗-----------------------------------------*/
    //zpb:俱乐部申请加入
    public add_club_request_join_popup(model:Club_base_model){
        var view = new Club_request_join_popup(model);
        this.addChild(view);
        view.addEventListener("close",this.close_popup_view,this);
    }
    //zpb:申请离开俱乐部
    public add_club_request_leave_popup(data){
        var view = new Club_request_leave_popup(data);
        this.addChild(view);
        view.addEventListener("close",this.close_popup_view,this);
        view.v_to_v_add_event(this.EVENT.base.club_request_leave_popup,this.club_leave_popup,this);//申请离开-[确定]按钮-事件监听
    }
    //申请离开-[确定]按钮-事件监听-方法回调
    private club_leave_popup(){
        this.v_to_v_dis_event(this.EVENT.base.club_request_leave_popup);
    }
    //俱乐部-我的成绩
    private club_my_info_popup:Club_my_info_popup;
    public add_club_my_info_popup(data,model){
        this.model=model;
        this.club_my_info_popup = new Club_my_info_popup(data);
        this.club_my_info_popup.v_to_v_add_event(this.EVENT.base_popup.club_play_back_info,this.play_back_info_popup_view,this);     //牌局回放;
        this.club_my_info_popup.v_to_v_add_event(this.EVENT.base_popup.share,this.show_share_popup,this);//俱乐部分享pop
        this.addChild(this.club_my_info_popup );
        this.v_to_v_dis_event(this.EVENT.base_popup.add_my_info,data);//发送请求数据
        // //战绩翻页切换刷新视图  再次请求socket
        this.club_my_info_popup.v_to_v_add_event(this.EVENT.base.club_get_my_info,this.club_update_my_info,this);
        this.club_my_info_popup.addEventListener("close",this.close_popup_view,this);
    }
    //俱乐部-我的信息数据刷新
    public update_club_my_info(data){
        if(this.club_my_info_popup){
            this.club_my_info_popup.add_club_record_list(data);
        }
    }
    //战绩翻页切换刷新视图
    private club_update_my_info(data){
        this.v_to_v_dis_event(this.EVENT.base.club_update_my_info,data);
    }

    /*------------------------------------------------------------------------------*/
    /*关闭按钮点击 清理弹窗*/
    public close_popup_view(e:egret.Event){
        var view=e.target, popup_name=view.popup_name;
        view.removeEventListener("close",this.close_popup_view,this);
        //通用清理
        this.remove_popup_view(view);
        //额外需要清理的数据
        if(popup_name){

        }
        if(this.dissolution_room_pop){this.dissolution_room_pop=null;}
        view=null;
    }
    /*清空弹出窗视图*/
    protected remove_popup_view(view:Base_popup){
        if(view){
            view.clear();
            this.removeChild(view);
            view=null;
        }
    }

    

    /*清空所有弹出窗视图*/
    public close_all_popup_view(){
        //清楚所有缓动动画;
        egret.Tween.removeAllTweens();
        for(let j=0;j<this.float_alert_sp_arr.length;j++){
            this.removeChild(this.float_alert_sp_arr[j]);
            this.float_alert_sp_arr[j]=null;
        }
        this.float_alert_sp_arr=[];

        var i = this.numChildren-1;
        while(i>=0){
            var view:any = this.getChildAt(i);
            if(view["__types__"]){
                for(var s in view["__types__"]){
                    if(view["__types__"][s]=="Base_popup"){
                        this.remove_popup_view(view);
                        break;
                    }
                }
            }
            i--;
        }
        MyConsole.getInstance().trace("ani_control----弹窗层清理完毕",6);
    }
}