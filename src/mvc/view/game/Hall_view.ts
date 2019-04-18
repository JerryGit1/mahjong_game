import TextField = egret.TextField;
/**
 * Created by 周鹏斌大王 on 2017-12-23.
 * 游戏-大厅
 */
class Hall_view extends Base_view{
    protected EVENT:Game_hall_event_model=new Game_hall_event_model();//事件常量
    private  model;
    //顶部层-----------
    private top_sprite:egret.Sprite;
    private top_head_img;//头像
    private top_user_name_txt:egret.TextField;//昵称
    private top_user_id_txt:egret.TextField;//ID
    private top_money_txt:egret.TextField;//房卡 切记实时更新功能 代开时
    private top_add_money_btn:MyButton;//充值按钮

    //中间层-----------
    private marquee_view:Marquee_view;//跑马灯 marquee
    private create_room_btn:MyButton;//创建房间按钮
    private join_room_btn:MyButton;//加入房间按钮
    private hall_Club_btn:MyButton;//俱乐部按钮
    //底部层
    private bottom_sprite:egret.Sprite;
    private bottom_help_btn:MyButton;//帮助按钮
    private bottom_setting_btn:MyButton;//设置按钮
    private bottom_record_btn:MyButton;//战绩按钮
    private bottom_Issue_btn:MyButton;//代开按钮
    private bottom_share_btn:MyButton;//分享按钮

    public constructor(model){
        super();
        this.model=model;
        //初始化视图
        this.init_view();
        //添加事件
        this.init_event();

    }
    /*--------------------初始化视图-------------------------*/
    private init_view(){
        //大厅背景;
        this.init_hall_BG_cj();
        //大背景
        this.init_top_view();//顶部视图
        this.init_center_view();//中间视图
        this.init_bottom_view();//底部层视图
    }
    //添加大厅背景;
    private init_hall_BG_cj(){
        var hallBG = this.set_bit_center("h_hall_bg_png",false);
        if(hallBG.height<Main.stageHeight){
            hallBG.height=Main.stageHeight;
        }
        this.addChild(hallBG);
    }
    //顶部view;
    private init_top_view(){
        //顶部容器;
        this.top_sprite=new egret.Sprite();
        this.addChild(this.top_sprite);

        //顶部背景;
        var topSprite_bg=new egret.Bitmap(RES.getRes("h_top_bg"));
        this.top_sprite.addChild(topSprite_bg);

        //大厅的Title;
        var topTitle=new egret.Bitmap(RES.getRes("h_logo_title"));
        topTitle.anchorOffsetX=topTitle.width/2;
        topTitle.anchorOffsetY=topTitle.height/2;
        topTitle.x=topSprite_bg.width/2;
        topTitle.y=topSprite_bg.height/2;
        this.top_sprite.addChild(topTitle);

        //用户头像;
        this.top_head_img=new User_head_view();
        this.top_head_img.create_circe_head(75,75,"",false);
        this.top_head_img.x=82;
        this.top_head_img.y=topSprite_bg.height/2-10;
        this.top_head_img.touchEnabled=true;
        this.top_head_img.addEventListener(egret.TouchEvent.TOUCH_TAP,this.user_view_info,this);
        this.top_sprite.addChild(this.top_head_img);

        //昵称;
        this.top_user_name_txt=new TextField();
        this.top_user_name_txt.textAlign = "center";
        this.top_user_name_txt.size = 24;
        this.top_user_name_txt.x=136;
        this.top_user_name_txt.y=topSprite_bg.height/2-40;
        this.top_sprite.addChild(this.top_user_name_txt);

        //黄色ID;
        var yellow_ID=new TextField();
        yellow_ID.text="ID:";
        yellow_ID.textAlign = "center";
        yellow_ID.textColor = 0xffff00;
        yellow_ID.size = 24;
        yellow_ID.x=136;
        yellow_ID.y=topSprite_bg.height/2;
        yellow_ID.bold=true;
        this.top_sprite.addChild(yellow_ID);

        //ID;
        this.top_user_id_txt=new TextField();
        this.top_user_id_txt.textAlign = "center";
        this.top_user_id_txt.size = 24;
        this.top_user_id_txt.x=130+38;
        this.top_user_id_txt.y=yellow_ID.y;
        this.top_sprite.addChild(this.top_user_id_txt);

        var sp =  new egret.Sprite();
        sp.x = Main.stageWidth-320;
        sp.y = 12;
        this.addChild(sp);

        //房卡视图背景;
        var yuan_baoBg = new egret.Bitmap(RES.getRes("h_money_bg"));
        sp.addChild(yuan_baoBg);
        this.top_money_txt = new egret.TextField();
        this.top_money_txt.size = 26;
        this.top_money_txt.width = 140;
        this.top_money_txt.textColor = 0xFCDFD4;
        this.top_money_txt.x = 80;
        this.top_money_txt.textAlign = "center";
        this.top_money_txt.strokeColor  = 0x000000;
        this.top_money_txt.stroke  = 2;
        this.top_money_txt.verticalAlign=egret.VerticalAlign.MIDDLE;
        this.top_money_txt.height=yuan_baoBg.height;
        sp.addChild(this.top_money_txt);

        //充值按钮
        this.top_add_money_btn=new MyButton("h_plus_btn");
        this.top_add_money_btn.x =yuan_baoBg.width;
        this.top_add_money_btn.y =yuan_baoBg.height/2;
        this.top_add_money_btn.addTouchEvent();
        this.top_add_money_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.add_money_back,this);
        sp.addChild(this.top_add_money_btn);
    }

    //视图中间区域;
    private init_center_view(){
        //跑马灯;
        this.marquee_view=new Marquee_view();
        this.marquee_view.x = 243;
        this.marquee_view.y = 99;
        this.addChild(this.marquee_view);

        //创建房间、加入房间、俱乐部按钮Y坐标;
        var btn_Y=Main.stageHeight/2;

        //创建房间按钮;
        this.create_room_btn=new MyButton("h_create_room_btn",1);
        this.create_room_btn.x = 194;
        this.create_room_btn.y = btn_Y;
        this.create_room_btn.addTouchEvent();
        this.create_room_btn.addEventListener("click",this.create_room,this);
        this.addChild(this.create_room_btn);

        // 加入房间
        this.join_room_btn = new MyButton("h_join_room_btn",1);
        this.join_room_btn.x =  Main.stageWidth/2;
        this.join_room_btn.y = btn_Y;
        this.join_room_btn.addTouchEvent();
        this.join_room_btn.addEventListener("click",this.join_room,this);
        this.addChild(this.join_room_btn);

        //俱乐部
        this.hall_Club_btn = new MyButton("h_club_btn",1);
        this.hall_Club_btn.x = 942;
        this.hall_Club_btn.y = btn_Y;
        this.hall_Club_btn.addTouchEvent();
        this.hall_Club_btn.addEventListener("click",this.skip_club,this);
        this.addChild(this.hall_Club_btn);
    }

    //视图底部区域;
    private init_bottom_view(){
        //添加底部容器;
        this.bottom_sprite=new egret.Sprite();
        this.addChild(this.bottom_sprite);
        //添加底部容器的视图;
        var boom_bg=new egret.Bitmap(RES.getRes("h_bottom_bg"));//大厅底部功能背景
        boom_bg.y=Main.stageHeight-boom_bg.height;
        this.bottom_sprite.addChild(boom_bg);

        //按钮的Y坐标;
        var button_y=boom_bg.y+boom_bg.height/2+20;
        //按钮之间的间距;
        var btn_jianju=210;

        //战绩按钮
        this.bottom_record_btn = new MyButton("h_record_btn");
        this.bottom_record_btn.addTouchEvent();
        this.bottom_record_btn.addEventListener("click",this.add_record_view,this);
        this.bottom_record_btn.x = 164;
        this.bottom_record_btn.y = button_y-10;//统一设置按钮位置Y
        this.bottom_sprite.addChild(this.bottom_record_btn);

        //代开按钮
        this.bottom_Issue_btn = new MyButton("h_replace_btn");
        this.bottom_Issue_btn.addTouchEvent();
        this.bottom_Issue_btn.addEventListener("click",this.add_lssue_record,this);
        this.bottom_Issue_btn.x = 164+btn_jianju*2;
        this.bottom_Issue_btn.y = button_y;
        this.bottom_sprite.addChild(this.bottom_Issue_btn);

        //帮助按钮
        this.bottom_help_btn = new MyButton("h_help_btn");
        this.bottom_help_btn.addTouchEvent();
        this.bottom_help_btn.addEventListener("click",this.add_help_view,this);
        this.bottom_help_btn.x = 164+btn_jianju;
        this.bottom_help_btn.y = button_y;
        this.bottom_sprite.addChild(this.bottom_help_btn);

        //分享按钮
        this.bottom_share_btn = new MyButton("h_share_btn");
        this.bottom_share_btn.addTouchEvent();
        this.bottom_share_btn.addEventListener("click",this.add_share_view,this);
        this.bottom_share_btn.x = 164+btn_jianju*3;
        this.bottom_share_btn.y = button_y-3;
        this.bottom_sprite.addChild(this.bottom_share_btn);

        //设置按钮
        this.bottom_setting_btn = new MyButton("h_setup_btn");
        this.bottom_setting_btn.addTouchEvent();
        this.bottom_setting_btn.addEventListener("click",this.add_setting_view,this);
        this.bottom_setting_btn.x = 164+btn_jianju*4;
        this.bottom_setting_btn.y = button_y;//统一设置按钮位置Y
        this.bottom_sprite.addChild(this.bottom_setting_btn);
    }
    /*--------------------初始化事件-------------------------*/
    private init_event(){
        //头像点击
        //房卡点击
        //创建房间
        //加入房间
        //俱乐部
        //设置
        //战绩
        //代开
        //玩法
        //分享

    }
    /*--------------------执行事件-------------------------*/
    private head_img_click(){
        this.v_to_v_dis_event(this.EVENT.hall_popup.look_user_info);
    }

    //动态更新个人数据;
    public updata_userInfo(info){
        this.top_head_img.update_head_url(info.userImg);                                    //头像;
        this.top_user_name_txt.text=String(decodeURIComponent(info.userName));              //昵称;
        this.top_user_id_txt.text=info.userId;                                              //ID;
        this.update_money_text(info.money);                                                 //动态更新房卡;
    }

    //动态更新房卡;
    public update_money_text(num){
        var str=num;
        if(num>=10000){
            str=parseInt(num)/10000+"万";
        }
        this.top_money_txt.text=str;
    }

    //更新跑马灯;
    public update_notice_text(notice_text){
        this.marquee_view.set_text_pos(notice_text);
    }
    //查看用户信息;
    private user_view_info(){
        this.v_to_v_dis_event(this.EVENT.hall_popup.look_user_info);
    }

    //充值按钮回调;
    private add_money_back(){
        this.v_to_v_dis_event(this.EVENT.hall_popup.pay_user_money);
    }

    //创建房间按钮回调;
    private create_room(){
        this.v_to_v_dis_event(this.EVENT.hall_popup.create_room);
    }

    //加入房间按钮回调;
    private join_room(){
        this.v_to_v_dis_event(this.EVENT.hall_popup.join_room);
    }

    //俱乐部按钮回调;
    private skip_club(){
        this.v_to_v_dis_event(this.EVENT.hall_popup.skip_club);
    }

    //添加战绩view;
    private add_record_view(){
        this.v_to_v_dis_event(this.EVENT.hall_popup.record);
    }

    //添加代开view;
    private add_lssue_record(){
        this.v_to_v_dis_event(this.EVENT.hall_popup.issue);
    }

    //帮助view;
    private add_help_view(){
        this.v_to_v_dis_event(this.EVENT.hall_popup.help);
    }

    //分享view;
    private add_share_view(){
        /*设置分享*/
        Weixin_JSSDK_model.getInstance().hallShare();
        this.v_to_v_dis_event(this.EVENT.hall_popup.share);
    }

    //设置view;
    private add_setting_view(){
        this.v_to_v_dis_event(this.EVENT.hall_popup.setting,false);
    }

}