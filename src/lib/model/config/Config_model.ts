/**
 * Created by 周鹏斌大王 on 2017-12-23.
 *
 * 游戏各种参数配置
 */
class Config_model extends Base_model{
    public EVENT:Manager_event_model=new Manager_event_model();//事件常量
    private url_data_model:Url_data_model;//url参数数据
    private game_url_model:Game_url_model;//游戏地址配置参数数据
    public game_socket_url="";//游戏最终socket地址
    public constructor(){
        super();
        this.url_data_model=new Url_data_model();
        this.game_url_model=new Game_url_model();
    }
    /*zpb:各种配置*/
    public init_config(scene){
        this.set_service_post_param();//zpb：配置登陆用户信息
        this.config_game_url(this.url_data_model.roomIp,scene);//hyh 配置游戏地址
        this.set_stage_scale_mode(scene);//zpb:配置屏幕适配
        this.set_web_page_back_tips(scene);//zpb:配置ios返回按钮
        Sound_model.getLocalStorage();//zpb:配置音乐信息缓存
    }
    /*---------------------配置信息------------------------*/
    /*zpb:配置url参数配置*/
    private service_param_info;
    private set_service_post_param(){
        if(window["AH_param"]&&window["AH_param"]!="null"){//post信息登录
            egret.localStorage.setItem("AH_param",window["AH_param"]);
            var data=JSON.parse(decodeURIComponent(window["AH_param"]));
            this.url_data_model.setParams(data);/*设置属性*/
            //测试平台静音
            this.url_data_model.set_console_sound();
            this.service_param_info=data;
        }else if(egret.localStorage.getItem("AH_param")){//缓存信息登录
            var data=JSON.parse(decodeURIComponent(egret.localStorage.getItem("AH_param")));
            if(data.state)data.state=null;//zpb 解决加入房间后离开 刷新在进去问题
            this.url_data_model.setParams(data);
            this.service_param_info=data;
        }else{
            alert("非法登录");
        }

    }
    //zpb:配置游戏
    public config_game_url(roomIp,scene:Main=null){
        //zpb:获取基础配置
        var game_url_info=this.game_url_model.cId_get_game_info(this.cId);
        var service_id=this.url_data_model.service_id;
        var socket_url="";
        if(game_url_info){
            //zpb:开始走默认配置
            switch(this.url_data_model.vId){
                case 1:
                    //项目版本类型
                    this.CONST.version_type="demo";
                    this.CONST.HTTP_HOST="http://www.aoh5.com/";
                    MyConsole.getInstance().start(this.CONST.version_type,scene);//启动测试
                    MyConsole.getInstance().trace("-----本地测试模式-----");
                    //分享地址
                    game_url_info.share_http_host="http://www.aoh5.com/";
                    //游戏地址
                    socket_url=this.game_url_model.demo_url_config_info(game_url_info,service_id);
                    if(socket_url=="")game_url_info.port="";//单机版测试用

                    break;
                case 2:
                    //项目版本类型
                    this.CONST.version_type="alpha";
                    this.CONST.HTTP_HOST="http://www.aoh5.com/";
                    MyConsole.getInstance().start(this.CONST.version_type,scene);//启动测试
                    MyConsole.getInstance().trace(">----线上测试模式----<");
                    //分享地址
                    game_url_info.share_http_host="http://www.aoh5.com/";
                    //游戏地址
                    socket_url=game_url_info.alpha_ip;
                    break;
                case 3:
                    //项目版本类型
                    this.CONST.version_type="release";
                    this.CONST.HTTP_HOST="htt"+"p://flfy58.cn/";
                    MyConsole.getInstance().start(this.CONST.version_type);//启动测试
                    MyConsole.getInstance().trace(">****线上发布模式****<");
                    //分享地址
                    game_url_info.share_http_host="htt"+"p://flfy58.cn/";
                    //游戏地址
                    socket_url=game_url_info.release_ip;
                    break;
                default:
                    alert("游戏配置异常->404");
                    break;
            }
            //zpb:开始走私人定制配置
            if(roomIp){//hyh 如果后端数据中有端口 优先用后端IP
                socket_url="w"+"s://"+roomIp;
                game_url_info.port= "";
            }
            this.game_socket_url=socket_url+game_url_info.port;//最终的游戏地址
            this.CONST.GAME_NAME = game_url_info.game_name;//游戏中文名字
            Main.pro_name=game_url_info.pro_name;//游戏代号
            //微信分享地址
            Weixin_JSSDK_model.getInstance().set_config(game_url_info.share_http_host,this.url_data_model.cId,this.url_data_model.mId,game_url_info.game_folder);
            //打印url post日志
            MyConsole.getInstance().trace(this.service_param_info,1,"服务器-post-参数:");
        }else{
            alert("游戏配置异常->405");
        }
    }
    /*zpb:配置适配*/
    private set_web_page_back_tips(stage:Main){
        /*手机上失去焦点  接电话 or 切换到别的程序  暂时舍弃*/
        var timestamp;
        // if(!this.CONST.PC){
        //     window.onfocus=function () {
        //         var c_timestamp=Number((new Date()).valueOf());
        //         if(timestamp&&c_timestamp-timestamp>2000){
        //             timestamp=null;
        //             this.m_to_c_dis_event(this.EVENT.manager.onfocus);
        //         }
        //     }.bind(this);
        //     window.onblur=function () {
        //         timestamp=Number((new Date()).valueOf());
        //         this.m_to_c_dis_event(this.EVENT.manager.onblur);
        //     }.bind(this);
        // }
        /*屏幕旋转刷新*/
        var self=this;
        window.onorientationchange=function () {
            if(self.CONST.ISSCREEEN){
                if(window.orientation!=0){//旋转了
                    stage.stage.scaleMode = egret.StageScaleMode.SHOW_ALL ;//默认比例适配
                    // self.dispatchEventWith("lockSTIps",false,true);
                }else{
                    if(stage.stage.stageWidth/ stage.stage.stageHeight>1.85){
                        stage.stage.scaleMode = egret.StageScaleMode.SHOW_ALL ;//默认比例适配
                    }else{
                        stage.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;//完美适配
                    }
                    // self.dispatchEventWith("lockSTIps",false,false);
                }
            }
        };
        //zpb:新版ios微信问题
        if(!this.CONST.IOS){
            window.history.pushState({
                title: document.title,
                url: ""
            }, document.title, "");
            setTimeout(function () {
                window.addEventListener("popstate", onPushBack.bind(this), false),
                    window.addEventListener("onbeforeunload", onPushBack.bind(this), false);
                function onPushBack() {
                    this.webSocketModel.closeSocket();
                    return window.history.pushState({
                        title: document.title,
                        url: ""
                    }, document.title, ""), void alert("如果要退出请点击关闭");
                }
            }.bind(this), 300);
        }
    }
    /*zpb:适配配置*/
    private set_stage_scale_mode(stage:Main){
        MyConsole.getInstance().trace("配置设备屏幕适配");
        //设置旋转模式为自动
        stage.stage.orientation = egret.OrientationMode.LANDSCAPE_FLIPPED;
        var ua = navigator.userAgent;
        var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
        var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var iPad=(ua.match(/iPad/i)!= null)? true : false;//ipad终端
        var Pad=(ua.match(/Pad/i)!= null)? true : false;//安卓平板终端
        var egretWing=(ua.match(/EgretWing/i)!= null)? true : false;//EgretWing测试工具
        if (isAndroid || isiOS||egretWing) {
            /*适配*/
            //不是平板 zpb
            if(!Pad&&!iPad){
                stage.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;//完美适配
                if(!egretWing&&stage.stage.stageWidth/ stage.stage.stageHeight>1.85){//手机宽高比例过长 用默认适配
                    stage.stage.scaleMode = egret.StageScaleMode.SHOW_ALL ;
                }
                this.CONST.ISSCREEEN=true;//触发旋转
            }else if(iPad){
                stage.stage.orientation = egret.OrientationMode.PORTRAIT;//ipad 用默认适配+反向旋转
            }
            this.CONST.IOS=isiOS;
        }else{
            this.CONST.PC=true;
        }
        Main.stageWidth = stage.stage.stageWidth;
        Main.stageHeight = stage.stage.stageHeight;
        MyConsole.getInstance().trace("舞台信息"+"宽："+Main.stageWidth+"高:"+Main.stageHeight);
        MyConsole.getInstance().trace("四号机版本:1.0.0");
        MyConsole.getInstance().trace("当前代号:"+Main.pro_name);
        MyConsole.getInstance().trace("当前版本:"+Main.version);
    }
    /*-------------------------------------*/
    get openId():string{
        return this.url_data_model.openId;
    }
    get cId():number{
        return this.url_data_model.cId;
    }
    //获取分享房间号
    get share_room_id():number{
        if(this.url_data_model.shareJoining==1){//没有加入过
            return this.url_data_model.state;
        }
        return null;
    }
    //设置分享房间号 _is_url_yx优先分享连接参数
    public set_share_room_id(num){
        this.url_data_model.state=num;
        this.url_data_model.shareJoining=1;//没有加入过
    }
    //清理分享的房间号
    public clear_state(){
        this.url_data_model.urlParam["state"]=null;//清理
    }
    //获取分享回放号码
    get playback_room_info():number{
        if(this.url_data_model.shareJoining==4){
            this.url_data_model.shareJoining=0;//注销
            return this.url_data_model.playbackInfo;
        }
        return null;
    }
}