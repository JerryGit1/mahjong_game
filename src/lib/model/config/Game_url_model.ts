/**
 * Created by 周鹏斌大王 on 2018-03-28.
 * 丹阳特有-不用合并
 */
class Game_url_model extends Base_model{
    public constructor(){
        super();
    }
    //------------------------------------------通用游戏地址------------------------------------
    // private QG_PORT = "8208";//全国斗地主端口
    // private GAME_FILE_URL="X9_1";//项目文件夹名称
    private port="8232/mj";//端口号码
    private demo_url_zc:string="w"+"s://"+"192.168.1.16:";//zpb:防止搜索demo 本地个人-周聪
    private demo_url_zsc:string="w"+"s://"+"192.168.1.11:";//zpb:防止搜索demo 本地个人-张思全
    private demo_url_lz:string="w"+"s://"+"192.168.1.156:";//zpb:防止搜索demo 本地个人-刘卓
    private demo_url_fhz:string="w"+"s://"+"192.168.1.8:";//zpb:防止搜索demo 本地个人-冯红章
    private demo_url_public:string="w"+"s://"+"192.168.1.7:";//zpb:防止搜索demo 本地-公用服务器
    private alpha_url:string="w"+"s://"+"47.93.61.29:";//zpb:防止搜索 alpha 远程链接
    private release_url:string="w"+"s://"+"39.106.67.169:";//zpb:防止搜索 release

    //----------------------------------------单独游戏地址------------------------------------
    private game_url_config_list={
        34:{
            game_name:"丹阳推倒胡",
            pro_name:"X15",//项目代号  1.统计 2.分享icon用
            game_folder:"",//游戏地址文件夹目录 不写默认用 pro_name
            port:"8232/mj",//端口
            release_ip:"w"+"s://"+"47.93.251.108:",//release IP地址 没有的话用上边的
            alpha_ip:this.alpha_url,//alpha IP地址 没有的话用上边的
        }
    };

    //CID获取游戏信息
    public cId_get_game_info(cId){
        if(cId&&this.game_url_config_list[cId]){
            //alpha 地址
            if(!this.game_url_config_list[cId]["alpha_ip"])this.game_url_config_list[cId]["alpha_ip"]=this.alpha_url;
            //release 地址
            if(!this.game_url_config_list[cId]["release_ip"])this.game_url_config_list[cId]["release_ip"]=this.release_url;
            //游戏地址文件夹目录
            if(!this.game_url_config_list[cId]["game_folder"])this.game_url_config_list[cId]["game_folder"]=this.game_url_config_list[cId]["pro_name"];
            //端口
            if(!this.game_url_config_list[cId]["port"])this.game_url_config_list[cId]["port"]=this.port;
            return this.game_url_config_list[cId];
        }
        return null;
    }
    //获取某个配置 demo个人地址配置
    public demo_url_config_info(game_info,user_name){
        if(!game_info["demo_url_"+user_name]){
            if(this["demo_url_"+user_name]){
                MyConsole.getInstance().trace("------个人-PC------",0);
                return this["demo_url_"+user_name];
            }else if(user_name=="nosocket"){//不链接socket\
                MyConsole.getInstance().trace("-------单机--------",0);
                return "";
            }else{
                // MyConsole.getInstance().trace("------公测-PC------",0);
                // return this.demo_url_public;
                return "";//--------临时用（当四人测试连接本地单机）
            }
        }
        return game_info["demo_url_"+user_name];
    }
}