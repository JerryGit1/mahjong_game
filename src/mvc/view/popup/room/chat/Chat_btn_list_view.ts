/**
 * Created by 周鹏斌大王 on 2018-01-28.
 */
class Chat_btn_list_view extends Base_view{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    public constructor() {
        super();
    }
    public init_view(w,h){
        var btn = new MyButton("chat_btn_1");
        this.addChild(btn);
        btn.x=-w+60;
        btn["str"]="text";
        btn.y=btn.height/2+8;
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
        }else{
            btn["str"]="text";
            //显示当前
            btn.changTexture("chat_btn_1");
            //this.v_to_v_dis_event(this.EVENT.btn.click_sure,Number(i)+1);
        }
    }
    //销毁
    public clear(){
        super.clear();
    }
}