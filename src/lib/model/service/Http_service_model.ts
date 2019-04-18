/**
 * Created by 周鹏斌 on 2016/9/7.
 * 丹阳特有-不用合并
 */
class Http_service_model extends Base_service_model{
    public rechargeUrl:string = "http://192.168.1.156:8082/clubServer";
    public constructor(){
        super();
    }
    /*单例*/
    private static service:Http_service_model;
    public  static getInstance(){
        if(!this.service){
            this.service=new Http_service_model();
        }
        return this.service;
    }
    /*获取回放数据 2.1.4*/
    public get_play_back_data(url,backFun){
        this.http(url,null,backFun);
    }
    //zpb:经纬度 转坐标
    public position_return(j,w,backFun){
        MyConsole.getInstance().trace("经:"+j+",纬"+w);
        this.http("http://www.flfy58.cn:8086/get_game_position.php?J="+j+"&W="+w,null,function (data) {
            MyConsole.getInstance().trace("X:"+data.x+",Y:"+data.y);
            backFun(data.x,data.y);
        },false);
    }
}