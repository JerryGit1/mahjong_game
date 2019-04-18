/**
 * Created by 周鹏斌大王 on 2017-12-23.
 */
/**
 * Created by 伟大的周鹏斌大王 on 2017/7/14.
 * url post参数信息
 */
class Url_data_model extends Base_model{

    protected _cId:number=0;/*商品ID*/
    protected _gId:number;/*游戏ID*/
    protected _mId:number;/*商家ID*/
    protected _openId:string;/*玩家openId*/
    protected _vId:number;/*版本id*/
    public static vId;//zpb:3.2.5
    public testVId:number=3;/*那个版本一下可以接入测试信息 3可以进入 2不可以进入*/
    protected _state:number;/*附加参数*/
    protected _roomIp:string;
    public shareJoining:number=0;/*分享房间号 加入房间中  1还没加入 2加入中 3加入过了 4回放模式下*/
    protected _sound:boolean=false;/*音量控制*/
    protected _service_id;
    public playbackInfo;
    //url get数据 demo用
    public urlParam;
    public constructor(){
        super();
        this.integration_param();
    }
    get cId(): number {
        return this._cId;
    }

    set cId(value: number) {
        this._cId = value;
    }

    get gId(): number {
        return this._gId;
    }

    set gId(value: number) {
        this._gId = value;
    }

    get mId(): number {
        return this._mId;
    }

    set mId(value: number) {
        this._mId = value;
    }

    get openId(): string {
        if(this._vId<=this.testVId&&this.urlParam["openId"]){
            return this.urlParam["openId"];
        }
        return this._openId;
    }
    set openId(value: string) {
        this._openId = value;
    }

    get vId(): Number {
        return this._vId;
    }
    set vId(value: Number) {
        if(value<=this.testVId&&this.urlParam["vId"]){
            this._vId = Number(this.urlParam["vId"]);
        }else{
            this._vId = Number(value);
        }
        Url_data_model.vId=this.vId;
    }
    get state(): number {
        return Number(this._state);
    }
    set state(value) {
        if(this._vId<=this.testVId&&this.urlParam["state"]){
            value=this.urlParam["state"];
        }
        this.shareJoining=0;
        if(value){
            var arr=String(value).split("_");
            if(Number(arr[0])==1){
                //分享
                this.shareJoining=1;
                this._state = Number(arr[1]);
            }else if(Number(arr[0])==2&&arr.length>=3){
                //分享回放
                this.shareJoining=4;
                this.playbackInfo={
                    index:arr[2],//局数
                    file_url:arr[3],//回放用到
                    share_user_id:arr[4],//回放用到
                }
                if(arr[4]){
                    this.CONST.PLAYBACK_SHARE_USERID=arr[4];
                }
            }else if(Number(arr[0])==3){
                //加入俱乐部
                this.shareJoining = 5;
                this.CONST.CLUB_SHARE_ID=Number(arr[1]);
            }
        }
    }
    get roomIp():string{
        return this._roomIp;
    }
    set roomIp(value:string){
        if(this._roomIp != value) this._roomIp = value;
    }
    get service_id():string{
        return this._service_id;
    }
    set service_id(value:string){
        if(this.urlParam["service_id"]){
            this._service_id = this.urlParam["service_id"];
        }else{
            this._service_id =value;
        }
    }
    public set_console_sound(){
        if(this.vId<=this.testVId&&this.urlParam["openId"]){
            egret.localStorage.setItem("effectSound_isPlay",this.urlParam["sound"]);
            egret.localStorage.setItem("bgSound_isPlay",this.urlParam["sound"]);
        }
    }
    /*获取url参数配置*/
    //整合配置参数
    public integration_param(){
        var aQuery = window.location.href.split("?");//取得Get参数
        var urlDataInfo = new Array();
        if(aQuery.length > 1)
        {
            var aBuf = aQuery[1].split("&");
            for(var i=0, iLoop = aBuf.length; i<iLoop; i++){
                var aTmp = aBuf[i].split("=");
                urlDataInfo[aTmp[0]] = aTmp[1];
            }
        }
        this.urlParam=urlDataInfo;


    }
    
}
