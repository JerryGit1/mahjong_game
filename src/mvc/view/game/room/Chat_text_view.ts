/**
 * Created by JackerCao on 2018/5/4.
 */

//聊天的文组视图;
class Chat_text_view extends Base_view{
    protected scroll_view:egret.ScrollView;     //滚动区域
    protected content:egret.Sprite = new egret.Sprite();
    public constructor(){
        super();
        //初始化内容;
        this.init_content();

        //初始化文字内容;
        this.init_chat_text();
    }
    //初始化内容;
    private init_content(){
        this.scroll_view = new egret.ScrollView();
        this.scroll_view.width = 420;
        this.scroll_view.height= 280;
        this.scroll_view.verticalScrollPolicy = "on";
        this.scroll_view.horizontalScrollPolicy = "off";
        this.scroll_view.setContent(this.content);
        // this.scroll_view.x=30;
         this.scroll_view.y=10;
        this.content.y=-10;
        this.addChild(this.scroll_view);
    }

    private init_chat_text(){
        for(let i=0;i<6;i++){
            let text_str="chat_text_"+(i+1);
            let text = new egret.Bitmap(RES.getRes(text_str));
            text["index"]=i;
            text.x=20;
            text.y=28+56*i;
            text.touchEnabled=true;
            text.addEventListener(egret.TouchEvent.TOUCH_TAP,this.text_touch_back,this)
            this.content.addChild(text);
        }
    }

    private text_touch_back(e){
        var text=e.currentTarget;
    }
}
