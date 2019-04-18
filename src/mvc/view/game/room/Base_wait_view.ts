/**
 * Created by 周鹏斌大王 on 2018-04-17.
 */
class Base_wait_view extends Base_view{
    public EVENT:Game_room_event_model=new Game_room_event_model();//事件常量
    //邀请好友按钮
    protected share_btn:MyButton;
    //离开/退出 房间按钮
    private leave_btn:MyButton;
    //玩法规则提示
    private rule_tips_txt:egret.TextField;
    //准备提示ICON
    private tips_icon_list=[];
    //IP冲突提示
    private ip_tips_sp:egret.Sprite;
    private ip_tips_txt:egret.TextField;
    public constructor(_is_house_owner=false,rule_str="") {
        super();
        for(var i=0;i<this.CONST.WAIT_TIP_POS.length;i++){
            var icon=this.set_bit_center("g_prepare_ok");
            this.addChild(icon);
            icon.x=this.CONST.WAIT_TIP_POS[i].x;
            icon.y=this.CONST.WAIT_TIP_POS[i].y;
            icon.visible=false;
            this.tips_icon_list.push(icon);
        }
    }
    //分享按钮
    protected add_share_btn() {
        this.share_btn = new MyButton("g_shareBtn", 1);
        this.addChild(this.share_btn);
        this.share_btn.x = Main.stageWidth / 2;
        this.share_btn.y = Main.stageHeight / 2;
        this.share_btn.addTouchEvent();
        this.share_btn.addEventListener("click",this.share_btn_click,this);
    }
    //离开解散按钮
    protected add_leave_btn(_is_house_owner) {
        this.leave_btn = new MyButton(_is_house_owner ? "g_killRoomBtn" : "g_killRoomBtn1");
        this.addChild(this.leave_btn);
        this.leave_btn.x = 948;
        this.leave_btn.y = 166;
        this.leave_btn.addTouchEvent();
        this.leave_btn.addEventListener("click",this.leave_btn_click,this);
    }
    //游戏规则
    protected add_rule_txt(rule_str){
        this.rule_tips_txt=new egret.TextField();
        this.addChild(this.rule_tips_txt);
        this.rule_tips_txt.width=Main.stageWidth*.4;
        this.rule_tips_txt.textAlign="center";
        this.rule_tips_txt.size=17;
        this.rule_tips_txt.textColor=0x063532;
        this.rule_tips_txt.stroke=1;
        this.rule_tips_txt.bold=true;
        this.rule_tips_txt.strokeColor=0x6ca7a1;
        this.rule_tips_txt.x=Main.stageWidth/2-this.rule_tips_txt.width/2;
        this.rule_tips_txt.y=Main.stageHeight/2-80;
        this.rule_tips_txt.text=rule_str;
    }

    //-----------------------更新---------------------------
    /**
     *各个方位玩家准备状态更新
     * @param position
     * @param type 0不显示 1显示
     */
    public update_tips_icon(position,type=0){
        if(this.tips_icon_list[position-1]){
            this.tips_icon_list[position-1].visible=type;
        }
    }
    /**
     *IP 冲突提示
     * @param str
     */
    public update_ip_txt(str){
        if(!this.ip_tips_txt){
            this.ip_tips_sp=new egret.Sprite();
            this.addChild(this.ip_tips_sp);
            this.ip_tips_txt=new egret.TextField();
            this.ip_tips_sp.addChild(this.ip_tips_txt);
            this.ip_tips_txt.x=20;
            this.ip_tips_txt.y=5;
            this.ip_tips_txt.size=25;
        }

        this.ip_tips_sp.graphics.clear();
        if(str){
            this.ip_tips_txt.textFlow = (new egret.HtmlTextParser()).parse(str);
            var w=this.ip_tips_txt.width+this.ip_tips_txt.x*2;
            this.ip_tips_sp.graphics.beginFill(0x111111,.6);
            this.ip_tips_sp.graphics.drawRect(0,0,w,40);
            this.ip_tips_sp.x=Main.stageWidth/2-w/2;
            this.ip_tips_sp.y=Main.stageHeight-40;

        }else{
            this.ip_tips_txt.text="";
        }
    }
    //-----------------------事件---------------------------
    //分享
    private share_btn_click(){
        this.v_to_v_dis_event(this.EVENT.room_popup.share);
    }
    //离开/解散
    private leave_btn_click(){
        this.v_to_v_dis_event(this.EVENT.room.leave_room);
    }
    public clear(){
        if(this.share_btn){
            this.share_btn.clear();
            this.share_btn.removeEventListener("click",this.share_btn_click,this);
        }
        if(this.leave_btn){
            this.leave_btn.clear();
            this.leave_btn.removeEventListener("click",this.leave_btn_click,this);
        }
        super.clear();
    }
}