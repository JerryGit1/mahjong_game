/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
class Room_user_head extends Base_view{
    protected EVENT:Game_room_event_model=new Game_room_event_model();//事件常量

    protected model:User_model;
    //基础头像
    private base_head_view:User_head_view;
    //昵称
    private nick_name_txt:egret.TextField;
    //分数
    private score_txt:egret.TextField;
    //房主ICON
    private house_icon:egret.Bitmap;
    //庄ICON
    private zhuang_icon:egret.Bitmap;
    //铺分ICON
    private pu_score_icon:egret.Bitmap;
    //离线提示ICON
    private off_line_icon:egret.Bitmap;
    //踢人按钮
    private kicking_btn:MyButton;
    public constructor(user_model:User_model){
        super();
        this.model=user_model;
        //基础头像
        this.base_head_view=new User_head_view();
        this.addChild(this.base_head_view);
        this.base_head_view.create_rect_head(70,70,"head_bg");
        //点击
        this.base_head_view.touchEnabled=true;
        this.base_head_view.addEventListener(egret.TouchEvent.TOUCH_TAP,this.head_click,this);
        //踢人按钮显示
        this.model.m_to_c_add_event(this.EVENT.user.set_tiren_btn,this.update_kicking_btn,this);
        //在线状态切换
        this.model.m_to_c_add_event(this.EVENT.user.update_online_status,this.update_off_line_icon,this);
    }
    //--------------------------更新视图----------------------------
    //更新基础信息--断线重连
    public update_base_info(){
        if(this.model.current_table_board_is_join){//这个位置有人
            //头像信息
            this.base_head_view.update_head_url(this.model.userImg);
            //昵称
            this.update_nick_name(this.model.userName);
            //分数
            this.update_score(this.model.score+"");
            //房主icon
            if(this.model.houseOwner)this.update_house_icon();
            //庄icon
            this.update_zhuang_icon(this.model.zhuang);
            //线上状态
            this.update_off_line_icon(this.model.state);
        }else{
            //头像信息
            this.base_head_view.update_head_url();
            //昵称
            this.update_nick_name("待入座..");
            //分数
            this.update_score();
            //庄icon
            this.update_zhuang_icon(false);
            //线上状态
            this.update_off_line_icon(true);
        }
    }
    //杠的时候----更新玩家分数
    public update_current_score(){
        this.update_score(this.model.score+"");
    }
    //更新昵称
    private update_nick_name(user_name=""){
        if(!this.nick_name_txt){
            var sp=new egret.Sprite();
            this.addChild(sp);

            var bg=this.set_bit_center("g_name_bg",false);
            sp.addChild(bg);
            bg.x=-3;

            this.nick_name_txt=new egret.TextField();
            sp.addChild(this.nick_name_txt);
            this.nick_name_txt.size=14;
            this.nick_name_txt.width=this.base_head_view.width;
            this.nick_name_txt.textAlign="center";
            sp.y=this.base_head_view.height/2-22;
            sp.x=-this.base_head_view.width/2;
            this.nick_name_txt.y=3;
        }
        this.nick_name_txt.text=user_name;
    }
    //更新分数
    private score_bg;
    private update_score(score=""){
        if(!this.score_txt){
            this.score_bg=this.set_bit_center("g_name_bg",true);
            this.addChild(this.score_bg);
            this.score_bg.y=50;
            this.score_txt=new egret.TextField();
            this.addChild(this.score_txt);
            this.score_txt.width=this.base_head_view.width;
            this.score_txt.x=-this.base_head_view.width/2;
            this.score_txt.textAlign="center";
            this.score_txt.y=43;
            this.score_txt.textColor=0xffe868;
            this.score_txt.size=15;
        }
        if(this.model.current_table_board_is_join){
            this.score_bg.visible=this.score_txt.visible=true;
            this.score_txt.text=score;
        }else{
            this.score_bg.visible=this.score_txt.visible=false;
        }
    }
    //更新房主ICON
    private update_house_icon(){
        if(!this.house_icon){
            this.house_icon=this.set_bit_center("g_host");
            this.addChild(this.house_icon);
            this.house_icon.x=30;
            this.house_icon.y=-34;
        }
    }
    //更新庄ICON
    private update_zhuang_icon(_vis){
        if(!this.zhuang_icon){
            this.zhuang_icon=this.set_bit_center("g_zhuang");
            this.addChild(this.zhuang_icon);
            this.zhuang_icon.x=-26;
            this.zhuang_icon.y=-28;
        }
        this.zhuang_icon.visible=_vis;
    }
    //更新离线提示ICON
    private update_off_line_icon(_vis){
        if(!this.off_line_icon){
            this.off_line_icon=this.set_bit_center("g_u_off-line");
            this.addChildAt(this.off_line_icon,2);
        }
        if(_vis==1)this.off_line_icon.visible=false;
        else this.off_line_icon.visible=true;
    }
    //显示踢人按钮
    private update_kicking_btn(_vis){
        if(!this.kicking_btn){
            this.kicking_btn=new MyButton("g_kicking");
            this.addChild(this.kicking_btn);
            this.kicking_btn.addTouchEvent();
            this.kicking_btn.x=35;
            this.kicking_btn.y=-31;
            this.kicking_btn.addEventListener("click",this.kicking_btn_click,this);
        }
        this.kicking_btn.visible=_vis;
    }
    //--------------------------事件----------------------------
    private head_click(){
        //查看用户详情
        this.v_to_v_dis_event(this.EVENT.room_popup.look_user_info,this.model.userId);
    }

    private kicking_btn_click(){
        //踢人
        var info={
            userId:this.model.userId,
            user_name:this.model.userName
        }
        this.v_to_v_dis_event(this.EVENT.room_popup.kicking_user,info);
    }
    public clear(){
        if(this.kicking_btn){
            this.kicking_btn.clear();
            this.kicking_btn.removeEventListener("click",this.kicking_btn_click,this);
        }
        this.base_head_view.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.head_click,this);
        this.model.m_to_c_remove_event(this.EVENT.user.set_tiren_btn,this.update_kicking_btn,this);
        super.clear();
    }
}