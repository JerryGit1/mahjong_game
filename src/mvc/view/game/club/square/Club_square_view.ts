/**
 * Created by zwb on 2018/4/17.
 * 俱乐部广场
 */
class Club_square_view extends Base_view{
    //信息
    protected model:Game_club_model;
    //中间桌子层------
    private center_sprite:egret.Sprite;
    private tabel_list:Array<Club_table_view>;//牌桌列表 一开始就创建完了
    private no_table_tips:egret.Bitmap;//没有牌局提示
    //底部信息栏层------
    private down_info_sprite:egret.Sprite;
    //房卡库存
    private card_num_txt:egret.TextField;
    //主持人
    private home_user_txt:egret.TextField;
    //今日开局
    private day_game_num_txt:egret.TextField;
    //今日活跃
    private day_hot_player_txt:egret.TextField;

    //返回按钮
    private back_btn:MyButton;
    //我的成绩按钮
    private my_info_btn:MyButton;
    //申请离开按钮
    private request_leave_btn:MyButton;
    //创建房间按钮
    private create_room_btn:MyButton;
    //俱乐部名称/提示----
    //跑马灯
    //刷新按钮
    private refresh_btn:MyButton;
    //定时刷新
    protected setTime_refresh;

    public EVENT:Game_club_event_model=new Game_club_event_model();//事件常量   zwb:4-18 17:15

    public constructor(model:Game_club_model,pao_info_str=""){
        super();
        this.model=model;
        //创建5张空闲的桌子
        this.tabel_list=[];
        this.init_view(pao_info_str);
    }
    /*-------------------初始化视图------------------------*/
    private init_view(pao_info_str){
        this.center_move_view();
        this.add_down_info();
        //俱乐部名称
        this.add_title();
        //跑马灯
        this.add_notice_view(pao_info_str);
        //返回按钮
        this.back_btn=new MyButton("c_back_btn");
        this.addChild(this.back_btn);
        this.back_btn.x=this.back_btn.width*.7;
        this.back_btn.y=this.back_btn.height*.75;
        this.back_btn.addTouchEvent();
        this.back_btn.addEventListener("click",this.back_main_scene,this);
        //刷新按钮
        this.refresh_btn=new MyButton("c_refresh_btn");
        this.addChild(this.refresh_btn);
        this.refresh_btn.x=Main.stageWidth-this.refresh_btn.width+20;
        this.refresh_btn.y=Main.stageHeight-this.down_info_sprite.height-this.refresh_btn.height+20;
        this.refresh_btn.addTouchEvent();
        this.refresh_btn.addEventListener("click",this.refresh_main_scene,this);
    }
    //中间拖动层
    private center_move_view(){
        //中间层
        this.center_sprite=new egret.Sprite();
        this.addChild(this.center_sprite);
        //背景
        var bg=this.set_bit_center("c_square_bg",false);
        this.addChild(bg);
        bg.y=Main.stageHeight-bg.height;

        var myscrollView = new egret.ScrollView();
        myscrollView.setContent(this.center_sprite);
        myscrollView.bounces=false;
        myscrollView.horizontalScrollPolicy="off";
        myscrollView.verticalScrollPolicy="off";
        this.addChild(myscrollView);

        myscrollView.width=Main.stageWidth;
        myscrollView.height=Main.stageHeight;

        // //创建5张空闲的桌子
        // this.tabel_list=[];
        for(var j=0;j<this.tabel_list.length;j++){
            this.center_sprite.removeChildAt(0);//清空视图
        }
        this.tabel_list=[];
        for(var i=0;i<this.CONST.club_max_create_num;i++){
            var table_view:Club_table_view=new Club_table_view();
            this.center_sprite.addChild(table_view);
            this.tabel_list.push(table_view);
            table_view.x=Main.stageWidth/3*((i%3)+.5);
            table_view.y=Main.stageHeight-108-(1-Math.floor(i/3))*(table_view.h+Math.floor(Main.stageHeight/11))-table_view.h/2-45;
            if(Math.floor(i/3)!=0){
                //近大远小 策略
                table_view.scaleX=table_view.scaleY=1.2;
            }
            table_view.visible=false;
            table_view.v_to_v_add_event(this.EVENT.club.join_room,this.join_room,this);
        }
        //没有牌局提示
        this.no_table_tips=this.set_bit_center("c_tips_img");
        this.addChild(this.no_table_tips);
        this.no_table_tips.x=Main.stageWidth/2;
        this.no_table_tips.y=Main.stageHeight/2-60;
        this.no_table_tips.touchEnabled=true;
        this.no_table_tips.visible=false;
    }
    //显示底部信息栏
    private add_down_info(){
        //底部信息栏
        this.down_info_sprite=new egret.Sprite();
        this.addChild(this.down_info_sprite);
        var bg=this.set_bit_center("c_down_bg",false);
        this.down_info_sprite.addChild(bg);
        this.down_info_sprite.y=Main.stageHeight-bg.height;
        //房卡库存
        this.card_num_txt=this.create_txt(460,28);
        //主持人
        this.home_user_txt=this.create_txt(648,28);
        //今日开局
        this.day_game_num_txt=this.create_txt(460,57);
        //今日活跃
        this.day_hot_player_txt=this.create_txt(670,57);
        //我的成绩
        this.my_info_btn=this.create_btn("c_record_btn",82,53,this.my_info_popup);
        //申请离开
        this.request_leave_btn=this.create_btn("c_leave_btn",232,53,this.leave_popup);
        //创建房间
        this.create_room_btn=this.create_btn("c_create_btn",966,53,this.create_popup);
        //提示文本
        var tips_txt=this.create_txt(819,-32,"注:当前未满座房间最多允许"+this.CONST.club_max_create_num+"间");

        tips_txt.alpha=.8;
    }
    //通用文本
    private create_txt(x,y,str=""):egret.TextField{
        var txt=new egret.TextField();
        txt.size=20;
        txt.x=x;
        txt.y=y;
        txt.text=str;
        this.down_info_sprite.addChild(txt);
        return txt;
    }
    //通用按钮
    private create_btn(str,x,y,backFun,type=null):MyButton{
        var btn=new MyButton(str,type);
        this.down_info_sprite.addChild(btn);
        btn.x=x;
        btn.y=y;
        btn.addTouchEvent();
        btn.addEventListener("click",backFun,this);
        return btn;
    }
    //俱乐部名称
    private add_title(){
        var name_sp=new egret.Sprite();
        this.addChild(name_sp);
        var name_b=this.set_bit_center("c_name_icon",false);
        name_sp.addChild(name_b);
        name_b.y=35;
        var txt=new egret.TextField();
        name_sp.addChild(txt);
        txt.width=name_b.width;
        txt.size=30;
        txt.x=15;
        txt.textAlign="center";
        txt.textColor=0xffbb0f;
        txt.strokeColor=0x6c0505;
        txt.stroke=2;
        txt.bold=true;
        txt.text=this.model.club_base_info_model.clubName;
        name_sp.x=Main.stageWidth-name_sp.width-10;
        name_sp.y=25;
    }
    /*tyq: 跑马灯*/
    protected add_notice_view(pao_info_str){
        var notice_view = new Marquee_view();
        notice_view.x = 161;
        notice_view.y = 19;
        notice_view.set_text_pos(pao_info_str);
        this.addChild(notice_view);
    }

    /*-------------------更新视图------------------------*/
    public update_square_info(data){
        //基础信息文本
        this.card_num_txt.text=data.clubMoney+"张";
        this.home_user_txt.text=String(decodeURIComponent(this.model.club_base_info_model.clubUserName));
        this.day_game_num_txt.text=data.juNum+"局";
        this.day_hot_player_txt.text=data.actNum+"人";

        if(this.model.club_base_info_model.exState==5){//判断exState==5 隐藏[申请离开]按钮   调整[我的战绩]按钮位置
            this.my_info_btn.x=167;//按钮：我的成绩
            this.request_leave_btn.visible=false;//按钮：申请离开
        }
        //刷新房间信息
        for(var i in this.tabel_list){
            if(this.model.club_room_list&&this.model.club_room_list.length>Number(i)){
                this.tabel_list[i].visible=true;
                this.tabel_list[i].update_info(this.model.club_room_list[i]);
            }else{
                this.tabel_list[i].visible=false;
            }
        }
        //提示
        this.no_table_tips.visible=(!this.model.club_room_list||this.model.club_room_list.length==0);
        // if(this.setTime_refresh)clearTimeout(this.setTime_refresh);
        // //定时器自动刷新
        // this.setTime_refresh=setTimeout(function () {
        //     this.refresh_main_scene();
        // }.bind(this), 5000);
    }
    /*-------------------事件处理------------------------*/
    //返回上个场景
    private back_main_scene(){
        this.v_to_v_dis_event(this.EVENT.club.cut_scene);
    }
    //刷新俱乐部场景---通过按钮和通过定时器去刷新
    private refresh_main_scene(){
        this.v_to_v_dis_event(this.EVENT.club.update_square_info,this.model.club_base_info_model.clubId);
    }
    //我的成绩弹窗
    private my_info_popup(){
        this.v_to_v_dis_event(this.EVENT.club.add_my_info);
    }
    //申请离开弹窗
    private leave_popup(){
        this.v_to_v_dis_event(this.EVENT.club.request_leave);
    }
    //创建房间弹窗
    private create_popup(){
        this.v_to_v_dis_event(this.EVENT.club.create_room);
    }
    //加入房间弹窗
    private join_room(info){
        this.v_to_v_dis_event(this.EVENT.club.join_room,info);
    }

    public clear(){
        if(this.setTime_refresh)clearTimeout(this.setTime_refresh);
        // this.model.m_to_c_remove_event(this.EVENT.club.update_square_info);
        super.clear();
    }
}
