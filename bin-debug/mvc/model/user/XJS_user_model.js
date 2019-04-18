var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-05-05.
 */
var XJS_user_model = (function (_super) {
    __extends(XJS_user_model, _super);
    // public _cpg_stop_card;
    function XJS_user_model() {
        var _this = _super.call(this) || this;
        //胡牌类型定义表
        _this.win_info_list = {
            1: "点炮",
            2: "自摸",
            3: "刻*",
            4: "杠开",
            5: "点炮胡",
            6: "无搭",
            7: "百搭胡",
            8: "",
            9: "庄家",
            10: ""
        };
        _this.hu_type = 0; //1胡牌 2点炮 3自摸
        _this.is_cur = false;
        return _this;
    }
    // //设置 杠分 & 胡分
    // public set_gang_and_hu_score(info,is_dian){
    //     // if(is_win){
    //     //     this.hu_score = 1;
    //     //     this.gang_score = 0;
    //     // }else{
    //     //     if()
    //     //     this.hu_score = 0;
    //     //     if(this.score!=0) this.gang_score = this.c
    //     // }
    // }
    //设置 和牌 具体信息清单
    XJS_user_model.prototype.set_win_info = function (info) {
        this.hu_info_str = "";
        if (info) {
            var ke_num = 0;
            var ke_str = "";
            for (var i in info) {
                var win = Number(info[i]);
                if (win == 1 || win == 2)
                    continue; //1点炮，2自摸
                if (win == 3) {
                    ke_num++;
                    ke_str = this.win_info_list[win] + ke_num;
                }
                else {
                    if (ke_str != "") {
                        this.hu_info_str += ke_str + ", ";
                        ke_str = "";
                    }
                    this.hu_info_str += this.win_info_list[win];
                    if (Number(i) != info.length - 1)
                        this.hu_info_str += ", ";
                }
                if (Number(i) == info.length - 1 && ke_str != "") {
                    this.hu_info_str += ke_str;
                }
            }
        }
    };
    return XJS_user_model;
}(User_model));
__reflect(XJS_user_model.prototype, "XJS_user_model");
//# sourceMappingURL=XJS_user_model.js.map