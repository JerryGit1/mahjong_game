/**
 * Created by JackerCao on 2018/4/26.
 */

class Issue_history_cell extends Base_view{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    private cell_info;
    private tipview:Tip_view;
    public constructor(data,num){
        super();
        this.cell_info=data;
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

        //获取服务器给的时间;
        var time=data.createTime;
        var cell_time=this.getTime(Number(time));
        //对战时间;
        var war_time=new egret.TextField();
        war_time.text="对战时间:"+cell_time;
        war_time.size=16;
        war_time.x=450;
        war_time.y=10;
        this.addChild(war_time);

        //玩家姓名和分数;
        var name_list=JSON.parse(data.userInfo);
        for(let i=0;i<name_list.length;i++){
            var user_name=new egret.TextField();
            user_name.text=Base_user_model.get_char(name_list[i].userName);
            user_name.size=24;
            user_name.textColor=0x995543;
            user_name.x=160+Math.floor(i%2)*240;
            user_name.y=50+Math.floor(i/2)*40;
            this.addChild(user_name);

            var user_score=new egret.TextField();
            user_score.text=name_list[i].score+"分";
            user_score.size=24;
            user_score.textColor=0x995543;
            user_score.x=user_name.x+130;
            user_score.y=user_name.y;
            this.addChild(user_score);
        }

        //规格按钮;
        var rule_btn=new MyButton("h_rule_btn");
        rule_btn.x=650;
        rule_btn.y=86;
        this.addChild(rule_btn);
        rule_btn.addTouchEvent();
        rule_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rule_back,this);

        //分享;
        var issue_share_btn=new MyButton("h_share_btn");
        issue_share_btn.x=760;
        issue_share_btn.y=86;
        this.addChild(issue_share_btn);
        issue_share_btn.addTouchEvent();
        issue_share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.issue_share_back,this);

        //记录;
        var issue_record_btn=new MyButton("h_playback_list_btn");
        issue_record_btn.x=890;
        issue_record_btn.y=86;
        this.addChild(issue_record_btn);
        issue_record_btn["roomId"]=data.roomId;
        issue_record_btn.addTouchEvent();
        issue_record_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.issue_record_back,this);
    }

    //分享回调;
    private issue_share_back(e){
        var user_list = JSON.parse(this.cell_info.userInfo);
        for(let i=0;i<user_list.length;i++){
            user_list[i].userName=Base_user_model.get_char(user_list[i].userName);
        }
        user_list.sort(function (a,b) {
            return b.score-a.score
        });
        /*设置分享*/
        Weixin_JSSDK_model.getInstance().settlementShare(this.cell_info.roomId,user_list);
        /*分享提示*/
        this.v_to_v_dis_event(this.EVENT.popup.share);
    }

    //规则按钮回调;
    private rule_back(){
        var str=this.CONST.get_game_rule(this.cell_info);
        //规则图;
        if(this.tipview){
            this.removeChild(this.tipview);
            this.tipview=null;
        }else {
            this.tipview=new Tip_view(str);
            this.tipview.x=600;
            this.addChild(this.tipview);
        }
    }

    //记录按钮回调;
    private issue_record_back(e){

        var str=this.CONST.get_game_rule(this.cell_info);
        var name_json=JSON.parse(this.cell_info.userInfo);
        var names=[];
        for(let i=0;i<name_json.length;i++){
            names.push(name_json[i].userName)
        }
        var roomId=this.cell_info.roomId;
        var time=this.cell_info.createTime;
        var info= this.cell_info.xiaoJuInfo;
        var backUrl=this.cell_info.backUrl;
        var data= {rule_str:str,player_name:names,cell_info:info,roomId:roomId,time:time,backUrl:backUrl};


        this.v_to_v_dis_event(this.EVENT.popup.play_back_info,data);
    }

    // 格式化时间
    protected getTime(date){
        let dateTime = new Date(date);
        let year = dateTime.getFullYear();
        let month = this.addPreZero(dateTime.getMonth()+1);
        let day = this.addPreZero(dateTime.getDate());

        let hours = this.addPreZero(dateTime.getHours());
        let minutes = this.addPreZero(dateTime.getMinutes());
        let seconds = this.addPreZero(dateTime.getSeconds());
        let createTime = year + "-" +month + "-" + day + "   " + hours + ":" + minutes+":"+seconds;
        return createTime;
    }
    // 补零方法
    protected addPreZero(num){
        if(num<10){
            return '0'+num;
        }else {
            return num;
        }
    }

}
