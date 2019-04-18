/**
 * Created by 周鹏斌大王 on 2018-04-27.
 */
class Cpg_base_card_view extends Base_view{
    protected model:CPG_card_model;
    public h=0;
    public w=0;
    public constructor(model){
        super();
        this.model=model;
    }

    /*显示前3张牌 吃 碰 杠都一样*/
    protected add_three_card(card_w,num=3){
        var cardView,i,x=0;
        var w=0;
        for(i=0;i<num;i++){
            cardView=this.create_card(this.model.card_model_list[i],card_w);
            this.addChild(cardView);
            switch(this.model.position){
                case 1:
                    w=Math.floor(cardView.w*.86);
                    cardView.x=i*w;
                    this.w+=w;
                    break;
                case 2:
                    w=Math.floor(cardView.w*.57);
                    cardView.y=(-i)*w;
                    this.w+=w;
                    cardView.x-=Math.floor(w*.25)*i;
                    this.addChildAt(cardView,0);
                    break;
                case 3:
                    w=Math.floor(cardView.w*.8);
                    cardView.x=(i)*w;
                    this.w+=w;
                    this.addChildAt(cardView,0);
                    break;
                case 4:
                    w=Math.floor(cardView.w*.57);
                    cardView.y=(i)*w;
                    this.w+=w;
                    cardView.x-=Math.floor(w*.25)*i;
                    break;
            }
            //提示吃的那张牌
            if(this.model.action_type==this.CONST.PLAYER_ACTION.chi&&i==1){
                cardView.add_chi_float();
            }
        }
    }
    /*创建一张牌*/
    protected create_card(c_m:Base_card_model,w){
        var cardView=new Base_card_view(c_m,w);
        this.h=cardView.h;
        return cardView;
    }
}