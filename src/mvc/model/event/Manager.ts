/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Manager_event_model extends Base_event_model{
    public manager={
        scene_set_model:"scene_set_model",//zpb:分配model 给各自的control
        web_socket_open:"web_socket_open",//zpb:socket握手成功
        update_main_info:"update_main_info",//zpb:刷新大接口

        onfocus:"onfocus",//页面重新获得焦点
        onblur:"onblur",//页面失去焦点
    }
}