/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Load_control extends Base_control{
    public EVENT:Load_event_model=new Load_event_model();//事件常量

    protected model:Load_model;
    protected view:Load_view;
    public constructor(model,view){
        super(model,view);
        model.m_to_c_add_event(this.EVENT.load.add_loading_data,this.set_loading_data,this);
    }
    /*-----------------------------------资源加载---------------------------------------*/
    /*加载资源配置文件*/
    public load_resource_file(backFun){
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        function onConfigComplete(){
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onConfigComplete, this);
            backFun();
        }
    }
    /*加载一组资源----传说中分段加载*/
    public loadingGroup(loadName,loadingType=null){
        MyConsole.getInstance().trace("加载资源组"+loadName,2);
        if(!this.model.judge_load_data(loadName)){
            if(loadingType)this.view.add_resource_view(loadingType);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup(this.model.loadName);
        }else{
            this.onResourceLoadComplete(null);
        }

    }
    //资源组加载过程中
    protected onResourceProgress(event:RES.ResourceEvent):void {
        this.view.resource_setProgress(event.itemsLoaded, event.itemsTotal);
    }
    //资源组加载完成
    protected onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event&&event.groupName == this.model.loadName) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.view.remove_resource_view();
            MyConsole.getInstance().trace("资源组["+this.model.loadName+"]加载完成",2);
        }
        this.dispatchEvent(new egret.Event(this.EVENT.base.load_resource_ok));
    }
    //资源组加载出错
    protected onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    //资源组加载出错
    protected onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }
    /*-----------------------------------数据加载---------------------------------------*/
    /*显示数据加载条*/
    public set_loading_data(_isAdd){
        if(_isAdd){
            this.view.add_data_loading();
        }else{
            this.view.removeDataLoading();
        }
    }
    /*-----------------------------------加载外部资源---------------------------------------*/
    //加载外部图片
    public static loadExternalBit(bit,url,backFun=null){
        RES.getResByUrl(url, function (texture:egret.Texture) {
            //将加载完的资源进行显示
            if(bit)bit.texture=texture;
            if(backFun)backFun(bit);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }
    //加载外部音效
    public static loadExternalSound(url,backFun=null){
        RES.getResByUrl(url, function (sound:egret.Sound) {
            backFun(sound);
        }, this, RES.ResourceItem.TYPE_SOUND);
    }
    //加载外部音效-原生
    public loadExternalSound_audio(url,backFun=null){
        var sound=document.createElement("audio");
        sound.src=url;
        backFun(sound);
    }
}