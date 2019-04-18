/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */

class Setting_popup extends Base_popup{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected type:string;
    constructor(info){
        super(true,true);
        this.init_view();
        this.init_centent(info);
    }

    private init_view(){
        this.add_center_bg("p_user_view_Bg_png",701,402);
        this.add_img_title("l_setting_title",{x:350,y:10});
        this.add_close_btn("l_close_btn",{x:690,y:10});
        this.open_ani();
    }

    private init_centent(is_show){
        //================音效开关
        var switchBtn=new Effect_sound_btn("l_effect_text","l_effect_on_btn","l_effect_off_btn");
        this.center_sp.addChild(switchBtn);
        switchBtn.x = this.center_sp.width/2-switchBtn.width*.5;
        switchBtn.y = Main.stageHeight*0.20;

        //==============音乐开关
        var switchBtn1=new Bg_sound_btn("l_music_text","l_music_on_btn","l_music_off_btn");
        this.center_sp.addChild(switchBtn1);
        switchBtn1.x=switchBtn.x;
        switchBtn1.y=switchBtn.y+84;

        //是否显示解散房间;
        if(is_show){
            //退出游戏 or 解散房间
            var closeGameBtn = new MyButton("g_killRoomBtn_1");
            closeGameBtn.x = 368;
            closeGameBtn.y = 336;
            closeGameBtn.addTouchEvent();
            closeGameBtn.addEventListener("click",function () {
                this.v_to_v_dis_event(this.EVENT.popup.room_dissolution_room);
                this.close_click();
            }.bind(this),this);
            this.center_sp.addChild(closeGameBtn);
        }


    }
}