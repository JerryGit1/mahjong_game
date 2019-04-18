var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-18.
 */
var Room_info_model = (function (_super) {
    __extends(Room_info_model, _super);
    function Room_info_model() {
        var _this = _super.call(this) || this;
        //出牌操作提示动画
        _this._tips_card_ani = true;
        //当前动作
        _this.current_action_list = [];
        return _this;
    }
    Object.defineProperty(Room_info_model.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        set: function (str) {
            this._userName = Base_user_model.get_char(str);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room_info_model.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (num) {
            var _is_add = false;
            for (var i in this.CONST.ROOM_STATUS) {
                if (Number(this.CONST.ROOM_STATUS[i]) == Number(num)) {
                    this._state = Number(num);
                    _is_add = true;
                    break;
                }
            }
            if (!_is_add)
                MyConsole.getInstance().trace("重大失误,room_info_model-房间状态 没有此状态 " + num, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room_info_model.prototype, "circleNum", {
        get: function () {
            return this._circleNum;
        },
        set: function (num) {
            this._circleNum = num;
        },
        enumerable: true,
        configurable: true
    });
    Room_info_model.prototype.init_data = function (data) {
        //基础信息
        this.setParams(data);
        //规则信息
        this.set_rule(data);
    };
    Room_info_model.prototype.set_rule = function (info) {
        this.rule_tips = this.CONST.get_game_rule(info);
    };
    Room_info_model.prototype.set_dissolveRoom_info = function (dissolveRoom, user_group_model) {
        if (dissolveRoom) {
            var base_info = dissolveRoom.othersAgree.concat();
            base_info.push({ userId: dissolveRoom.userId, agree: 1 });
            // var base_info=[];
            // for(let i=0;i<dissolveRoom.othersAgree.length;i++){
            //     base_info.push(dissolveRoom.othersAgree[i]);
            // }
            // base_info.push({userId:dissolveRoom.userId,agree:1});
            this.dissolveRoom_model = new Dissolve_room_model();
            //发起人
            this.dissolveRoom_model.respond_user_name = user_group_model.user_id_get_user_model(dissolveRoom.userId).userName;
            //发起时间
            this.dissolveRoom_model.dissolveTime = dissolveRoom.dissolveTime;
            //列表
            this.dissolveRoom_model.user_list_model = user_group_model.get_diss_room_user_models(base_info);
        }
        else {
            this.dissolveRoom_model = null;
        }
    };
    //设置分享
    Room_info_model.prototype.set_share_info = function (cur_user_count, user_max_num) {
        if (cur_user_count === void 0) { cur_user_count = 0; }
        if (user_max_num === void 0) { user_max_num = 0; }
        var roomId = "" + this.roomId;
        if (roomId.length == 7) {
            //设置大厅的分享链接
            Weixin_JSSDK_model.getInstance().hallShare();
        }
        else {
            var last_num = user_max_num - cur_user_count;
            //设置分享 （罗列开房选项）
            Weixin_JSSDK_model.getInstance().gameShare(this.roomId, this.rule_tips, last_num, this.userName);
        }
    };
    Object.defineProperty(Room_info_model.prototype, "dingHunPai", {
        get: function () {
            return this._kai_hun;
        },
        set: function (num) {
            this._kai_hun = Number(num);
            this.hunPai = this._kai_hun + 1;
            if (this._kai_hun == 9)
                this.hunPai = 1; //万
            else if (this._kai_hun == 18)
                this.hunPai = 10; //饼
            else if (this._kai_hun == 27)
                this.hunPai = 19; //条
            else if (this._kai_hun == 31)
                this.hunPai = 28; //东-南
            else if (this._kai_hun == 34)
                this.hunPai = 32; //中-白
            else if (this._kai_hun == 180 || this._kai_hun == 184)
                this.hunPai = 29;
            else if (this._kai_hun == 181 || this._kai_hun == 185)
                this.hunPai = 30;
            else if (this._kai_hun == 182 || this._kai_hun == 186)
                this.hunPai = 31;
            else if (this._kai_hun == 183 || this._kai_hun == 187)
                this.hunPai = 28;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room_info_model.prototype, "tips_card_ani", {
        get: function () {
            if (this._tips_card_ani) {
                this._tips_card_ani = false;
                return true;
            }
            return false;
        },
        set: function (bl) {
            this._tips_card_ani = bl;
        },
        enumerable: true,
        configurable: true
    });
    //---------------------------IP冲突提示---------------------------------------------
    /*判断Ip冲突*/
    Room_info_model.prototype.check_ip_same = function (arr) {
        var str = "";
        var str2 = "";
        for (var i = 0; i < arr.length; i++) {
            if (str.indexOf(arr[i].name) < 0) {
                for (var j = i + 1; j < arr.length; j++) {
                    if (arr[i].IP == arr[j].IP) {
                        if (str.indexOf(arr[i].name) > -1) {
                            str += "," + arr[j].name;
                            if (arr[j].name.lengh > 5) {
                                str2 += arr[j].name.substring(0, 4) + "...";
                            }
                        }
                        else {
                            if (str != "")
                                str += ";";
                            if (str2 != "")
                                str2 += ";";
                            str += arr[i].name + "," + arr[j].name;
                            var tempI = arr[i].name.length > 5 ? arr[i].name.substring(0, 4) + "..." : arr[i].name;
                            var tempJ = arr[j].name.length > 5 ? arr[j].name.substring(0, 4) + "..." : arr[j].name;
                            str2 += tempI + "," + tempJ;
                        }
                    }
                }
            }
        }
        if (str)
            return "本房间内 <font color='#D3820D'>" + str + "</font> IP相同";
        return null;
    };
    //----------------------------小结算清理-------------------------------------------
    Room_info_model.prototype.xjs_clear_info = function () {
        this.last_action_user = null;
        this.current_action_user = null;
        this.lastFaUserId = null;
        this.lastChuUserId = null;
        this.lastChuCard = null;
        this.hunPai = null;
        this._kai_hun = null;
        this.tips_card_ani = false; //出牌操作提示动画
    };
    //大结算清理
    Room_info_model.prototype.djs_clear_info = function () {
        this.circleNum = null;
        this.lastNum = null;
    };
    return Room_info_model;
}(Base_model));
__reflect(Room_info_model.prototype, "Room_info_model");
//# sourceMappingURL=Room_info_model.js.map