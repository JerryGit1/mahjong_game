/**
 * Created by 周鹏斌大王 on 2018-05-02.
 */
class Cpg_card_btn_view extends MyButton{
    public model:Action_model;
    public constructor(model){
        super("g_more_cg_bg");
        this.model=model;
        var sp=new egret.Sprite();
        this.addChild(sp);
        //icon
        var bg_str="";
        if(this.model.type==this.CONST.PLAYER_ACTION.chi){
            bg_str="g_c_icon";//吃
        }else if(this.model.type==this.CONST.PLAYER_ACTION.an_gang){
            bg_str="g_g_icon";//杠
        }else{
            MyConsole.getInstance().trace("重大失误,渲染多个吃杠遇到未知类型"+this.model.type,0);
        }
        var title=this.set_bit_center(bg_str,false);
        title.x = 10;
        sp.addChild(title);
        //列出牌
        for(var i in this.model.card_list){
            var card_view=new Base_card_view(this.model.card_list[i],70);
            sp.addChild(card_view);
            card_view.x=Number(i)*Math.floor(card_view.w*.9)+title.width+25;
            //显示吃的牌
            if(this.model.action_card&&this.model.type==this.CONST.PLAYER_ACTION.chi)
	    if(this.model.card_list[i].act_code==this.model.action_card.act_code){
                //特殊标记
                card_view.set_jian_tou_icon(true);
            }
        }
        sp.x=-sp.width/2;
        sp.y=-card_view.h/2;
        title.y=sp.height/2-title.height/2;
        //背景适配
        this.card.scale9Grid=new egret.Rectangle(17,14,245,86);
        this.card.width=sp.width+20;
        this.card.anchorOffsetX=this.card.width/2;
        this.card.anchorOffsetY=this.card.height/2;
    }
}