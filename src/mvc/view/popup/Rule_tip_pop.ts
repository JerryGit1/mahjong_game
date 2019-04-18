/**
 * Created by JackerCao on 2018/5/4.
 */

class Rule_tip_pop extends Base_popup{
    public constructor(info){
        super(true,true);
        //初始化内容;
        this.init_content(info);
        this.set_click_bg_apha();
    }

    private init_content(info){
        var str=info.str;
        var pos=info.position;
        var rule_tip=new Tip_view(str);
        rule_tip.x=pos.x-80;
        rule_tip.y=pos.y-40;
        this.addChild(rule_tip);
    }

}