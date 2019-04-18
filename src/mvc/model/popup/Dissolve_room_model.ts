/**
 * Created by JackerCao on 2018/5/7.
 */

class Dissolve_room_model extends Base_model{
    public respond_user_name;//发起人
    public user_list_model:Array<Dissolve_room_user_model>;//玩家信息列表
    public constructor(){
        super();
    }
    //解散发起时间
    public _dissolveTime;
    public set dissolveTime(num){
        this._dissolveTime=num;
        //格式化时间
        // this._dissolveTime=this.CONST.formatting_timestamp(num);
    }
    public get dissolveTime(){
        return this._dissolveTime;
    }
}
