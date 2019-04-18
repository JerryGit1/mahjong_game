/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Game_room_control extends Base_control{
    public EVENT:Game_room_event_model=new Game_room_event_model();//事件常量
    protected model:Game_room_model;

    protected view:Room_view;
    public constructor(model){
        super(model,null);

        //更新视图
        this.model.m_to_c_add_event(this.EVENT.room.update_room_view,this.cut_room_scene,this);
        //新玩家加入
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_join,this.flow_join,this);
        //有人离开/解散/踢出房间
        this.model.m_to_c_add_event(this.EVENT.room.m_c_leave_room,this.flow_leave_respond,this);
        //动作回应-系统发牌
        this.model.m_to_c_add_event(this.EVENT.room.m_c_system_deal_card,this.flow_action_system_deal,this);
        //动作回应-玩家出牌
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_send_card,this.flow_action_play_card,this);
        //动作回应-玩家吃
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_chi_card,this.flow_action_chi,this);
        //动作回应-玩家碰
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_peng_card,this.flow_action_peng,this);
        //动作回应-玩家杠
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_gang_card,this.flow_action_gang,this);
        //动作回应-玩家胡
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_hu_card,this.flow_action_hu,this);
        //动作回应-玩家过
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_guo_card,this.flow_action_guo,this);
        //动作回应-流局
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_lj_card,this.flow_action_liuju,this);
        //小结算回应
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_xjs,this.flow_account,this);
        //大结算回应
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_djs,this.flow_over,this);
        //小结算准备回应
        this.model.m_to_c_add_event(this.EVENT.room.m_c_user_prepared,this.flow_account_wait,this);
        //在线状态变化
        this.model.m_to_c_add_event(this.EVENT.room.user_line_status_change,this.float_alert,this);
        //房间申请解散房间回应
        this.model.m_to_c_add_event(this.EVENT.room.r_room_dissolution_room,this.dissolution_room_pop,this);
        //获取到定位数据
        this.model.m_to_c_add_event(this.EVENT.room_popup.location,this.add_room_location_pop,this);
        //获取接收到的聊天数据
        this.model.m_to_c_add_event(this.EVENT.room.r_player_chat_status,this.r_player_chat_status,this);
        //改变房卡数量;
        this.model.m_to_c_add_event(this.EVENT.room.r_change_money,this.change_money,this);
        //回放中途结束
        this.model.m_to_c_add_event(this.EVENT.base.playback_half_over,this.play_back_half_over,this);

        //解散房间-》同意or拒绝
        this.c_to_c_add_radio_event(this.EVENT.room_popup.is_agree_diss_room,this.dissolution_room_responses,this);
        //解散房间成功-》请求大结算
        this.c_to_c_add_radio_event(this.EVENT.room_popup.sponsor_DJS,this.dissolution_room_ok,this);
        //设置弹框-》申请解散房间
        this.c_to_c_add_radio_event(this.EVENT.room_popup.sponsor_dissolve_room,this.dissolution_room_request,this);
        //聊天弹框-》发送聊天
        this.c_to_c_add_radio_event(this.EVENT.room_popup.sponsor_chat,this.sponsor_chat,this);
        //小结算弹框-》发起准备
        this.c_to_c_add_radio_event(this.EVENT.room_popup.XJS_wait_ok,this.flow_account_wait_request,this);
    }
    //-------------------------------初始化视图/断线重连渲染视图---------------------------
    //添加视图
    public add_view(){
        this.remove_view();
        this.view=new Room_view(this.model.user_group_model);
        super.add_view();
        //离开/解散房间
        this.view.v_to_v_add_event(this.EVENT.room.leave_room,this.flow_leave,this);
        //房主踢人
        this.view.v_to_v_add_event(this.EVENT.room_popup.kicking_user,this.kicking_user_popup,this);
        //发起开局
        this.view.v_to_v_add_event(this.EVENT.room.start_game,this.flow_sponsor_start,this);
        //发起动作
        this.view.v_to_v_add_event(this.EVENT.room.initiate_action,this.initiate_action,this);
        //分享弹框
        this.view.v_to_v_add_event(this.EVENT.room_popup.share,this.add_share_pop,this);
        //个人信息弹框
        this.view.v_to_v_add_event(this.EVENT.popup.user_info_pop,this.add_user_info_pop,this);
        //设置弹框
        this.view.v_to_v_add_event(this.EVENT.room_popup.setup_popup,this.add_room_setting_pop,this);
        //聊天弹框
        this.view.v_to_v_add_event(this.EVENT.room_popup.chitchat,this.add_room_chitchat_pop,this);
        //规则弹框
        this.view.v_to_v_add_event(this.EVENT.room_popup.rule,this.add_room_rule_pop,this);
        //定位弹框
        this.view.v_to_v_add_event(this.EVENT.room_popup.location,this.get_location_info,this);
        //回放返回大厅
        this.view.v_to_v_add_event(this.EVENT.room.play_back_home,this.play_back_home,this);
        this.cut_room_scene("loadingOk");

        //回放开始表演
        if(this.CONST.PLAYBACK_MODEL){
            this.model.start_play_back();
        }
    }
    //创建回放
    public set_play_back_info(file_url,share_user_id,back_fun){
        this.model.set_play_back_info(file_url,share_user_id,back_fun);
    }
    /***
     * 切换场景
     * tyq: 直接去切换场景---》 *缺人场景 *牌局中（打牌过程中）场景   *等待（一小局结束）场景
     * type=relink 大接口刷新
     * type=loadingOk 资源加载完成的时候
     * type=pufen  从准备界面 流程化跳转铺分
     * type=play 从铺分/准备/等待界面 流程化跳转游戏
     * type=prepare  从游戏界面 流程化跳转等待
     * @param type
     */
    private cut_room_scene(type="relink"){
        //判断加载完毕 再去切换场景
        if(this.model.room_load_state==this.CONST.ROOM_LOAD_STATUS.LOAD_OK){
            //不同场景静态视图
            switch(this.model.room_state){
                case this.CONST.ROOM_STATUS.SHORT_BOARD:
                    MyConsole.getInstance().trace("-----》切换-缺人场景视图-room_control","custom1");
                    this.view.init_wait_scene(this.model.get_wait_state_info());//切换场景
                    break;
                case this.CONST.ROOM_STATUS.PLAY:
                    MyConsole.getInstance().trace("-----》切换-牌局场景视图-room_control","custom1");
                    this.view.init_game_scene(this.model.user_group_model);//切换场景
                    break;
                case this.CONST.ROOM_STATUS.PREPARE:
                    MyConsole.getInstance().trace("-----》切换-等待场景视图-room_control","custom1");
                    this.view.init_prepare_scene();//切换场景
                    break;
                case this.CONST.ROOM_STATUS.INIT:
                    MyConsole.getInstance().trace("-----》切换-room-初始场景视图-不做处理","custom1");
                    break;
                default:
                    MyConsole.getInstance().trace("重大失误，当前房间状态没有这个奇葩状态"+this.model.room_state,0);
                    break;
            }
            //更新动态视图
            this.change_view(type);
        }
    }
    /**更新场景
     * zpb:切换场景完毕后 处理动态视图
     * type=relink 大接口刷新   type=loadingOk 资源加载完成的时候
     **/
    private change_view(type){
        if(!this.checkout_room_state())return;
        //----根据不同场景 处理各自需要处理的数据
        var base_info=this.model.get_base_info();
        switch (this.model.room_state){
            case this.CONST.ROOM_STATUS.SHORT_BOARD://缺人
                MyConsole.getInstance().trace("-----》检测-缺人场景--动态视图-room_control-"+type,"custom1");
                //第1步----更新桌面基础信息
                this.view.update_bg_base_view(base_info.room_id,base_info.game_num,base_info.game_max_num,null);  //1.0版本
                //第2步----更新玩家基础信息
                //this.model.set_zhuang_player();//设置庄玩家   //tyq：临时屏蔽看效果  1.0版本
                this.view.update_user_base_view(this.model.get_user_wait_info_list());
                //第3步-----新加入的玩家 状态从 in切换到 PREPARED
                this.model.shoart_board_loading_ok_change_player_status();
                //第4步-----更新开局按钮
                this.view.update_start_btn(this.model.judge_player_together());
                //第5步-----更新房主踢人按钮
                this.model.set_houseOwner_tiren();
                //第6步-----检测IP冲突
                this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
                //第7步-----发送定位信息
                this.model.send_location_info();
                //第8步----设置分享
                this.model.set_game_share();
                break;
            case this.CONST.ROOM_STATUS.PLAY://牌局中
                MyConsole.getInstance().trace("-----》检测-牌局场景--动态视图-room_control-"+type,"custom1");
                //第1步----更新桌面基础信息
                this.view.update_bg_base_view(base_info.room_id,base_info.game_num,base_info.game_max_num,base_info.self_location);
                //第2步----更新玩家基础信息
                this.model.set_zhuang_player();//设置庄玩家
                this.model.set_new_deal_card_user();//tyq: 设置最新的发牌人
                this.model.set_new_send_card_user();//设置最新出牌人
                this.view.update_user_base_view();
                //第3步----更新当前动作人/上个动作人 信息
                this.model.set_action_info();
                if(type=="play"){
                    //房主踢人按钮--隐藏
                    this.model.set_houseOwner_tiren();
                    //动画
                    this.gameing_ani();
                }else if(type=="relink"||type=="loadingOk"){
                    //小1----更新混牌显示--此时玩家的手牌才进行排序
                    this.view.update_kai_hun_card(this.model.get_kai_hun_info());
                    //小2----更新玩家牌显示---手牌 吃碰杠牌 桌牌 最新手牌 最新桌牌
                    this.view.update_all_user_card(true);
                    //小3----更新当前动作人风向
                    this.view.update_current_location(this.model.get_current_action_user_position("relink"));
                    //小4----更新剩余牌
                    this.view.update_surplus_card_num(this.model.get_residue_pai_num());
                    //小5-----回放
                    if(this.CONST.PLAYBACK_MODEL)this.view.game_start_playback(this.model.play_back_model);
                    //小6----检索自己动作人操作视图
                    this.view.update_self_action_btn_list(this.model.get_self_current_action());
                    if(type=="loadingOk"){
                        //小5-----解散房间检测
                        this.dissolution_room_pop();
                        //小6-----检测IP冲突
                        this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
                        //小7-----发送定位信息
                        this.model.send_location_info();
                        //小8----设置分享
                        this.model.set_game_share();
                    }
                }
                break;
            case this.CONST.ROOM_STATUS.PREPARE://等待
                MyConsole.getInstance().trace("-----》检测-等待场景--动态视图-room_control-"+type,"custom1");
                //第1步----更新桌面基础信息
                this.view.update_bg_base_view(base_info.room_id,base_info.game_num,base_info.game_max_num,base_info.self_location);
                //第2步----更新玩家基础信息
                this.model.set_zhuang_player();//设置不显示庄玩家
                this.view.update_user_base_view(this.model.get_user_wait_info_list());
                //第3步----更新风向-不显示风向
                this.view.update_current_location(5);
                //第4步---更新剩余牌
                this.view.update_surplus_card_num("0");
                //第5步-----如果玩家在小结算弹窗 刷新那么断线重连后 要主动发起一次准备ok 状态从 game切换到 PREPARED
                this.model.prepare_loading_ok_change_player_status();
                if(type=="loadingOk"){
                    //小5-----解散房间检测
                    this.dissolution_room_pop();
                    //小6-----检测IP冲突
                    this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
                    //小7-----发送定位信息
                    this.model.send_location_info();
                }
                break;
            default:
                MyConsole.getInstance().trace("重大失误,没有奇葩状态游戏层->房间场景->房间状态"+this.model.room_state,0);
                break;
        }
    }
    //牌局中-----动画
    private gameing_ani(){
        //开场动画
        MyConsole.getInstance().trace("->>开场动画");
        this.c_to_c_event_radio(this.EVENT.room_ani.start_ani,function () {
            //发牌动画
            MyConsole.getInstance().trace("->>发牌动画");
            this.view.game_send_card_ani(function () {
                //开混动画
                MyConsole.getInstance().trace("->>开混动画");
                this.c_to_c_event_radio(this.EVENT.room_ani.kai_hun_ani,{
                    hunPai_model:this.model.get_kai_hun_info(),
                    back_fun:function () {
                        //正式开局
                        this.flow_game_start();
                    }.bind(this)});
            }.bind(this));
        }.bind(this));
    }
    //牌局中-----开局补花动画
    private start_flower_ani(){
        var ani_info = {};
        ani_info["ani_list"] = this.model.get_hua_ani_info();
        if(ani_info["ani_list"]){
            setTimeout(function () {
                MyConsole.getInstance().trace("->>开局补花动画");
                this.view.update_all_user_card(false,this.CONST.CARD_TYPE.base_stop);
                ani_info["back_func"] = function () {
                    this.view.update_all_user_card(false,this.CONST.CARD_TYPE.hua_card);
                    this.model.reset_all_user_real_card();
                    this.view.update_all_user_card(false,this.CONST.CARD_TYPE.base_stop);
                    //第4步---更新剩余牌
                    this.view.update_surplus_card_num(this.model.get_residue_pai_num());
                    //小5----检索自己动作人操作视图
                    this.view.update_self_action_btn_list(this.model.get_self_current_action());
                }.bind(this);
                this.c_to_c_event_radio(this.EVENT.room_ani.start_flower_ani,ani_info);
            }.bind(this),2000);
        }else{
            //小5----检索自己动作人操作视图
            this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
    }
    //-------------------------------游戏整体流程---------------------------
    //1.1新人加入房间
    private  flow_join(info){
        if(!this.checkout_room_state())return;
        if(info.type==1){//刚进入 玩家状态还是 in
            //第1步---更新新玩家头像信息
            this.view.update_user_base_view(this.model.get_user_wait_info_list());
            //第2步---IP冲突提示
            this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
            //第3步----设置分享
            this.model.set_game_share();
            //第4步---加入房间提示
            this.float_alert({type:"join",name:info.user_name});
        }else if(info.type==2){//刚进入 玩家状态
            //第1步----更新玩家基础信息
            this.view.update_user_base_view(this.model.get_user_wait_info_list());
            //第2步---房主踢人按钮显示
            this.model.set_houseOwner_tiren();
            //第3步-----更新开局按钮
            this.view.update_start_btn(this.model.judge_player_together());
        }
    }
    //2.退出/离开房间---发起
    private flow_leave(){
        if(!this.checkout_room_state())return;
        if(this.model.get_user_is_hose()){
            //解散房间
            this.c_to_c_event_radio(this.EVENT.base_popup.hint,{str:"当前解散房间，不消耗房卡,!",back_fun:function () {
                //第2步---回大厅
                this.model.leave_room();
            }.bind(this),_isAddCloseBtn:true});
        }else{ //其他人or代开模式下的房主
            this.model.leave_room();//离开房间
        }
    }
    //2.1退出/离开/解散房间---回应
    private flow_leave_respond(info){
        switch (Number(info.type)){
            case 1://玩家自己离开房间
                this.c_to_c_dis_event(this.EVENT.game.game_back_hall_scene);
                break;
            case 3://解散房间-自己是房主
                this.c_to_c_dis_event(this.EVENT.game.game_back_hall_scene);
                break;
            case 7://房间申请解散成功
                this.c_to_c_event_radio(this.EVENT.base_popup.hint,{str:"该房间已被房主解散!",back_fun:function () {
                    //第2步---回大厅
                    this.c_to_c_dis_event(this.EVENT.game.game_back_hall_scene);
                }.bind(this),_isAddCloseBtn:false});
                break;
            case 2://其他玩家离开房间
                if(!this.checkout_room_state())return;
                //第1步---更新新玩家头像信息
                this.view.update_user_base_view(this.model.get_user_wait_info_list());
                //第2步---房主踢人按钮显示
                this.model.set_houseOwner_tiren();
                //第3步-----更新开局按钮
                this.view.update_start_btn(this.model.judge_player_together());
                //第4步---IP冲突提示
                this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
                //第5步----设置分享
                this.model.set_game_share();
                //第6步---提示玩家离开 info.user_name
                this.float_alert({type:"leave",name:info.user_name});
                break;
            case 4://解散房间-自己不是房主
                //第1步---弹窗提示
                this.c_to_c_event_radio(this.EVENT.base_popup.hint,{str:"该房间已被房主解散!",back_fun:function () {
                    //第2步---回大厅
                    this.c_to_c_dis_event(this.EVENT.game.game_back_hall_scene);
                }.bind(this),_isAddCloseBtn:false});
                break;
            case 5://玩家自己被房主踢出房间
                //第1步---弹窗提示
                this.c_to_c_event_radio(this.EVENT.base_popup.hint,{str:"您已被房主踢出本房间!",back_fun:function () {
                    //第2步---回大厅
                    this.c_to_c_dis_event(this.EVENT.game.game_back_hall_scene);
                }.bind(this),_isAddCloseBtn:false});
                break;
            case 6://其他玩家被房主踢出房间
                if(!this.checkout_room_state())return;
                //第1步---更新新玩家头像信息
                this.view.update_user_base_view(this.model.get_user_wait_info_list());
                //第2步---房主踢人按钮显示
                this.model.set_houseOwner_tiren();
                //第3步-----更新开局按钮
                this.view.update_start_btn(this.model.judge_player_together());
                //第4步---IP冲突提示
                this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
                //第5步----设置分享
                this.model.set_game_share();
                //第6步---提示玩家离开 info.user_name
                this.float_alert({type:"kickout",name:info.user_name});
                break;
            default:
                MyConsole.getInstance().trace("重大失误 解散房间最终结果 类型不存在"+info.type,0);
                break;
        }
    }
    //3.房主开局---发起---回应之后--切换铺分/游戏场景
    private flow_sponsor_start(){
        if(!this.checkout_room_state())return;
        this.model.user_sponsor_wait();
    }
    //4.开局
    private flow_game_start(){
        if(!this.checkout_room_state())return;
        //小1----更新混牌显示
        this.view.update_kai_hun_card(this.model.get_kai_hun_info());
        //小2----更新玩家牌显示---手牌 吃碰杠牌 桌牌 最新手牌 最新桌牌
        this.view.update_all_user_card(true,0,this.CONST.CARD_TYPE.hua_card);
        //小3----更新当前动作人风向
        this.view.update_current_location(this.model.get_current_action_user_position());
        //小4----更新剩余牌
        this.view.update_surplus_card_num(this.model.get_residue_pai_num());
        //小5----开局补花动画
        this.start_flower_ani();
    }
    //5.动作-发起
    private initiate_action(action_info){
        MyConsole.getInstance().trace("--->发起动作");
        switch(action_info.player_action){
            case this.CONST.PLAYER_ACTION.system_deal_card://系统发牌
                //直接请求数据
                this.model.request_system_deal_card();
                break;
            case this.CONST.PLAYER_ACTION.play_card://出牌
                MyConsole.getInstance().trace("--->出牌");
                //第1步----处理牌数据
                var _is_hua = Base_card_model.act_code_get_info(action_info.action).type==this.CONST.PLAYER_ACTION.hua;
                this.model.delete_user_card(null,action_info.action,action_info.action,_is_hua);
                //第2步----更新自己为上个动作人
                this.model.set_self_last_chuPai_user();//预设最新出牌人
                this.model.set_self_last_action(action_info.action);
                //第3步----提前处理视图
                this.flow_action_play_card({type:"self",card_start_point:action_info.point,act_code:action_info.action,is_hua:_is_hua});
                //第4步----请求
                this.model.request_player_action(action_info.action);
                break;
            case this.CONST.PLAYER_ACTION.chi://吃
                MyConsole.getInstance().trace("--->吃");
                //第1步----更新自己为上个动作人
                this.model.set_self_last_action(action_info.action);
                //第2步----提前处理视图
                this.flow_action_chi({type:"self"});
                //第3步----请求
                this.model.request_player_action(action_info.action);
                break;
            case this.CONST.PLAYER_ACTION.peng://碰
                MyConsole.getInstance().trace("--->碰");
                //第1步----更新自己为上个动作人
                this.model.set_self_last_action(action_info.action);
                //第2步----提前处理视图
                this.flow_action_peng({type:"self"});
                //第2步----请求
                this.model.request_player_action(action_info.action);
                break;
            case this.CONST.PLAYER_ACTION.gang://杠
            case this.CONST.PLAYER_ACTION.an_gang://暗杠
                MyConsole.getInstance().trace("--->杠");
                //第1步----更新自己为上个动作人
                this.model.set_self_last_action(action_info.action);
                //第2步----提前处理视图
                this.flow_action_gang({type:"self"});
                //第2步----请求
                this.model.request_player_action(action_info.action);
                break;
            case this.CONST.PLAYER_ACTION.guo://过
                MyConsole.getInstance().trace("--->过");
                //第1步----更新自己为上个动作人
                this.model.set_self_last_action(action_info.action);
                //第2步----提前处理视图
                this.flow_action_guo({type:"self"});
                //第2步----请求
                this.model.request_player_action(action_info.action);
                break;
            case this.CONST.PLAYER_ACTION.hu://胡
                MyConsole.getInstance().trace("--->胡");
                //第2步----请求
                this.model.request_player_action(action_info.action);
                break;
            default:
                MyConsole.getInstance().trace("--->当前动作还没做处理，game_room_control"+action_info.player_action,0);
                break;
        }
    }
    //5.1动作-系统发牌
    private flow_action_system_deal(info){
        if(!this.checkout_room_state())return;
        var deal_user_is_self=info.deal_user_is_self;//被发牌人是否是自己
        //第1步----更新当前动作人/上个动作人 信息
        this.model.set_action_info();
        //第2步---更新玩家牌信息
        this.view.update_all_user_card();
        //第3步---更新当前动作人风向
        this.view.update_current_location(this.model.get_current_action_user_position());
        //第4步---更新剩余牌
        this.view.update_surplus_card_num(this.model.get_residue_pai_num());
        //第5步---检索自己动作人操作视图
        if(!info._is_liu_ju)this.view.update_self_action_btn_list(this.model.get_self_current_action());
        if(!info.is_hua && deal_user_is_self){//普通发牌
            //第6步---提示出牌操作动画
            this.c_to_c_event_radio(this.EVENT.room_ani.tips_send_card_ani,this.model.get_tips_card_ani_bl());
            //更新系统剩余牌---测试系统用
            this.model.update_systemSendCard();
        }
    }
    //5.2动作-玩家出牌
    private flow_action_play_card(info){
        if(!this.checkout_room_state())return;
        var type=info.type;
        var act_code=info.act_code;//牌
        if(type=="self"){//自己发起
            MyConsole.getInstance().trace("--->自己_出牌1");
            //为了达到良好的交互体验
            //其他玩家的动作视图刷新在收到动作回应之后  自己发起的动作在发起之前就开始做视图处理了
            //小1设置最新出牌人
            this.model.set_new_send_card_user();
            //小2更新手牌
            this.view.update_all_user_card(false,this.CONST.CARD_TYPE.base_stop);
            if(!info.is_hua){//非花牌---》》走正常出牌接口
                //小3播放出牌动画
                var send_card_info=this.model.get_last_action_send_card_info(act_code);
                send_card_info.back_fun=function () {
                    //小3更新桌牌
                    this.view.update_all_user_card(false,this.CONST.CARD_TYPE.play);
                    //他自己出牌后自己不会有任何动作 所以不用检索
                }.bind(this);
                this.c_to_c_event_radio(this.EVENT.room_ani.user_send_card,send_card_info);
            }else{
                var info = this.model.get_last_action_cpgh_ani_info();
                info.back_fun = function () {
                    this.view.update_all_user_card(false,this.CONST.CARD_TYPE.hua_card);
                }.bind(this);
                this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani,info)
            }
        }else if(type=="accept_self"){//自己接收到自己动作
            MyConsole.getInstance().trace("--->自己_出牌2");
            //小1立即删除老的提示动画
            this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips,null);
            //小2更新风向
            this.view.update_current_location(this.model.get_current_action_user_position());//小7---检索自己动作人操作视图
            if(!info._is_liu_ju)this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }else{//接收到其他人动作
            MyConsole.getInstance().trace("--->别人_出牌");
            //小1---更新手牌
            this.view.update_all_user_card(false,this.CONST.CARD_TYPE.base_stop);
            //小2---立即删除老的提示动画
            this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips,null);
            //tyq: 动画结束后
            if(!info.is_hua){
                //小3---播放出牌动画
                var send_card_info=this.model.get_last_action_send_card_info(act_code);
                send_card_info.back_fun=function () {
                    //小3------设置最新出牌人
                    this.model.set_new_send_card_user();
                    //小4-----更新当前动作人手牌和桌牌
                    this.view.update_all_user_card(false,this.CONST.CARD_TYPE.play);
                    //小5---更新风向
                    this.view.update_current_location(this.model.get_current_action_user_position());
                    //小6----提示牌动画  -1当前玩家有操作 不消失
                    if(!info.is_hua){
                        send_card_info.remove_time=this.model.get_self__is_cpg_action()?-1:2000;//消失时间
                        this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips,send_card_info);
                    }
                    //小7---检索自己动作人操作视图
                    if(!info._is_liu_ju)this.view.update_self_action_btn_list(this.model.get_self_current_action());
                }.bind(this);
                this.c_to_c_event_radio(this.EVENT.room_ani.user_send_card,send_card_info);
            }else{
                var info = this.model.get_last_action_cpgh_ani_info();
                info.back_fun = function () {
                    //小3------设置最新出牌人
                    this.model.set_new_send_card_user();
                    //小4-----更新当前动作人手牌和桌牌
                    this.view.update_all_user_card(false,this.CONST.CARD_TYPE.hua_card);
                    //小5---更新风向
                    this.view.update_current_location(this.model.get_current_action_user_position());
                    //小7---检索自己动作人操作视图
                    if(!info._is_liu_ju)this.view.update_self_action_btn_list(this.model.get_self_current_action());
                }.bind(this);
                this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani,info)
            }
        }
    }
    //5.3动作-玩家吃
    private flow_action_chi(info){
        if(!this.checkout_room_state())return;
        var type=info.type;

        if(type=="self") {//自己发起
            MyConsole.getInstance().trace("--->自己_吃1");
            //大牌提示动画消失
            this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips);
            //播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani,this.model.get_last_action_cpgh_ani_info());
        }else if(type=="accept_self") {//自己发起
            MyConsole.getInstance().trace("--->自己_吃2");
            //小1设置最新出牌人
            this.model.set_new_send_card_user();
            //小2-----更新当前动作人手牌和 上个出牌人桌牌
            this.view.update_all_user_card(false);
            //小3---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小4---检索自己动作人操作视图
            if(!info._is_liu_ju)this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }else{
            //小1-----播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani,this.model.get_last_action_cpgh_ani_info());
            //小2设置最新出牌人
            this.model.set_new_send_card_user();
            //小3-----更新当前动作人手牌和 上个出牌人桌牌
            this.view.update_all_user_card(false);
            //小4---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小5---检索自己动作人操作视图---别人不会有动作
            //this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
    }
    //5.4动作-玩家碰
    private flow_action_peng(info){
        if(!this.checkout_room_state())return;
        var type=info.type;
        var position=info.position;//方位
        if(type=="self") {//自己发起
            MyConsole.getInstance().trace("--->自己_碰1");
            //大牌提示动画消失
            this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips);
            //播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani,this.model.get_last_action_cpgh_ani_info());
        }else if(type=="accept_self") {//自己发起
            MyConsole.getInstance().trace("--->自己_碰2");
            //小1设置最新出牌人
            this.model.set_new_send_card_user();
            //小2-----更新当前动作人手牌和 上个出牌人桌牌
            this.view.update_all_user_card(false);
            //小3---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小4---检索自己动作人操作视图
            if(!info._is_liu_ju)this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }else{
            MyConsole.getInstance().trace("--->别人_碰");
            //小1-----播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani,this.model.get_last_action_cpgh_ani_info());
            //小2设置最新出牌人
            this.model.set_new_send_card_user();//设置最新出牌人
            //小3-----更新当前动作人手牌和 上个出牌人桌牌
            this.view.update_all_user_card(false);
            //小4---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小5---检索自己动作人操作视图---别人不会有动作--回放恢复
            this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
    }
    //5.5.动作-玩家杠
    private flow_action_gang(info){
        if(!this.checkout_room_state())return;
        var type=info.type;
        var position=info.position;//方位
        if(type=="self") {//自己发起
            MyConsole.getInstance().trace("--->自己_杠1");
            //大牌提示动画消失
            this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips);
            //播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani,this.model.get_last_action_cpgh_ani_info());

        }else if(type=="accept_self") {//自己发起
            MyConsole.getInstance().trace("--->自己_杠2");
            //小2-----更新当前动作人手牌和 上个出牌人桌牌
            this.model.set_new_send_card_user();//设置最新出牌人
            this.view.update_all_user_card(false);
            //小3---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小4---检索自己动作人操作视图
            if(!info._is_liu_ju)this.view.update_self_action_btn_list(this.model.get_self_current_action());
            // //实时扣除分数动画   //tyq: 丹阳不需要
            // this.c_to_c_event_radio(this.EVENT.room_ani.score_ani,{
            //     list:this.model.get_current_gang_score_info(),
            //     back_fun:function () {
            //         //更新实时分数
            //         this.view.update_user_score();
            //     }.bind(this)
            // });
        }else{
            MyConsole.getInstance().trace("--->别人_杠");
            //小1-----播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani,this.model.get_last_action_cpgh_ani_info());
            //小2-----更新当前动作人手牌和 上个出牌人桌牌
            this.model.set_new_send_card_user();//设置最新出牌人
            this.view.update_all_user_card(false);
            //小3---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小4---检索自己动作人操作视图----抢杠胡
            if(!info._is_liu_ju)this.view.update_self_action_btn_list(this.model.get_self_current_action());
            // //实时扣除分数动画  //tyq: 丹阳不需要
            // this.c_to_c_event_radio(this.EVENT.room_ani.score_ani,{
            //     list:this.model.get_current_gang_score_info(),
            //     back_fun:function () {
            //         //更新实时分数
            //         this.view.update_user_score();
            //     }.bind(this)
            // });
        }
    }
    //5.6.动作-玩家胡--------衔接发起小结算
    private flow_action_hu(info){
        if(!this.checkout_room_state())return;
        //大牌提示动画消失
        this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips);
        //播放动画
        var ani_info=this.model.get_last_action_cpgh_ani_info();
        ani_info.hu_base_type=info.hu_base_type;
        ani_info.position=info.position;//点炮和自摸风向不固定
        ani_info.back_fun=function () {
            //请求小结算
            if(info.state&&info.state==this.CONST.ROOM_STATUS.PREPARE)this.model.request_account();
            else MyConsole.getInstance().trace("胡动画之后没有请求小结算,因为state不对",0);
        }.bind(this);
        this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani,ani_info);
    }
    //5.7动作-过
    private flow_action_guo(info){
        if(!this.checkout_room_state())return;
        var type=info.type;
        if(type=="self") {//自己发起
            MyConsole.getInstance().trace("--->自己_过1");
            //播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani,this.model.get_last_action_cpgh_ani_info());
        }else if(type=="accept_self") {//自己发起
            MyConsole.getInstance().trace("--->自己_过2");
            //小4---检索自己动作人操作视图
            if(!info._is_liu_ju)this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }else{
            MyConsole.getInstance().trace("--->别人_过");
            //小4---检索自己动作人操作视图
            if(!info._is_liu_ju)this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
    }
    //5.8流局
    private flow_action_liuju(){
        if(!this.checkout_room_state())return;
        MyConsole.getInstance().trace("--->流局");
        //立即删除老的提示大牌动画
        this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips,null);
        //播放动画
        this.c_to_c_event_radio(this.EVENT.room_ani.liu_ju_ani,{
            back_fun:function () {
                //请求小结算
                this.model.request_account();
            }.bind(this)
        });
    }
    //6.小结算---回应
    private flow_account(model){
        if(!this.checkout_room_state())return;
        //第1步----更新桌面基础信息
        var base_info=this.model.get_base_info();
        this.view.update_bg_base_view(null,base_info.game_num,base_info.game_max_num,null);
        //第2步----更新风向-不显示风向
        this.view.update_current_location(-1);
        //第3步----更新剩余牌
        this.view.update_surplus_card_num(0);
        //弹出窗
        this.c_to_c_event_radio(this.EVENT.room_to_pop.add_xjs_pop,model);
    }
    //6.1小结算准备---发起----衔接发起大结算  ---回放结束 点击继续结束 点击home返回大厅
    private flow_account_wait_request(){
        if(this.CONST.PLAYBACK_MODEL){
           this.play_back_home();
        }else{
            if(this.model.get_last_game_num()>0){
                if(this.model.room_state==this.CONST.ROOM_STATUS.PLAY||this.model.room_state==this.CONST.ROOM_STATUS.PREPARE){
                    this.model.user_sponsor_wait("cut_scene");
                }else{
                    MyConsole.getInstance().trace("小结算发起准备,此时房间状态不对-"+this.model.room_state,0);
                }
            }else{
                //发起大结算
                this.flow_DJS_request();
            }
        }
    }
    //6.2.小结算准备
    private flow_account_wait(){
        if(!this.checkout_room_state())return;
        //第1步----更新玩家基础信息
        this.model.set_zhuang_player();//设置庄玩家
        this.view.update_user_base_view(this.model.get_user_wait_info_list());
    }
    //7.1大结算----发起
    private flow_DJS_request(){
        this.model.request_djs();
    }
    //7.2大结算----回应
    private flow_over(DJS_model:DJS_model){
        if(!this.checkout_room_state())return;
        this.c_to_c_event_radio(this.EVENT.room_popup.add_djs_pop,DJS_model);
    }

    //回放结束-返回大厅
    private play_back_home(){
        this.model.clear_play_back_info();
        //返回大厅
        setTimeout(function () {
            this.c_to_c_event_radio(this.EVENT.game.game_play_back_hall_scene);
        }.bind(this),100);
    }
    //回放中途停止
    private play_back_half_over(){
        this.c_to_c_event_radio(this.EVENT.base_popup.hint,{str:"回放已结束，请返回大厅!",back_fun:function () {
            this.play_back_home();
        }.bind(this),_isAddCloseBtn:false});
    }
    //-------------------------------弹窗---------------------------
    //分享弹框
    private add_share_pop(){
        this.c_to_c_event_radio(this.EVENT.room_popup.share_popup);
    }
    //设置弹框
    private add_room_setting_pop(){
        //tyq: 只有开局后，才能通过设置弹框发起解散
        var _is_show_kill_btn = (this.model.room_state!=this.CONST.ROOM_STATUS.SHORT_BOARD && this.model.room_state!=this.CONST.ROOM_STATUS.INIT);
        this.c_to_c_event_radio(this.EVENT.room_popup.setup_popup,_is_show_kill_btn);
    }
    //聊天弹框
    private add_room_chitchat_pop(){
        if(!this.checkout_room_state())return;//zwb修改:需求说开局前也开放聊天功能  2018.5.15.19:47
        this.c_to_c_event_radio(this.EVENT.room_popup.chitchat);
        // //tyq: 开局后，再开放聊天功能
        // if(this.model.room_state!=this.CONST.ROOM_STATUS.SHORT_BOARD && this.model.room_state!=this.CONST.ROOM_STATUS.INIT){
        //     this.c_to_c_event_radio(this.EVENT.room_popup.chitchat);
        // }
    }
    //发起聊天
    private sponsor_chat(data){
        this.model.send_player_chat_status(data);
    }
    //接受---》聊天数据
    private r_player_chat_status(info){
        this.c_to_c_event_radio(this.EVENT.room_ani.play_chat_ani,info);
    }
    //规则-弹框
    private add_room_rule_pop(info){
        if(!this.checkout_room_state())return;
        var rule_str = this.model.get_wait_state_info().rule_tips;
        info.str= rule_str.replace(/,/g,"\r\n");
        this.c_to_c_event_radio(this.EVENT.room_popup.add_rule_pop,info);
    }

    //获取定位信息
    private get_location_info(){
        this.model.get_location_info();
    }
    //定位弹框
    private add_room_location_pop(location_model:Location_model){
        if(!this.checkout_room_state())return;
        this.c_to_c_event_radio(this.EVENT.room_popup.location,location_model)
    }

    //解散房间pop1.1-----发起
    public dissolution_room_request(){
        //在这里获取roomId和userId;
        var data={roomId:this.model.get_roomId(),userId:this.CONST.USERID};
        this.model.send_room_dissolution_room(data);
    }
    //解散房间pop1.2-----回应
    private dissolution_room_pop(){
        var dis_model:Dissolve_room_model=this.model.get_dissolveRoom_model();
        if(dis_model&&this.model.room_state!=this.CONST.ROOM_STATUS.SHORT_BOARD){
            this.c_to_c_event_radio(this.EVENT.room_popup.r_room_dissolution_room,dis_model);
        }
    }
    //解散房间pop1.3----同意or拒绝
    private dissolution_room_responses(num){
        this.model.send_room_is_diss_room(num);
    }
    //解散房间pop1.4----成功
    private dissolution_room_ok(){
        //发起大结算
        this.flow_DJS_request();
    }
    //个人信息pop
    private add_user_info_pop(user_id){
        var model=this.model.room_user_id_get_user_model(user_id);
        // 获取个人信息所需要的数据;
        var user_info = {
            "userId":model.userId,
            "userName":model.userName,
            "userImg":model.userImg,
            "userIp":model.ip,
            "userMoney":model.money,
            "gender":model.gender
        };
        //给弹出窗层--执行视图
        this.c_to_c_event_radio(this.EVENT.base_popup.look_user_info,user_info);
    }
    //改变房卡数量;
    private change_money(num){
        this.c_to_c_event_radio(this.EVENT.room_to_hall.room_change_money,num);
    }
    //房主踢人
    private kicking_user_popup(info){
        //1.第一步弹窗框
        this.c_to_c_event_radio(this.EVENT.base_popup.hint,{str:"确定要移出"+info.user_name+"吗!",back_fun:function () {
            //2.走接口
            this.model.kicking_user(info.userId);
        }.bind(this),_isAddCloseBtn:true});
    }
    //zpb:浮层提示框
    protected float_alert(info){
        var tipStr;
        switch(info.type){
            case "leave":
                tipStr = "玩家 <font color='#ff0000'>"+info.name+"</font> 离开房间";
                break;
            case "kickout":
                tipStr = "玩家 <font color='#ff0000'>"+info.name+"</font> 被踢出房间";
                break;
            case "join":
                tipStr = "玩家 <font color='#ffff00'>"+info.name+"</font> 加入房间";
                break;
            case "online_2":
                tipStr = "玩家 <font color='#ff0000'>"+info.name+"</font> 掉线";
                break;
            case "online_1":
                tipStr = "玩家 <font color='#ffff00'>"+info.name+"</font> 上线";
                break;
        }
        if(tipStr)this.c_to_c_event_radio(this.EVENT.base.base_float_alert,{str:tipStr});
    }
    //--------------------------------------------------------------------
    //校验视图场景
    protected  checkout_room_state(){
        if(this.model.room_load_state==this.CONST.ROOM_LOAD_STATUS.LOAD_OK)return true;
        return false;
    }
    //移除视图
    public remove_view(){
        super.remove_view();
    }
}