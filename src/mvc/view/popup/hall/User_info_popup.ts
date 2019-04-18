/**
 * Created by JackerCao on 2018/4/19.
 */

class User_info_popup extends Base_popup{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量

    public constructor(user_info){
        super(true,true);
        this.init_content(user_info);
    }
    //添加背景以及内容;
    private init_content(user_info){
        this.add_center_bg("p_user_view_Bg_png",700,402);
        this.add_img_title("l_user_info_title",{x:350,y:0});
        this.add_close_btn("l_close_btn",{x:690,y:10});
        this.open_ani();

        //头像;
        var user_hear=new User_head_view();
        user_hear.create_rect_head(140,140,"",false);
        user_hear.update_head_url(user_info.userImg);       //头像;
        user_hear.x=180;
        user_hear.y=150;
        this.center_sp.addChild(user_hear);
        this.test_point(user_hear);


        //昵称;
        var user_name=new egret.TextField();
        user_name.text=user_info.userName;
        user_name.textColor=0xb47e55;
        user_name.size=24;
        user_name.anchorOffsetX=user_name.width/2;
        user_name.x=user_hear.x;
        user_name.y=240;
        this.center_sp.addChild(user_name);


        //性别;
        var user_gender=new egret.TextField();
        user_gender.text="性别:";
        user_gender.textColor=0xb47e55;
        user_gender.size=24;
        user_gender.x=336;
        user_gender.y=84;
        user_gender.bold=true;
        this.center_sp.addChild(user_gender);

        //性别图片;
        var gender_img=user_info.gender==1?"l_gender_boy_icon":"l_gender_girl_icon";
        var user_gender_img=new egret.Bitmap(RES.getRes(gender_img));
        user_gender_img.x=440;
        user_gender_img.y=84;
        this.center_sp.addChild(user_gender_img);


        //ID;
        var user_id=new egret.TextField();
        user_id.text="ID:";
        user_id.textColor=0xb47e55;
        user_id.size=24;
        user_id.x=358;
        user_id.y=144;
        user_id.bold=true;
        this.center_sp.addChild(user_id);

        var user_id_info=new egret.TextField();
        user_id_info.text=user_info.userId;
        user_id_info.textColor=0xb47e55;
        user_id_info.size=24;
        user_id_info.x=440;
        user_id_info.y=144;
        this.center_sp.addChild(user_id_info);

        //IP;
        var user_ip=new egret.TextField();
        user_ip.text="IP:";
        user_ip.textColor=0xb47e55;
        user_ip.size=24;
        user_ip.x=358;
        user_ip.y=204;
        user_ip.bold=true;
        this.center_sp.addChild(user_ip);

        var user_ip_info=new egret.TextField();
        user_ip_info.text=user_info.userIp;
        user_ip_info.textColor=0xb47e55;
        user_ip_info.size=24;
        user_ip_info.x=440;
        user_ip_info.y=204;
        this.center_sp.addChild(user_ip_info);

        //房卡;
        var user_score=new egret.TextField();
        user_score.text="房卡:";
        user_score.textColor=0xb47e55;
        user_score.size=24;
        user_score.x=334;
        user_score.y=264;
        user_score.bold=true;
        this.center_sp.addChild(user_score);

        var user_score_info=new egret.TextField();
        user_score_info.text=user_info.userMoney;
        user_score_info.textColor=0xb47e55;
        user_score_info.size=24;
        user_score_info.x=440;
        user_score_info.y=264;
        this.center_sp.addChild(user_score_info);
    }
}