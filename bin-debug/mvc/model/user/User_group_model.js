var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2017-12-26.
 * 玩家的model组
 */
var User_group_model = (function (_super) {
    __extends(User_group_model, _super);
    function User_group_model() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Game_room_event_model(); //事件常量
        _this.user_max_num = 4; //玩家总数
        _this.user1_model = new User_model();
        _this.user2_model = new User_model();
        _this.user3_model = new User_model();
        _this.user4_model = new User_model();
        return _this;
    }
    /*-----------------zpb：3大场景阶段 玩家基础信息 操作------------------*/
    //当前第一人称玩家
    /*zpb：【断线重连】时------设置一号玩家信息 和其他玩家风向位置---*/
    User_group_model.prototype.set_self_info = function (info) {
        MyConsole.getInstance().trace("-----》初始化/重置 所有数据-userGroupModel");
        var current_position, user_model;
        if (!this.CONST.PLAYBACK_MODEL) {
            //跑马灯
            if (info.notice)
                this.CONST.marquee_tips = info.notice;
            /*获取后端版本号*/
            if (info.version)
                this.CONST.SERVICE_VERSION = info.version;
            /*更新玩家自己信息*/
            this.user1_model.init_card_data(false); //清理数据
            this.user1_model.setParams(info);
            current_position = this.user1_model.position; //相对与第一人称视角 牌桌位置
            this.user1_model.current_table_board_is_join = true; //自己是加入状态
            //给userId赋值;
            if (info.userId)
                this.CONST.USERID = this.user1_model.userId;
            if (info.userName)
                this.CONST.USERNAME = this.user1_model.userName;
        }
        else {
            //回放模式下
            this.play_back_self_model = new User_model();
            this.play_back_self_model.setParams(info);
            current_position = this.play_back_self_model.position; //相对与第一人称视角 牌桌位置
            this.play_back_self_model.current_table_board_is_join = true; //自己是加入状态
        }
        //设置玩家实际方位
        for (var i = 1; i <= this.user_max_num; i++) {
            user_model = this.position_id_get_user_model(i);
            if (i != 1)
                user_model.init_card_data(); //自我清理一遍
            user_model.current_table_board_position = i; //桌子位置
            user_model.position = current_position; //风向位置
            current_position++;
            if (current_position > this.user_max_num)
                current_position = 1;
        }
    };
    /*zpb：【断线重连】时------更新所有玩家基础信息 确认房主*/
    User_group_model.prototype.update_all_user_base_info = function (player_info_list, house_id, roomType) {
        var user_model, i, s;
        if (player_info_list) {
            //设置信息
            for (s = 0; s < player_info_list.length; s++) {
                this.add_new_player_base_info(player_info_list[s], "relink");
            }
        }
        //确认房主
        for (i = 1; i <= this.user_max_num; i++) {
            user_model = this.position_id_get_user_model(i);
            //设置玩家是否为房主
            if (house_id && user_model.userId == house_id) {
                user_model.houseOwner = true;
            }
            else {
                user_model.houseOwner = false;
            }
        }
    };
    /*zpb：【断线重连】/【缺人阶段场景状态】下 新加入时-------添加新玩家基础信息*/
    User_group_model.prototype.add_new_player_base_info = function (current_user_info, type) {
        if (type === void 0) { type = "add"; }
        var i, user_model;
        if (current_user_info) {
            //其他位置是否有个这人  --断线重连不设置
            if (type == "add")
                for (i = 1; i <= this.user_max_num; i++) {
                    user_model = this.position_id_get_user_model(i);
                    if (user_model.current_table_board_is_join && user_model.userId == current_user_info.userId) {
                        MyConsole.getInstance().trace("重大失误,苍天啊!大地呀!同一个人居然加入2次!", 0);
                        return;
                    }
                }
            for (i = 1; i <= this.user_max_num; i++) {
                user_model = this.position_id_get_user_model(i);
                //找到这个位置的玩家model
                if (current_user_info.position == user_model.position) {
                    if (i != 1) {
                        //设置这个位置有人加入了
                        user_model.current_table_board_is_join = true;
                        //tyq: 解决监听创建房间或加入房间的用户信息--部分基础信息服务器不给-的显示问题
                        if (!current_user_info.state)
                            current_user_info.state = 1;
                        if (!current_user_info.score)
                            current_user_info.score = 0;
                        if (!current_user_info.playStatus)
                            current_user_info.playStatus = this.CONST.USER_PLAY_STATUS.ROOM_IN;
                        //设置玩家信息
                        user_model.setParams(current_user_info);
                        return user_model.userName;
                    }
                    else {
                        MyConsole.getInstance().trace("重大失误,新人加入居然在一号位,反了!", 0);
                    }
                }
            }
        }
        else {
            MyConsole.getInstance().trace("重大失误,group_model要更新的玩家数据为空", 0);
        }
    };
    /*zpb：【缺人阶段场景状态】下 新加入时-------删除玩家信息*/
    User_group_model.prototype.remove_user_info = function (user_id) {
        var user_model = this.user_id_get_user_model(user_id);
        if (user_model && user_id != this.user1_model.userId) {
            //加入状态为离开
            user_model.current_table_board_is_join = false;
            //更新玩家状态--->更新视图
            user_model.playStatus = this.CONST.USER_PLAY_STATUS.NONE;
            return user_model.userName;
        }
        else {
            MyConsole.getInstance().trace("重大失误,有个玩家离开了,但没搜到这个玩家model/或者是玩家自己", 0);
        }
    };
    /*zpb: 【缺人阶段场景状态】下 新加入时判断是否凑齐*/
    User_group_model.prototype.get_user_is_all_join = function () {
        for (var i = 2; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            if (!user_model || !user_model.current_table_board_is_join || user_model.playStatus != this.CONST.USER_PLAY_STATUS.PREPARED) {
                return 0;
            }
        }
        return 1;
    };
    /*tyq: 【牌局中场景状态】/【小结算准备场景状态】集体更新玩家状态 status要校验的状态*/
    User_group_model.prototype.update_users_playStatus = function (list, status) {
        if (status === void 0) { status = 0; }
        if (list) {
            var play_status_is_all_prepared = 0, user_model, i; //所有玩家是否都是 准备ok状态 (PREPARED)
            for (i in list) {
                user_model = this.user_id_get_user_model(list[i].userId);
                if (user_model) {
                    if (list[i].playStatus) {
                        user_model.playStatus = list[i].playStatus;
                        if (user_model.playStatus == status) {
                            play_status_is_all_prepared++;
                        }
                    }
                }
                else {
                    MyConsole.getInstance().trace("重大失误,【牌局中场景状态】/【小结算准备场景状态】集体更新玩家状态,不应该存在 userModel为空", 0);
                }
            }
            //是否都是准备状态
            if (play_status_is_all_prepared == this.user_max_num) {
                return true;
            }
        }
        return false;
    };
    //zpb:【游戏中】断线重连处理实时分数
    User_group_model.prototype.set_relink_gane_score = function () {
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            //处理杠的分数
            if (user_model && user_model.cpg_stop_card) {
                for (var s in user_model.cpg_stop_card) {
                    var cpg_model = user_model.cpg_stop_card[s];
                    // //长毛特殊处理
                    // if(cpg_model.action_type==this.CONST.PLAYER_ACTION.zhang_mao){
                    //     //算基础张毛分
                    //     this.set_gameing_gang_score(user_model.userId,cpg_model.zhao_mao_type);
                    //     for(var p in cpg_model.card_model_list){
                    //         var bu_num=cpg_model.card_model_list[p].zm_num;
                    //         for(var e=0;e<bu_num;e++){
                    //             //算补毛分
                    //             this.set_gameing_gang_score(user_model.userId,cpg_model.bu_mao_type);
                    //         }
                    //     }
                    // }else{
                    //明杠/暗杠
                    this.set_gameing_gang_score(user_model.userId, cpg_model.action_type);
                }
            }
        }
    };
    User_group_model.prototype.set_gameing_gang_score = function (gang_user_id, action_type) {
        var g_user_model = this.user_id_get_user_model(gang_user_id);
        if (g_user_model) {
            var num = 0;
            switch (action_type) {
                case this.CONST.PLAYER_ACTION.an_gang:
                    num = 4;
                    break;
                case this.CONST.PLAYER_ACTION.gang:
                    num = 2;
                    break;
            }
            if (num) {
                this.current_score_info = []; //动画数据
                var win_num = 0;
                for (var i = 1; i <= this.user_max_num; i++) {
                    var user_model = this.position_id_get_user_model(i);
                    if (user_model.userId != gang_user_id) {
                        user_model.score -= num; //挨个减分
                        g_user_model.score += num; //挨个加分
                        win_num += num;
                        this.current_score_info.push({
                            position: user_model.current_table_board_position,
                            score: -num
                        });
                    }
                }
                //动画数据
                this.current_score_info.push({
                    position: g_user_model.current_table_board_position,
                    score: win_num
                });
            }
        }
    };
    //zpb:【游戏中】庄玩家设置
    User_group_model.prototype.set_zhuang_user = function (zhuang_user_id) {
        //确认房主
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            //设置玩家是否为房主
            if (zhuang_user_id && user_model.userId == zhuang_user_id) {
                user_model.zhuang = true;
            }
            else {
                user_model.zhuang = false;
            }
        }
    };
    //zpb:【游戏中】动作人设置
    User_group_model.prototype.set_action_user_info = function (current_action_user, current_action_list, last_action_user, last_action, last_chu_card) {
        if (current_action_user === void 0) { current_action_user = null; }
        if (current_action_list === void 0) { current_action_list = null; }
        if (last_action_user === void 0) { last_action_user = null; }
        if (last_action === void 0) { last_action = null; }
        if (last_chu_card === void 0) { last_chu_card = null; }
        var i, user_model;
        if (current_action_user) {
            for (i = 1; i <= this.user_max_num; i++) {
                user_model = this.position_id_get_user_model(i);
                user_model.current_action = [];
                if (user_model.userId == current_action_user) {
                    MyConsole.getInstance().trace("---->设置" + user_model.current_table_board_position + "号位当前可操作动作");
                    user_model.current_action = current_action_list;
                    user_model.set_current_action_chi_card(last_chu_card); //吃的牌
                    if (i == 1) {
                        if (!user_model.current_action || user_model.current_action.length == 0) {
                            MyConsole.getInstance().trace("重大失误,思全这货没给 当前动作人动作", 0);
                        }
                        else {
                            for (var s in user_model.current_action) {
                                MyConsole.getInstance().trace("当前动作人动作->" + user_model.current_action[s].type);
                            }
                        }
                    }
                }
            }
        }
        if (last_action_user) {
            last_action = Number(last_action);
            for (i = 1; i <= this.user_max_num; i++) {
                user_model = this.position_id_get_user_model(i);
                if (user_model.userId == last_action_user) {
                    user_model.last_action = last_action;
                }
                else {
                    user_model.last_action = -1000;
                }
            }
        }
    };
    //zpb:【游戏中】整体玩家牌设置---游戏开局中.....
    User_group_model.prototype.set_users_card_info_gameing = function (pais, hua_list, dingHunPai) {
        if (pais)
            for (var i = 1; i <= this.user_max_num; i++) {
                var user_model = this.position_id_get_user_model(i);
                if (user_model) {
                    var pai_info = pais.length;
                    if (i == 1)
                        pai_info = pais; //1号玩家 具体的牌信息
                    var huaList = [];
                    if (hua_list) {
                        huaList = hua_list[user_model.position - 1];
                    }
                    user_model.dingHunPai = dingHunPai;
                    this.set_user_card(user_model, pai_info, null, null, huaList, "gameing");
                }
            }
    };
    //zpb:【游戏中】整体玩家牌设置---断线重连.....
    User_group_model.prototype.set_user_card_info_relink = function (all_user_pai_info) {
        if (all_user_pai_info)
            for (var i = 1; i <= this.user_max_num; i++) {
                var pai_info = all_user_pai_info[i - 1];
                var user_model = this.user_id_get_user_model(pai_info.userId);
                if (user_model) {
                    user_model.dingHunPai = pai_info.dingHunPai;
                    this.set_user_card(user_model, pai_info.pais, pai_info.chuList, pai_info.actionList, pai_info.huaList, "relink");
                }
            }
    };
    //zpb:【游戏中】单个玩家牌设置
    User_group_model.prototype.set_user_card = function (user_model, stop_card, play_card, action_list, hua_list, type) {
        if (user_model === void 0) { user_model = null; }
        if (stop_card === void 0) { stop_card = null; }
        if (play_card === void 0) { play_card = null; }
        if (action_list === void 0) { action_list = null; }
        if (hua_list === void 0) { hua_list = null; }
        if (type === void 0) { type = "relink"; }
        if (play_card)
            user_model.play_card = play_card; //桌牌
        if (stop_card) {
            if (typeof stop_card == "number") {
                var num = stop_card;
                stop_card = [];
                for (var i = 0; i < num; i++) {
                    stop_card.push(-1);
                }
            }
            user_model.stop_card = stop_card;
        } //手牌-普通牌
        if (action_list)
            user_model.cpg_stop_card = action_list; //手牌-吃碰杠牌
        //花牌
        if (hua_list) {
            user_model.hua_card = hua_list;
            if (type == "gameing") {
                user_model.hua_card_is_change = false;
                user_model.insert_hua_in_stop();
            }
        }
    };
    //zpb:【游戏中】设置玩家混牌信息
    User_group_model.prototype.update_user_hun_card_info = function (hun_card_code) {
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            if (user_model) {
                user_model.set_hun_card(hun_card_code);
            }
        }
    };
    //tyq: 重置手牌（亮花之后）
    User_group_model.prototype.reset_user_real_card = function () {
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            if (user_model) {
                user_model.reset_real_card();
            }
        }
    };
    //zpb:【游戏中】玩家新增一张手牌
    User_group_model.prototype.user_add_stop_card = function (user_id, pai) {
        var user_model = this.user_id_get_user_model(user_id);
        if (user_model) {
            user_model.add_stop_card(pai);
        }
    };
    //zpb:【游戏中】玩家删除一张手牌
    User_group_model.prototype.user_remove_stop_card = function (user_id, pai) {
        var user_model = this.user_id_get_user_model(user_id);
        if (user_model) {
            user_model.remove_stop_card(pai);
        }
    };
    //zpb:【游戏中】玩家新增一张桌牌
    User_group_model.prototype.user_add_play_card = function (user_id, pai) {
        var user_model = this.user_id_get_user_model(user_id);
        if (user_model) {
            user_model.add_play_card(pai);
        }
    };
    //tyq:【游戏中】玩家新增一张花牌
    User_group_model.prototype.user_add_hua_card = function (user_id, pai) {
        var user_model = this.user_id_get_user_model(user_id);
        if (user_model)
            user_model.add_hua_card(pai);
    };
    //zpb:【游戏中】玩家删除一张桌牌
    User_group_model.prototype.user_remove_play_card = function (user_id, pai) {
        var user_model = this.user_id_get_user_model(user_id);
        if (user_model) {
            user_model.remove_play_card(pai);
        }
    };
    //zpb:【游戏中】获取上个出牌人
    User_group_model.prototype.get_last_send_card_user_model = function () {
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            if (user_model.last_action && user_model.last_action.type == this.CONST.PLAYER_ACTION.play_card) {
                return user_model;
            }
        }
        return null;
    };
    //zpb:【游戏中】根据上个动作人动作进行牌操作
    User_group_model.prototype.set_last_action_user_card_info = function (user_id, extra) {
        if (extra === void 0) { extra = null; }
        var user_model = this.user_id_get_user_model(user_id);
        if (user_model.last_action) {
            switch (user_model.last_action.type) {
                case this.CONST.PLAYER_ACTION.chi:
                    //从手牌列表删除牌
                    user_model.remove_stop_cards(user_model.last_action.get_chi_card_list(extra));
                    //创建 cpg_model
                    user_model.add_cpg_stop_card({ action: user_model.last_action.code, extra: extra });
                    break;
                case this.CONST.PLAYER_ACTION.peng:
                    //创建 cpg_model---因为要处理绝问题 先添加碰model
                    user_model.add_cpg_stop_card({ action: user_model.last_action.code, extra: extra });
                    //从手牌列表删除牌
                    user_model.remove_stop_cards(user_model.last_action.get_peng_card_list());
                    break;
                case this.CONST.PLAYER_ACTION.gang:
                    //从手牌列表删除牌----(为了处理有碰杠的情况，所以先处理手牌，后处理吃碰杠牌)
                    var temp_cpg_list = [];
                    for (var i in user_model.cpg_stop_card) {
                        temp_cpg_list.push(user_model.cpg_stop_card[i]);
                    }
                    user_model.remove_stop_cards(user_model.last_action.get_gang_card_list(temp_cpg_list));
                    //特殊处理点杠 从吃碰杠牌列表删除碰
                    user_model.remove_cpg_stop_card(user_model.last_action.get_gang_card_code());
                    //创建 cpg_model
                    user_model.add_cpg_stop_card({ action: user_model.last_action.code, extra: extra });
                    // //处理实时分数
                    // this.set_gameing_gang_score(user_model.userId,this.CONST.PLAYER_ACTION.gang);
                    break;
                case this.CONST.PLAYER_ACTION.an_gang:
                    //从手牌列表删除牌
                    user_model.remove_stop_cards(user_model.last_action.get_an_gang_card_list(extra));
                    //创建 cpg_model
                    user_model.add_cpg_stop_card({ action: user_model.last_action.code, extra: extra });
                    // //处理实时分数
                    // this.set_gameing_gang_score(user_model.userId,this.CONST.PLAYER_ACTION.an_gang);
                    break;
            }
        }
        else {
            MyConsole.getInstance().trace("重大失误,根据上个动作人动作处理手牌信息,可是没有设置last_action信息", 0);
        }
    };
    //zpb:【游戏中】设置玩家上下线状态
    User_group_model.prototype.set_player_online = function (state_info) {
        var userModel = this.user_id_get_user_model(state_info.userId);
        if (userModel) {
            if (userModel.state != state_info.state) {
                userModel.state = state_info.state;
                //状态改变超过1秒以上才提示
                var c_timer = Number((new Date()).valueOf());
                if (userModel.state_change_timer && c_timer - userModel.state_change_timer > 1000) {
                    userModel.state_change_timer = c_timer;
                    return userModel;
                }
                userModel.state_change_timer = c_timer;
            }
        }
        return null;
    };
    //tyq:【游戏中】设置最新的发牌人
    User_group_model.prototype.set_new_deal_card_user = function (user_id) {
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            if (user_model.userId == user_id) {
                user_model.last_action = [this.CONST.PLAYER_ACTION.system_deal_card];
            }
            else {
                user_model.last_action = null;
            }
        }
    };
    //zpb:【游戏中】设置最新出牌人
    User_group_model.prototype.set_new_send_card_user = function (user_id) {
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            if (user_model.userId == user_id) {
                user_model.is_new_send_card_user = true;
            }
            else {
                user_model.is_new_send_card_user = false;
            }
        }
    };
    //zpb:【游戏中】获取某个玩家最新出的牌信息
    User_group_model.prototype.get_card_user_new_play_card_info = function (user_id) {
        var user_model = this.user_id_get_user_model(user_id);
        if (user_model.play_card)
            return user_model.play_card[user_model.play_card.length - 1];
    };
    //zpb:【游戏中】小结算数据
    User_group_model.prototype.get_xjs_user_models = function (info, score_type, hun_code, ding_hun_code) {
        if (score_type === void 0) { score_type = 2; }
        if (hun_code === void 0) { hun_code = null; }
        if (ding_hun_code === void 0) { ding_hun_code = null; }
        var user_list = [], c_u_info;
        for (var i in info) {
            c_u_info = info[i];
            var user_model = this.user_id_get_user_model(c_u_info.userId);
            if (user_model && c_u_info) {
                var xjs_model = new XJS_user_model();
                xjs_model.dingHunPai = ding_hun_code;
                xjs_model.userId = user_model.userId;
                xjs_model.zhuang = user_model.zhuang;
                xjs_model.userName = user_model.userName;
                xjs_model.userImg = user_model.userImg;
                xjs_model.gangScore = c_u_info.gangScore;
                xjs_model.score_type = score_type;
                xjs_model.is_cur = Number(xjs_model.userId) == this.self_info().userId;
                //设置当局分数
                xjs_model.score = c_u_info.score;
                //设置玩家总分
                user_model.score += c_u_info.score;
                //设置玩家输赢
                if (c_u_info.isWin)
                    xjs_model.hu_type = 1;
                else if (c_u_info.isDian)
                    xjs_model.hu_type = 2;
                //牌的数据
                xjs_model.current_table_board_position = 1; //都用1号视角
                xjs_model.stop_card = c_u_info.pais; //基础手牌
                xjs_model.cpg_stop_card = c_u_info.actionList; //吃碰杠牌
                xjs_model.hua_card = c_u_info.huaList;
                // xjs_model.hua_card_sort();  //小结算花牌不需排序
                xjs_model.last_action = c_u_info.isWin ? this.CONST.PLAYER_ACTION.system_deal_card : null; //发牌
                xjs_model.set_hun_card(hun_code, true); //设置混牌--不拍序
                xjs_model.set_win_info(c_u_info.winInfo); //胡的牌就是赢的人的最后一张牌
                // user_list["winInfo"]=c_u_info.winInfo;
                user_list.push(xjs_model);
            }
        }
        return user_list;
    };
    //zpb:【游戏中】大结算数据
    User_group_model.prototype.get_djs_user_models = function (info) {
        var user_list = [], c_u_info;
        for (var i in info) {
            c_u_info = info[i];
            var user_model = this.user_id_get_user_model(c_u_info.userId);
            if (user_model && c_u_info) {
                var xjs_model = new DJS_user_model();
                xjs_model.userId = user_model.userId;
                xjs_model.userName = user_model.userName;
                xjs_model.userImg = user_model.userImg;
                xjs_model.houseOwner = user_model.houseOwner;
                xjs_model.setParams(c_u_info);
                user_list.push(xjs_model);
            }
        }
        return user_list;
    };
    //zpb:【游戏中】小结算玩家数据清理 _is_clear_base_info zpb:是否清理基础信息 解散房间需要
    User_group_model.prototype.set_xjs_user_info = function (_is_clear_base_info) {
        if (_is_clear_base_info === void 0) { _is_clear_base_info = false; }
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            if (user_model) {
                if (user_model.current_table_board_position != 1)
                    user_model.init_card_data(_is_clear_base_info);
                else
                    user_model.init_card_data(false); //zpb:一号位置只清理牌信息
            }
        }
    };
    //cj:【游戏中】解散房间model数据;
    User_group_model.prototype.get_diss_room_user_models = function (info) {
        var user_list = [], c_u_info;
        for (var i in info) {
            c_u_info = info[i];
            var user_model = this.user_id_get_user_model(c_u_info.userId);
            if (user_model && c_u_info) {
                var diss_room_model = new Dissolve_room_user_model();
                diss_room_model.userName = user_model.userName;
                diss_room_model.userImg = user_model.userImg;
                diss_room_model.userId = user_model.userId;
                diss_room_model.agree = c_u_info.agree;
                if (c_u_info.agree == 1) {
                    diss_room_model.isInitiator = true;
                }
                user_list.push(diss_room_model);
            }
        }
        return user_list;
    };
    //zpb:【游戏中】定位model玩家信息
    User_group_model.prototype.get_location_model_user_list = function () {
        var arr = [];
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            if (user_model) {
                var model = new Base_user_model();
                model.position = user_model.current_table_board_position;
                if (user_model.current_table_board_is_join) {
                    model.userId = user_model.userId;
                    model.userName = user_model.userName;
                    model.userImg = user_model.userImg;
                }
                arr.push(model);
            }
        }
        return arr;
    };
    /*--------------------------------------动态试图更新-------------------------------------------*/
    //zpb:更新房主踢人btn
    User_group_model.prototype.set_houseOwner_tiren = function (_vis) {
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            if (user_model.current_table_board_is_join) {
                if (i == 1) {
                    user_model.set_houseOwner_tiren(false); //房主肯定不显示
                }
                else {
                    user_model.set_houseOwner_tiren(_vis);
                }
            }
            else {
                user_model.set_houseOwner_tiren(false); //这个位置每人也不显示
            }
        }
    };
    /*-----------------获取单独User_model方法-------------------*/
    /*
     * 通过userId获取User_model
     * @method function
     * @params {number} userId 用户ID
     * @return {User_model} this["user"+i+"_model"] ID对应的User_model
     * */
    User_group_model.prototype.user_id_get_user_model = function (userId) {
        for (var i = 1; i <= this.user_max_num; i++) {
            var user_model = this.position_id_get_user_model(i);
            if (user_model && user_model.playStatus != this.CONST.USER_PLAY_STATUS.NONE && user_model.userId == Number(userId)) {
                return user_model;
            }
        }
        MyConsole.getInstance().trace("重大失误 userId" + userId + "没有查到用户userModel信息", 0);
        return null;
    };
    /*
     * 通过视角id获取User_model
     * @method function
     * @params {number} num_id 视角ID(自己固定为1 ，其他逆时针顺序为2、3、4)
     * @return {User_model} this["user"+num_id+"_model"] 当前视角id对应的User_model
     * */
    User_group_model.prototype.position_id_get_user_model = function (num_id) {
        if (this.CONST.PLAYBACK_MODEL && num_id == 1) {
            return this.play_back_self_model;
        }
        return this["user" + num_id + "_model"];
    };
    /*zpb：【缺人阶段场景状态】/【牌局中场景状态】/【小结算准备场景状态】获取一号玩家model*/
    User_group_model.prototype.self_info = function () {
        return this.user1_model;
    };
    //获取房主信息
    User_group_model.prototype.get_home_user_info = function () {
        for (var i = 1; i <= this.user_max_num; i++) {
            var model = this.position_id_get_user_model(i);
            if (model.houseOwner) {
                return model;
            }
        }
        return null;
    };
    //获取房间人数
    User_group_model.prototype.get_room_user_num = function () {
        var num = 0;
        for (var i = 1; i <= this.user_max_num; i++) {
            var model = this.position_id_get_user_model(i);
            if (model.current_table_board_is_join) {
                num++;
            }
        }
        return num;
    };
    //获取某个实际方位的人
    User_group_model.prototype.get_position_user = function (position) {
        for (var i = 1; i <= this.user_max_num; i++) {
            var model = this.position_id_get_user_model(i);
            if (model.position == position) {
                return model;
            }
        }
    };
    //获取所有人准备状态信息列表
    User_group_model.prototype.get_wait_info_list = function () {
        var arr = [], user_model;
        for (var i = 1; i <= this.user_max_num; i++) {
            user_model = this.position_id_get_user_model(i);
            if (user_model && user_model.current_table_board_is_join && user_model.playStatus == this.CONST.USER_PLAY_STATUS.PREPARED) {
                arr.push(1);
            }
            else {
                arr.push(0);
            }
        }
        return arr;
    };
    //获取ip冲突信息
    User_group_model.prototype.get_user_ip_info = function () {
        var ids = [], user_model, idList = [], str = "";
        for (var i = 1; i <= this.user_max_num; i++) {
            user_model = this.position_id_get_user_model(i);
            if (!user_model.current_table_board_is_join)
                continue;
            ids.push({ IP: user_model.ip, name: user_model.userName });
        }
        return ids;
    };
    /*tyq: 发起聊天信息*/
    User_group_model.prototype.sponsor_user_chat = function (data, roomId) {
        var curTime = new Date().getTime();
        var user_model = this.user1_model;
        if (curTime - user_model.last_chat_time >= 3000) {
            user_model.last_chat_time = curTime;
            var info = {}, sendInfo = {};
            info["userId"] = sendInfo["userId"] = user_model.userId;
            info["idx"] = sendInfo["idx"] = data.idx;
            info["roomId"] = sendInfo["roomId"] = roomId;
            info["type"] = sendInfo["type"] = data.type;
            return { local: info, service: sendInfo };
        }
        return null;
    };
    return User_group_model;
}(Base_model));
__reflect(User_group_model.prototype, "User_group_model");
//# sourceMappingURL=User_group_model.js.map