/**
 * Created by 周鹏斌大王 on 2018-01-27.
 */
class Chat_popup extends Base_popup{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected w=0;
    protected h=0;
    protected layer_list_view:Chat_layer_view;
    protected btn_list_view:Chat_btn_list_view;//切换按钮
    public constructor(){
        super(true,true);
        this.set_click_bg_apha();
        this.init_view();
    }
    private init_view(){
        //渲染背景图
        this.add_bg();
        //渲染层
        this.layer_list_view=new Chat_layer_view(this.w,this.h);
        //播放
        this.layer_list_view.v_to_v_add_event(this.EVENT.chat.click_sponsor_action,this.play_ani,this);
        this.center_sp.addChild(this.layer_list_view);

        this.add_btn();

        // //渲染切换按钮
        //
        // this.btn_list_view=new Chat_btn_list_view();
        // //this.btn_list_view.v_to_v_add_event(this.EVENT.btn.click_sure,this.cut_layer,this);
        // this.btn_list_view.init_view(this.w,this.h);
        // this.btn_list_view.x=this.w-28;
        // this.layer_list_view.x=this.w/2-this.layer_list_view.width/2-30;
        // this.center_sp.addChild(this.btn_list_view);
    }
    private add_bg(){
        var bg:egret.Bitmap = this.set_bit_center("chat_bg");
        this.w=bg.width;
        this.h=bg.height;
        bg.anchorOffsetX=bg.anchorOffsetY=0;
        this.center_sp.addChild(bg);
        this.center_sp.anchorOffsetX=this.w;
        this.center_sp.anchorOffsetY=this.h;
        this.center_sp.x=Main.stageWidth;//-90;
        this.center_sp.y=Main.stageHeight-20;
        this.center_sp.scaleX=this.center_sp.scaleY=.1;
        this.center_sp.alpha=0;
        egret.Tween.get(this.center_sp).to({scaleX:1,scaleY:1,alpha:1},400,egret.Ease.backOut);
    }

    private add_btn(){
        var btn = new MyButton("chat_btn_1");
        this.center_sp.addChild(btn);
        btn.x=btn.width/2+4;
        btn.y=btn.height/2+8;
        btn["str"]="text";
        btn.graphics.beginFill(0x00ff00,0);
        btn.graphics.drawRect(-btn.width/2,-btn.height/2,btn.width,btn.height);
        btn.addTouchEvent();
        btn.addEventListener("click",this.set_btn,this);
    }

    private set_btn(e){
        var btn:MyButton=e.currentTarget;
        var tab=btn["str"];
        if(tab=="text"){
            btn["str"]="face";
            btn.changTexture("chat_btn_2");
            this.cut_layer(2);
        }else{
            btn["str"]="text";
            //显示当前
            btn.changTexture("chat_btn_1");
            this.cut_layer(1);
        }
    }

    private cut_layer(page){
        this.layer_list_view.cut_layer(page);
    }
    //播放
    protected play_ani(info){
        this.v_to_v_dis_event(this.EVENT.chat.send_chat_status,info);
        this.dispatchEvent(new egret.Event("close"));
    }
}