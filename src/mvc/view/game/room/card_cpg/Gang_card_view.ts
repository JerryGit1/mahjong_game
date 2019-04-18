/**
 * Created by 周鹏斌大王 on 2018-04-27.
 */
class Gang_card_view extends Cpg_base_card_view{

    public constructor(model,w){
        super(model);
        this.add_three_card(w);
        //上边那张牌
        var  cardView=this.create_card(this.model.card_model_list[0],w);
        this.addChild(cardView);
        switch(this.model.position){
            case 1:
                cardView.x=this.w/3;
                cardView.y=-w*.3;
                if(model.is_ding_hun_pai)cardView.y=0;
                break;
            case 2:
                cardView.y=-this.w*.53;
                cardView.x=-w*.07;
                if(model.is_ding_hun_pai)cardView.visible=false;
                break;
            case 3:
                cardView.x=this.w/3;
                cardView.y=-w*.3;
                if(model.is_ding_hun_pai)cardView.visible=false;
                break;
            case 4:
                cardView.y=this.w*.13;
                cardView.x=-w*.15;
                if(model.is_ding_hun_pai)cardView.visible=false;
                break;
        }
        // this.graphics.beginFill(0x00ff00,.1);
        // this.graphics.drawRect(0,0,this.w,this.h)
    }
}