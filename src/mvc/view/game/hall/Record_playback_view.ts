/**
 * Created by JackerCao on 2018/5/10.
 */

//战绩回放cell;
class Record_playback_view extends Base_view{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    public cell_index;
    private cell_data;
    private tip_view;
    public constructor(data,cell_index){
        super();
        this.cell_data=data;
        this.cell_index=cell_index+1;
        this.init_content();
    }

    private init_content(){

        var cell_bg=new egret.Bitmap(RES.getRes("h_playback_bg"));
        cell_bg.x=10;
        this.addChild(cell_bg);

        //序列号;
        var issuer_index=new egret.BitmapText();
        issuer_index.font=RES.getRes("h_issue_number_fnt");
        issuer_index.textAlign="center";
        issuer_index.verticalAlign="middle";
        issuer_index.text=this.cell_index;
        issuer_index.anchorOffsetX=issuer_index.width/2;
        issuer_index.anchorOffsetY=issuer_index.height/2;
        issuer_index.x=65;
        issuer_index.y=65;
        this.addChild(issuer_index);

        1
        //房间号;
        var room_id_text=new egret.TextField();
        room_id_text.text="房间号:"+this.cell_data.roomId;
        room_id_text.size=24;
        room_id_text.textColor=0x8b6141;
        room_id_text.x=122;
        room_id_text.y=52;
        this.addChild(room_id_text);

        //名字 分数;
        for(var i=0;i<4;i++){
            var name_text=new egret.TextField();
            name_text.text= Base_user_model.get_char(this.cell_data.name[i]);
            name_text.x=Math.floor(i%2)*200+328;
            name_text.y=Math.floor(i/2)*55+20;
            name_text.textColor=0x8b6141;
            name_text.size=20;
            this.addChild(name_text);

            var score_text=new egret.TextField();
            score_text.text=this.cell_data.cell_data[i]+"分";
            score_text.x=name_text.x+100;
            score_text.y=name_text.y;
            score_text.textColor=0x8b6141;
            score_text.size=20;
            this.addChild(score_text);
        }

        //规则;
        var rule_btn=new MyButton("h_rule_btn");
        rule_btn.x=730;
        rule_btn.y=cell_bg.height/2;
        rule_btn.addTouchEvent();
        rule_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rule_back_func,this);
        this.addChild(rule_btn);

        //回放;
        var player_back=new MyButton("h_playback_btn");
        player_back.x=836;
        player_back.y=cell_bg.height/2;
        player_back.addTouchEvent();
        player_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.player_back_func,this);
        this.addChild(player_back);

        //分享;
        var share_btn=new MyButton("h_playback_share_btn");
        share_btn.x=970;
        share_btn.y=cell_bg.height/2;
        share_btn.addTouchEvent();
        share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.share_back_func,this);
        this.addChild(share_btn);
        
    }

    //规则回调;
    private rule_back_func(){
        if(this.tip_view){
            this.removeChild(this.tip_view);
            this.tip_view=null;
        }else {
            this.tip_view=new Tip_view(this.cell_data.rule);
            this.tip_view.x=682;
            this.tip_view.y=6;
            this.addChild(this.tip_view);
        }
    }

    //回放;
    private player_back_func(){
        var room_time= this.CONST.formatting_timestamp(this.cell_data.time,2);
        var room_id=this.cell_data.roomId;
        var index=this.cell_index;
        var url=this.cell_data.backUrl+room_time+"-"+room_id+"-"+index+".txt";
        //var url="resource/辅助文件/20180508184006-106034-1.txt";
        var data={file_url:url,share_user_id:this.CONST.USERID};
        this.v_to_v_dis_event(this.EVENT.player_back.show_player,data);
    }

    //分享;
    private share_back_func(){
        /*
          *  roomId:房间ID
         * number:第几局
         * timer:当前时间
         * url:整个路劲
        * */

        var now_time=this.CONST.formatting_timestamp(null,1);

        var room_time= this.CONST.formatting_timestamp(this.cell_data.time,2);
        var room_id=this.cell_data.roomId;
        var index=this.cell_index;
        //"resource/辅助文件/20180508184006-106034-1.txt",
        var url=this.cell_data.backUrl+room_time+"-"+room_id+"-"+index+".txt";
        Weixin_JSSDK_model.getInstance().playbackShare(room_id,index,now_time,url,this.CONST.USERNAME,this.CONST.USERID);
        this.v_to_v_dis_event(this.EVENT.popup.share);
    }
}