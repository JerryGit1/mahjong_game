/**
 * Created by zwb on 2018-05-15.
 * 申请离开俱乐部
 */
class Club_request_leave_popup extends Base_popup{
    public EVENT:Game_club_event_model=new Game_club_event_model();//事件常量
    private sure_btn:MyButton;//确认按钮
    private cancel_btn:MyButton;//取消按钮
    public constructor(data){
        super();
        //弹框
        this.add_center_bg("c_popup_bg",762,437);
        //标题
        this.add_img_title("l_prompt_title",{x:385,y:-5});
        this.open_ani();

        //提示语
        var str="确认申请离开 <font color='#ff7f00'>"+data.clubName+"</font>?";
        this.addText(550,280,str);

        //按钮[确认退出]
        this.sure_btn=new MyButton("c_confirm_quit_btn");
        this.center_sp.addChild(this.sure_btn);
        this.sure_btn.x=244;
        this.sure_btn.y=326;
        this.sure_btn.addTouchEvent();
        this.sure_btn.addEventListener("click",function(){
            this.v_to_v_dis_event(this.EVENT.base.club_request_leave_popup,this);//申请离开-[确定]按钮-事件派发
            this.close_click();//清除弹框
        }.bind(this),this);

        //按钮[我再想想]
        this.cancel_btn=new MyButton("l_think_btn");
        this.center_sp.addChild(this.cancel_btn);
        this.cancel_btn.x=this.sure_btn.x+this.cancel_btn.width*2-52;
        this.cancel_btn.y=this.sure_btn.y;
        this.cancel_btn.addTouchEvent();
        this.cancel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close_click,this);
    }

    // 通用文本
    protected addText(w,h,str){
        var tt = new egret.TextField();
        tt.touchEnabled=true;
        tt.textColor = 0x6A665B;
        tt.textAlign = "center";
        tt.lineSpacing=10;
        tt.width=w*.75;
        tt.height=h*.8;
        tt.multiline = true;
        tt.verticalAlign = "middle";
        tt.fontFamily = "微软雅黑";
        tt.size = 30;
        tt.x = w*.32;
        tt.y = h*.32;
        tt.textFlow = (new egret.HtmlTextParser()).parse(str);
        this.center_sp.addChild(tt);
        return tt;
    }

    public clear(){
        // this.cancel_btn.clear();
        // this.cancel_btn.removeEventListener("click",this.close_popup_view,this);
        super.clear();
    }
}
