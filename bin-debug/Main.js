var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2017-12-23.
 * 这个差异只有版本号-不用合并
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        /*小秘书 继承自基础scene*/
        _this.EVENT = new Manager_event_model(); //事件常量
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.add_to_stage, _this);
        return _this;
    }
    /*zpb:添加到舞台*/
    Main.prototype.add_to_stage = function (e) {
        /*第1步----基础初始化*/
        //zpb:初始化model
        this.model = new Manager_model();
        //zpb:初始化事件
        this.model.m_to_c_add_event(this.EVENT.manager.scene_set_model, this.init_control, this); //zpb:配置scene和model关系
        /*第2步------配置*/
        this.model.init_model(this);
    };
    /*配置 control*/
    Main.prototype.init_control = function (modelList) {
        //zpb:control 和视图
        var game_view = new Game_view();
        this.addChild(game_view);
        this.game_control = new Game_control(modelList[0], game_view); //zpb：游戏
        this.game_control.c_to_c_add_event(this.EVENT.base.load_resource_start, this.subsectionLoadScene, this); //zpb:大厅场景
        var ani_view = new Ani_view();
        this.addChild(ani_view);
        this.ani_control = new Ani_control(modelList[1], ani_view); //zpb：动画
        var popup_view = new Popup_view();
        this.addChild(popup_view);
        this.popup_control = new Popup_control(modelList[2], popup_view); //zpb:弹窗
        var load_view = new Load_view();
        this.addChild(load_view);
        this.load_control = new Load_control(modelList[3], load_view); //zpb：加载
        /*第3步----启动资源加载*/
        this.load_control.load_resource_file(function () {
            /*第4步----加载配置文件*/
            this.subsectionLoadScene({
                name: "loading",
                back_fun: function () {
                    /*第5步----连接服务器*/
                    this.model.start_socket();
                }.bind(this),
                loadingType: 1
            });
        }.bind(this));
    };
    /*分段加载资源 loadingType 1显示加载界面 0不显示*/
    Main.prototype.subsectionLoadScene = function (info) {
        var name = info.name, backFun = info.back_fun, loadingType = info.loadingType ? info.loadingType : 1;
        this.load_control.addEventListener(this.EVENT.base.load_resource_ok, UILoadOk, this);
        //加载load基础资源
        this.load_control.loadingGroup(name, loadingType);
        function UILoadOk() {
            this.load_control.removeEventListener(this.EVENT.base.load_resource_ok, UILoadOk, this);
            backFun();
        }
    };
    /*抖屏幕动画*/
    Main.prototype.shake_ani = function () {
        egret.Tween.removeTweens(this);
        var X = this.x;
        var Y = this.y;
        egret.Tween.get(this).to({ x: X - 5 }, 60).to({ x: X }, 60).to({ y: Y + 5 }, 60).to({ y: Y }, 30);
    };
    return Main;
}(Base_view));
/***********基础静态变量*********/
Main.stageWidth = 1136;
Main.stageHeight = 640;
Main.pro_name = "X15"; //项目名称
Main.version = "3.0.1";
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map