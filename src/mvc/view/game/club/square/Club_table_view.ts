/**
 * Created by zwb on 2018/4/17.
 * 俱乐部广场--单个牌桌
 */
class Club_table_view extends Base_view{


    private model:Club_room_model;
    private head_list:Array<User_head_view>=[];
    private player_off_arr=[];   //玩家离线图片数组;
    public w;
    public h;
    private rule_btn:MyButton;//规则按钮
    private rule_tips:Tip_view;//规则弹出框
    private base_info_tips:egret.TextField;//基础信息提示
    public EVENT:Game_club_event_model=new Game_club_event_model();//事件常量   zwb:4-18 17:15
    public constructor(){
        super();
        var bg=this.set_bit_center("c_table_bg");
        this.addChild(bg);
        bg.touchEnabled=true;
        bg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.start_join_room,this);
        this.w=bg.width;
        this.h=bg.height;

        var len=4;//总人数
        for(var i=0;i<len;i++){
            var head=new User_head_view();
            head.add_bg("c_head_bg",45,45);//头像背景
            head.create_rect_head(42.5,42.5);
            this.addChild(head);
            this.head_list.push(head);
            if(i==1){
                head.x=-83;
                head.y=-60;
            }else if(i==2){
                head.x=83;
                head.y=-60;
            }else if(i==3){
                head.x=-89;
                head.y=42;
            }else{
                head.x=83;
                head.y=42;
            }
            // head.x=Math.cos(Math.PI*((360/len)*i-90-60)/180)*bg.width*.4;
            // head.y=Math.sin(Math.PI*((360/len)*i-90-60)/180)*bg.width*.38;
            // head.touchEnabled=true;
            //离线状态图片;
            var player_off_img=new egret.Bitmap(RES.getRes("l_off_line_img"));
            player_off_img.touchEnabled=true;
            player_off_img.width=head.width-8;
            player_off_img.height=head.height-8;
            player_off_img.x=head.x-head.width/2+4;
            player_off_img.y=head.y-head.height/2+4;
            this.addChild(player_off_img);
            player_off_img.visible=false;
            this.player_off_arr.push(player_off_img);
        }
        //规则按钮
        this.rule_btn=new MyButton("c_rule_btn");
        this.addChild(this.rule_btn);
        this.rule_btn.changeSize(1.5,1.5);
        this.rule_btn.y=-60;
        this.rule_btn.addTouchEvent();
        this.rule_btn.addEventListener("click",this.add_rule_tips,this);

        //点击加入提示
        var tips=this.set_bit_center("c_join_icon");
        this.addChild(tips);
        tips.y=-13;
        //基础信息
        this.base_info_tips=new egret.TextField();
        this.addChild(this.base_info_tips);
        this.base_info_tips.width=bg.width;
        this.base_info_tips.size=16;
        this.base_info_tips.textAlign="center";
        this.base_info_tips.textColor=0x795B41;//颜色
        this.base_info_tips.y=10;
        this.base_info_tips.bold=true;
        this.base_info_tips.x=-bg.width/2;

        //规则弹出框
        this.rule_tips=new Tip_view("");
        this.addChild(this.rule_tips);
        this.rule_tips.visible=false;
    }
    //zwb:牌桌--更新玩家信息
    public update_info(model:Club_room_model){
        this.model=model;
        //更新玩家信息
        if(model.user_list)
        for(var i=0;i<4;i++){
            if(model.user_list[i]){
                this.head_list[i].update_head_url(model.user_list[i].headImg);
                this.player_off_arr[i].visible=false;//离线图片默认隐藏
                if(model.user_list[i].state!=1)this.player_off_arr[i].visible=true; //1 在线  2离线
            }else{
                this.head_list[i].update_head_url("");
                this.player_off_arr[i].visible=false;
            }
        }
        //更新房间信息
        var str1=this.model.circleNum+"圈";
        // var str2;//选择玩法
        this.base_info_tips.text=str1;
        //更新规则      zwb:丹阳专用
        var str2=this.model.huaType==1?"无花":"有花";
        var str3=this.model.chiType==2?"可以吃":"不可以吃";
        var str4;
        if(this.model.scoreType==1){
            str4="出冲大包";
        }else if(this.model.scoreType==2){
            str4="出冲包三家";
        }else if(this.model.scoreType==3){
            str4="陪冲";
        }else{
            str4="不出冲";
        }
        this.rule_tips.add_txt("房间:"+this.model.roomId+"\n"+str2+","+str3+","+str4,150,40);
        if(this.x<=Main.stageWidth/2){
             this.rule_tips.x=20+this.rule_tips.width/2;
        }else{
             this.rule_tips.x= -this.rule_tips.width/2-20;
        }
        this.rule_tips.y=-this.rule_tips.height-10;
    }
    //显示规则
    private add_rule_tips(){
        this.rule_tips.visible=!this.rule_tips.visible;
        // this.model=model;
        // var str="房间号:"+model.roomId;
        // this.rule_tips = new Tip_view(str);
        // this.addChild(this.rule_tips)
    }
    //加入房间申请
    private start_join_room(){
        if(!this.rule_tips.visible){
            var data={
                roomId:this.model.roomId,
                userId:this.CONST.USERID
            };
            this.v_to_v_dis_event(this.EVENT.club.join_room,data);
        }else{
            this.rule_tips.visible=false;
        }
    }
}