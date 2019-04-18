/**
 * Created by 周鹏斌大王 on 2018-04-16.
 * 俱乐部-我的战绩
 */
class Club_my_info_popup extends Base_popup{
    public EVENT:Game_club_event_model=new Game_club_event_model();//事件常量
    protected button_type:string="c_info_today";  //页面类型 今日 昨日
    protected view_today:Club_achievement_list_today;//俱乐部战绩-今日-view
    protected view_yesterday:Club_achievement_list_yesterday;//俱乐部战绩-昨日-view
    private c_back_btn:MyButton;//后退按钮
    private current_page=1;//当前页数
    private day_score_txt;//今日总分
    private day_game_num_txt;//今日局数
    private userId;
    private clubId;
    public constructor(data) {
        super(true,true);
        this.userId=data.userId;
        this.clubId=data.clubId;
        this.popup_name="club_my_info";//删除事件用

        this.add_center_bg("c_m_bg",1101,544);//弹框
        this.add_img_title("l_prompt_img",{x:585,y:Main.stageHeight-150});//左右滑动，查看列表
        this.finger_img();//滑动-手
        this.open_ani();//弹窗动画效果

        this.c_back_btn=new MyButton("c_back_btn");//关闭按钮
        this.center_sp.addChild(this.c_back_btn);
        this.c_back_btn.x=50;
        this.c_back_btn.y=-20;
        this.c_back_btn.addTouchEvent();
        this.c_back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close_click,this);

        //今日总分
        var sp1=new egret.Sprite();
        this.center_sp.addChild(sp1);
        sp1.x=188;
        sp1.y=520;
        var bg1=this.set_bit_center("c_score_icon");
        bg1.touchEnabled=true;
        bg1.x=-42-40;
        bg1.y=-162+215;
        sp1.addChild(bg1);
        //今日局数
        var sp2=new egret.Sprite();
        this.center_sp.addChild(sp2);
        sp2.x=188;
        sp2.y=520;
        var bg2=this.set_bit_center("c_ju_icon");
        bg2.touchEnabled=true;
        bg2.x=Main.stageWidth-330;
        bg2.y=-162+215;
        sp2.addChild(bg2);

        //今日-昨日切换按钮
        var day_or_yesterday_btn=new MyButton("c_today_btn");
        day_or_yesterday_btn.x=Main.stageWidth/2;
        day_or_yesterday_btn.y=-24;
        day_or_yesterday_btn.addTouchEvent();
        day_or_yesterday_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.change_button_type,this);
        this.center_sp.addChild(day_or_yesterday_btn);

        //俱乐部-战绩-今日view
        this.view_today=new Club_achievement_list_today(data);
        this.view_today.v_to_v_add_event(this.EVENT.base_popup.club_play_back_info,this.play_back_info_pop,this);//回放popup
        this.view_today.v_to_v_add_event(this.EVENT.base_popup.share,this.share_pop,this);//分享popup
        this.center_sp.addChild(this.view_today);

        //俱乐部-战绩-昨日view
        this.view_yesterday=new Club_achievement_list_yesterday(data);
        this.view_yesterday.v_to_v_add_event(this.EVENT.base_popup.club_play_back_info,this.play_back_info_pop,this);//回放popup
        this.view_yesterday.v_to_v_add_event(this.EVENT.base_popup.share,this.share_pop,this);//分享popup
        this.center_sp.addChild(this.view_yesterday);
        this.view_yesterday.visible=false;
    }

    //按钮切换改变button状态
    protected date;//设成全局  1今日/0昨日
    private change_button_type(e){
        var btn=e.currentTarget;
        if(this.button_type=="c_info_today"){           //切换为代开历史;
            this.button_type="c_info_yesterday";
            btn.changTexture("c_yesterday_btn");
            this.view_today.visible=false;
            this.view_yesterday.visible=true;
        }else {                                 //切换为代开记录;
            this.button_type="c_info_today";
            btn.changTexture("c_today_btn");
            this.view_today.visible=true;
            this.view_yesterday.visible=false;
        }
        var  data={
            page:this.current_page,
            clubId:this.clubId,
            userId:this.userId,
            date:this.button_type=="c_info_yesterday"?0:1
        };
        this.date=data.date
        this.v_to_v_dis_event(this.EVENT.base.club_get_my_info,data);
    }

    //添加战绩数据--今日/昨日;
    public add_club_record_list(info){
        if(this.date==0){//按钮切换-昨天
            this.view_yesterday.add_club_yesterday_list(info);
        }else{//默认-今日
            this.view_today.add_club_today_list(info);
        }
        if(!this.day_score_txt) {//不存在-进行添加
            //今日总分
            this.day_score_txt=this.create_txt(158,564,"",info.score,0xff0000);
            this.day_score_txt.touchEnabled=true;
        }
        if(!this.day_game_num_txt) {//不存在-进行添加
            //今日局数
            this.day_game_num_txt=this.create_txt(1052,563,"",info.juNum,0xff7f00);
            this.day_game_num_txt.touchEnabled=true;
        }

    }

    //显示回放pop;
    private play_back_info_pop(data){
        //告诉popView弹出分享战绩View;
        this.v_to_v_dis_event(this.EVENT.base_popup.club_play_back_info,data);
    }
    //分享pop
    private share_pop(){
        this.v_to_v_dis_event(this.EVENT.base_popup.share);
    }

    //通用文本
    private create_txt(x,y,sp=null,str="",color=0xff0000):egret.TextField{
        var txt=new egret.TextField();
        txt.size=25;
        txt.x=x;
        txt.y=y;
        txt.textColor=color;
        txt.text=str;
        this.center_sp.addChild(txt);
        return txt;
    }
    //手指动画
    protected finger_img(){
        //手指;
        var finger_img=new egret.Bitmap(RES.getRes("p_hand_icon"));
        finger_img.anchorOffsetX=finger_img.width/2;
        finger_img.anchorOffsetY=finger_img.height/2;
        finger_img.x=Main.stageWidth/2;
        finger_img.y=Main.stageHeight-30;
        this.addChild(finger_img);
        //手指拖动动画;
        setTimeout(function () {
            egret.Tween.get(finger_img).to({x:Main.stageWidth/2-120},300).wait(500).to({x:Main.stageWidth/2+140},300).wait(500).to({x:Main.stageWidth/2},300).wait(300).
            to({scaleX:1.5,scaleY:1.5,},300).to({scaleX:1,scaleY:1,},300).to({scaleX:1.5,scaleY:1.5,},300).to({scaleX:0.6,scaleY:0.6,y:Main.stageHeight-40},300).call(function () {
                // finger_img.scaleX=0.6;
                // finger_img.scaleY=0.6;
            },this);
        }.bind(this),600);
    }
}