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
 * tyq: 玩家 （牌数据）
 */
var User_model = (function (_super) {
    __extends(User_model, _super);
    function User_model() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Base_event_model(); //事件常量
        _this.stop_card_is_change = false; //手牌是否有数据变化
        _this.play_card_is_change = false; //桌牌是否有数据变化
        _this.hua_card_is_change = false; //花牌是否有数据变化
        _this.send_stop_card_info = { x: 0, y: 0, w: 0 }; //打出去手牌坐标
        _this.new_play_card_point = new egret.Point(); //最新桌牌位置
        _this.max_play_card_point = new egret.Point(); //打出去的牌 放大提示的位置
        //开始聊天时间
        _this.last_chat_time = 0;
        _this.init_card_data();
        return _this;
    }
    /*tyq: 初始化/清理 数据*/
    User_model.prototype.init_card_data = function (_is_clear_base_info) {
        if (_is_clear_base_info === void 0) { _is_clear_base_info = true; }
        this._last_action = this._current_action = null;
        this._stop_card = [];
        this._real_card = [];
        this._hua_card = [];
        this._cpg_stop_card = [];
        this._play_card = [];
        this.hun_code = null;
        this.stop_card_is_change = this.play_card_is_change = false;
        this._playStatus = this.CONST.USER_PLAY_STATUS.ROOM_IN;
        if (_is_clear_base_info)
            _super.prototype.init_card_data.call(this);
    };
    Object.defineProperty(User_model.prototype, "last_action", {
        get: function () {
            return this._last_action;
        },
        //动作信息--------------------------------------------
        set: function (num) {
            MyConsole.getInstance().trace("---->设置" + this.current_table_board_position + "号位上个动作信息->" + num);
            this._last_action = this.create_action_model(Number(num));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User_model.prototype, "current_action", {
        get: function () {
            return this._current_action;
        },
        set: function (list) {
            this._current_action = [];
            //多个吃 多个杠 在view层去处理了
            if (list) {
                for (var i in list) {
                    var action_model = this.create_action_model(list[i]);
                    if (action_model.type == this.CONST.PLAYER_ACTION.gang) {
                        var act_code = action_model.get_card_code_with_card_list(0);
                        if (this.get_card_num_with_base_stop_card(act_code) >= 4) {
                            action_model.type = this.CONST.PLAYER_ACTION.an_gang;
                        }
                        else if (this.get_card_with_peng_stop_card(act_code)) {
                            action_model.ming_gang_type = this.CONST.MING_GANG_TYPE.peng_gang; //碰杠
                        }
                        else {
                            action_model.ming_gang_type = this.CONST.MING_GANG_TYPE.dian_gang; //点杠
                        }
                    }
                    this._current_action.push(action_model);
                }
                //动作排序
                this.action_settle();
            }
        },
        enumerable: true,
        configurable: true
    });
    User_model.prototype.set_current_action_chi_card = function (code) {
        if (this._current_action)
            for (var i in this._current_action) {
                if (this._current_action[i].type == this.CONST.PLAYER_ACTION.chi) {
                    this._current_action[i].action_card = code;
                }
            }
    };
    User_model.prototype.create_action_model = function (action) {
        return new Action_model(action, this.current_table_board_position);
    };
    //动作列表排序
    User_model.prototype.action_settle = function () {
        function sort_number(a, b) {
            return a.type - b.type;
        }
        this._current_action.sort(sort_number);
    };
    Object.defineProperty(User_model.prototype, "stop_card", {
        get: function () {
            return this._stop_card;
        },
        //设置全部手牌--------------------------------------------
        set: function (list) {
            //不排序
            if (list) {
                this._stop_card = [];
                for (var i in list) {
                    this._stop_card.push(this.create_base_card_model(list[i]));
                }
                this.stop_card_is_change = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    //添加一张手牌
    User_model.prototype.add_stop_card = function (code) {
        //先排序
        this.stop_card_settle();
        if (!code)
            code = -1;
        this._stop_card.push(this.create_base_card_model(code));
        this.stop_card_is_change = true;
    };
    //删除-一张手牌
    User_model.prototype.remove_stop_card = function (code) {
        for (var i in this._stop_card) {
            if (this._stop_card[i].act_code == code || Number(this._stop_card[i].act_code) == -1) {
                this._stop_card.splice(Number(i), 1);
                break;
            }
        }
        //排序
        this.stop_card_settle();
        this.stop_card_is_change = true;
    };
    //删除-一组手牌
    User_model.prototype.remove_stop_cards = function (code_list) {
        for (var i in code_list) {
            this.remove_stop_card(code_list[i]);
        }
    };
    //手牌排序-----系统最新发的牌需要不加入排序
    User_model.prototype.stop_card_settle = function () {
        function sort_number(a, b) {
            if (a._is_hun && !b._is_hun)
                return -1;
            if (!a._is_hun && b._is_hun)
                return 1;
            return a.act_code - b.act_code;
        }
        this.stop_card.sort(sort_number);
    };
    //在有当前动作的情况下 找出手牌中 符合操作的牌列表
    User_model.prototype.get_current_action_cpg_card_list = function () {
        var tips_card_code_list = []; //要提示的牌的列表
        //获取列表
        if (this.current_action) {
            for (var i in this.current_action) {
                var action_model = this.current_action[i];
                if (action_model.card_list) {
                    //如果 要操作的牌 在手牌里 是要去掉的
                    var cpg_card = action_model.action_card;
                    //遍历
                    for (var s in action_model.card_list) {
                        var card_model = action_model.card_list[s];
                        if (card_model) {
                            if (!cpg_card || card_model.act_code != cpg_card.act_code) {
                                add_code(card_model.act_code);
                            }
                        }
                    }
                }
            }
        }
        //添加一个code
        function add_code(code) {
            for (var i in tips_card_code_list) {
                if (tips_card_code_list[i] == code) {
                    return;
                }
            }
            tips_card_code_list.push(code);
        }
        return tips_card_code_list;
    };
    //获取手牌中某张牌数量
    User_model.prototype.get_card_num_with_base_stop_card = function (code) {
        var num = 0;
        for (var i in this._stop_card) {
            if (this._stop_card[i].act_code == code) {
                num++;
            }
        }
        return num;
    };
    //=========================花牌==========================
    //获取花牌插入的位置
    User_model.prototype.get_hua_insert_index = function (len, stop_len) {
        function check_random(arr, value, idx) {
            for (var k = 0; k < arr.length; k++) {
                if (arr[k] == value && idx != k) {
                    return false;
                }
            }
            return true;
        }
        var idx = [];
        for (var j = 0; j < len;) {
            idx[j] = Math.floor(Math.random() * stop_len);
            if (check_random(idx, idx[j], j)) {
                j++;
            }
        }
        return idx;
    };
    //设置--花牌插入手牌
    User_model.prototype.insert_hua_in_stop = function () {
        //临时插入 手牌中
        var len = this._hua_card.length, stop_len = this._stop_card.length;
        this.set_real_card();
        if (len == 0)
            return;
        if (this.current_table_board_position == 1) {
            var arr = this.get_hua_insert_index(len, stop_len);
            for (var j = 0; j < arr.length; j++) {
                this._stop_card[arr[j]] = this._hua_card[j];
            }
        }
    };
    //获取真实牌数据
    User_model.prototype.set_real_card = function () {
        this._real_card = [];
        for (var i in this._stop_card) {
            this._real_card.push(this._stop_card[i]);
        }
    };
    //重置手牌
    User_model.prototype.reset_real_card = function () {
        if (this._real_card && this._real_card.length > 0) {
            this._stop_card = this._real_card;
            this.stop_card_settle();
            this.stop_card_is_change = true;
        }
    };
    Object.defineProperty(User_model.prototype, "hua_card", {
        get: function () {
            return this._hua_card;
        },
        //设置花牌
        set: function (list) {
            if (list) {
                this._hua_card = [];
                for (var i in list) {
                    this._hua_card.push(this.create_base_card_model(list[i]));
                }
                this.hua_card_is_change = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    //花牌排序
    User_model.prototype.hua_card_sort = function () {
        function sort_number(a, b) {
            return a.act_code - b.act_code;
        }
        this.hua_card.sort(sort_number);
    };
    //将手牌中的花牌删掉
    User_model.prototype.delete_hua_from_stop = function () {
        for (var i in this._hua_card) {
            for (var j = this._stop_card.length - 1; j >= 0; j--) {
                if (this.current_table_board_position == 1 && this._hua_card[i].act_code == this._stop_card[j].act_code) {
                    this._stop_card.splice(Number(j), j);
                    break;
                }
                else if (this.current_table_board_position != 1) {
                    this._stop_card.splice(Number(j), j);
                    break;
                }
            }
        }
        this.stop_card_is_change = true;
    };
    Object.defineProperty(User_model.prototype, "cpg_stop_card", {
        // //处理长毛问题
        // public set_zhang_mao(list){
        //     var arr=[127,128,129,130];
        //     var arr_info;
        //     var brr=[131,132,133];
        //     var brr_info;
        //     for(var i:any=list.length-1;i>=0;i--){
        //         if(Number(list[i])==125){//找到东南西北的杠
        //             list[i]=arr_info={action:list[i]};
        //             arr_info.num=[0,0,0,0];
        //         }else if(Number(list[i])==126){//找到中发白的杠
        //             list[i]=brr_info={action:list[i]};
        //             brr_info.num=[0,0,0];
        //         }
        //     }
        //     for(var s=list.length-1;s>=0;s--){
        //         var _is;
        //         //查看 每个杠 各有几个 并从原始数组删除
        //         //先检测东南西北
        //         for(i in arr){
        //             if(arr[i]==Number(list[s])){
        //                 list.splice(s,1);
        //                 if(!arr_info){
        //                     MyConsole.getInstance().trace("重大失误,东南西北 长毛没有基础action",0);
        //                 }else{
        //                     //补杠次数递增
        //                     arr_info.num[i]++;
        //                 }
        //                 _is=true;
        //                 break;
        //             }
        //         }
        //         if(_is)continue;
        //         //先检测中发白
        //         for(i in brr){
        //             if(brr[i]==Number(list[s])){
        //                 list.splice(s,1);
        //                 if(!brr_info){
        //                     MyConsole.getInstance().trace("重大失误,中发白 长毛没有基础action",0);
        //                 }else{
        //                     brr_info.num[i]++;
        //                 }
        //                 break;
        //             }
        //         }
        //     }
        // }
        get: function () {
            return this._cpg_stop_card;
        },
        //设置吃碰杠手牌--------------------------------------------
        set: function (list) {
            if (list) {
                this._cpg_stop_card = [];
                // //处理长毛问题
                // this.set_zhang_mao(list);
                for (var i in list) {
                    if (typeof list[i] == "number") {
                        this._cpg_stop_card.push(this.create_cpg_card_model(list[i]));
                    }
                    else {
                        this._cpg_stop_card.push(this.create_cpg_card_model(list[i].action, list[i].extra)); //,list[i].num
                    }
                }
                this.stop_card_is_change = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    //添加一组吃碰杠牌
    User_model.prototype.add_cpg_stop_card = function (info) {
        if (info) {
            this._cpg_stop_card.push(this.create_cpg_card_model(info.action, info.extra)); //,info.zm_list
            this.stop_card_is_change = true;
        }
    };
    //删除一组碰牌----点杠
    User_model.prototype.remove_cpg_stop_card = function (code) {
        for (var i in this._cpg_stop_card) {
            if (this._cpg_stop_card[i].peng_card_code == code) {
                this._cpg_stop_card.splice(Number(i), 1);
                break;
            }
        }
    };
    //获取吃碰杠牌中  某张牌碰牌是否存在
    User_model.prototype.get_card_with_peng_stop_card = function (code) {
        var num = 0;
        for (var i in this._cpg_stop_card) {
            if (this._cpg_stop_card[i].peng_card_code == code) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(User_model.prototype, "play_card", {
        get: function () {
            return this._play_card;
        },
        //设置全部桌牌--------------------------------------------
        set: function (list) {
            if (list) {
                this._play_card = [];
                for (var i in list) {
                    this._play_card.push(this.create_play_card_model(list[i]));
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    //添加一张桌牌
    User_model.prototype.add_play_card = function (code) {
        this._play_card.push(this.create_play_card_model(code));
        this.play_card_is_change = true;
    };
    //添加一张花牌
    User_model.prototype.add_hua_card = function (code) {
        this._hua_card.push(this.create_base_card_model(code));
        this.hua_card_is_change = true;
    };
    //删除一张桌牌--倒着删（吃碰杠后）
    User_model.prototype.remove_play_card = function (code) {
        for (var i = this._play_card.length - 1; i >= 0; i--) {
            if (this._play_card[i].act_code == code) {
                this._play_card.splice(Number(i), 1);
                break;
            }
        }
        this.play_card_is_change = true;
    };
    //设置 基础手牌和桌牌中的混牌--------------此时才可进行排序  _settle是否排序 胡的时候不排序
    User_model.prototype.set_hun_card = function (hun_code, _settle, type) {
        if (_settle === void 0) { _settle = true; }
        if (type === void 0) { type = ""; }
        if (hun_code) {
            this.hun_code = hun_code;
            for (var i in this.stop_card) {
                this.stop_card[i].set_hun(hun_code);
            }
            for (var i in this.play_card) {
                this.play_card[i].set_hun(hun_code);
            }
        }
        //排序
        if (_settle)
            if (this.last_action && this.last_action.type == this.CONST.PLAYER_ACTION.system_deal_card) {
                var last_card = this.stop_card[this.stop_card.length - 1];
                this.stop_card.splice(this.stop_card.length - 1, 1); //先舍弃
                this.stop_card_settle(); //在排序
                this.stop_card.push(last_card); //再放进去
            }
            else {
                this.stop_card_settle();
            }
    };
    User_model.prototype.check_is_hun = function (code) {
        if (this.dingHunPai) {
            var hun_code = this.dingHunPai + 1;
            switch (this.dingHunPai) {
                case 9:
                    hun_code = 1;
                    break;
                case 18:
                    hun_code = 10;
                    break;
                case 27:
                    hun_code = 19;
                    break;
                case 31:
                    hun_code = 28;
                    break;
                case 34:
                    hun_code = 32;
                    break;
                case 180:
                case 184:
                    hun_code = 29;
                    break;
                case 181:
                case 185:
                    hun_code = 30;
                    break;
                case 182:
                case 186:
                    hun_code = 31;
                    break;
                case 183:
                case 187:
                    hun_code = 28;
                    break;
            }
            if (code == hun_code) {
                this.set_hun_card(hun_code, true);
                return true;
            }
        }
        else {
            return false;
        }
        return false;
    };
    //-------------------------------------------------------
    //创建一张基础牌
    User_model.prototype.create_base_card_model = function (code) {
        if (code != -1 && this.current_table_board_position != 1) {
            var card = new Base_card_model(code, this.CONST.CARD_TYPE.cpg_stop, this.current_table_board_position, this.hun_code);
            return card;
        }
        else {
            var card = new Base_card_model(code, this.CONST.CARD_TYPE.base_stop, this.current_table_board_position, this.hun_code);
            return card;
        }
    };
    //创建一组吃碰杠的牌
    User_model.prototype.create_cpg_card_model = function (code, extra) {
        if (extra === void 0) { extra = null; }
        var card = new CPG_card_model(code, extra, this.current_table_board_position); //,zm_list
        if (card.action_type == this.CONST.PLAYER_ACTION.gang || card.action_type == this.CONST.PLAYER_ACTION.an_gang) {
            var len = card.card_model_list.length - 1;
            card.is_ding_hun_pai = card.card_model_list[len].act_code == this.dingHunPai;
        }
        return card;
    };
    //创建一张桌牌
    User_model.prototype.create_play_card_model = function (code) {
        var card = new Play_card_model(code, this.current_table_board_position, this.hun_code);
        return card;
    };
    //-----------------------更新动态视图-----------------------
    //设置头像踢人按钮
    User_model.prototype.set_houseOwner_tiren = function (bl) {
        this.m_to_c_dis_event(this.EVENT.user.set_tiren_btn, bl);
    };
    User_model.prototype.clear = function () {
        this.init_card_data();
        _super.prototype.clear.call(this);
    };
    return User_model;
}(Base_user_model));
__reflect(User_model.prototype, "User_model");
//# sourceMappingURL=User_model.js.map