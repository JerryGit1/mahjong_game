/**
 * Created by JackerCao on 2018/4/20.
 * 代开列表;
 */

class Issue_popup extends Base_popup{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    private no_info_img;                        //没有战绩时，显示的图片;
    protected scroll_view:egret.ScrollView;     //滚动区域
    protected content:egret.Sprite = new egret.Sprite();
    protected button_type:string="list";        //列表和历史的状态--默认为列表状态;
    protected issue_list_arr;
    protected list_view:Issue_list_view;        //代开列表视图;
    protected history_view:Issue_history_view;  //代开历史视图;
    protected userId;
    protected cell_num:number=0;                //当前cell的数量;
    protected cell_num_text;                    //当前cell的数量文字;
    protected rule_btn:MyButton;                //代开规则;
    protected _tip_view;                        //规则视图;

    public constructor(userId){
        super(true,true);
        this.userId=userId;
        this.issue_list_arr=[];
        this.init_content();
    }

    private init_content(){
        this.add_center_bg("p_record_view_bg_png",1101,544);
        this.add_close_btn("h_Return_btn",{x:100,y:-20});
        this.open_ani();

        var cell_num_text=new egret.TextField();
        cell_num_text.size=18;
        cell_num_text.x=912;
        cell_num_text.y=0;
        this.center_sp.addChild(cell_num_text);
        this.cell_num_text=cell_num_text;

        //代开或者历史记录按钮;
        var issue_btn=new MyButton("h_replace_list_btn");
        issue_btn.x=Main.stageWidth/2;
        issue_btn.y=-24;
        issue_btn.addTouchEvent();
        issue_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.change_button_type,this);
        this.center_sp.addChild(issue_btn);

        //规则按钮;
        var rule_btn=new MyButton("h_rule_btn");
        rule_btn.x=888;
        rule_btn.y=6;
        rule_btn.changeSize(0.6,0.6);
        rule_btn.addTouchEvent();
        rule_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rule_back,this);
        this.center_sp.addChild(rule_btn);
        this.rule_btn=rule_btn;


        this.list_view=new Issue_list_view();
        this.list_view.v_to_v_add_event(this.EVENT.popup.delete_user,this.delete_user,this);                    //踢人;
        this.list_view.v_to_v_add_event(this.EVENT.popup.dissolution_room,this.dissolution_room,this);          //解散房间;
        this.list_view.v_to_v_add_event(this.EVENT.popup.qz_dissolution_room,this.qz_dissolution_room,this);    //强制解散房间;
        this.list_view.v_to_v_add_event(this.EVENT.popup.share,this.share,this);                                //邀请;
        this.list_view.v_to_v_add_event(this.EVENT.popup.get_history_info,this.dis_get_issue_history_info,this);//获取代开历史页数的数据;
        this.center_sp.addChild(this.list_view);


        this.history_view=new Issue_history_view();
        this.history_view.v_to_v_add_event(this.EVENT.popup.share,this.share,this);
        this.history_view.v_to_v_add_event(this.EVENT.popup.play_back_info,this.play_back_info,this);
        this.center_sp.addChild(this.history_view);
        this.history_view.visible=false;
    }

    //更新列表界面数据;
    public updata_list_cell(data){
        this.cell_num=data.length;
        //this.cell_num_text.text="当前房间数量:"+this.cell_num+"/10";

        this.cell_num_text.textFlow = new egret.HtmlTextParser().parser("<font>当前房间数量</font>  <font color='#8dff73'>"+this.cell_num+"</font> <font>/10</font>");
        this.list_view.update_list(data);
    }
    
    //更新列表cell数据;
    public update_list_room_data(info){
        this.list_view.update_cell_room_data(info);
    }

    public updata_history_cell(data){
        if(data.infos){
            this.history_view.update_list(data);
        }
    }

    //改变button状态;
    private change_button_type(e){
        var btn=e.currentTarget;
        if(this.button_type=="list"){           //切换为代开历史;
            this.button_type="history";
            btn.changTexture("h_replace_history_btn");
            this.dis_get_issue_history_info(1);
            this.list_view.visible=false;
            this.history_view.visible=true;
            this.cell_num_text.visible=false;
            this.rule_btn.visible=false;
            if(this._tip_view){
                this._tip_view.visible=false;
            }
        }else {                                 //切换为代开记录;
            this.button_type="list";
            btn.changTexture("h_replace_list_btn");
            this.list_view.visible=true;
            this.history_view.visible=false;
            this.cell_num_text.visible=true;
            this.rule_btn.visible=true;
            if(this._tip_view){
                this._tip_view.visible=true;
            }
        }
    }

    //派发获取代开历史第num页;
    private dis_get_issue_history_info(num){
        var  data={};
        data["userId"]=this.userId;
        data["page"]=num;
        this.v_to_v_dis_event(this.EVENT.popup.issue_history,data);
    }

    //代开删除用户;
    private delete_user(data){
        this.v_to_v_dis_event(this.EVENT.popup.delete_user,data);
    }

    //代开解散房间;
    private dissolution_room(data){
        this.v_to_v_dis_event(this.EVENT.popup.dissolution_room,data);
    }

    //代开强制解散房间;
    private qz_dissolution_room(data){
        this.v_to_v_dis_event(this.EVENT.popup.qz_dissolution_room,data);
    }

    //邀请;
    private share(){
        this.v_to_v_dis_event(this.EVENT.popup.share);
    }

    private play_back_info(info){
        this.v_to_v_dis_event(this.EVENT.popup.play_back_info,info);
    }
    
    private rule_back(){

        if(this._tip_view){
            this.center_sp.removeChild(this._tip_view);
            this._tip_view=null;
        }else {
            var str="1.账号内房卡数达到100张才能使用代开功能\n2.最多只能同时代开10个房间\n3.未开局的牌局会在创建40分钟以后自动解散，已开始的牌局不受影响";
            this._tip_view=new Tip_view(str,280);
            this._tip_view.x=900;
            this._tip_view.y=30;
            this.center_sp.addChild(this._tip_view);
        }

    }


}