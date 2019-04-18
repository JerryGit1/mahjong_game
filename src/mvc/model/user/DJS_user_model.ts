/**
 * Created by JackerCao on 2018/5/2.
 */

class DJS_user_model extends Base_user_model{
    public huNum:number=0;//cj: 胡牌次数
    public dianNum:number=0;//cj: 点炮次数
    public gangNum:number=0;//tyq: 杠的次数
    public ziMoNum:number=0;//cj: 自摸次数
    public is_big_win=false;//cj:是否是大赢家;
    public is_pao=false;//cj:是否是最佳炮手;
    public constructor(){
        super();
    }
}
