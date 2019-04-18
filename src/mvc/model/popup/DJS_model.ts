/**
 * Created by 周鹏斌大王 on 2018-05-05.
 */
class DJS_model extends Base_model{

    public room_id;
    public quan_num;//圈数 0/0
    public rule_text;//规则
    public time="2015-09-09 18:09";//时间
    public user_list_model:Array<DJS_user_model>;//玩家信息列表
    public constructor(){
        super();
        this.time=this.CONST.formatting_timestamp(0,1);
    }

    //设置大赢家;
    public set_big_win(){
        var num=1;
        for(let i=0;i<this.user_list_model.length;i++){
            if(this.user_list_model[i].score>num){
                num=this.user_list_model[i].score;
            }
        }

        for(let j=0;j<this.user_list_model.length;j++){
            if(num==this.user_list_model[j].score){
                this.user_list_model[j].is_big_win=true;
            }
        }
    }

    //设置最佳炮手;
    public set_pao_player(){
        var num=1;
        for(let i=0;i<this.user_list_model.length;i++){
            if(this.user_list_model[i].dianNum>num){
                num=this.user_list_model[i].dianNum;
            }
        }

        for(let j=0;j<this.user_list_model.length;j++){
            if(num==this.user_list_model[j].dianNum){
                this.user_list_model[j].is_pao=true;
            }
        }
    }


}