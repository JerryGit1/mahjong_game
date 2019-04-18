var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 伟大的周鹏斌大王 on 2017/7/22.
 * 基础通信类
 * 丹阳特有-不用合并
 */
var Base_service_model = (function (_super) {
    __extends(Base_service_model, _super);
    function Base_service_model() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Manager_event_model(); //事件常量
        /**是否已连接了服务器*/
        _this.isConnection = false;
        _this._is_open_stand_alone = false; //是否启动单机测试版
        _this.cSocketUrl = ""; //socketURL
        _this.route_model = new Route_model();
        _this.route_model.set_fields_analysis_by_file();
        return _this;
    }
    Base_service_model.prototype.set_model = function (load_model, popup_model) {
        this.load_model = load_model;
        this.popup_model = popup_model;
    };
    /*---------------------------http*-------------------------------------*/
    Base_service_model.prototype.http = function (url, data, backFun, _isLoading, method) {
        if (_isLoading === void 0) { _isLoading = true; }
        if (method === void 0) { method = egret.URLRequestMethod.POST; }
        MyConsole.getInstance().trace("---------发送的数据--------------", 3);
        if (data)
            MyConsole.getInstance().trace(data);
        // Route_model.get_local_to_server_by_route(data);
        var urlLoader = new egret.URLLoader(), urlreq, urlVari; //,data;
        urlreq = new egret.URLRequest();
        urlreq.url = url; //地址
        urlreq.method = method;
        urlVari = new egret.URLVariables();
        urlVari.variables = data;
        urlreq.data = urlVari; //数据
        //成功获取数据
        function onComplete() {
            urlLoader.removeEventListener(egret.Event.COMPLETE, onComplete, this);
            urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onLoadError, this);
            this.disposeBaseData(urlLoader.data, backFun, false);
        }
        //获取数据失败
        function onLoadError(e) {
            urlLoader.removeEventListener(egret.Event.COMPLETE, onComplete, this);
            urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onLoadError, this);
            this.onSocketError(e);
        }
        urlLoader.addEventListener(egret.Event.COMPLETE, onComplete, this);
        urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, onLoadError, this);
        urlLoader.load(urlreq);
    };
    /*-------------------------socket------------------------------------*/
    /*连接服务器*/
    Base_service_model.prototype.connection = function (socketUrl, _is_mandatory_cut_url) {
        if (this.judge_isConnect() || _is_mandatory_cut_url) {
            MyConsole.getInstance().trace("开始webSocket连接..." + socketUrl);
            this.load_model.add_loading_data(true);
            //zpb:清理一遍 旧的连接数据
            this.clear_old_socket();
            //new一个套接字（唯一的连接标识）
            this.webSocket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            //this.webSocket.type = egret.WebSocket.TYPE_BINARY;
            //2
            //侦听 套接字 跟 服务器 的 连接事件（如果检测到 连接至服务器成功了，就 转向 成功后要执行的子程序 onSocketOpen）
            this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //3
            //侦听 套接字 的 收到数据事件（如果检测到 服务器返回了数据，就 转向 收到数据后要执行的子程序 onReceiveMessage）
            this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //4添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //5添加异常侦听，出现异常会调用此方法
            this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            //6用 套接字 去尝试连接至 服务器
            this.cSocketUrl = socketUrl;
            this.webSocket.connectByUrl(socketUrl);
        }
    };
    //zpb:清理web socket
    Base_service_model.prototype.clear_old_socket = function () {
        if (this.webSocket) {
            //侦听 套接字 跟 服务器 的 连接事件（如果检测到 连接至服务器成功了，就 转向 成功后要执行的子程序 onSocketOpen）
            this.webSocket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //侦听 套接字 的 收到数据事件（如果检测到 服务器返回了数据，就 转向 收到数据后要执行的子程序 onReceiveMessage）
            this.webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //4添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this.webSocket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //5添加异常侦听，出现异常会调用此方法
            this.webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            //断开连接
            this.webSocket.close();
        }
    };
    /**向 服务器 发送数据 _isLoading加载条*/
    Base_service_model.prototype.sendData = function (data, _isLoading) {
        if (_isLoading === void 0) { _isLoading = false; }
        //打印请求 data_is_legitimacy数据是否合法
        var data_is_legitimacy = false, interfaceId = Number(data["interfaceId"]);
        //校验格式是否正确
        if (interfaceId) {
            for (var i in this.PORT.CONFIG) {
                if (Number(this.PORT.CONFIG[i].interfaceId) == interfaceId) {
                    MyConsole.getInstance().trace("<---发送请求-" + this.cSocketUrl + "-v:" + this.CONST.SERVICE_VERSION + "   [" + this.PORT.CONFIG[i].tips + "]  --->", 8);
                    //打印数据
                    if (Number(this.PORT.CONFIG.heartbeat.interfaceId) != interfaceId) {
                        MyConsole.getInstance().trace(JSON.stringify(data, null, 2), 888888);
                    }
                    data_is_legitimacy = true;
                    break;
                }
            }
        }
        if (!data_is_legitimacy)
            MyConsole.getInstance().trace("发送数据不合法", 0);
        else if (!this._is_open_stand_alone) {
            var info;
            if (!this.isConnection) {
                MyConsole.getInstance().trace("尚未建立连接", 0);
            }
            else if (this.CONST.USER_repetitionLogin) {
                MyConsole.getInstance().trace("重复登录", 0);
            }
            else {
                //ping和解析接口不进行编码
                if (Number(data["interfaceId"]) == Number(this.PORT.CONFIG.fields_analysis.interfaceId)) {
                    info = { a: this.PORT.CONFIG.fields_analysis.interfaceId };
                }
                else {
                    //对通信数据进行加密简化处理
                    info = this.route_model.get_local_to_server_by_route(data);
                }
                this.load_model.add_loading_data(_isLoading);
                this.webSocket.writeUTF(JSON.stringify(info)); //开始发送请求
                this.webSocket.flush();
            }
        }
        else {
            //单机版
            data = Stand_alone_service_model.start_send_info(interfaceId, data);
            if (data) {
                MyConsole.getInstance().trace("《--模拟推送假数据---》", 0);
                MyConsole.getInstance().trace(data, 8888);
                this.radioServiceInfo(interfaceId, data);
            }
            else {
                MyConsole.getInstance().trace("《--单机版回个屁---》", 0);
            }
        }
    };
    /*获取socket数据ok*/
    Base_service_model.prototype.onReceiveMessageOk = function (info, interfaceId) {
    };
    /*判断服务器是否可以连接*/
    Base_service_model.prototype.judge_isConnect = function () {
        if (this.webSocket) {
            if (this.isConnection) {
                MyConsole.getInstance().trace("已有连接，勿重复", 0);
                return false;
            }
            else {
                MyConsole.getInstance().trace("服务器正在连接中", 0);
                return false;
            }
        }
        return true;
    };
    /*连接服务器成功*/
    Base_service_model.prototype.onSocketOpen = function () {
        MyConsole.getInstance().trace("webSocket连接成功");
        this.load_model.remove_loading_data();
        this.isConnection = true;
        this.m_to_c_dis_event(this.EVENT.manager.web_socket_open);
    };
    /*收到 服务器发来数据 后 执行的子程序*/
    Base_service_model.prototype.onReceiveMessage = function (e) {
        var msg = this.webSocket.readUTF();
        this.disposeBaseData(msg, this.onReceiveMessageOk.bind(this));
    };
    /*主动关闭链接*/
    Base_service_model.prototype.closeSocket = function () {
        if (this.webSocket) {
            this.webSocket.close();
            if (this.CONST.USER_turnLogin)
                this.webSocket = null;
        }
    };
    /*-----------------------------------数据处理--------------------------*/
    Base_service_model.prototype.radioServiceInfo = function (interfaceId, info) {
    };
    //单个数据转码----1
    Base_service_model.prototype.disposeBaseData = function (msg, backFun, _is) {
        if (_is === void 0) { _is = true; }
        //第1步---移除数据加载提示条
        if (this.load_model)
            this.load_model.remove_loading_data();
        //第2步--- 解析数据进行字段解析转码配置
        var data = JSON.parse(msg), interfaceId = Number(data["interfaceId"]);
        if (interfaceId == Number(this.PORT.CONFIG.fields_analysis.interfaceId)) {
        }
        else {
            if (_is)
                data = this.route_model.get_server_to_local_by_route(data);
            interfaceId = Number(data["interfaceId"]);
        }
        //第3步--- 打印数据方便查看 大接口数据比较多分批发送的 不在这打印 or测试接口也不打印
        if (interfaceId != Number(this.PORT.CONFIG.mainInfo.interfaceId) &&
            interfaceId != Number(this.PORT.CONFIG.getSystemCard.interfaceId))
            this.selectSendInfoTips(data);
        //第4步--- 处理并发送数据
        if (data) {
            if (Number(data.state) == 1) {
                backFun(data.info, data["interfaceId"]);
            }
            else {
                if (!data.message)
                    data.message = "未知异常,请刷新!";
                this.popup_model.socket_unusual(data.message); //弹出信息提示
            }
        }
        else {
            this.popup_model.socket_unusual("网络异常" + data.interfaceId); //弹出异常
        }
    };
    //整体数据转码----2
    Base_service_model.prototype.all_data_transcoding = function (info) {
        return this.route_model.get_server_to_local_by_route(info);
    };
    /*接收消息查询*/
    Base_service_model.prototype.selectSendInfoTips = function (data) {
    };
    /*服务器关闭连接*/
    Base_service_model.prototype.onSocketClose = function (e) {
        if (!this.CONST.USER_repetitionLogin && !this.CONST.USER_turnLogin) {
            this.webSocket.close();
            Sound_model.stopBackSound(); /*暫停音樂*/
            this.popup_model.socket_close();
        }
        if (this.CONST.USER_turnLogin) {
            // BaseModel.USER_turnLogin = false;
            this.isConnection = false;
        }
        this.load_model.remove_loading_data(); //移除加载提示界面
    };
    /*服务器连接异常*/
    Base_service_model.prototype.onSocketError = function (e) {
        this.popup_model.socket_unusual("网络异常");
        this.load_model.remove_loading_data(); //移除加载提示界面
    };
    return Base_service_model;
}(Scene_model));
__reflect(Base_service_model.prototype, "Base_service_model");
//# sourceMappingURL=Base_service_model.js.map