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
 * 玩家 （基础信息）
 */
var Base_user_model = (function (_super) {
    __extends(Base_user_model, _super);
    function Base_user_model() {
        var _this = _super.call(this) || this;
        _this._score = 0; //tyq: 分数
        _this._gender = 1; //tyq: 性别 1-男 2-女
        _this._state = 1; //tyq: 在线or掉线状态   1在线 2-离线
        _this.houseOwner = false; //tyq: 房主
        _this.zhuang = false; //zpb:庄
        //zpb:当前第一人称视角下 这个类的玩家 位置/风向 当前游戏界面的所在位置 1-下 2-右 3-上 4-左 （当前玩家固定为1）
        _this.current_table_board_position = 0;
        //zpb:当前位置是否有人
        _this.current_table_board_is_join = false;
        _this._playStatus = -1; //tyq: 玩家状态   this.CONST.USER_PLAY_STATUS
        _this._is_action = false; //是否有动作--动画
        return _this;
    }
    Object.defineProperty(Base_user_model.prototype, "userId", {
        get: function () {
            return this._userId;
        },
        /*
        * ========================参数初始化=========================
        * */
        //tyq: ID
        set: function (value) {
            var cv = Number(value);
            if (this._userId != cv) {
                this._userId = cv;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        //tyq: 昵称
        set: function (value) {
            if (this._userName != value) {
                this._userName = Base_user_model.get_char(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    //zpb:科学截取文字
    Base_user_model.get_char = function (str, len) {
        if (len === void 0) { len = 5; }
        var tt = String(decodeURIComponent(str));
        var bytesCount = 0;
        for (var i = 0; i < tt.length; i++) {
            var c = tt.charAt(i);
            if (/^[\u0000-\u00ff]$/.test(c)) {
                bytesCount += 1;
            }
            else {
                bytesCount += 2;
            }
        }
        if (bytesCount > len * 2 + 1) {
            tt = tt.substring(0, len) + ".";
        }
        return tt;
    };
    Object.defineProperty(Base_user_model.prototype, "userImg", {
        get: function () {
            return this._userImg;
        },
        //tyq: 头像
        set: function (value) {
            this._userImg = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "playStatus", {
        get: function () {
            return this._playStatus;
        },
        //tyq: 玩家状态
        set: function (value) {
            if (this._playStatus != value) {
                this._playStatus = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "position", {
        get: function () {
            return this._position;
        },
        //tyq: 方位
        set: function (value) {
            var cv = Number(value);
            if (this._position != cv) {
                this._position = cv;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "score", {
        get: function () {
            return this._score;
        },
        //tyq: 分数
        set: function (value) {
            var cv = Number(value);
            if (this._score != cv) {
                this._score = cv;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "gender", {
        get: function () {
            return this._gender;
        },
        //tyq: 性别
        set: function (value) {
            var cv = Number(value);
            if (this._gender != cv) {
                this._gender = cv;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "ip", {
        get: function () {
            return this._ip;
        },
        //tyq: ip
        set: function (value) {
            if (this._ip != value) {
                this._ip = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "joinIndex", {
        get: function () {
            return this._joinIndex;
        },
        //tyq: 进入房间顺序
        set: function (value) {
            var cv = Number(value);
            if (this._joinIndex != cv) {
                this._joinIndex = cv;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "userAgree", {
        get: function () {
            return this._userAgree;
        },
        //tyq: 用户是否同意（根据房间不同的playStatus，具备不同的意义）
        set: function (value) {
            if (this._userAgree != value) {
                this._userAgree = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "money", {
        get: function () {
            return this._money;
        },
        //tyq: 用户当前余额
        set: function (value) {
            var cv = Number(value);
            if (this._money != cv) {
                this._money = cv;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "notice", {
        get: function () {
            return this._notice;
        },
        //tyq: 跑马灯
        set: function (value) {
            if (this._notice != value) {
                this._notice = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_user_model.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
            this.m_to_c_dis_event(this.EVENT.user.update_online_status, this._state);
        },
        enumerable: true,
        configurable: true
    });
    //上线/掉线提示
    Base_user_model.prototype.online_tips = function () {
        // this.m_to_c_dis_event(this.EVENT.popup.floatAlert,{name:this._userName,type:"online_"+this._state});
    };
    //获取解散房间 时需要的玩家信息
    Base_user_model.prototype.get_dissolve_room_info = function (agree) {
        if (agree === void 0) { agree = 0; }
        return {
            userName: this._userName,
            userImg: this.userImg,
            agree: agree,
        };
    };
    Base_user_model.prototype.money_circleNum = function (num) {
        var card_num;
        switch (Number(num)) {
            case 2:
                card_num = 4;
                break;
            case 4:
                card_num = 6;
                break;
            case 8:
                card_num = 12;
                break;
        }
        return card_num;
    };
    Base_user_model.prototype.init_card_data = function () {
        this.userId = null;
        this._userName = null;
        this._userImg = null;
        this._position = null;
        this._score = 0;
        this._gender = null;
        this._ip = null;
        this._joinIndex = null;
        this._userAgree = null;
        this._money = null;
        this._notice = null;
        this._state = null;
        this.houseOwner = false;
        this.zhuang = false;
        this.current_table_board_position = 0;
        this.current_table_board_is_join = false;
        this.paoIndex = 0;
        this._playStatus = -1;
        this._is_action = false;
    };
    return Base_user_model;
}(Base_model));
__reflect(Base_user_model.prototype, "Base_user_model");
//# sourceMappingURL=Base_user_model.js.map