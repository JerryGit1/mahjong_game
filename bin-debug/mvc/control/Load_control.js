var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
var Load_control = (function (_super) {
    __extends(Load_control, _super);
    function Load_control(model, view) {
        var _this = _super.call(this, model, view) || this;
        _this.EVENT = new Load_event_model(); //事件常量
        model.m_to_c_add_event(_this.EVENT.load.add_loading_data, _this.set_loading_data, _this);
        return _this;
    }
    /*-----------------------------------资源加载---------------------------------------*/
    /*加载资源配置文件*/
    Load_control.prototype.load_resource_file = function (backFun) {
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        function onConfigComplete() {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, this);
            backFun();
        }
    };
    /*加载一组资源----传说中分段加载*/
    Load_control.prototype.loadingGroup = function (loadName, loadingType) {
        if (loadingType === void 0) { loadingType = null; }
        MyConsole.getInstance().trace("加载资源组" + loadName, 2);
        if (!this.model.judge_load_data(loadName)) {
            if (loadingType)
                this.view.add_resource_view(loadingType);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup(this.model.loadName);
        }
        else {
            this.onResourceLoadComplete(null);
        }
    };
    //资源组加载过程中
    Load_control.prototype.onResourceProgress = function (event) {
        this.view.resource_setProgress(event.itemsLoaded, event.itemsTotal);
    };
    //资源组加载完成
    Load_control.prototype.onResourceLoadComplete = function (event) {
        if (event && event.groupName == this.model.loadName) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.view.remove_resource_view();
            MyConsole.getInstance().trace("资源组[" + this.model.loadName + "]加载完成", 2);
        }
        this.dispatchEvent(new egret.Event(this.EVENT.base.load_resource_ok));
    };
    //资源组加载出错
    Load_control.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    //资源组加载出错
    Load_control.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /*-----------------------------------数据加载---------------------------------------*/
    /*显示数据加载条*/
    Load_control.prototype.set_loading_data = function (_isAdd) {
        if (_isAdd) {
            this.view.add_data_loading();
        }
        else {
            this.view.removeDataLoading();
        }
    };
    /*-----------------------------------加载外部资源---------------------------------------*/
    //加载外部图片
    Load_control.loadExternalBit = function (bit, url, backFun) {
        if (backFun === void 0) { backFun = null; }
        RES.getResByUrl(url, function (texture) {
            //将加载完的资源进行显示
            if (bit)
                bit.texture = texture;
            if (backFun)
                backFun(bit);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    //加载外部音效
    Load_control.loadExternalSound = function (url, backFun) {
        if (backFun === void 0) { backFun = null; }
        RES.getResByUrl(url, function (sound) {
            backFun(sound);
        }, this, RES.ResourceItem.TYPE_SOUND);
    };
    //加载外部音效-原生
    Load_control.prototype.loadExternalSound_audio = function (url, backFun) {
        if (backFun === void 0) { backFun = null; }
        var sound = document.createElement("audio");
        sound.src = url;
        backFun(sound);
    };
    return Load_control;
}(Base_control));
__reflect(Load_control.prototype, "Load_control");
//# sourceMappingURL=Load_control.js.map