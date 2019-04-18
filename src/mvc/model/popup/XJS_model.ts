/**
 * Created by 周鹏斌大王 on 2018-05-05.
 */
class XJS_model extends Base_model{

    public room_id;
    public quan_num;//圈数 0/0
    public rule_tips;//规则
    public score_type;//计分方式
    public hun_model:Base_card_model;//混牌
    public time="2015-09-09 18:09";//时间
    public hu_type;//1胜利  2失败 3流局
    public user_list_model:Array<XJS_user_model>;//玩家信息列表
    public constructor(){
        super();
        this.time=this.CONST.formatting_timestamp();
    }
    public set_hu_type(self_user_id){
        var win_user_id;//赢的人
        var dianpao_user_id;//输的人
        for(var i in this.user_list_model){
            if(this.user_list_model[i].hu_type==1){
                win_user_id=this.user_list_model[i].userId;
            }else if(this.user_list_model[i].hu_type==2){
                dianpao_user_id=this.user_list_model[i].userId;
            }
        }
        //自摸类型
        if(win_user_id){//只有赢的人
            if(!dianpao_user_id){
                for(var i in this.user_list_model){
                    if(this.user_list_model[i].userId==win_user_id){
                        this.user_list_model[i].hu_type=3;//自摸
                        break;
                    }
                }
            }
            if(win_user_id==self_user_id){
                this.hu_type=1;//胜利
            }else{
                this.hu_type=2;//失败
            }
        }else{//没有人赢
            this.hu_type=3;//流局
        }
    }
}