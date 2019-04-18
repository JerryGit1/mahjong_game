/**
 * Created by JackerCao on 2018/4/20.
 */

class Issue_cell_view extends Base_view{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected cell_data;                    //当前cell的数据;
    protected tipview;                      //规则图;
    public cell_room_id;                    //当前cell的房间号码;
    private invitation_btn:MyButton;        //邀请按钮;
    private opening_img:egret.Bitmap;       //已开局图片;
    private qz_dissolution_btn:MyButton;    //强制解散按钮;
    private dissolution_btn:MyButton;       //解散按钮;
    private diss_player_arr;                //踢人按钮数组;
    private player_head_arr;                //玩家头像数组;
    private player_off_arr;                 //玩家离线图片数组;

    public constructor(data,num){
        super();
        this.cell_data=data;
        this.cell_room_id=data.roomId;
        this.init_content(data,num);
    }
    private init_content(data,num){
        var cell_bg=new egret.Bitmap(RES.getRes("h_replace_bg"));
        this.addChild(cell_bg);

        //序列号;
        var issuer_index=new egret.BitmapText();
        issuer_index.font=RES.getRes("h_issue_number_fnt");
        issuer_index.textAlign="center";
        issuer_index.verticalAlign="middle";
        issuer_index.text=(num+1);
        issuer_index.anchorOffsetX=issuer_index.width/2;
        issuer_index.anchorOffsetY=issuer_index.height/2;
        issuer_index.x=70;
        issuer_index.y=70;
        this.addChild(issuer_index);

        //房间ID;
        var data_roomid=new egret.TextField();
        data_roomid.text="房间号:"+data.roomId;
        data_roomid.size=16;
        data_roomid.x=150;
        data_roomid.y=10;
        this.addChild(data_roomid);

        var fangkaNum=0;
        if(data.circleNum==2){
            fangkaNum=4;
        }else if(data.circleNum==4){
            fangkaNum=6;
        }else if(data.circleNum==8){
            fangkaNum=12;
        }
        //房卡;
        var data_score=new egret.TextField();
        data_score.text="房卡:"+fangkaNum;
        data_score.size=16;
        data_score.x=380;
        data_score.y=10;
        this.addChild(data_score);

        //圈数;
        var data_circleNum=new egret.TextField();
        data_circleNum.text="圈数:"+data.circleNum;
        data_circleNum.size=16;
        data_circleNum.x=550;
        data_circleNum.y=10;
        this.addChild(data_circleNum);


        //创建时间;
        var data_time=new egret.TextField();
        data_time.size=16;
        data_time.text=this.CONST.formatting_timestamp(data.createTime,1);
        data_time.x=800;
        data_time.y=10;
        data_time.textColor=0x4d2f18;
        this.addChild(data_time);

        this.diss_player_arr=[];
        this.player_head_arr=[];
        this.player_off_arr=[];
        for(let j=0;j<4;j++){
            if(data.userInfo[j]&&data.userInfo[j].userId){
                //存储用户信息;
                var player_spite=new egret.Sprite();
                this.addChild(player_spite);

                //用户头像;
                var player_head=new User_head_view();
                player_head.create_rect_head(80,80);
                player_head.update_head_url(data.userInfo[j].userImg);
                player_head.x=200+j*120;
                player_head.y=76;
                this.addChild(player_head);
                this.player_head_arr.push(player_head);

                //离线状态图片;
                var player_off_img=new egret.Bitmap(RES.getRes("l_off_line_img"));
                player_off_img.anchorOffsetX=player_off_img.width/2;
                player_off_img.anchorOffsetY=player_off_img.height/2;
                player_off_img.x=player_head.x;
                player_off_img.y=player_head.y;
                this.addChild(player_off_img);
                this.player_off_arr.push(player_off_img);
                if(data.userInfo[j].state==2){            //离线状态;
                    player_off_img.visible=true;
                }else if(data.userInfo[j].state==1){      //在线状态;
                    player_off_img.visible=false;
                }

                //用户昵称;
                var player_name=new egret.TextField();
                player_name.text=Base_user_model.get_char(data.userInfo[j].userName);
                player_name.size=14;
                player_name.textAlign="center";
                player_name.verticalAlign="middle";
                player_name.textColor=0x995543;
                player_name.x=player_head.x-player_name.width/2;
                player_name.y=120;
                this.addChild(player_name);

                //踢人按钮;
                var delete_player_btn=new MyButton("h_kicking_btn");
                delete_player_btn.x=player_head.x+player_head.width/2-4;
                delete_player_btn.y=player_head.y-player_head.height/2+6;
                delete_player_btn["userId"]=data.userInfo[j].userId;
                delete_player_btn["userName"] = data.userInfo[j].userName;
                delete_player_btn["roomId"] = data.roomId;
                delete_player_btn.addTouchEvent();
                delete_player_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.delete_player_back,this);
                this.addChild(delete_player_btn);
                this.diss_player_arr.push(delete_player_btn);
            }else {
                var head_bg=new egret.Bitmap(RES.getRes("h_head_bg"));
                head_bg.x=200+j*120-head_bg.width/2;
                head_bg.y=76-head_bg.height/2;
                this.addChild(head_bg);
            }
        }
        //规格按钮;
        var rule_btn=new MyButton("h_rule_btn");
        rule_btn.x=650;
        rule_btn.y=86;
        this.addChild(rule_btn);
        rule_btn.addTouchEvent();
        rule_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rule_back,this);

        //邀请;
        var invitation_btn=new MyButton("h_invitation_btn");
        invitation_btn.x=760;
        invitation_btn.y=86;
        this.addChild(invitation_btn);
        invitation_btn.addTouchEvent();
        invitation_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.invitation_back,this);
        this.invitation_btn=invitation_btn;

        //解散;
        var dissolution_btn=new MyButton("h_dissolution_btn");
        dissolution_btn.x=890;
        dissolution_btn.y=86;
        this.addChild(dissolution_btn);
        dissolution_btn["roomId"]=data.roomId;
        dissolution_btn.addTouchEvent();
        dissolution_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.dissolution_back,this);
        this.dissolution_btn=dissolution_btn;

        //强制解散;
        var qz_dissolution_btn=new MyButton("h_force_dissolution_btn");
        qz_dissolution_btn.x=890;
        qz_dissolution_btn.y=86;
        qz_dissolution_btn["roomId"]=data.roomId;
        qz_dissolution_btn.visible=false;
        this.addChild(qz_dissolution_btn);
        qz_dissolution_btn.addTouchEvent();
        qz_dissolution_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.qz_dissolution_back,this);
        this.qz_dissolution_btn=qz_dissolution_btn;

        //已开局图片;
        var opening_img=new egret.Bitmap(RES.getRes("h_opening_icon"));
        opening_img.x=700;
        opening_img.y=46;
        opening_img.visible=false;
        this.addChild(opening_img);
        this.opening_img=opening_img;

        //如果不等于1，就是已经开局了;
        if(data.state!=1){
            this.room_star_game();
        }
    }

    //房间开局;
    public room_star_game(){
        this.opening_img.visible=true;
        this.qz_dissolution_btn.visible=true;
        this.dissolution_btn.visible=false;
        this.invitation_btn.visible=false;
        var length=this.diss_player_arr.length;
        if(length>0){
            for(let i=0;i<length;i++){
                this.diss_player_arr[i].visible=false;
            }
        }
    }

    //设置玩家是否是离线状态;
    public set_player_is_off_type(info){
        for(let i=0;i<this.cell_data.userInfo.length;i++){
            if(info.userId==this.cell_data.userInfo[i].userId){
                if(info.extraType==4){
                    this.player_off_arr[i].visible=true;
                }else if(info.extraType==5){
                    this.player_off_arr[i].visible=false;
                }
            }
        }
    }

    //踢人回调;
    private delete_player_back(e){
        var btn=e.currentTarget;
        var data = {"userName":btn.userName,"userId":btn.userId,"roomId":btn.roomId};
        this.v_to_v_dis_event(this.EVENT.popup.delete_user,data);
    }

    //规则回调;
    private rule_back(){

        var info=this.CONST.get_game_rule(this.cell_data);
        //规则图;
        if(this.tipview){
            this.removeChild(this.tipview);
            this.tipview=null;
        }else {
            this.tipview=new Tip_view(info);
            this.tipview.x=600;
            this.addChild(this.tipview);
        }
    }

    //邀请回调;
    private invitation_back(e){
        //当前cell数据;
        var data=this.cell_data;
        //规则;
        var rule=this.CONST.get_game_rule(data);
        //缺的人数;
        var last_num=4-data.userInfo.length;
        /*设置分享--丹阳特有-暂时不用合并*/
        Weixin_JSSDK_model.getInstance().gameShare(data.roomId,rule,last_num,this.CONST.USERNAME,"replace");
        this.v_to_v_dis_event(this.EVENT.popup.share);
    }

    //解散回调;
    private dissolution_back(e){
        var btn=e.currentTarget;
        this.v_to_v_dis_event(this.EVENT.popup.dissolution_room,btn.roomId);
    }

    //强制解散回调;
    private qz_dissolution_back(e){
        var btn=e.currentTarget;
        this.v_to_v_dis_event(this.EVENT.popup.qz_dissolution_room,btn.roomId);
    }


}