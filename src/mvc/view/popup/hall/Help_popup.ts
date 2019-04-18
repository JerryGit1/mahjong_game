/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */

class Help_popup extends Base_popup{

    constructor(){
        super(true,true);
        this.init_view();
        this.init_centent();
    }

    private init_view(){
        this.add_center_bg("p_popup_view_Bg_png",919,527);
        this.add_img_title("l_help_title",{x:460,y:10});
        this.add_close_btn("l_close_btn",{x:910,y:10});
        this.open_ani();
    }
    
    private init_centent(){
        var content = new egret.DisplayObjectContainer();
        var myscrollView:egret.ScrollView = new egret.ScrollView();
        myscrollView.horizontalScrollPolicy = "off";
        myscrollView.setContent(content);
        myscrollView.width = 900;
        myscrollView.height = 380;
        myscrollView.y = 80;
        myscrollView.x = 50;
        this.center_sp.addChild(myscrollView);

        //图片;
        var help_png=new egret.Bitmap(RES.getRes("h_help_img_png"));
        content.addChild(help_png);
    }

}