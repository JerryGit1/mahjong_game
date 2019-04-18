var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by 周鹏斌大王 on 2017-12-23.
 * 接口定义
 * 丹阳特有-不用合并
 */
var Port_model = (function () {
    function Port_model() {
        /*zpb:接口*/
        this.SOCKET_DATA_EVENT = "socket_event_"; //数据返回事件
        this.CONFIG = {
            fields_analysis: {
                interfaceId: "100999",
                tips: "字段解析编码信息"
            },
            //----------------------大接口--------------------------
            mainInfo: {
                interfaceId: "100100",
                tips: "大接口数据"
            },
            //----------------------大厅主界面--------------------------
            hall_managerList: {
                interfaceId: "100003",
                tips: "大厅-系统消息"
            },
            hall_achievement: {
                interfaceId: "100002",
                tips: "大厅-战绩查询"
            },
            hall_contactUs: {
                interfaceId: "100004",
                tips: "大厅-联系我们"
            },
            hall_feedback: {
                interfaceId: "100006",
                tips: "大厅-反馈"
            },
            hall_createRoom: {
                interfaceId: "100007",
                tips: "大厅-创建房间"
            },
            hall_joinRoom: {
                interfaceId: "100008",
                tips: "大厅-加入房间"
            },
            hall_consentUA: {
                interfaceId: "100009",
                tips: "大厅-发起-同意用户协议"
            },
            //----------------------代开--------------------------
            hall_currentReplaceRoom: {
                interfaceId: "100010",
                tips: "大厅-发起-获取代开房间信息"
            },
            hall_historyReplaceRoom: {
                interfaceId: "100011",
                tips: "大厅-发起-获取代开房间历史记录"
            },
            hall_dissolveReplaceRoom: {
                interfaceId: "100013",
                tips: "大厅-发起-代开模式房主解散房间"
            },
            hall_deleteUser: {
                interfaceId: "100012",
                tips: "大厅-发起-房主踢人"
            },
            hall_orderDissolveReplaceRoom: {
                interfaceId: "100015",
                tips: "发起-代开-强制解散房间"
            },
            hall_onLine_issueRoom: {
                interfaceId: "100112",
                tips: "大厅-玩家加入代开房间"
            },
            hall_issueRoom_star_game: {
                interfaceId: "100115",
                tips: "大厅-代开房间游戏开局"
            },
            hall_issueRoom_delete: {
                interfaceId: "100140",
                tips: "大厅-代开房间解散房间回应"
            },
            record_bogus_info: {
                interfaceId: "100400",
                tips: "战绩"
            },
            issue_history_info: {
                interfaceId: "100401",
                tips: "代开历史"
            },
            //----------------------回放------------------
            hall_roomPlaybackList: {
                interfaceId: "100014",
                tips: "大厅-回放列表-获取某个房间每小局数据列表"
            },
            //----------------------俱乐部--------------------------
            club_request_join: {
                interfaceId: "500000",
                tips: "确认加入俱乐部"
            },
            club_request_join_before: {
                interfaceId: "500001",
                tips: "申请加入俱乐部前查询"
            },
            club_my_list: {
                interfaceId: "500002",
                tips: "获取我的俱乐部列表"
            },
            club_info: {
                interfaceId: "500003",
                tips: "获取俱乐部详细信息"
            },
            club_create_room: {
                interfaceId: "500004",
                tips: "创建俱乐部房间"
            },
            club_join_room: {
                interfaceId: "500005",
                tips: "加入俱乐部房间"
            },
            club_get_my_info: {
                interfaceId: "500006",
                tips: "获取俱乐部我的成绩"
            },
            club_request_leave: {
                interfaceId: "500007",
                tips: "申请离开俱乐部"
            },
            club_history_info: {
                interfaceId: "100402",
                tips: "俱乐部战绩"
            },
            //-----------------------------------房间内部接口--------------------------------------------
            game_smallSettlement: {
                interfaceId: "100102",
                tips: "游戏-小结算"
            },
            game_bigSettlement: {
                interfaceId: "100103",
                tips: "游戏-大结算"
            },
            game_chatAni: {
                interfaceId: "100206",
                tips: "游戏-其他玩家的表情文字语音消息"
            },
            game_executeAction: {
                interfaceId: "100201",
                tips: "游戏-玩家发起动作/行为"
            },
            game_executeAction_respond: {
                interfaceId: "100104",
                tips: "游戏-动作执行-回应"
            },
            game_settlementWaitOk: {
                interfaceId: "100200",
                tips: "游戏-当前玩家小结算确认"
            },
            game_dissolveRoom: {
                interfaceId: "100203",
                tips: "游戏-发起解散房间"
            },
            game_dissolveRoomAgree: {
                interfaceId: "100204",
                tips: "游戏-解散房间 玩家(包括自己) 同意/拒绝 操作"
            },
            game_quitRoom: {
                interfaceId: "100205",
                tips: "游戏-等待阶段退出房间"
            },
            game_beRemovedPlayer: {
                interfaceId: "100107",
                tips: "玩家被踢提示"
            },
            game_on_or_Live_State: {
                interfaceId: "100109",
                tips: "游戏-玩家在线状态切换"
            },
            //------------------------通用----------------------------
            game_actionIDError: {
                interfaceId: "100108",
                tips: "动作ID或大接口ID 出错（过时）"
            },
            heartbeat: {
                interfaceId: "100000",
                tips: "游戏-心跳"
            },
            repetitionLogin: {
                interfaceId: "100106",
                tips: "游戏-重复登录警告"
            },
            qiangzhijiesan: {
                interfaceId: "999800",
                tips: "强制解散房间",
            },
            getSystemCard: {
                interfaceId: "999998",
                tips: "游戏-获取系统剩余牌"
            },
            setSystemCard: {
                interfaceId: "999999",
                tips: "游戏-获取系统剩余牌"
            },
            setStopCard: {
                interfaceId: "999997",
                tips: "游戏-设置玩家手牌"
            },
            network: {
                interfaceId: "999997",
                tips: "游戏-网络质量"
            },
            positioning: {
                interfaceId: "100016",
                tips: "游戏-发送坐标信息"
            },
            get_position_info: {
                interfaceId: "100207",
                tips: "游戏-获取距离"
            }
        };
    }
    Port_model.getInstance = function () {
        if (!this.model) {
            this.model = new Port_model();
        }
        return this.model;
    };
    return Port_model;
}());
__reflect(Port_model.prototype, "Port_model");
//# sourceMappingURL=Port_model.js.map