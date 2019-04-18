/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
//用户协议
class User_agree_popup extends Base_popup{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    private userId;
    public constructor(userId) {
        super(true,false);
        this.userId=userId;
        this.init_content();
    }
    private init_content(){
        this.add_center_bg("p_popup_view_Bg_png",919,527);
        this.add_img_title("l_user_agreement_title",{x:460,y:10});
        this.open_ani();

        this.show_user_agree_info();
    }

    protected show_user_agree_info(){
        var content = new egret.DisplayObjectContainer();
        var contentText = new egret.TextField();
        contentText.width = 830;
        contentText.wordWrap = true;
        contentText.lineSpacing = 15;
        contentText.size = 20;
        contentText.textColor = 0x805042;
        contentText.fontFamily = "微软雅黑";

        contentText.text = RES.getRes("user_protocol_text");
        content.addChild(contentText);

        var myscrollView:egret.ScrollView = new egret.ScrollView();
        myscrollView.horizontalScrollPolicy = "off";
        myscrollView.setContent(content);
        myscrollView.width = 900;
        myscrollView.height = this.height*.45;
        myscrollView.y = 80;
        myscrollView.x = 50;
        this.center_sp.addChild(myscrollView);

        // 同意按钮
        var agreeBtn = new MyButton("l_confirm_btn");
        agreeBtn.x = 458;
        agreeBtn.y = 454;
        agreeBtn.addTouchEvent();
        agreeBtn.addEventListener("click",function () {
            this.v_to_v_dis_event(this.EVENT.popup.user_agree,this.userId);
            this.close_click();
        },this);
        this.center_sp.addChild(agreeBtn);
       
    }
}