var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-05-08.
 */
var Location_model = (function (_super) {
    __extends(Location_model, _super);
    function Location_model() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.user_info_list = [];
        _this.dis_list = [
            {
                p1: 1,
                p2: 2,
                dis: null
            },
            {
                p1: 1,
                p2: 3,
                dis: null
            },
            {
                p1: 1,
                p2: 4,
                dis: null
            },
            {
                p1: 2,
                p2: 3,
                dis: null
            },
            {
                p1: 2,
                p2: 4,
                dis: null
            },
            {
                p1: 3,
                p2: 4,
                dis: null
            }
        ];
        return _this;
    }
    //配置距离信息
    Location_model.prototype.set_dis_info = function (list) {
        var user_info_list = this.user_info_list;
        for (var i in this.dis_list) {
            this.dis_list[i].dis = get_dis(this.dis_list[i].p1, this.dis_list[i].p2);
        }
        function get_dis(p1, p2) {
            var p1_user_id = position_get_user_id(p1);
            var p2_user_id = position_get_user_id(p2);
            for (var i in list) {
                if ((list[i].userId == p1_user_id && list[i].toUserId == p2_user_id) ||
                    (list[i].userId == p2_user_id && list[i].toUserId == p1_user_id)) {
                    return list[i].distance;
                }
            }
            return null;
        }
        function position_get_user_id(p) {
            for (var i in user_info_list) {
                if (user_info_list[i].position == p) {
                    return user_info_list[i].userId;
                }
            }
        }
    };
    return Location_model;
}(Base_model));
__reflect(Location_model.prototype, "Location_model");
//# sourceMappingURL=Location_model.js.map