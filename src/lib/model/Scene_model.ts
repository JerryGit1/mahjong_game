/**
 * Created by 周鹏斌大王 on 2017-12-23.
 * 场景model
 */
class Scene_model extends Base_model{
    protected PORT:Port_model=Port_model.getInstance();//zpb:接口定义
    //zpb
    protected _is_manager=false;
    public constructor(){
        super();
    }
    public add_port_event(portInfo,backFun,self){//接口类型的接收
        var eventName=this.PORT.SOCKET_DATA_EVENT+portInfo.interfaceId;
        //大接口做特殊处理 只有 managerModel能接收到
        if(portInfo.interfaceId==this.PORT.CONFIG.mainInfo.interfaceId){
            if(!self._is_manager){
                MyConsole.getInstance().trace("重大失误，大接口侦听只允许Manager_model操作-",0);
                return;
            }
        }
        this.m_to_c_add_event(eventName,backFun,self);
    }
    protected remove_port_event(portInfo){//接口类型移除
        var eventName=this.PORT.SOCKET_DATA_EVENT+portInfo.interfaceId;
        this.m_to_c_dis_event(eventName);
    }
}