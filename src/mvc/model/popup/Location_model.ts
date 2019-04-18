/**
 * Created by 周鹏斌大王 on 2018-05-08.
 */
class Location_model extends Base_model{


    public user_info_list:Array<Base_user_model>=[];
    public dis_list=[
        {
            p1:1,//相对1号位置
            p2:2,
            dis:null
        },
        {
            p1:1,
            p2:3,
            dis:null
        },
        {
            p1:1,
            p2:4,
            dis:null
        },
        {
            p1:2,
            p2:3,
            dis:null
        },
        {
            p1:2,
            p2:4,
            dis:null
        },
        {
            p1:3,
            p2:4,
            dis:null
        }
    ];

    //配置距离信息
    public set_dis_info(list){
        var user_info_list=this.user_info_list;
        for(var i in this.dis_list){
            this.dis_list[i].dis=get_dis(this.dis_list[i].p1,this.dis_list[i].p2);
        }
        function get_dis(p1,p2){
            var p1_user_id=position_get_user_id(p1);
            var p2_user_id=position_get_user_id(p2);
            for(var i in list){
                if(
                    (list[i].userId==p1_user_id&&list[i].toUserId==p2_user_id)||
                    (list[i].userId==p2_user_id&&list[i].toUserId==p1_user_id)
                ){
                    return list[i].distance;
                }
            }
            return null;
        }
        function position_get_user_id(p){
            for(var i in user_info_list){
                if(user_info_list[i].position==p){
                    return user_info_list[i].userId;
                }
            }
        }
    }

}