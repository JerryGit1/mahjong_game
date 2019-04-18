var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by 周鹏斌大王 on 2017-12-23.
 *
 * 常量model 所有静态变量都放这
 * 丹阳特有-不用合并
 */
var Const_model = (function () {
    function Const_model() {
        /*单项常量*/
        this.GAME_NAME = "丹阳推倒胡"; //游戏名称
        this.SERVICE_VERSION = ""; //后端版本
        this.HTTP_HOST = ""; //服务器host地址
        this.IOS = false; //是否是ios手機
        this.PC = false; //是否是PC
        this.ISSCREEEN = false; //是否是锁定屏幕竖屏模式 横屏下会提示 旋转
        this.login_statistic = false; /*玩家登录统计*/
        this.version_type = "release"; //版本类型【demo（日志不会上传） alpha release】
        this.USER_repetitionLogin = false; //重复登录
        this.USER_turnLogin = false; //切换登录
        this.PLAYBACK_MODEL = false; /*回放模式下*/
        this.PLAYBACK_PAUSE = false; /*回放模式是否暂停*/
        this.curr_is_silence_join = false; //是否通过分享的房间号加入
        this.marquee_tips = ""; //跑马灯内容
        this.HEART_TIME = 8; /*心跳保持时间 秒*/
        /*場景状态*/
        this.GAME_STARE = {
            LOAD: "load",
            HALL: "hall",
            ROOM: "room",
            CLUB: "club" //俱乐部
        };
        this.club = {
            request_join: "request_join",
            request_cut_main_scene: "request_cut_main_scene",
            main_scene: "main_scene",
            square_scene: "square_scene",
        };
        this.club_max_create_num = 5; //最多创建加入中的牌桌数量
        //zpb:房间【加载】状态 (添加加载状态是因为在加入房间时如果直接切换界面会出错)*/
        this.ROOM_LOAD_STATUS = {
            LOADING: -1,
            CUTSCENE: 2,
            LOAD_OK: 3,
        };
        //zpb:房间【流程】状态
        this.ROOM_STATUS = {
            INIT: -1,
            SHORT_BOARD: 1,
            PLAY: 2,
            PREPARE: 3,
            GAME_OVER: 4,
        };
        /*tyq: 房间中头像位置 准备阶段*/
        this.HEAD_POS_wait = [
            { "x": Main.stageWidth / 2, "y": Main.stageHeight / 2 + 200 },
            { "x": Main.stageWidth / 2 + 300, "y": Main.stageHeight / 2 },
            { "x": Main.stageWidth / 2, "y": Main.stageHeight / 2 - 210 },
            { "x": Main.stageWidth / 2 - 300, "y": Main.stageHeight / 2 },
        ];
        /*tyq: 房间中头像位置 游戏阶段*/
        this.HEAD_POS_game = [
            { "x": Main.stageWidth * 0.06, "y": "动态设置" },
            { "x": Main.stageWidth * 0.95, "y": Main.stageHeight / 2 - Main.stageHeight * .1 },
            { "x": Main.stageWidth - 170, "y": 60 },
            { "x": Main.stageWidth * 0.05, "y": Main.stageHeight / 2 - Main.stageHeight * .1 },
        ];
        //花牌位置
        this.HUA_CARD_START_POINT = [
            { x: Main.stageWidth * 0.17, y: Main.stageHeight * 0.87 },
            { x: Main.stageWidth * 0.85, y: Main.stageHeight * 0.72 },
            { x: Main.stageWidth * 0.72, y: Main.stageHeight * 0.25 - 24 },
            { x: Main.stageWidth * 0.23, y: Main.stageHeight * 0.28 },
        ];
        this.HUA_CARD_DIS = 45; //花牌展示间距
        /*tyq: 房间中准备icon 提示*/
        this.WAIT_TIP_POS = [
            { "x": Main.stageWidth / 2, "y": Main.stageHeight / 2 + 135 },
            { "x": Main.stageWidth / 2 + 220, "y": Main.stageHeight / 2 },
            { "x": Main.stageWidth / 2, "y": Main.stageHeight / 2 - 130 },
            { "x": Main.stageWidth / 2 - 220, "y": Main.stageHeight / 2 },
        ];
        /*tyq: 玩家动作*/
        this.PLAYER_ACTION = {
            system_deal_card: -1,
            play_card: 501,
            chi: 1,
            peng: 2,
            gang: 3,
            an_gang: 4,
            hu: 6,
            guo: 7,
            hua: 8,
        };
        //特殊杠
        this.ZHANG_MAO_TYPE = {
            dnxb_zhang_mao: 51,
            zfb_zhang_mao: 52,
            dnxb_bu_mao: 53,
            zfb_bu_mao: 54,
        };
        //杠-类型
        this.MING_GANG_TYPE = {
            dian_gang: 31,
            peng_gang: 32,
        };
        //zpb:玩家【房间】状态
        this.USER_PLAY_STATUS = {
            HALL: 1,
            ROOM_IN: 2,
            PREPARED: 3,
            GAME: 4,
            XJS: 5,
            NONE: -1
        };
        //zpb:玩家【在线】状态*/
        this.USER_LINE_STATE = {
            ON_LINE: 1,
            OFF_LINE: 2 //下线
        };
        //zpb:玩家【牌】的类型
        this.CARD_TYPE = {
            play: 1,
            base_stop: 2,
            cpg_stop: 3,
            an_g_stop: 4,
            hua_card: 5,
        };
        //胡牌类型
        this.HU_WIN_TYPE = {};
        //音效地址基础
        this.SOUND_PATH_BASE = "resource/sound/";
        //音效地址--牌
        this.SOUND_PATH_CARD = "card/";
        //音效地址--聊天
        this.SOUND_PATH_CHAT = "chat/";
        this.SELF_CARD_WIDTH = Math.floor(Main.stageWidth / 14); //自己手牌大小
        this.SELF_CARD_HEIGHT = 202 * .96;
        //设置牌数据
        this.CARD_INFO = {
            base_stop_w_p1: 0,
            base_stop_w_p3: 0,
            base_stop_w_p2: 0,
            base_stop_w_p4: 0,
            base_stop_w_p2_start_Y: 0,
        };
        this.HEAD_WIDTH = 102;
        this.HEAD_HEIGHT = 122;
    }
    Const_model.getInstance = function () {
        if (!this.model) {
            this.model = new Const_model();
        }
        return this.model;
    };
    Const_model.prototype.set_card_data = function () {
        var info = this.CARD_INFO;
        info.base_stop_w_p1 = (Main.stageWidth - 10 * 2) / 13; //一号玩家的宽度
        info.base_stop_w_p3 = (Main.stageWidth - 250 * 2) / 15; //三号玩家的宽度
        var self_card_h = 106 * (info.base_stop_w_p1 / 74);
        info.base_stop_w_p4 = info.base_stop_w_p2 = (Main.stageHeight - self_card_h * 2) / 8; //2/4号玩家的宽度
        info.base_stop_w_p2_start_Y = Main.stageHeight - Math.floor(self_card_h * 1.5);
        //1号牌高度
        this.SELF_CARD_HEIGHT = self_card_h;
        //1号头像坐标
        this.HEAD_POS_game[0].y = Main.stageHeight - self_card_h - 100;
        //风向坐标
        this.LOCATION_POINT = new egret.Point(Main.stageWidth / 2, Main.stageHeight * .45);
    };
    /*格式化时间戳*/
    Const_model.prototype.formatting_timestamp = function (timestamp, is_type) {
        if (timestamp === void 0) { timestamp = null; }
        if (is_type === void 0) { is_type = 1; }
        var dateTime;
        if (timestamp) {
            dateTime = new Date(Math.floor(timestamp));
        }
        else {
            dateTime = new Date();
        }
        var year = dateTime.getFullYear();
        var month = this.addPreZero(dateTime.getMonth() + 1);
        var day = this.addPreZero(dateTime.getDate());
        var hours = this.addPreZero(dateTime.getHours());
        var minutes = this.addPreZero(dateTime.getMinutes());
        var seconds = this.addPreZero(dateTime.getSeconds());
        if (is_type == 1) {
            var createTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            return createTime;
        }
        else if (is_type == 2) {
            var createTime = "" + year + month + day + hours + minutes + seconds;
            return createTime;
        }
        else if (is_type == 3) {
            var createTime = month + "-" + day + " " + hours + "-" + minutes + "-" + seconds;
            return createTime;
        }
        else {
            var createTime = hours + "-" + minutes;
            return createTime;
        }
    };
    // 补零方法
    Const_model.prototype.addPreZero = function (num) {
        if (num < 10) {
            return '0' + num;
        }
        else {
            return num;
        }
    };
    ;
    //通过数据获取规则====>tyq: 不同游戏规则不一，不用合并
    Const_model.prototype.get_game_rule = function (data, type) {
        if (type === void 0) { type = null; }
        var ruleStr, //存储玩法
        roomType = "", //房间类型：1房主模式；2自由模式
        circleNum = "", //圈数 2/4/8 (默认2)
        scoreType = "", //计分方式：1出冲大宝；2出冲包三家；3陪冲；4不出冲
        huaType = "", //玩法类型：1无花；2有花
        chiType = ""; //玩法类型：1不可以吃；2可以吃
        if (Number(data.roomType) == 1) {
            roomType = "房主模式,";
        }
        else if (Number(data.roomType) == 2) {
            roomType = "代开模式,";
        }
        switch (Number(data.circleNum)) {
            case 2:
                circleNum = "2圈 房卡X4,";
                break;
            case 4:
                circleNum = "4圈 房卡X6,";
                break;
            case 8:
                circleNum = "8圈 房卡X12,";
                break;
        }
        switch (Number(data.scoreType)) {
            case 1:
                scoreType = "出冲大包,";
                break;
            case 2:
                scoreType = "出冲包三家,";
                break;
            case 3:
                scoreType = "陪冲,";
                break;
            case 4:
                scoreType = "不出冲,";
                break;
        }
        if (Number(data.huaType) == 1) {
            huaType = "无花,";
        }
        else if (Number(data.huaType) == 2) {
            huaType = "有花,";
        }
        if (Number(data.chiType) == 1) {
            chiType = "不可以吃";
        }
        else if (Number(data.chiType) == 2) {
            chiType = "可以吃";
        }
        ruleStr = circleNum + roomType + scoreType + huaType + chiType; //具体的玩法
        return ruleStr;
    };
    return Const_model;
}());
__reflect(Const_model.prototype, "Const_model");
//# sourceMappingURL=Const_model.js.map