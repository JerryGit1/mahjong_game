/**
 * Created by JackerCao on 2018/4/19.
 */
class Tip_popup extends Base_popup{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量

    public constructor(str){
        super(true,true);

        this.init_content(str);
    }
    //坑爹啊，就那么几行代码;
    private init_content(str){
        this.add_center_bg("p_popup_view_Bg_png",700,402);
        this.add_img_title("l_prompt_title",{x:350,y:0});
        this.add_close_btn("l_close_btn",{x:682,y:10});
        this.open_ani();

        var view_str=new egret.TextField();
        view_str.text=str;
        view_str.size=28;
        view_str.textColor=0x8b6141;
        view_str.anchorOffsetX=view_str.width/2;
        view_str.lineSpacing = 5;
        view_str.x=350;
        view_str.y=166;
        this.center_sp.addChild(view_str);
        this.test_point(view_str);
    }
}