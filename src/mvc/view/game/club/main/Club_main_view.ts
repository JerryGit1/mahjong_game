/**
 * Created by zwb on 2018/4/17.
 * 俱乐部主页
 */
class Club_main_view extends Base_view{
    //按钮列表
    private btn_list_view=[];
    //返回按钮
    private back_btn:MyButton;
    protected myscrollView:egret.ScrollView;//滚动区域
    protected content:egret.Sprite=new egret.Sprite();//滚动容器
    public EVENT:Game_club_event_model=new Game_club_event_model();//事件常量   zwb:4-18 17:15
    public constructor(list_info:Array<Club_base_model>,pao_info_str=""){
        super();
        //背景1
        var back=this.set_bit_center("c_main_bg",false);
        this.addChild(back);
        back.height=Main.stageHeight;
        //背景2
        back=this.set_bit_center("c_m_bg");
        this.addChild(back);
        back.scale9Grid=new egret.Rectangle(141,76,846,462);
        back.width=Main.stageWidth*.98;
        back.height=614;
        back.anchorOffsetX=0;
        back.anchorOffsetY=back.height/2;
        back.x=Main.stageWidth/2-back.width/2;
        back.y=Main.stageHeight-back.height/2-15;
        //按钮列表
        var b_w=330;//按钮宽度
        var num=list_info.length;//按钮数量
        var b_d=num<3?100:20;//按钮间距
        var vx=Main.stageWidth/2-(b_w*num+(num-1)*b_d)/2+b_w/2;
        for(var i in list_info){
            var btn=new Club_btn("c_b_"+((Number(i)+1)%3+1),list_info[i]);
            this.content.addChild(btn);
            this.btn_list_view.push(btn);
            // btn.y=back.y+back.height/2-btn.height;
            btn.y=back.y+back.height/2-btn.height+30;
            btn.x=vx-55;
            if(num<3){
                vx+=b_w+b_d;
            }else{
                btn.x=(btn.width/2+20)*Number(i)+btn.width/3-60;
                // btn.x=(btn.width/2+70)*Number(i)+btn.width/3-20;
            }
            btn["info"]=list_info[i];
            btn.addTouchEvent();
            btn.addEventListener("click",this.add_clue_info,this);

        }
        //滚动区域
        this.myscrollView = new egret.ScrollView();
        this.myscrollView.width = back.width-60;
        this.myscrollView.height =back.height-120+30;
        this.myscrollView.x= back.x+30;
        this.myscrollView.y=back.y-back.height/2+80;
        this.myscrollView.verticalScrollPolicy = "off";
        this.myscrollView.bounces = false;
        if(num>3){
            this.myscrollView.horizontalScrollPolicy = "on";
        }else{
            this.myscrollView.horizontalScrollPolicy = "off";
        }
        this.myscrollView.setContent(this.content);
        this.addChild(this.myscrollView);
        // //背景图，用来展现ScrollView 的边界
        // var background:egret.Shape = new egret.Shape();
        // background.graphics.lineStyle(1,0x1102cc);
        // background.graphics.drawRect(back.x+30,back.y-back.height/2+80,back.width-80,back.height-120);
        // background.graphics.endFill();
        // this.addChild(background);

        //标题
        var title=this.set_bit_center("c_m_title");
        this.addChild(title);
        title.x=Main.stageWidth/2;
        title.y=back.y-back.height/2+62;
        if(title.y<title.height/2){
            title.y=title.height/2;
        }else if(title.y>title.height/2+50){
            this.add_notice_view(pao_info_str);
        }
        //返回按钮
        this.back_btn=new MyButton("c_back_btn");
        this.addChild(this.back_btn);
        this.back_btn.x=this.back_btn.width*.7;
        this.back_btn.y=this.back_btn.height*.75;
        this.back_btn.addTouchEvent();
        this.back_btn.addEventListener("click",this.back_hall,this);
    }
    /*tyq: 跑马灯*/
    protected add_notice_view(pao_info_str){
        var notice_view = new Marquee_view();
        notice_view.x = Main.stageWidth*0.5-notice_view.width/2;
        notice_view.set_text_pos(pao_info_str);
        notice_view.y = 10;
        this.addChild(notice_view);
    }
    //跳转俱乐部广场
    private add_clue_info(e){
        var btn = e.target;
        if(btn.info.exState==2){//zwb:4-13 exState=2申请离开状态 俱乐部不能点
            this.v_to_v_dis_event(this.EVENT.club.float_alert,{"str":"您已申请离开该俱乐部，待审批中"});
        }else{
            this.v_to_v_dis_event(this.EVENT.club.cut_scene,e.target.info);
        }
    }
    //返回大厅
    private back_hall(){
        this.back_btn.clear();
        this.v_to_v_dis_event(this.EVENT.club.back_hall);
    }
    public clear(){
        this.back_btn.removeEventListener("click",this.back_hall,this);
        this.back_btn.clear();
        super.clear();
    }
}
