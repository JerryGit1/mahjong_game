/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Game_room_model extends Scene_model{
    public EVENT:Game_room_event_model=new Game_room_event_model();//事件常量
    protected _room_load_state:number=-1;//房间加载状态，默认为-1
    protected _room_state:number=-1;//房间状态
    protected info_model:Room_info_model;//tyq: 基础房间信息model
    public play_back_model:Play_back_model;//回放model
    private room_circleNum:number;      //cj:当前房间圈数;
    public constructor(){
        super();
    }
    public user_group_model:User_group_model;
    protected socket_model:Web_socket_service;
    public set_model(user_group_model,socket_model){
        this.user_group_model=user_group_model;
        this.socket_model=socket_model;

        this.info_model=new Room_info_model();
        this.play_back_model=new Play_back_model();
        this.play_back_model.set_model(this.socket_model,this.user_group_model);
        //tyq: 添加回放中途停止监听
        this.play_back_model.m_to_c_add_event(this.EVENT.base.playback_half_over,this.play_back_half_over,this);
        //侦听服务器事件
        //zpb: 大厅----新加入玩家
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_joinRoom,this.other_join_room,this);
        //zpb: 俱乐部----新加入玩家
        this.socket_model.add_port_event(this.PORT.CONFIG.club_join_room,this.other_join_room,this);
        //zpb:玩家准备回应
        this.socket_model.add_port_event(this.PORT.CONFIG.game_settlementWaitOk,this.opening_or_small_settlement_confirm,this);
        //zpb:玩家离开房间or房主解散房间
        this.socket_model.add_port_event(this.PORT.CONFIG.game_quitRoom,this.quit_room,this);
        //zpb:房主踢人回应
        //this.socket_model.add_port_event(this.PORT.CONFIG.hall_deleteUser,this.quit_room,this);
        //zpb: 代开房间玩家被踢回应
        this.socket_model.add_port_event(this.PORT.CONFIG.game_beRemovedPlayer,this.kickout_room,this);
        //zpb:玩家执行动作回应
        this.socket_model.add_port_event(this.PORT.CONFIG.game_executeAction_respond,this.game_player_action_respond,this);
        //zpb:小结算回应
        this.socket_model.add_port_event(this.PORT.CONFIG.game_smallSettlement,this.game_smallSettlement_respond,this);
        //tyq: 玩家上线 or 掉线
        this.socket_model.add_port_event(this.PORT.CONFIG.game_on_or_Live_State,this.update_user_line_status,this);
        //大结算回应;
        this.socket_model.add_port_event(this.PORT.CONFIG.game_bigSettlement,this.game_bigSettlement_respond,this);
        //房间解散房间申请回应;
        this.socket_model.add_port_event(this.PORT.CONFIG.game_dissolveRoom,this.game_dissolveRoom,this);
        //是否同意解散房间回应;
        this.socket_model.add_port_event(this.PORT.CONFIG.game_dissolveRoomAgree,this.game_dissolveRoom,this);
        //聊天回应;
        this.socket_model.add_port_event(this.PORT.CONFIG.game_chatAni,this.update_player_chat_status,this);
        //定位信息回应
        this.socket_model.add_port_event(this.PORT.CONFIG.get_position_info,this.get_position_info,this);
    }
    //初始化数据
    public init_data(info){
        this._room_state = this.CONST.ROOM_STATUS.INIT;//zpb:房间状态初始化
        this.info_model.tips_card_ani=false;//出牌操作提示动画
        this.info_model.xjs_clear_info();//房间信息数据清理
        this.info_model.djs_clear_info();//大结算清理
        this.CONST.set_card_data();//设置牌常量数据
        this.update_room_info(info);//更新房间中信息

        //当前房间圈数;
        this.room_circleNum=info.roomInfo.circleNum;

    }
    //更新视图----特殊情况下比如 已经在房间里了 去刷新大接口
    //或者场景之间切换
    public update_view(type="relink"){
        MyConsole.getInstance().trace("-----》刷新大接口视图 -room_model","custom1");
        this.m_to_c_dis_event(this.EVENT.room.update_room_view,type);
    }
    /***-------------------核心数据处理模块（断线重连）--------------------------------*
     * 处理 【大接口/断线重连/刷新】 数据 zpb:处理【房间状态】数据
     * 先有model数据再有 scene中的view view注册侦听  等待数据变化
     * 1.缺人场景 2.牌局中（打牌过程中）场景   3.等待（一小局结束）场景
     * 1,3场景相似
     * */
    private update_room_info(info){
        this.room_state= info.roomInfo.state;
        //第1步-----更新准备层房间信息
        this.info_model.init_data(info.roomInfo);
        //第2步-----更新其他玩家基础信息 (玩家的牌信息通过大接口清空数据) 设置基础信息 设置房主 其他玩家牌数信息
        this.user_group_model.update_all_user_base_info(info.anotherUsers,this.info_model.userId,this.info_model.roomType);
        //第3步----设置房主信息
        if(this.user_group_model.get_home_user_info())this.info_model.userName=this.user_group_model.get_home_user_info().userName;
        //第4步----根据不同场景 处理各自需要处理的数据
        switch (this.room_state){
            case this.CONST.ROOM_STATUS.SHORT_BOARD://缺人
                MyConsole.getInstance().trace("-----》处理大接口数据-缺人场景-room_model","custom1");
                break;
            case this.CONST.ROOM_STATUS.PLAY://牌局中
                MyConsole.getInstance().trace("-----》处理大接口数据-牌局场景-room_model","custom1");
                //第1步----解散房间信息
                this.info_model.set_dissolveRoom_info(info.roomInfo.dissolveRoom,this.user_group_model);
                //第2步----设置当前动作人和动作
                if(info.roomInfo.currActionUserId){
                    this.info_model.current_action_user=info.roomInfo.currActionUserId;
                    //zpb:3.0API修改
                    if(info.roomInfo.currAction){
                        this.info_model.current_action_list=info.roomInfo.currAction;
                        // if(this.CONST.PLAYBACK_MODEL){
                        //     this.set_self_last_action(this.info_model.current_action_list[0]);
                        //     // this.user_group_model.set_action_user_info(null,null,this.info_model.last_action_user,this.info_model.last_action);
                        // }
                    }
                }

                // //tyq: 临时为了回放加的
                // if(info.roomInfo.nextActionUserId){
                //     this.info_model.current_action_user = info.roomInfo.nextActionUserId;
                //     if(info.roomInfo.nextAction)
                //         this.info_model.current_action_list=info.roomInfo.nextAction;
                // }


                //第3步----zpb:3.0API设置系统最新发牌人和系统最新出牌人
                if(info.roomInfo.lastFaUserId){
                    this.info_model.lastFaUserId=info.roomInfo.lastFaUserId;
                    //最新系统牌 隔开
                    if(this.info_model.lastFaUserId==this.info_model.current_action_user){
                        this.info_model.last_action_user=this.info_model.lastFaUserId;
                        this.info_model.last_action=this.CONST.PLAYER_ACTION.system_deal_card;
                    }
                }
                if(info.roomInfo.lastChuUserId){
                    this.info_model.lastChuUserId=info.roomInfo.lastChuUserId;
                }
                //第4步----混牌
                if(info.roomInfo.dingHunPai)this.info_model.dingHunPai=info.roomInfo.dingHunPai;
                //第5步----所有玩家的牌
                var arr=[{
                    userId:this.user_group_model.position_id_get_user_model(1).userId,
                    pais:info.currentUser.pais,
                    chuList:info.currentUser.chuList,
                    actionList:info.currentUser.actionList,
                    huaList:info.currentUser.huaList,
                    dingHunPai:this.info_model.dingHunPai
                }];
                for(var i in info.anotherUsers){
                    arr.push({
                        userId:info.anotherUsers[i].userId,
                        pais:info.anotherUsers[i].pais,
                        chuList:info.anotherUsers[i].chuList,
                        actionList:info.anotherUsers[i].actionList,
                        huaList:info.anotherUsers[i].huaList,
                        dingHunPai:this.info_model.dingHunPai
                    });
                }
                this.user_group_model.set_user_card_info_relink(arr);
                //第6步----设置上个出牌人的牌
                if(this.info_model.lastChuUserId){
                    var card_model=this.user_group_model.get_card_user_new_play_card_info(this.info_model.lastChuUserId);
                    if(card_model)this.info_model.lastChuCard=card_model.act_code;
                    else MyConsole.getInstance().trace("重大失误,没有找到上个出牌人出的那张牌",0);
                }
                // //第7步----游戏过程中产生的分进行结算--营口特有
                // this.user_group_model.set_relink_gane_score();
                //---------测试系统----更新系统牌列表
                if(this.user_group_model.position_id_get_user_model(1).position==1)this.update_systemSendCard();
                break;
            case this.CONST.ROOM_STATUS.PREPARE://等待
                MyConsole.getInstance().trace("-----》处理大接口数据-等待场景-room_model","custom1");
                //解散房间信息
                this.info_model.set_dissolveRoom_info(info.roomInfo.dissolveRoom,this.user_group_model);
                break;
            default:
                MyConsole.getInstance().trace("重大失误,没有奇葩状态游戏层->房间场景->房间状态"+this.room_state,0);
                break;
        }
        //更新房间号码测试
        this.socket_model.createRoomOk(this.info_model.roomId);
        //更新玩家实时手牌
        this.socket_model.setPlayStopCardInfo(this.user_group_model.position_id_get_user_model(1).userId,this.user_group_model.position_id_get_user_model(1).stop_card);
    }
    //-------------------------------获取数据------------------------------------------
    //获取基础信息
    public get_base_info(){
        return {
            room_id:this.info_model.roomId,
            game_num:Number(this.info_model.circleNum)-Number(this.info_model.lastNum)+1,
            game_max_num:this.info_model.circleNum,
            self_location:this.user_group_model.position_id_get_user_model(1).position
        }
    }
    //获取缺人场景信息
    public get_wait_state_info(){
        return{
            //本人要是房主，并且房间类型要为房主类型
            house_owner:this.user_group_model.position_id_get_user_model(1).houseOwner&&this.info_model.roomType==1,
            rule_tips:this.info_model.rule_tips,
        }
    }
    //获取等待场景信息
    public get_prepare_state_info(){
        return{
            houseOwner:this.user_group_model.position_id_get_user_model(1).houseOwner,
            rule_tips:this.info_model.rule_tips,
        }
    }
    //获取等待场景分享时所需信息
    public room_wait_share(){
        return{
            // roomId,totalNum,user_num,ruleText,house_own_name="未知",type
            roomId:this.info_model.roomId,
            totalNum:this.info_model.circleNum,
            ruleText:this.info_model.rule_tips,
            house_own_name:this.info_model.userName,
            type:this.info_model.roomType
        }
    }
    //获取所有玩家准备信息
    public get_user_wait_info_list(){
        //tyq: 临时屏蔽  2.0版看效果
        var self_model = this.user_group_model.position_id_get_user_model(1);
        if(self_model&&!self_model.houseOwner&&self_model.playStatus!=this.CONST.USER_PLAY_STATUS.PREPARED){
           this.user_sponsor_wait();
        }
        return this.user_group_model.get_wait_info_list();
    }
    //解散房间信息
    public get_dissolveRoom_model():Dissolve_room_model{
        return this.info_model.dissolveRoom_model;
    }
    //获取IP冲突信息
    public get_ip_conflict_tip(){
        return this.info_model.check_ip_same(this.user_group_model.get_user_ip_info());
    }
    //获取当前玩家应不应该 弹出开局按钮
    public judge_player_together(){
        var self_model:User_model=this.user_group_model.position_id_get_user_model(1);
        if(self_model.playStatus==this.CONST.USER_PLAY_STATUS.ROOM_IN){
            //除了房主都要发起准备
            var roomId=""+this.info_model.roomId;//18/6/26-11:11 zwb:俱乐部房间创建人 默认房主模式  roomType=1
            if(roomId.length==7&&this.info_model.userId==self_model.userId){
                this.info_model.roomType=1;
            }
            if(this.info_model.roomType==1){//房主模式
                if(self_model.houseOwner){
                    //人是否凑齐
                    return this.user_group_model.get_user_is_all_join();
                }
            }else if(this.info_model.roomType==2) {//代开模式
                if(self_model.position==1){
                    //人是否凑齐
                    return this.user_group_model.get_user_is_all_join();
                }

            }
        }
        return 0;
    }
    //获取自己是否是房主
    public get_user_is_hose(){
        if(this.info_model.roomType==1){
            if(this.user_group_model.position_id_get_user_model(1).houseOwner){
                return true;
            }
        }
        return false;
    }
    //获取玩家的花牌信息
    protected get_hua_info():Array<any>{
        var is_null = true;
        var hua_list = [];
        for(var i=1;i<=this.user_group_model.user_max_num;i++){
            var user_model = this.user_group_model.position_id_get_user_model(i);
            if(user_model){
                if(user_model.hua_card.length>0) is_null = false;
                hua_list.push(user_model.hua_card);
                user_model.hua_card_is_change = true;
            }
        }
        if(is_null) hua_list = [];
        return hua_list;
    }
    //获取当前游戏开混牌信息------在这设置定混牌
    public get_kai_hun_info():Base_card_model{
        //更新玩家已经有的牌里的混牌
        if(this.info_model.dingHunPai){
            this.user_group_model.update_user_hun_card_info(this.info_model.hunPai);
            return new Base_card_model(this.info_model.dingHunPai,2,1);
        }
        return null;
    }
    //获取当前游戏混牌信息------在这设置混牌
    public get_current_hun_info():Base_card_model{
        //更新玩家已经有的牌里的混牌
        if(this.info_model.dingHunPai){
            return new Base_card_model(this.info_model.hunPai,2,1);
        }
        return null;
    }
    //获取当前动作人风向
    public get_current_action_user_position(type=""){
        var user_model:User_model;
        if(type=="relink"){
            //3.0API 风向固定
            if(this.info_model.position){//默认上个发牌人
                user_model = this.user_group_model.user_id_get_user_model(this.info_model.position);
                if(user_model) return user_model.position;
            }
        }else{
            //非断线重连判断当前动作人
            if(this.info_model.current_action_user){
                user_model=this.user_group_model.user_id_get_user_model(this.info_model.current_action_user);
                if(!user_model.current_action||user_model.current_action.length!=1){
                    //吃碰杠胡不更新风向 没有具体动作也不更新风向 因为其他人有吃碰杠胡动作 不告诉其他人具体动作
                    return null;
                }
                return user_model.position;
            }
        }

        return null;
    }
    //获取剩余牌信息
    public get_residue_pai_num(){
        return this.info_model.currMJNum;
    }
    //获取当前玩家自己的动作
    public get_self_current_action(){
        if(!this.CONST.PLAYBACK_MODEL){
            if(this.user_group_model.position_id_get_user_model(1).userId==this.info_model.current_action_user){
                return this.user_group_model.position_id_get_user_model(1).current_action;
            }
        }else{
            //回放模式下 所有人的动作都要显示
            if(this.info_model.current_action_user)
            return this.user_group_model.user_id_get_user_model(this.info_model.current_action_user).current_action;
        }
        return null;
    }
    //判断当前玩家自己是否有吃碰杠胡的动作
    public get_self__is_cpg_action(){
        var self_model:User_model=this.user_group_model.position_id_get_user_model(1);
        if(self_model.userId==this.info_model.current_action_user){
            if(self_model.current_action.length>1)return true;
        }
        return false;
    }
    //获取上个动作人 出牌动画需要的信息
    public get_last_action_send_card_info(act_code):any{
        var last_user_model=this.user_group_model.user_id_get_user_model(this.info_model.last_action_user);
        return {
            play_point:{x:last_user_model.send_stop_card_info.x,y:last_user_model.send_stop_card_info.y},
            stop_point:last_user_model.new_play_card_point,
            max_point:last_user_model.max_play_card_point,
            card_w:last_user_model.send_stop_card_info.w,
            gender:last_user_model.gender,
            card_model:new Base_card_model(act_code,this.CONST.CARD_TYPE.play,last_user_model.current_table_board_position,this.info_model.hunPai),
            max_card_model:new Base_card_model(act_code,this.CONST.CARD_TYPE.base_stop,last_user_model.current_table_board_position,this.info_model.hunPai)
        }
    }
    //获取上个动作人 吃碰杠胡动画需要的基础信息
    public get_last_action_cpgh_ani_info():any{
        var last_user_model=this.user_group_model.user_id_get_user_model(this.info_model.last_action_user);
        return {
            type:last_user_model.last_action.type,//动作类型
            position:last_user_model.current_table_board_position,
            gender:last_user_model.gender
        }
    }
    //获取 打出花牌===》 补花动画需要的基础信息
    public get_send_hua_card_ani_info():any{
        var last_user_model=this.user_group_model.user_id_get_user_model(this.info_model.last_action_user);
        return {
            type:last_user_model.last_action.type,//动作类型
            position:last_user_model.current_table_board_position,
            gender:last_user_model.gender
        }
    }

    //获取开局--》补花动画需要的基础信息
    public get_hua_ani_info():any{
        var hua_info_list = this.get_hua_info();
        if(hua_info_list.length==0) return false;
        MyConsole.getInstance().trace("->>开局补花动画");

        var ani_infos = [];
        for(var i=0;i<hua_info_list.length;i++){
            var user_model = this.user_group_model.position_id_get_user_model(i+1);
            user_model.hua_card_sort();
            this.info_model.currMJNum -= hua_info_list[i].length;
            var hua_pai = user_model.hua_card;
            var ani_info = {
                position:user_model.current_table_board_position,
                gender:user_model.gender,
                is_ani:hua_info_list[i].length>0?true:false,
                hua_card:hua_pai
            };
            if(ani_info.is_ani) user_model.delete_hua_from_stop();  //将手牌中的花牌删掉

            ani_infos.push(ani_info);
        }
        return ani_infos;
    }
    //tyq: 重置手牌
    public reset_all_user_real_card(){
        this.user_group_model.reset_user_real_card();
    }

    //获取当前杠分动画需要的数据
    public get_current_gang_score_info(){
        return this.user_group_model.current_score_info;
    }
    //出牌操作提示动画
    public get_tips_card_ani_bl(){
        return this.info_model.tips_card_ani;
    }
    //获取剩余局数
    public get_last_game_num(){
        return this.info_model.lastNum;
    }
    //-------------------------------设置数据------------------------------------------
    //加入房间后 玩家加入房间 并且资源加载完毕后 改变状态 in- 准备
    public shoart_board_loading_ok_change_player_status(){
        var self_model:User_model=this.user_group_model.position_id_get_user_model(1);
        if(self_model.playStatus==this.CONST.USER_PLAY_STATUS.ROOM_IN){
            //除了房主都要发起准备
            if(this.info_model.roomType==1){//房主模式
                if(!self_model.houseOwner){
                    MyConsole.getInstance().trace("房主模式(除房主)-----》加入房间发起准备","custom1");
                    this.user_sponsor_wait();
                }
            }else if(this.info_model.roomType==2) {//代开模式
                if(self_model.position!=1){
                    MyConsole.getInstance().trace("代开模式(除东位)-----》加入房间发起准备","custom1");
                    this.user_sponsor_wait();
                }
            }else{
                MyConsole.getInstance().trace("重大失误，未知的开房模式-"+this.info_model.roomType,0);
            }
        }
        self_model=null;
    }
    //如果玩家在小结算弹窗 刷新那么断线重连后 要主动发起一次准备ok 状态从  game切换到 PREPARED
    public prepare_loading_ok_change_player_status(){
        if(this.user_group_model.position_id_get_user_model(1).playStatus==this.CONST.USER_PLAY_STATUS.ROOM_IN){
            MyConsole.getInstance().trace("-----》小结算发起准备","custom1");
            //不论谁都要发起一次小结算
            this.user_sponsor_wait();
        }
    }
    //设置--房主踢人功能
    public set_houseOwner_tiren(){
        var bl=false; //缺人状态
        //缺人场景下房主可以踢人
        if(this.room_state==this.CONST.ROOM_STATUS.SHORT_BOARD&&this.user_group_model.position_id_get_user_model(1).houseOwner)bl=true;
        this.user_group_model.set_houseOwner_tiren(bl);
    }
    //设置--最新发牌人
    public set_new_deal_card_user(){
        this.user_group_model.set_new_deal_card_user(this.info_model.lastFaUserId);
    }
    //设置--最新出牌人
    public set_new_send_card_user(){
        this.user_group_model.set_new_send_card_user(this.info_model.lastChuUserId);
    }
    //设置-分享
    public set_game_share(){
        //this.info_model.userName = this.user_group_model.user_id_get_user_model(this.info_model.userId).userName; //tyq: 2.0版临时屏蔽看效果
        //设置分享
        if(this.room_state==this.CONST.ROOM_STATUS.SHORT_BOARD)
            this.info_model.set_share_info(this.user_group_model.get_room_user_num(),this.user_group_model.user_max_num);
        else  Weixin_JSSDK_model.getInstance().hallShare();//游戏中只能分享大厅信息
    }
    //设置-庄玩家
    public set_zhuang_player(){
        this.user_group_model.set_zhuang_user(this.info_model.zhuangPlayer);
    }
    //设置-动作人 上个和当前
    public set_action_info(){
        //设置最新动作人
        this.user_group_model.set_action_user_info(this.info_model.current_action_user,this.info_model.current_action_list,this.info_model.last_action_user,this.info_model.last_action,this.info_model.lastChuCard);
    }
    //设置-自己为上个动作人----动画需要
    public set_self_last_action(last_action){
        this.info_model.last_action_user=this.user_group_model.position_id_get_user_model(1).userId;
        this.info_model.last_action=last_action;
        this.user_group_model.set_action_user_info(null,null,this.info_model.last_action_user,this.info_model.last_action);
    }
    //设置自己最新出牌人
    public set_self_last_chuPai_user(){
        this.info_model.lastChuUserId=this.user_group_model.position_id_get_user_model(1).userId;
    }
    //删除玩家某张手牌 增加某张桌牌 或 增加花牌
    public delete_user_card(user_id,s_act_code,p_act_code,is_hua){
        if(!user_id)user_id=this.user_group_model.position_id_get_user_model(1).userId;
        this.user_group_model.user_remove_stop_card(user_id,s_act_code);
        if(!is_hua) this.user_group_model.user_add_play_card(user_id,p_act_code);
        else this.user_group_model.user_add_hua_card(user_id,p_act_code);
    }
    //设置回放数据
    public set_play_back_info(url,share_user_id,back_fun){
        this.play_back_model.load_file(url,share_user_id,back_fun);
    }
    //开始回放
    public start_play_back(){
        this.play_back_model.start();
    }
    //回放结束清理数据
    public clear_play_back_info(){
        this.play_back_model.over();
    }
    //中途停止监听
    private play_back_half_over(){
        this.m_to_c_dis_event(this.EVENT.base.playback_half_over);
    }
    //zpb:3.0API 解散房间清理数据
    public clear_room_info(){
        this.info_model.xjs_clear_info();//小结算数据清理
        this.info_model.djs_clear_info();//大结算清理
        this.user_group_model.set_xjs_user_info(true);//小结算玩家数据清理
        this._room_state = this.CONST.ROOM_STATUS.INIT;//zpb:房间状态初始化
    }
    //----------------------------------socket发起---------------------------------------
    /**
     * 玩家发起-准备OK
     * 在一下3种情况下会调用
     * 1.非房主 刚进入房间（正常下）
     * 2.房主 发起开局（正常下）
     * 3.小局结束点击下一局按钮（此处有2地方需要判定 （正常下，断线重连））
     */
    public user_sponsor_wait(type=""){
        if(type=="cut_scene"){
            //模拟切换 良好体验-0-----玩家小结算准备直接切换场景
            this.room_state=this.CONST.ROOM_STATUS.PREPARE;
            this.info_model.zhuangPlayer=null;//不显示庄了
            this.info_model.xjs_clear_info();//小结算数据清理
            this.user_group_model.set_xjs_user_info();//小结算玩家数据清理
            this.update_view();
        }
        if(this.user_group_model.position_id_get_user_model(1).playStatus!=this.CONST.USER_PLAY_STATUS.PREPARED){
            var data:any={
                roomId:this.info_model.roomId,
                userId:this.user_group_model.position_id_get_user_model(1).userId
            };
            this.socket_model.small_settle_prepare(data);
        }
    }
    //玩家发起离开/解散房间
    public leave_room(){
        if(this.room_state==this.CONST.ROOM_STATUS.SHORT_BOARD){
            this.socket_model.quit_room({
                roomId:this.info_model.roomId,
                userId:this.user_group_model.position_id_get_user_model(1).userId
            });
        }else{
            MyConsole.getInstance().trace("重大失误,当前阶段无法发起离开房间",0);
        }
    }
    //tyq: 2.0版 临时屏蔽看效果
    ////玩家-》设置弹框-》解散房间
    //public sponsor_dissolve_room(){
    //    if(this.room_state==this.CONST.ROOM_STATUS.PLAY || this.room_state==this.CONST.ROOM_STATUS.PREPARE){
    //        this.socket_model.sponsorDissolveRoom({
    //            roomId:this.info_model.roomId,
   //             userId:this.user_group_model.position_id_get_user_model(1).userId
   //         });
   //     }else{//非法状态
   //         var data = {
   //             text:"当前阶段无法发起解散房间!",
  //              is_add_close_btn:true
  //          };
   //         this.m_to_c_dis_event(this.EVENT.room_popup.normal_tip,data);
   //     }
// }
    //发送定位信息
    public send_location_info(){
        //先获取定位信息
        Weixin_JSSDK_model.getInstance().get_position(function (x,y) {
            if(this.info_model.roomId){
                //发送数据
                this.socket_model.send_position_info({
                    x_index:Math.floor(x),
                    y_index:Math.floor(y),
                    userId:this.user_group_model.position_id_get_user_model(1).userId
                });
            }
        }.bind(this));
    }
    //获取定位信息数据
    public get_location_info(){
        this.socket_model.get_position_info({
            userId:this.user_group_model.position_id_get_user_model(1).userId,
            roomId:this.info_model.roomId
        });
    }
    //房主踢人
    public kicking_user(userId){
        if(this.room_state==this.CONST.ROOM_STATUS.SHORT_BOARD){
            if(this.user_group_model.position_id_get_user_model(1).houseOwner){
                if(this.user_group_model.user_id_get_user_model(userId).current_table_board_is_join){
                    this.socket_model.delete_user({
                        roomId:this.info_model.roomId,
                        userId:userId
                    });
                }else{
                    MyConsole.getInstance().trace("重大失误,你要踢的人不存在",0);
                }
            }else{
                MyConsole.getInstance().trace("重大失误,非房主无法踢人",0);
            }
        }else{
            MyConsole.getInstance().trace("重大失误,当前阶段无法发起房主踢人",0);
        }
    }
    //动作-请求系统发牌
    public request_system_deal_card(){
        if(this.info_model.current_action_user==this.user_group_model.position_id_get_user_model(1).userId){
            if(this.room_state==this.CONST.ROOM_STATUS.PLAY){
                MyConsole.getInstance().trace("请求系统发牌");
                this.socket_model.execute_action({
                    action:this.CONST.PLAYER_ACTION.system_deal_card,
                    roomId:this.info_model.roomId,
                    userId:this.user_group_model.position_id_get_user_model(1).userId
                });
            }else{
                MyConsole.getInstance().trace("重大失误,房间状态不对-请求系统发牌",0);
            }
        }else{
            MyConsole.getInstance().trace("重大失误,你不是当前动作人-请求系统发牌",0);
        }
    }
    //动作-请求出牌/吃/碰/杠
    public request_player_action(action){
        if(this.info_model.current_action_user==this.user_group_model.position_id_get_user_model(1).userId){
            if(this.room_state==this.CONST.ROOM_STATUS.PLAY){
                MyConsole.getInstance().trace("发起动作-出牌/吃/碰/杠/过/胡");
                this.socket_model.execute_action({
                    action:action,
                    roomId:this.info_model.roomId,
                    userId:this.user_group_model.position_id_get_user_model(1).userId
                });
            }else{
                MyConsole.getInstance().trace("重大失误,房间状态不对-请求系统发牌",0);
            }
        }else{
            MyConsole.getInstance().trace("重大失误,你不是当前动作人-发起动作-出牌/吃/碰/杠",0);
        }
    }
    //发起小结算
    public request_account(){
        if(this.room_state==this.CONST.ROOM_STATUS.PLAY){
            MyConsole.getInstance().trace("发起-小结算");
            this.socket_model.small_settlement({
                roomId:this.info_model.roomId
            });
        }else{
            MyConsole.getInstance().trace("重大失误,发起-小结算 房间状态居然不是游戏中,"+this.room_state,0);
        }
    }
    //发起大结算
    public request_djs(){
        if(this.room_state!=this.CONST.ROOM_STATUS.GAME_OVER){
            MyConsole.getInstance().trace("发起-大结算");
            this.socket_model.big_settlement({
                roomId:this.info_model.roomId,
                userId:this.user_group_model.position_id_get_user_model(1).userId
            });
        }else{
            MyConsole.getInstance().trace("重大失误,发起-大结算 房间状态不对,"+this.room_state,0);
        }
    }
    //发送聊天;
    public send_player_chat_status(data){
        var info = this.user_group_model.sponsor_user_chat(data,this.info_model.roomId);
        if(info){
            //本地播放
            info.local["local"]="local";
            //this.update_player_chat_status(info.local);
            //发送数据
            this.socket_model.sendChatInfo(info.service);
        }else{
            //this.popup_model.popup_float_alert("聊天过于频繁");
        }
    }
    //向服务器发送申请解散房间;
    public send_room_dissolution_room(data){
        data.userId=this.user_group_model.position_id_get_user_model(1).userId;
        this.socket_model.sponsorDissolveRoom(data);
    }
    //告诉服务器是否解散房间;
    public send_room_is_diss_room(info){
        var data={roomId:this.get_roomId(),userId:this.CONST.USERID,userAgree:info};
        this.socket_model.dissolveRoomOperation(data);
    }
    //测试系统---实时更新系统剩余牌列表
    public update_systemSendCard(){
        this.socket_model.systemSendCardOk(this.info_model.roomId);
    }
    //----------------------------------socket接收---------------------------------------
    //其他玩家加入房间
    private other_join_room(info){
        if(info.roomId||this._room_state==this.CONST.ROOM_STATUS.INIT)return;//zpb:大厅的加入房间不接收
        if(this.room_state==this.CONST.ROOM_STATUS.SHORT_BOARD){
            if(info&&info.userId){
                if(Number(info.userId)!= this.user_group_model.position_id_get_user_model(1).userId){
                    //添加新的玩家
                    var user_name=this.user_group_model.add_new_player_base_info(info);
                    //告诉control
                    this.m_to_c_dis_event(this.EVENT.room.m_c_user_join,{type:1,user_name:user_name});
                }else{
                    MyConsole.getInstance().trace("重大失误,新玩家加入 但玩家ID是当前玩家自己",0);
                }
            }else{
                MyConsole.getInstance().trace("重大失误,新玩家加入数据为空",0);
            }
        }else{
            MyConsole.getInstance().trace("重大失误，新玩家加入,此时房间状态不对"+this.room_state,0);
        }
    }
    //其他玩家离开房间or房主解散房间
    private quit_room(info){
        if(info){
            var cur_user = this.user_group_model.position_id_get_user_model(1);
            switch (Number(info.type)){
                case 1://其他玩家离开房间
                    if(this.room_state==this.CONST.ROOM_STATUS.SHORT_BOARD){ //缺人状态
                        if(Number(info.userId) == Number(cur_user.userId)){
                            //玩家自己退出
                            this.m_to_c_dis_event(this.EVENT.room.m_c_leave_room,{type:1});
                        }else{
                            //其他玩家退出
                            var user_name=this.user_group_model.remove_user_info(Number(info.userId));
                            this.m_to_c_dis_event(this.EVENT.room.m_c_leave_room,{type:2,user_name:user_name});
                        }
                    }else{
                        MyConsole.getInstance().trace("重大失误,当前状态下玩家无法离开",0);
                    }
                    break;
                case 2://房间被解散
                    if(cur_user.houseOwner){
                        //房主自己解散
                        this.m_to_c_dis_event(this.EVENT.room.m_c_leave_room,{type:3});
                        let money_num=0;
                        switch (this.room_circleNum){
                            case 2:
                                money_num=4;
                                break;
                            case 4:
                                money_num=6;
                                break;
                            case 8:
                                money_num=12;
                                break;
                        }
                        if(money_num!=0){
                            //改变房卡数量;
                            var data={
                                money_num:money_num,
                                roomId:this.info_model.roomId
                            };
                            this.m_to_c_dis_event(this.EVENT.room.r_change_money,data);
                        }

                    }else{//其他人解散
                        this.m_to_c_dis_event(this.EVENT.room.m_c_leave_room,{type:4});
                    }
                    break;
                default:
                    MyConsole.getInstance().trace("重大失误 解散房间最终结果 类型不存在"+info.type,0);
                    break;
            }
        } else{
            MyConsole.getInstance().trace("重大失误 解散房间最终结果信息为空",0);
        }
    }
    //tyq: 接收-播放表情文字语音
    protected update_player_chat_status(info){
        if(this.room_state !=-1){
            if(info && info.userId){
                var model = this.user_group_model.user_id_get_user_model(info.userId);
                if(model){
                    if(this.room_state==1){//5.17-17:13修改zwb:根据room_state的值判断发送 准备阶段、游戏阶段玩家头像的位置
                        info.point = this.CONST.HEAD_POS_wait[model.current_table_board_position-1];
                    }else{
                        info.point = this.CONST.HEAD_POS_game[model.current_table_board_position-1];
                    }
                    info["type"] = info.type;
                    info["gender"] = model.gender;
                    info["is_self"] = this.user_group_model.position_id_get_user_model(1).userId==info.userId;
                    if(info.local!=undefined){
                        info["local"] = info.local;
                    }else{
                        info["local"] = undefined;
                    }
                    this.m_to_c_dis_event(this.EVENT.room.r_player_chat_status,info);
                }else{
                    MyConsole.getInstance().trace("---------表情文字 没有找到发起人",0);
                }
            }
        }
    }
    //被踢出房间
    private kickout_room(data){
        if(data.type==1){//玩家被踢
            if(data.userId==this.user_group_model.position_id_get_user_model(1).userId){
                this.m_to_c_dis_event(this.EVENT.room.m_c_leave_room,{type:5});
            }else{
                if(data.userId&&this.user_group_model.user_id_get_user_model(data.userId)){
                    var user_name=this.user_group_model.remove_user_info(Number(data.userId));
                    this.m_to_c_dis_event(this.EVENT.room.m_c_leave_room,{type:6,user_name:user_name});
                }
            }
        }else{//房间解散
            this.m_to_c_dis_event(this.EVENT.room.m_c_leave_room,{type:7});
        }
    }
    /***玩家准备接口
     * zpb:这个接口 他妈的还挺重要
     *这个地方在2中地方会触发
     * ----1.缺人等待加入场景  房主点击开局后（每人都只会收到一次）
     * ----2.自己or其他人 小结算点击【确认/下一局】按钮后（每人都会收到4次 其他人发起的3次+自己发起的1次）
     * 此时要判断 4个玩家状态都为--》准备状态 然后请求发牌
     * 要一个特殊情况  当房间状态为--->小结算状态--->然后玩家状态也为小结算时 要主动发起小结算准备！！！！！
     * tyq: */
    protected opening_or_small_settlement_confirm(info){
        if(info){
            //设置房间状态
            this.room_state=Number(info.roomInfo.state);
            if(this.room_state== this.CONST.ROOM_STATUS.PLAY){//牌局开始中状态了
                //刷新玩家状态 所有人game状态 不是-1
                if(this.user_group_model.update_users_playStatus(info.userInfo,this.CONST.USER_PLAY_STATUS.GAME)){
                    //设置庄/下个动作人和动作
                    if(info.nextActionUserId){
                        this.info_model.current_action_user=this.info_model.zhuangPlayer=info.nextActionUserId;
                        this.info_model.current_action_list=info.nextAction;
                    }else{
                        //没有当前动作人
                        MyConsole.getInstance().trace("重大失误,刚开局没有当前动作人",0);
                    }
                    //更新庄
                    this.user_group_model.set_zhuang_user(this.info_model.zhuangPlayer);
                    //设置最新发牌人
                    this.info_model.lastFaUserId = this.info_model.zhuangPlayer;
                    this.set_new_deal_card_user();
                    //设置最新出牌人
                    this.info_model.lastChuUserId=null;
                    //混牌
                    if(info.dingHunPai)this.info_model.dingHunPai=info.dingHunPai;
                    //所有玩家的牌
                    if(info.pais)this.user_group_model.set_users_card_info_gameing(info.pais,info.huaList,this.info_model.dingHunPai);
                    //牌数量
                    if(this.info_model.dingHunPai)this.info_model.currMJNum=82;
                    else this.info_model.currMJNum=83;
                    if(Number(this.info_model.huaType) == 2){//有花
                        this.info_model.currMJNum += 8;
                    }
                    //切换场景视图
                    this.update_view("play");
                }else{
                    MyConsole.getInstance().trace("重大失误,牌局开始中状态了，居然还有人没有准备ok-"+this.CONST.USER_PLAY_STATUS.GAME,0);
                }
            }else if(this.room_state == this.CONST.ROOM_STATUS.PREPARE){
                //不显示庄
                this.info_model.zhuangPlayer=null;
                //刷新玩家状态 还在小结算等待其他人操作状态（也就是还有人再看小结算界面）
                this.user_group_model.update_users_playStatus(info.userInfo);
                //告诉control
                if(this.user_group_model.position_id_get_user_model(1).playStatus==this.CONST.USER_PLAY_STATUS.PREPARED)
                this.m_to_c_dis_event(this.EVENT.room.m_c_user_prepared);
            }else if(this.room_state== this.CONST.ROOM_STATUS.SHORT_BOARD){//缺人
                //刷新玩家状态
                this.user_group_model.update_users_playStatus(info.userInfo);
                //开局提示牌动画
                this.info_model.tips_card_ani=true;
                //告诉control
                this.m_to_c_dis_event(this.EVENT.room.m_c_user_join,{type:2});
            }
        }else{
            MyConsole.getInstance().trace("重大失误,【房主发起开局/小结算准备确认】推送数据为空",0);
        }
    }
    //玩家动作回应
    protected game_player_action_respond(info){
        if(info){
            MyConsole.getInstance().trace("--->接收到动作");
            //第1步----上个动作
            var last_action_type;//上个动作类型--胡牌时候用
            var last_action_user;//上个动作人
            if(this.info_model.last_action_user){
                last_action_user=this.user_group_model.user_id_get_user_model(this.info_model.last_action_user);
                last_action_type=last_action_user.last_action.type;
            }
            //第2步----设置当前动作人和动作
            if(info.nextActionUserId){
                this.info_model.current_action_user=info.nextActionUserId;
                this.info_model.current_action_list=info.nextAction;
            }else{
                this.info_model.current_action_user=null;
                MyConsole.getInstance().trace("重大失误,思全这货没给下个动作人",0);
            }
            //第3步----设置上个动作人和动作
            if(info.userId){
                this.info_model.last_action_user=info.userId;
                this.info_model.last_action=info.action;
            }else{
                MyConsole.getInstance().trace("重大失误,思全这货没给当前动作执行的人",0);
            }
            //第4步----获取最新出牌人
            var new_send_card_user_model;
            if(this.info_model.lastChuUserId)new_send_card_user_model=this.user_group_model.user_id_get_user_model(this.info_model.lastChuUserId);
            //第5步----设置上个动作人和动作
            this.set_action_info();
            //第6步----发起动作的人
            var action_user_model=this.user_group_model.user_id_get_user_model(this.info_model.last_action_user);
            //第7步----发起动作的人---是自己还是其他人
            var view_update_type=(this.user_group_model.position_id_get_user_model(1).userId==this.info_model.last_action_user&&!this.CONST.PLAYBACK_MODEL)?"accept_self":"accept_anotherUsers";
            //第8步----是否流局检测
            var _is_liuJu=false;
            if(info.state&&info.state==this.CONST.ROOM_STATUS.PREPARE&&Number(action_user_model.last_action.type)!=this.CONST.PLAYER_ACTION.hu) _is_liuJu=true;
            //第9步----具体动作处理
            // console.log("*************",action_user_model.last_action.type,action_user_model.current_action);
            switch(Number(action_user_model.last_action.type)){
                case this.CONST.PLAYER_ACTION.system_deal_card://系统发牌回应
                {
                    //小1-----上个动作人添加新的牌
                    this.user_group_model.user_add_stop_card(this.info_model.last_action_user,info.extra);
                    //小2-----设置最新出牌人????点杠
                    this.info_model.lastFaUserId=action_user_model.userId;
                    //小3-----减少系统剩余牌数量
                    this.info_model.currMJNum--;
                    //小4-----判断是否为花牌
                    var deal_user_is_self = action_user_model.userId==this.user_group_model.position_id_get_user_model(1).userId;
                    var is_hua = deal_user_is_self && Base_card_model.act_code_get_info(info.extra).type==this.CONST.PLAYER_ACTION.hua;
                    //更新视图
                    this.m_to_c_dis_event(this.EVENT.room.m_c_system_deal_card,{
                        deal_user_is_self:deal_user_is_self,//被发牌人是否是自己
                        _is_liu_ju:_is_liuJu,//流局不检测下个动作
                        is_hua:is_hua//为花牌，就自动打出--》播补花动画
                    });
                    break;
                }
                case this.CONST.PLAYER_ACTION.hua:
                case this.CONST.PLAYER_ACTION.play_card://玩家出牌回应
                {
                    var _is_hua = Base_card_model.act_code_get_info(this.info_model.last_action).type==this.CONST.PLAYER_ACTION.hua;
                    if(view_update_type=="accept_anotherUsers"){
                        //小1-----删除玩家手牌 增加桌牌 或 增加花牌
                        this.delete_user_card(this.info_model.last_action_user,this.info_model.last_action,this.info_model.last_action,_is_hua);
                    }
                    //设置最新出牌人
                    this.info_model.lastChuUserId=action_user_model.userId;
                    this.info_model.lastChuCard=this.info_model.last_action;
                    //第5步----重新设置上个动作人和动作
                    this.set_action_info();
                    //更新视图
                    this.m_to_c_dis_event(this.EVENT.room.m_c_user_send_card,{
                        type:view_update_type,
                        act_code:this.info_model.last_action,
                        _is_liu_ju:_is_liuJu,//流局不检测下个动作
                        is_hua:_is_hua
                    });
                    break;
                }
                case this.CONST.PLAYER_ACTION.chi://玩家吃回应
                {
                    if(new_send_card_user_model){
                        if(info.extra){
                            //1-----删除上个出牌人桌牌
                            new_send_card_user_model.remove_play_card(info.extra);
                            //2-----设置最新出牌人
                            this.info_model.lastChuUserId=null;
                            //3-----整理上个动作人牌信息
                            this.user_group_model.set_last_action_user_card_info(this.info_model.last_action_user,info.extra);
                            //4-----更新视图
                            this.m_to_c_dis_event(this.EVENT.room.m_c_user_chi_card,{
                                type:view_update_type,
                                _is_liu_ju:_is_liuJu//流局不检测下个动作
                            });
                        }else{
                            MyConsole.getInstance().trace("重大失误,玩家吃回应 没有操作牌数据extra",0);
                        }
                    }else{
                        MyConsole.getInstance().trace("重大失误,玩家吃回应 没找到上个出牌人",0);
                    }
                    break;
                }
                case this.CONST.PLAYER_ACTION.peng://玩家碰回应
                {
                    if(new_send_card_user_model){
                        if(info.extra){
                            //1-----删除上个出牌人桌牌
                            new_send_card_user_model.remove_play_card(info.extra);
                            //2-----设置最新出牌人
                            this.info_model.lastChuUserId=null;
                            //3-----整理上个动作人牌信息
                            this.user_group_model.set_last_action_user_card_info(this.info_model.last_action_user,info.extra);
                            //4-----更新视图
                            this.m_to_c_dis_event(this.EVENT.room.m_c_user_peng_card,{
                                type:view_update_type,
                                _is_liu_ju:_is_liuJu,//流局不检测下个动作
                            });
                        }else{
                            MyConsole.getInstance().trace("重大失误,玩家碰回应 没有操作牌数据extra",0);
                        }
                    }else{
                        MyConsole.getInstance().trace("重大失误,玩家碰回应 没找到上个出牌人",0);
                    }
                    break;
                }
                case this.CONST.PLAYER_ACTION.gang://玩家明杠回应
                {
                    if(new_send_card_user_model){
                        if(info.extra){
                            //1-----删除上个出牌人桌牌
                            new_send_card_user_model.remove_play_card(info.extra);
                            //2-----设置最新出牌人????点杠
                            if(this.info_model.lastFaUserId==action_user_model.userId){
                                //碰杠不变
                            }else{
                                //点杠
                                this.info_model.lastChuUserId=null;
                            }
                            //3-----整理上个动作人牌信息
                            this.user_group_model.set_last_action_user_card_info(this.info_model.last_action_user,info.extra);
                            //4-----更新视图
                            this.m_to_c_dis_event(this.EVENT.room.m_c_user_gang_card,{
                                type:view_update_type,
                                _is_liu_ju:_is_liuJu,//流局不检测下个动作
                            });
                        }else{
                            MyConsole.getInstance().trace("重大失误,玩家明杠回应 没有操作牌数据extra",0);
                        }
                    }else{
                        MyConsole.getInstance().trace("重大失误,玩家明杠回应 没找到上个出牌人",0);
                    }
                    break;
                }
                case this.CONST.PLAYER_ACTION.an_gang://玩家暗杠回应
                {
                    //暗杠只有自己给 extra 其他人不给 extra
                    if(info.extra||view_update_type=="accept_anotherUsers"){
                        //1-----整理上个动作人牌信息
                        this.user_group_model.set_last_action_user_card_info(this.info_model.last_action_user,info.extra);
                        //2-----更新视图
                        this.m_to_c_dis_event(this.EVENT.room.m_c_user_gang_card,{
                            type:view_update_type,
                            _is_liu_ju:_is_liuJu,//流局不检测下个动作
                        });
                    }else{
                        MyConsole.getInstance().trace("重大失误,玩家暗杠回应 没有操作牌数据extra",0);
                    }
                    break;
                }
                case this.CONST.PLAYER_ACTION.hu://玩家和牌回应
                {
                    if(last_action_type&&last_action_user){
                        var position;
                        var hu_base_type=1;
                        //1判断 点炮/自己摸
                        if(last_action_user.userId!=action_user_model.userId){
                            hu_base_type=1;//点炮
                            position=new_send_card_user_model.current_table_board_position;
                        }
                        else{
                            hu_base_type=2;//自摸
                            position=action_user_model.current_table_board_position;
                        }
                        //3-----更新视图
                        this.m_to_c_dis_event(this.EVENT.room.m_c_user_hu_card,{
                            type:view_update_type,
                            position:position,
                            hu_base_type:hu_base_type,//自摸点炮
                            state:info.state,//房间状态
                        });
                    }else{
                        MyConsole.getInstance().trace("重大失误,胡牌时没有找到上个动作类型",0);
                    }
                    break;
                }
                case this.CONST.PLAYER_ACTION.guo://玩家过回应
                {
                    this.m_to_c_dis_event(this.EVENT.room.m_c_user_guo_card,{
                        type:view_update_type,
                        _is_liu_ju:_is_liuJu,//流局不检测下个动作
                        position:this.user_group_model.user_id_get_user_model(this.info_model.last_action_user).current_table_board_position
                    });
                    break;
                }
            }
            //第10步---流局
            if(_is_liuJu){
                //发起流局动作回应
                this.m_to_c_dis_event(this.EVENT.room.m_c_user_lj_card);
            }
            //更新玩家实时手牌
            this.socket_model.setPlayStopCardInfo(this.user_group_model.position_id_get_user_model(1).userId,this.user_group_model.position_id_get_user_model(1).stop_card);
        }else{
            MyConsole.getInstance().trace("重大失误,玩家动作回应没数据",0);
        }
    }
    //小结算回应
    protected game_smallSettlement_respond(info){
        if(info){
            //设置剩余圈数
            var c_num = this.info_model.circleNum-this.info_model.lastNum+1;
            this.info_model.lastNum=info.lastNum;
            //处理小结算数据
            var xjs_model:XJS_model=new XJS_model();
            xjs_model.room_id=this.info_model.roomId;
            xjs_model.quan_num=c_num+"/"+this.info_model.circleNum;
            xjs_model.score_type = this.info_model.scoreType;
            xjs_model.rule_tips=this.info_model.rule_tips;
            xjs_model.hun_model=this.get_current_hun_info();
            xjs_model.user_list_model=this.user_group_model.get_xjs_user_models(info.userInfo,this.info_model.scoreType,this.info_model.hunPai,this.info_model.dingHunPai);
            //和牌类型
            xjs_model.set_hu_type(this.user_group_model.position_id_get_user_model(1).userId);

            this.m_to_c_dis_event(this.EVENT.room.m_c_user_xjs,xjs_model);
        }else{
            MyConsole.getInstance().trace("重大失误，小结算数据为空",0);
        }

    }
    //大结算回应
    protected game_bigSettlement_respond(list){
        //自定义房间状态
        this.room_state=this.CONST.ROOM_STATUS.GAME_OVER;
        //处理大结算数据
        var djs_model:DJS_model=new DJS_model();
        djs_model.room_id=this.info_model.roomId;
        djs_model.quan_num=this.info_model.circleNum;
        var rule={
            scoreType:this.info_model.scoreType,
            chiType:this.info_model.chiType,
            huaType:this.info_model.huaType
        };
        djs_model.rule_text=this.CONST.get_game_rule(rule);
        djs_model.user_list_model=this.user_group_model.get_djs_user_models(list);
        djs_model.set_big_win();            //设置大赢家;
        djs_model.set_pao_player();         //设置最佳炮手;

        this.set_bigSettlement_share(djs_model.user_list_model);//设置大结算分享信息

        this.m_to_c_dis_event(this.EVENT.room.m_c_user_djs,djs_model);
    }
    private set_bigSettlement_share(datas){
        Weixin_JSSDK_model.getInstance().settlementShare(this.info_model.roomId,datas);
    }
    //玩家上下线
    protected update_user_line_status(state_info){
        var user_model:User_model=this.user_group_model.set_player_online(state_info);
        if(user_model){
            this.m_to_c_dis_event(this.EVENT.room.user_line_status_change,{type:user_model.state==1?"online_1":"online_2",name:user_model.userName});
        }
    }
    //房间解散房间申请回应;
    private game_dissolveRoom(info){
        if(!info.reqState){//解散中
            this.info_model.set_dissolveRoom_info(info,this.user_group_model);
            this.m_to_c_dis_event(this.EVENT.room.r_room_dissolution_room);
        }
    }
    //获取到用户定位信息
    private get_position_info(info){
        if(info){
            var location_model:Location_model=new Location_model();
            location_model.user_info_list=this.user_group_model.get_location_model_user_list();
            location_model.set_dis_info(info);
            this.m_to_c_dis_event(this.EVENT.room_popup.location,location_model);
        }
    }
    //---------------------------------------------------关键状态改变侦听----------------

    //房间加载状态(这个状态是自定义的)
    public set room_load_state(str:number){
        for(var i in this.CONST.ROOM_LOAD_STATUS){
            if(this.CONST.ROOM_LOAD_STATUS[i]==str){
                this._room_load_state=str;
                return;
            }
        }
        MyConsole.getInstance().trace("游戏场景,[房间加载状态]中没有这个奇葩状态-"+str,0);
    }
    public get room_load_state():number{
        return this._room_load_state;
    }
    //房间状态
    public set room_state(state){
        state= Number(state);
        for(var i in this.CONST.ROOM_STATUS){
            if(this.CONST.ROOM_STATUS[i]==state){
                this._room_state=state;
                return;
            }
        }
        MyConsole.getInstance().trace("重大失误,[房间状态]中没有这个奇葩状态"+state,0);
    }
    public get room_state():number{
        return this._room_state;
    }

    //获取房间ID;
    public get_roomId(){
        return this.info_model.roomId;
    }

    //通过userId获取model;
    public room_user_id_get_user_model(userId){
        return this.user_group_model.user_id_get_user_model(userId);
    }

}