/**
 * Created by 周鹏斌大王 on 2018-01-28.
 */
class Chat_layer_view extends Base_view{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    private current_tab="";
    private layer_1:Chat_view;//第一层
    private layer_2:Chat_view;//第二层
    private layer_3:Chat_view;//第三层
    public constructor(w,h){
        super();
        this.layer_1=new Chat_2_view(w,h);
        this.addChild(this.layer_1);
        this.layer_1.v_to_v_add_event(this.EVENT.chat.click_sponsor_action,this.tap,this);

        this.layer_2=new Chat_3_view(w,h);
        this.addChild(this.layer_2);
        this.layer_2.v_to_v_add_event(this.EVENT.chat.click_sponsor_action,this.tap,this);

        this.cut_layer();
    }

    public cut_layer(num=1){
        this.layer_1.visible=false;
        this.layer_2.visible=false;
        this["layer_"+num].visible=true;
    }
    protected tap(info){
        this.v_to_v_dis_event(this.EVENT.chat.click_sponsor_action,info);
    }
}