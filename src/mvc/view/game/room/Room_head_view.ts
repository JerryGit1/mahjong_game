/**
 * Created by 周鹏斌大王 on 2018-04-17.
 */
class Room_heads_view extends Base_view{
    protected EVENT:Game_room_event_model=new Game_room_event_model();//事件常量
    //头像组
    protected user_views:Array<Room_user_head> = [];
    //跑马灯
    protected marquee_view:Marquee_view;
    //右侧按钮
    private right_setting_btn:MyButton;//设置按钮
    private location_btn:MyButton;//定位按钮
    private chitchat_btn:MyButton;//聊天按钮
    private rule_btn:MyButton;//规则按钮
    public constructor(user_group_model:User_group_model){
        super();
        this.init_view(user_group_model);
    }
    private init_view(user_group_model){
        this.add_user_list(user_group_model);
        this.init_right_btn();
        this.add_marquee_view();
    }
    //头像列表
    protected add_user_list(user_group_model:User_group_model){
        for(var i:number=1;i<=4;i++){
            var view:Room_user_head = new Room_user_head(user_group_model.position_id_get_user_model(i));
            this.user_views.push(view);
            this.addChild(view);
            view.v_to_v_add_event(this.EVENT.room_popup.look_user_info,this.look_user_info,this);
            view.v_to_v_add_event(this.EVENT.room_popup.kicking_user,this.kicking_user,this);
        }
        this.update_head_pos(this.CONST.HEAD_POS_wait);
    }
    //右侧按钮
    private init_right_btn(){
        //设置按钮
        this.right_setting_btn=new MyButton("g_settingBtn");
        this.addChild(this.right_setting_btn);
        this.right_setting_btn.x=Main.stageWidth-this.right_setting_btn.width/2-10;
        this.right_setting_btn.y=50;
        //玩法提示按钮
        this.rule_btn=new MyButton("g_helpInfoBtn");
        this.addChild(this.rule_btn);
        this.rule_btn.x=this.right_setting_btn.x;
        this.rule_btn.y=138;
        //定位按钮
        this.location_btn=new MyButton("locationBtn");
        this.addChild(this.location_btn);
        this.location_btn.x=this.right_setting_btn.x;
        this.location_btn.y=Main.stageHeight*.6;
        //聊天按钮
        this.chitchat_btn=new MyButton("g_chatBtn");
        this.addChild(this.chitchat_btn);
        this.chitchat_btn.x=this.right_setting_btn.x;
        this.chitchat_btn.y=this.location_btn.y+this.location_btn.height+10;

        this.right_setting_btn.addTouchEvent();
        this.right_setting_btn.addEventListener("click",this.setting_btn_click,this);//设置按钮

        this.location_btn.addTouchEvent();
        this.location_btn.addEventListener("click",this.location_btn_click,this);//定位按钮

        this.chitchat_btn.addTouchEvent();
        this.chitchat_btn.addEventListener("click",this.chitchat_btn_click,this);//聊天按钮

        this.rule_btn.addTouchEvent();
        this.rule_btn.addEventListener("click",this.rule_btn_click,this);//玩法提示按钮
        this.set_rule_btn();
    }
    //跑马灯
    private add_marquee_view(){
        this.marquee_view=new Marquee_view();
        this.addChild(this.marquee_view);
        this.marquee_view.x=Main.stageWidth/2-this.marquee_view.width/2;
        this.marquee_view.y=10;
        // this.marquee_view.visible = false;
        this.marquee_view.set_text_by_times(this.CONST.marquee_tips,30);

    }
    //--------------------------更新------------------------
    //更新头像坐标
    public update_head_pos(pos_list){
        for(var i in this.user_views){
            this.user_views[i].x=pos_list[i].x;
            this.user_views[i].y=pos_list[i].y;
        }
    }
    //更新玩家基础信息
    public update_base_view(){
        for(var i in this.user_views){
            this.user_views[i].update_base_info();
        }
    }
    //更新玩家实时分数
    public update_score(){
        for(var i in this.user_views){
            this.user_views[i].update_current_score();
        }
    }
    //设置规则按钮
    public set_rule_btn(_is=false){
       this.rule_btn.visible=_is;
    }
    //回放
    public set_playback(){
        this.right_setting_btn.visible=false;
        this.location_btn.visible=false;
        this.chitchat_btn.visible=false;
        this.rule_btn.visible = false;
    }
    // //更新跑马灯内容
    // public set_marquee_tips(str){
    //     this.marquee_view.visible = true;
    //     this.marquee_view.set_notice_round_play(str,3);
    // }
    //--------------------------事件-------------------------
    private setting_btn_click(){
        //设置弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.setup_popup);
    }
    private location_btn_click(){
        //定位弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.location);
    }
    private chitchat_btn_click(){
        //聊天弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.chitchat);
    }
    private rule_btn_click(){
        //规则弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.rule,{x:this.rule_btn.x,y:this.rule_btn.y});
    }
    private look_user_info(user_id){
        //查看用户详情
        this.v_to_v_dis_event(this.EVENT.room_popup.look_user_info,user_id);
    }
    private kicking_user(info){
        //踢人
        this.v_to_v_dis_event(this.EVENT.room_popup.kicking_user,info);
    }
    public set_touch_event(bl){
        for(var i=0;i<this.numChildren-1;i++){
            if(this.getChildAt(i)["cutTouchEvent"]){
                if(bl){
                    this.getChildAt(i)["addTouchEvent"]();
                }else{
                    this.getChildAt(i)["cutTouchEvent"]();
                }
            }
        }
    }

    public clear(){
        this.right_setting_btn.clear();
        this.right_setting_btn.removeEventListener("click",this.setting_btn_click,this);
        this.location_btn.clear();
        this.location_btn.removeEventListener("click",this.location_btn_click,this);
        this.chitchat_btn.clear();
        this.chitchat_btn.removeEventListener("click",this.chitchat_btn_click,this);

        for(var i in this.user_views){
            var view:Room_user_head =this.user_views[i];
            view.v_to_v_remove_event(this.EVENT.room_popup.look_user_info,this.look_user_info,this);
            view.clear();
        }

        super.clear();
    }
}