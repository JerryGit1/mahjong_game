/**
 * Created by zwb on 2018/5/15.
 * 俱乐部今日战绩-单条
 */
class Club_achievement_single_today extends Base_view{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected cell_info;
    protected content:egret.Sprite = new egret.Sprite();

    public constructor(info,userId){
        super();
        this.cell_info=info;
        this.init_content(info,userId);
    }
    private init_content(info,userId){
        var achievement_bg = new egret.Bitmap(RES.getRes("p_record_bg"));
        this.addChild(achievement_bg);

        //时间
        var time  = new egret.TextField();
        time.size = 16;
        time.textAlign = "left";
        time.verticalAlign = "middle";
        time.text =this.getTime(Number(info.createTime));
        time.x = 10;
        time.y = 8;
        this.addChild(time);


        // 清空显示区域
        var len=this.content.numChildren;
        for(var j=0;j<len;j++){
            this.content.removeChildAt(0);
        }
        var user_info=JSON.parse(info.userInfo);
        var player_info=[];     //用于存放另外3个人的数据;
        for(let i=0;i<user_info.length;i++){
            if(user_info[i].userId==userId){
                //+或者-;
                let math_url="";
                if(user_info[i].score!=0){
                    math_url=user_info[i].score>=0?"+":"";
                }
                let achievement_score=new egret.BitmapText();
                achievement_score.font=RES.getRes("h_record_score_fnt");
                achievement_score.textAlign="center";
                achievement_score.verticalAlign="middle";
                achievement_score.text=math_url+user_info[i].score;
                achievement_score.anchorOffsetX=achievement_score.width/2;
                achievement_score.anchorOffsetY=achievement_score.height/2;
                achievement_score.x=this.width/2;
                achievement_score.y=80;
                this.addChild(achievement_score);
            }else {
                player_info.push(user_info[i]);
            }
        }

        //房间号;
        var roomId  = new egret.TextField();
        roomId.size = 16;
        roomId.textAlign = "left";
        roomId.verticalAlign = "middle";
        roomId.text ="房间号:"+info.roomId;
        roomId.x = 10;
        roomId.y = 138;
        this.addChild(roomId);

        //牌桌玩家数据;
        for(let i=0;i<player_info.length;i++){
            //玩家昵称;
            var playerName=new egret.TextField();
            playerName.text=(decodeURIComponent(player_info[i].userName));
            playerName.size=18;
            playerName.x=80;
            playerName.y=165+i*70;
            playerName.textColor=0x000000;
            this.addChild(playerName);

            //玩家ID;
            var playerId=new egret.TextField();
            playerId.text="ID:"+player_info[i].userId;
            playerId.size=18;
            playerId.x=80;
            playerId.y=200+i*70;
            playerId.textColor=0x000000;
            this.addChild(playerId);

            //+或者-;
            var math_player="";
            if(player_info[i].score!=0){
                math_player=player_info[i].score>0?"+":"";
            }
            var player_score=new egret.BitmapText();
            player_score.font=RES.getRes("p_player_score_fnt");
            player_score.textAlign="center";
            player_score.verticalAlign="middle";
            player_score.text=math_player+player_info[i].score;
            player_score.x=200;
            player_score.y=180+i*70;
            player_score.scaleX=player_score.scaleY=0.8;
            this.addChild(player_score);
        }

        //回放按钮;
        var playback_btn=new MyButton("c_playback_btn");
        playback_btn.x=166;
        playback_btn.y=408;
        playback_btn.addTouchEvent();
        playback_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.record_info,this);
        this.addChild(playback_btn);

        //分享按钮;
        var share_btn=new MyButton("c_share_btn");
        share_btn.x=296;
        share_btn.y=57;
        share_btn.addTouchEvent();
        share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.share_back,this);
        this.addChild(share_btn);
    }

    //牌桌回放;
    private record_info(){
        var str=this.CONST.get_game_rule(this.cell_info);
        var name_json=JSON.parse(this.cell_info.userInfo);
        // var name_json=this.cell_info.userInfo;
        var names=[];
        var scores=[];
        var userIds=[];
        for(let i=0;i<name_json.length;i++){
            names.push(name_json[i].userName);
            scores.push(name_json[i].score);
            userIds.push(name_json[i].userId);
        }
        var circleNum=this.cell_info.circleNum;
        var roomId=this.cell_info.roomId;
        var time=this.cell_info.createTime;
        var info= this.cell_info.xiaoJuInfo;
        var backUrl=this.cell_info.backUrl;
        var data= {rule_str:str,player_name:names,player_score:scores,player_userId:userIds,cell_info:info,circleNum:circleNum,roomId:roomId,time:time,backUrl:backUrl};
        this.v_to_v_dis_event(this.EVENT.popup.play_back_info,data);
    }

    //分享按钮回调;
    private share_back(e){
        var user_list = JSON.parse(this.cell_info.userInfo);
        // var user_list = this.cell_info.userInfo;
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

    // 格式化时间
    protected getTime(date){
        let dateTime = new Date(date);
        let year = dateTime.getFullYear();
        let month = this.addPreZero(dateTime.getMonth()+1);
        let day = this.addPreZero(dateTime.getDate());

        let hours = this.addPreZero(dateTime.getHours());
        let minutes = this.addPreZero(dateTime.getMinutes());
        let seconds = this.addPreZero(dateTime.getSeconds());

        let createTime = year + "-" + month + "-" + day + "   " + hours + ":" + minutes + ":" + seconds;
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
