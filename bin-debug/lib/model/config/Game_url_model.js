var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-03-28.
 * 丹阳特有-不用合并
 */
var Game_url_model = (function (_super) {
    __extends(Game_url_model, _super);
    function Game_url_model() {
        var _this = _super.call(this) || this;
        //------------------------------------------通用游戏地址------------------------------------
        // private QG_PORT = "8208";//全国斗地主端口
        // private GAME_FILE_URL="X9_1";//项目文件夹名称
        _this.port = "8232/mj"; //端口号码
        _this.demo_url_zc = "w" + "s://" + "192.168.1.16:"; //zpb:防止搜索demo 本地个人-周聪
        _this.demo_url_zsc = "w" + "s://" + "192.168.1.11:"; //zpb:防止搜索demo 本地个人-张思全
        _this.demo_url_lz = "w" + "s://" + "192.168.1.156:"; //zpb:防止搜索demo 本地个人-刘卓
        _this.demo_url_fhz = "w" + "s://" + "192.168.1.8:"; //zpb:防止搜索demo 本地个人-冯红章
        _this.demo_url_public = "w" + "s://" + "192.168.1.7:"; //zpb:防止搜索demo 本地-公用服务器
        _this.alpha_url = "w" + "s://" + "47.93.61.29:"; //zpb:防止搜索 alpha 远程链接
        _this.release_url = "w" + "s://" + "39.106.67.169:"; //zpb:防止搜索 release
        //----------------------------------------单独游戏地址------------------------------------
        _this.game_url_config_list = {
            34: {
                game_name: "丹阳推倒胡",
                pro_name: "X15",
                game_folder: "",
                port: "8232/mj",
                release_ip: "w" + "s://" + "47.93.251.108:",
                alpha_ip: _this.alpha_url,
            }
        };
        return _this;
    }
    //CID获取游戏信息
    Game_url_model.prototype.cId_get_game_info = function (cId) {
        if (cId && this.game_url_config_list[cId]) {
            //alpha 地址
            if (!this.game_url_config_list[cId]["alpha_ip"])
                this.game_url_config_list[cId]["alpha_ip"] = this.alpha_url;
            //release 地址
            if (!this.game_url_config_list[cId]["release_ip"])
                this.game_url_config_list[cId]["release_ip"] = this.release_url;
            //游戏地址文件夹目录
            if (!this.game_url_config_list[cId]["game_folder"])
                this.game_url_config_list[cId]["game_folder"] = this.game_url_config_list[cId]["pro_name"];
            //端口
            if (!this.game_url_config_list[cId]["port"])
                this.game_url_config_list[cId]["port"] = this.port;
            return this.game_url_config_list[cId];
        }
        return null;
    };
    //获取某个配置 demo个人地址配置
    Game_url_model.prototype.demo_url_config_info = function (game_info, user_name) {
        if (!game_info["demo_url_" + user_name]) {
            if (this["demo_url_" + user_name]) {
                MyConsole.getInstance().trace("------个人-PC------", 0);
                return this["demo_url_" + user_name];
            }
            else if (user_name == "nosocket") {
                MyConsole.getInstance().trace("-------单机--------", 0);
                return "";
            }
            else {
                // MyConsole.getInstance().trace("------公测-PC------",0);
                // return this.demo_url_public;
                return ""; //--------临时用（当四人测试连接本地单机）
            }
        }
        return game_info["demo_url_" + user_name];
    };
    return Game_url_model;
}(Base_model));
__reflect(Game_url_model.prototype, "Game_url_model");
//# sourceMappingURL=Game_url_model.js.map