/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
//解散房间

class Dissolve_room_popup extends Base_popup{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    public popup_name:string="dissolve_room_popup";
    private model:Dissolve_room_model;
    private agreeBtn:MyButton;      //同意解散;
    private disAgreeBtn:MyButton;   //拒绝解散;
    private user_head_list;         //用户头像数组;
    private user_name_list;         //用户名字数组;
    private title_str;              //发起人昵称;
    protected tipTxt;               // 300s无操作自动解散房间
    protected is_diss_view=false;   //是否已经退出房间;
    public constructor(dis_model) {
        super(true,false);
        this.model=dis_model;
        //初始化视图;
        this.init_view();
        //初始化内容;
        this.init_content();
        this.addTip();
        this.countdown();
        this.user_head_list=[];
        this.user_name_list=[];
    }
    //初始化视图;
    private init_view(){
        this.add_center_bg("p_user_view_Bg_png",701,402);
        this.open_ani();

        //同意解散
        this.agreeBtn = new MyButton("g_agreeBtn");
        this.agreeBtn.x = 500;
        this.agreeBtn.y = 320;
        this.agreeBtn.addTouchEvent();
        this.agreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.agreeBtnClick,this);
        this.center_sp.addChild(this.agreeBtn);

        //拒绝解散
        this.disAgreeBtn = new MyButton("g_disagreeBtn");
        this.disAgreeBtn.x = 240;
        this.disAgreeBtn.y = 320;
        this.disAgreeBtn.addTouchEvent();
        this.disAgreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.disAgreeBtnClick,this);
        this.center_sp.addChild(this.disAgreeBtn);
    }

    //初始化内容;
    private init_content(){
        
    }
    public update_view(dis_model:Dissolve_room_model){
        this.model=dis_model;
        //清理一遍用户数据
        this.clear_user();
        //发起人的信息
        this.title_str= "<font color='#ff0000'>"+"["+this.model.respond_user_name+"]"+"</font>发起投票解散对局";//投票解散对局
        this.add_txt_title(this.title_str,{x:350,y:40});

        //同意解散房间的人数;
        var  agree_player_num=0;        //同意解散人数;
        var  refuse_player_num=0;       //拒绝解散人数;
        var list=this.model.user_list_model;
        for(let i=0;i<list.length;i++){
            var dis_user_model=this.model.user_list_model[i];
            if(dis_user_model.userId==this.CONST.USERID&&dis_user_model.agree!=0){
                this.setButtonEnabled();
            }
            //用户头像;
            var player_head=new User_head_view();
            player_head.create_rect_head(80,80);
            player_head.update_head_url(dis_user_model.userImg);
            player_head.y=140;
            player_head.x=150+150*i;
            this.center_sp.addChild(player_head);
            this.user_head_list.push(player_head);

            //昵称;
            var player_name=new egret.TextField();
            player_name.text=dis_user_model.userName;
            player_name.size=20;
            player_name.x=player_head.x-player_name.width/2;
            player_name.y=player_head.y+40;
            player_name.textColor=0xCB6F01;
            player_name.textAlign="center";
            player_name.verticalAlign="middle";
            this.center_sp.addChild(player_name);
            this.user_name_list.push(player_name);

            if(dis_user_model.agree==1){
                agree_player_num++;
                //当有人同意时，显示同意的标记;
                var agree_img=new egret.Bitmap(RES.getRes("g_agreeSign"));
                agree_img.x=player_name.x+player_name.width/2;
                agree_img.y=player_name.y-player_name.height/2;
                this.center_sp.addChild(agree_img);
            }else if(dis_user_model.agree==2){
                //有人拒绝了
                refuse_player_num++;
                var agree_img=new egret.Bitmap(RES.getRes("g_disagreeSign"));
                agree_img.x=player_name.x+player_name.width/2;
                agree_img.y=player_name.y-player_name.height/2;
                
                this.center_sp.addChild(agree_img);
            }
            //加上自己，同意人数达到3，就解散房间;
            if(agree_player_num>=3){
                //当有2个人同意时，就解散房间
                //停顿1秒
                this.setButtonEnabled();
                setTimeout(function () {
                    this.timerComFunc();
                    //发起大结算
                    if(this)this.v_to_v_dis_event(this.EVENT.popup.sponsor_DJS);
                    if(this)this.close_click();
                }.bind(this),1000);
                this.v_to_v_dis_event(this.EVENT.popup.float_alert,{str:"解散房间成功"});
            }else{
                //有2个拒绝的，就解散失败;
                if(refuse_player_num>=2){
                    this.setButtonEnabled();
                    setTimeout(function () {
                        if(!this.is_diss_view){
                            this.is_diss_view=true;
                            if(this)this.close_click();
                        }
                    }.bind(this),1000);
                    this.v_to_v_dis_event(this.EVENT.popup.float_alert,{str:"解散房间失败"});
                }
            }
        }
    }


    protected addTip(){
        //提示
        var tipInfo  = new egret.TextField();
        tipInfo.size = 19;
        tipInfo.textColor = 0x67615c;
        tipInfo.textAlign = "center";
        tipInfo.verticalAlign = "middle";
        tipInfo.fontFamily = "微软雅黑";
        tipInfo.text = "三人同意即可解散，解散后将根据目前的分进行最终结算";
        tipInfo.x = this.center_sp.width/2-tipInfo.width/2;
        tipInfo.y = 230;
        this.center_sp.addChild(tipInfo);

        //倒计时
        var tipTxt=new egret.TextField();
        tipTxt.size=22;
        tipTxt.textColor=0xfafafa;
        tipTxt.multiline=true;
        tipTxt.textAlign="center";
        tipTxt.verticalAlign = "middle";
        tipTxt.width = 600;
        tipTxt.x=45;
        tipTxt.y=270;
        tipTxt.fontFamily="微软雅黑";

        this.test_point(tipTxt);

        this.tipTxt=tipTxt;
        this.center_sp.addChild(tipTxt);
        this.onTimer()
    }

    // 倒计时
    protected timer:egret.Timer;
    protected countdown(){
        this.timer = new egret.Timer(1000,301);
        this.timer.start();
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
    }
    protected onTimer(){
        var starTime = this.model.dissolveTime;
        var nowTime = (new Date()).getTime();
        var time = Math.floor(((starTime+300000) - nowTime)/1000);
        time--;
        if(time>=0){
            this.tipTxt.textFlow = new egret.HtmlTextParser().parser("<font color='0x67615c'>剩余</font>  <font color='#dc143c'>"+time+"</font> <font color='0x67615c'>s</font>");
        }
    }
    protected timerComFunc(){
        this.timer.stop();
    }

    /*同意*/
    protected agreeBtnClick(){
        this.setButtonEnabled();
        this.v_to_v_dis_event(this.EVENT.dissolution_room.is_agree_diss_room,1);
    }
    /*拒绝*/
    protected disAgreeBtnClick(){
        this.setButtonEnabled();
        this.v_to_v_dis_event(this.EVENT.dissolution_room.is_agree_diss_room,2);
    }

    /*设置按钮不可用*/
    protected setButtonEnabled(){
        this.agreeBtn.visible= false;
        //this.agreeBtn.changTexture("g_agree1");
        this.disAgreeBtn.visible = false;
        //this.disAgreeBtn.changTexture("g_dissagree1");
    }
    private clear_user(){

        for(let h=0;h<this.user_head_list.length;h++){
            this.center_sp.removeChild(this.user_head_list[h]);
            this.user_head_list[h]=null;
        }
        this.user_head_list=[];

        for(let n=0;n<this.user_name_list.length;n++){
            this.center_sp.removeChild(this.user_name_list[n]);
            this.user_name_list[n]=null;
        }
        this.user_name_list=[];
    }
}