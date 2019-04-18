/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//单机版 接口处理
var Stand_alone_service_model = (function (_super) {
    __extends(Stand_alone_service_model, _super);
    function Stand_alone_service_model() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stand_alone_service_model.start_send_info = function (interfaceId, info) {
        switch (interfaceId + "") {
            case this.PORT.CONFIG.fields_analysis.interfaceId:
                return Zpb_test_model_1.fields_analysis;
            case this.PORT.CONFIG.mainInfo.interfaceId:
                // return Zpb_test_model_1.mainInfo;
                return JackerCao_test_model_1.mainInfo;
            case this.PORT.CONFIG.club_my_list.interfaceId:
                return Zwb_test_model_1.get_my_club_list;
            case this.PORT.CONFIG.club_info.interfaceId:
                return Zwb_test_model_1.get_club_info;
            case this.PORT.CONFIG.club_get_my_info.interfaceId:
                return Zwb_test_model_1.get_club_get_my_info;
            case this.PORT.CONFIG.club_create_room.interfaceId:
                return "创建俱乐部房间-----interfaceId:500004";
            case this.PORT.CONFIG.club_join_room.interfaceId:
                return "加入俱乐部房间-----interfaceId:500005";
            case this.PORT.CONFIG.club_request_join.interfaceId:
                return "申请离开-----interfaceId:500000";
            case this.PORT.CONFIG.club_request_leave.interfaceId:
                return "申请离开-----interfaceId:500007";
            case this.PORT.CONFIG.hall_achievement.interfaceId:
                console.log("info.pages:" + info.pages);
                if (info.page == 1) {
                    return JackerCao_test_model_1.achievement;
                }
                else {
                    return JackerCao_test_model_1.achievement2;
                }
            case this.PORT.CONFIG.hall_currentReplaceRoom.interfaceId:
                return JackerCao_test_model_1.issue;
        }
        return null;
    };
    return Stand_alone_service_model;
}(egret.Sprite));
Stand_alone_service_model.PORT = Port_model.getInstance();
__reflect(Stand_alone_service_model.prototype, "Stand_alone_service_model");
//# sourceMappingURL=Stand_alone_service_model.js.map