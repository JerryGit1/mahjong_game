/**
 * Created by JackerCao on 2018/4/20.
 */

class Playback_record_popup extends Base_popup{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected scroll_view:egret.ScrollView;     //滚动区域
    protected content:egret.Sprite = new egret.Sprite();
    private playback_record_data;
    public constructor(data){
        super(true,true);
        this.init_view();
        this.init_content(data);
        this.playback_record_data=data;
    }

    private init_view(){
        this.add_center_bg("p_record_view_bg_png",1100,544);
        this.add_img_title("h_playback_title",{x:550,y:-20});
        this.add_close_btn("h_Return_btn",{x:40,y:-20});
        this.open_ani();

        //提示;
        var prompt_text=new egret.TextField();
        prompt_text.text="友情提示:回放录像保存3天\n战绩记录保存3天";
        prompt_text.textAlign = "right";
        prompt_text.size=20;
        prompt_text.x=850;
        prompt_text.y=-30;
        this.center_sp.addChild(prompt_text);
    }

    private init_content(data){
        this.scroll_view = new egret.ScrollView();
        this.scroll_view.width = 1050;
        this.scroll_view.height= 450;
        this.scroll_view.verticalScrollPolicy = "on";
        this.scroll_view.horizontalScrollPolicy = "off";
        this.scroll_view.setContent(this.content);
        this.scroll_view.y=60;
        this.scroll_view.x=20;
        this.center_sp.addChild(this.scroll_view);
        this.add_table_cell(data);
    }

    private add_table_cell(data){
        var data_arr=JSON.parse(data.cell_info);
        for(var i=0;i<data_arr.length;i++){
            let rule_str=data.rule_str;
            let names=data.player_name;
            let info=data_arr[i];
            var cell_data={rule:rule_str,name:names,cell_data:info,roomId:data.roomId,time:data.time,backUrl:data.backUrl};
            var cell=new Record_playback_view(cell_data,i);
            cell.v_to_v_add_event(this.EVENT.player_back.show_player,this.show_player,this);
            cell.v_to_v_add_event(this.EVENT.popup.share,this.show_share_view,this);
            cell.y=150*i;
            this.content.addChild(cell);
        }
    }

    private show_player(data){
        this.v_to_v_dis_event(this.EVENT.player_back.show_player,data);
    }

    //跳出分享;
    private show_share_view(){
        this.v_to_v_dis_event(this.EVENT.popup.share);
    }
}