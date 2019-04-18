/**
 * Created by 周鹏斌大王 on 2018-03-29.
 */
class Club_room_model extends Base_model{


    public roomId;

    public userName;

    public userImg;

    public num;

    public circleNum;
    public huaType;//1有花2无花
    public chiType;//1吃

    public scoreType;//计分方式

    public roomType;

    public rule;//

    public user_list;

    public set userInfo(list){
        this.user_list=[];
        for(var i in list){
            this.user_list.push({
                headImg:list[i].userImg,
                userName:list[i].userName,
                state:list[i].state,
            })
        }
    }
}