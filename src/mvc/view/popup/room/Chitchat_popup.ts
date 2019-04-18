/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
//聊天

class Chitchat_popup extends Base_popup{
    protected  btn_type="chat_text";                //默认为文字状态；
    public constructor() {
        super(false,true);
        //初始化内容;
        this.init_content();
    }

    private init_content(){
        //背景;
        var chat_bg=new egret.Bitmap(RES.getRes("chat_bg"));
        chat_bg.x=Main.stageWidth-chat_bg.width;
        chat_bg.y=Main.stageHeight-chat_bg.height;
        this.center_sp.addChild(chat_bg);

        //按钮;
        var chat_btn=new MyButton("chat_btn_1");
        chat_btn.x=chat_bg.x+chat_btn.width/2+6;
        chat_btn.y=chat_bg.y+chat_btn.height/2+10;
        chat_btn.addTouchEvent();
        chat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.change_btn_type,this);
        this.center_sp.addChild(chat_btn);

        var text_view=new Chat_text_view();
        text_view.x=chat_bg.x+60;
        text_view.y=chat_bg.y;
        this.addChild(text_view);

        var chat_facr_view;

    }

    private change_btn_type(e){
        var btn=e.currentTarget;
        //文字状态;
        if(this.btn_type=="chat_text"){
            this.btn_type="chat_face";
            btn.changTexture("chat_btn_2");
        }else {
            this.btn_type="chat_text";
            btn.changTexture("chat_btn_1");
        }
    }

}