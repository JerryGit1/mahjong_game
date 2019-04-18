/**
 * Created by 周鹏斌大王 on 2018-01-28.
 */
class Chat_view extends Base_view{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected myscrollView:egret.ScrollView;
    protected messageSprite:egret.Sprite;
    protected view_list:Array<Base_view>=[];
    public c_type=1;
    public constructor(w,h){
        super();
        //实例化可滑动的显示数据框
        this.messageSprite=new egret.Sprite();
        this.addChild(this.messageSprite);

        this.myscrollView = new egret.ScrollView();
        this.myscrollView.setContent(this.messageSprite);
        this.myscrollView.horizontalScrollPolicy = "off";
        this.myscrollView.x=10;
        this.myscrollView.y=10;
        this.myscrollView.width=w-this.myscrollView.x*2;
        this.myscrollView.height=h-this.myscrollView.y*2;

        this.addChild(this.myscrollView);
        this.init_view(w,h);
    }
    protected init_view(w=0,h=0){

    }
    protected add_view(view:Base_view,idx=1){
        this.messageSprite.addChild(view);
        view.touchEnabled=true;
        view["idx"]=idx;
        view.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
        this.view_list.push(view);
    }
    protected create_one_chat_btn(btnStr:string):MyButton{
        var self = this;
        var chatBtn = new MyButton(btnStr);
        chatBtn.addTouchEvent();
        return chatBtn;
    }
    protected tap(e:egret.TouchEvent){
        this.v_to_v_dis_event(this.EVENT.chat.click_sponsor_action,{type:this.c_type,idx:e.currentTarget["idx"]});
    }

    public clear(){
        for(var i in this.view_list){
            this.view_list[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tap,this);
        }
        this.view_list=[];
        super.clear();
    }
}