/**
 * Created by zwb on 2018/5/15.
 * 申请加入俱乐部
 */
class Club_request_join_popup extends Base_popup{

    private sure_btn:MyButton;//确认按钮
    private cancel_btn:MyButton;//取消按钮
    public constructor(model:Club_base_model){
        super();
        //弹框
        this.add_center_bg("p_popup_view_Bg_png",762,437);
        //标题
        this.add_img_title("l_prompt_title",{x:380,y:-5});
        this.open_ani();
        //提示语
        var str="\n\n\n<font color='#ff7f00'>您准备申请加入由"+String(decodeURIComponent(model.clubUserName))+"创建的"+String(decodeURIComponent(model.clubName))+"俱乐部吗?";
        str+="\n人数:"+model.allNums+"</font>";
        str+="\n\n\n\n注:每个人最多加入3个俱乐部";
        this.addText(810,496,str);

        //按钮[确定]
        this.sure_btn=new MyButton("l_confirm_join_btn");
        this.center_sp.addChild(this.sure_btn);
        this.sure_btn.x=250;
        this.sure_btn.y=350;
        this.sure_btn.addTouchEvent();
        this.sure_btn.addEventListener("click",function(){
            if(model["back_fun"]){
                model["back_fun"](model.clubId);
                this.close_click();
            }
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
        tt.textColor = 0x6A665B;
        tt.textAlign = "center";
        tt.lineSpacing=10;
        tt.width=w*.75;
        tt.height=h*.8;
        tt.multiline = true;
        tt.verticalAlign = "middle";
        tt.fontFamily = "微软雅黑";
        tt.size = 23;
        tt.x = w*.1;
        tt.y = h*.11-100;
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