/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */

//单机版 接口处理
class Stand_alone_service_model extends egret.Sprite{
    private static PORT:Port_model=Port_model.getInstance();
    public static start_send_info(interfaceId,info):any{
        switch(interfaceId+""){
            case this.PORT.CONFIG.fields_analysis.interfaceId:
                return Zpb_test_model_1.fields_analysis;
            case this.PORT.CONFIG.mainInfo.interfaceId:
                // return Zpb_test_model_1.mainInfo;
                return JackerCao_test_model_1.mainInfo;
            case this.PORT.CONFIG.club_my_list.interfaceId://俱乐部主页
                return Zwb_test_model_1.get_my_club_list;
            case this.PORT.CONFIG.club_info.interfaceId://俱乐部广场
                return Zwb_test_model_1.get_club_info;
            case this.PORT.CONFIG.club_get_my_info.interfaceId://俱乐部-我的成绩
                return Zwb_test_model_1.get_club_get_my_info;
            case this.PORT.CONFIG.club_create_room.interfaceId://俱乐部-创建俱乐部房间
                return "创建俱乐部房间-----interfaceId:500004";
            case this.PORT.CONFIG.club_join_room.interfaceId://俱乐部-加入俱乐部房间
                return "加入俱乐部房间-----interfaceId:500005";
            case this.PORT.CONFIG.club_request_join.interfaceId://俱乐部-申请加入
                return "申请离开-----interfaceId:500000";
            case this.PORT.CONFIG.club_request_leave.interfaceId://俱乐部-申请离开
                return "申请离开-----interfaceId:500007";
            case this.PORT.CONFIG.hall_achievement.interfaceId:
                console.log("info.pages:"+info.pages);
                if(info.page==1){
                    return JackerCao_test_model_1.achievement;
                }else {
                    return JackerCao_test_model_1.achievement2;
                }
            case this.PORT.CONFIG.hall_currentReplaceRoom.interfaceId:
                return JackerCao_test_model_1.issue;
        }
        return null;
    }

}