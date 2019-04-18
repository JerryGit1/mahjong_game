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
 * main 的model 管理model
 */
var Manager_model = (function (_super) {
    __extends(Manager_model, _super);
    function Manager_model() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Manager_event_model(); //事件常量
        _this._is_manager = true;
        return _this;
    }
    /**
     * zpb:第1步 初始化
     * 初始化data model 和 scene model
     * 配置基础参数
     * 侦听基础事件
     * */
    Manager_model.prototype.init_model = function (scene) {
        //zpb:初始化data model 和 scene model
        this.config_model = new Config_model();
        this.config_model.init_config(scene);
        var game_model = new Game_model(), ani_model = new Ani_model(), popup_model = new Popup_model(), load_model = new Load_model(), socket_model = new Web_socket_service(), http_model = new Http_service_model(), self_model = new User_model();
        //配置相互直接需要的model
        socket_model.set_model(load_model, popup_model);
        game_model.set_model(socket_model, ani_model);
        popup_model.set_model(socket_model, ani_model);
        Weixin_JSSDK_model.getInstance().set_model(load_model, popup_model);
        this.socket_model = socket_model;
        this.game_model = game_model;
        //zpb:分配model 给各自的control
        this.m_to_c_dis_event(this.EVENT.manager.scene_set_model, [game_model, ani_model, popup_model, load_model, socket_model, http_model]);
    };
    /**
     *zpb:第2步 基础资源加载完毕，开始启动socket连接
     * */
    Manager_model.prototype.start_socket = function () {
        //zpb:捕获握手协议
        this.socket_model.m_to_c_add_event(this.EVENT.manager.web_socket_open, this.socket_open, this);
        /*--------------各个场景 刷新大接口 侦听--------------*/
        //tyq:游戏model 刷新
        this.game_model.m_to_c_add_event(this.EVENT.base.update_main_info, this.update_main_info, this);
        //zpb:跳转新的服务器连接
        //this.game_model.m_to_c_add_event(this.EVENT.hall.skip_new_socket_url,this.skip_new_socket_url,this);
        //zpb:服务model 动作ID异常时刷新
        //this.socket_model.m_to_c_add_event(this.EVENT.service.update_main_info,this.update_main_info,this);
        //zpb:接收字段解析数据
        this.socket_model.add_port_event(this.PORT.CONFIG.fields_analysis, this.update_main_info, this);
        //zpb:接收大接口数据
        this.socket_model.add_port_event(this.PORT.CONFIG.mainInfo, this.receive_main_info, this);
        //zpb:页面获得焦点
        this.config_model.m_to_c_add_event(this.EVENT.manager.onfocus, this.onfocus, this);
        //zpb:页面失去焦点
        this.config_model.m_to_c_add_event(this.EVENT.manager.onblur, this.onblur, this);
        //zpb:准备完毕 开始连接 服务器
        this.socket_model.startConnect(false, this.config_model.game_socket_url);
    };
    /**
     *zpb:第3步 webSocket 握手协议连接成功
     * 侦听 服务类 事件
     * */
    Manager_model.prototype.socket_open = function () {
        // //获取前后端编码字段定义
        // this.socket_model.get_fields_analysis();
        this.update_main_info(null); //---临时使用
    };
    /**
     *zpb:第4步 请求/刷新（主动请求才会推送）大接口数据
     *大接口 二号机最重要的第一大接口
     *大接口 断线重连
     * */
    Manager_model.prototype.update_main_info = function (e) {
        var F = this.config_model.openId, G = this.config_model.cId;
        /*获取大接口数据*/
        MyConsole.getInstance().trace("-----》请求大接口数据", "custom1");
        this.socket_model.main_info(F, G, true);
    };
    /****
     * zpb:第5步 接收到大接口数据
     * 各个model 开始处理各自相关数据
     * 各个model 开始告诉sceneview 做显示操作
     * */
    Manager_model.prototype.receive_main_info = function (data) {
        /*game model处理信息*/
        MyConsole.getInstance().trace("-----》处理大接口数据-managerModel", "custom1");
        this.game_model.mainInterface(data, this.config_model.share_room_id, this.config_model.playback_room_info);
        /*未来其他 model 处理信息*/
    };
    /*----------------页面获得焦点-----------------*/
    Manager_model.prototype.onfocus = function () {
        //播放背景音乐
        Sound_model.set_page_focus();
        //视图刷新处理
        this.game_model.onfocus();
    };
    Manager_model.prototype.onblur = function () {
        //处理声音
        Sound_model.set_page_focus(false);
    };
    /*---------------跳转新的socket连接---------------*/
    Manager_model.prototype.skip_new_socket_url = function (info) {
        MyConsole.getInstance().trace("跳转新的 socket连接" + info.roomIp);
        if (info.roomIp) {
            //配置新的连接
            this.config_model.config_game_url(info.roomIp);
            //重新连接新的服务器后 尝试加入某个房间
            this.game_model._is_jing_mo_join_new_room_type = 1; //重新加入一次分享的房间
            this.config_model.clear_state(); //清理房间分享的房间号码
            this.config_model.set_share_room_id("1_" + info.roomId);
            //zpb:准备完毕 开始连接 服务器
            this.socket_model.startConnect(true, this.config_model.game_socket_url);
        }
    };
    return Manager_model;
}(Scene_model));
__reflect(Manager_model.prototype, "Manager_model");
//# sourceMappingURL=Manager_model.js.map