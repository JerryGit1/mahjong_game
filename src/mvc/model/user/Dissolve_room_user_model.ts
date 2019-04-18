/**
 * Created by JackerCao on 2018/5/7.
 */

class Dissolve_room_user_model extends User_model{
    public userId:number;//tyq: 发起人昵称
    public userName:string;//tyq: 发起人昵称
    public userImg:string;//tyq: 发起人头像
    public isInitiator:boolean=false;//tyq: 是否是发起人
    public isHandle:boolean=false;//tyq: 是否有过操作了
    public agree=0;//tyq: 解散房间的整体情况 0-还没定 1-解散成功 2-解散失败
    public constructor(){
        super();
    }

}