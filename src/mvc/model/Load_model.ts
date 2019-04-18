/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Load_model extends Scene_model{
    public EVENT:Load_event_model=new Load_event_model();//事件常量
    public loadName;
    public loadGroupList=[];
    public constructor(){
        super();
    }


    //显示资源加载 _is是否显示图形
    public add_loading_data(_is){
        this.m_to_c_dis_event(this.EVENT.load.add_loading_data,_is);
    }
    //移除资源加载
    public remove_loading_data(){
        this.m_to_c_dis_event(this.EVENT.load.add_loading_data);
    }


    /*zpb:判断资源是否加载过*/
    public judge_load_data(loadName){
        this.loadName=loadName;
        for(var i in this.loadGroupList){
            if(this.loadGroupList[i]==loadName){//多次加载
                MyConsole.getInstance().trace("资源组["+this.loadName+"]已加载过",2);
                return true;
            }
        }
        this.loadGroupList.push(loadName);/*加载资源组*/
        return false;
    }
}