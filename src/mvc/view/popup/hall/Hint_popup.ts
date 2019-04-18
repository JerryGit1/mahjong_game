/**
 * Created by Tang on 2018/1/8.
 */
class Hint_popup extends Base_popup{
    protected str:string;
    protected backFunc:any;
    protected confirmBtn:MyButton;
    protected runBackFunc:any;//不管什么情况都执行的回调
    //_isAddCloseBtn 是否显示关闭按钮 true false;
    // type 默认 min 可选值 max
    public constructor(str,backFunc=null,_isAddCloseBtn =true,type="min",runBackFunc=null){
        super(true,false);

        this.str = str;
        this.runBackFunc = runBackFunc;
        this.initBg(type);
        this.addText();


        if(backFunc){
            this.backFunc = backFunc;
            this.addCurrentBtn(_isAddCloseBtn);
        }
        this.open_ani();
    }
    protected initBg(type){

        // if(type =="max"){
        //     this.add_center_bg("popup_view_Bg_png",Main.stageWidth*.8,Main.stageHeight*.7);
        // }else{
        //     this.add_center_bg("popup_view_Bg_png",Main.stageWidth*.6,Main.stageHeight*.6);
        // }

        this.add_center_bg("p_popup_view_Bg_png",700,400);
        this.add_img_title("l_prompt_title",{x:350,y:0});
        // this.addTitle("b_p_hint_title",this.centerSp.width/2+4,65);
        // return bg;
    }
    protected closeClick(){
        //super.closeClick();
        //if(this.runBackFunc) this.runBackFunc();
    }
    protected addText(){
        var tt = new egret.TextField();
        tt.textColor = 0xcc4225;
        tt.textAlign = "center";
        tt.lineSpacing=10;
        tt.width=600;
        tt.height=this.height*.8;
        tt.multiline = true;
        tt.verticalAlign = "middle";
        tt.fontFamily = "微软雅黑";
        tt.size = 30;
        tt.text = this.str;
        // tt.textFlow = (new egret.HtmlTextParser()).parser(this.str);
        tt.x = 54;
        tt.y = -110;
        this.center_sp.addChild(tt);
    }
    protected addCurrentBtn(_isAddCloseBtn){
        if(_isAddCloseBtn){
            //确认按钮;
            this.confirmBtn = new MyButton("l_confirm_btn");
            this.confirmBtn.x = 540;
            this.confirmBtn.y = 320;
            this.center_sp.addChild(this.confirmBtn);
            this.confirmBtn.addTouchEvent();
            this.confirmBtn.addEventListener("click",this.confirmBtnClick,this);


            //取消按钮;
            var close_btn= new MyButton("l_cancel_btn");
            close_btn.x = 200;
            close_btn.y = 320;
            this.center_sp.addChild(close_btn);
            close_btn.addTouchEvent();
            close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close_click,this);
        }else {
            //确认按钮;
            this.confirmBtn = new MyButton("l_confirm_btn");
            this.confirmBtn.x = Main.stageWidth/2-220;
            this.confirmBtn.y = 320;
            this.center_sp.addChild(this.confirmBtn);
            this.confirmBtn.addTouchEvent();
            this.confirmBtn.addEventListener("click",this.confirmBtnClick,this);
        }

    }
    protected confirmBtnClick(){
        this.dispatchEvent(new egret.Event("close"));
        if(this.backFunc) this.backFunc();
    }

    public clear(){
        super.clear();
        if(this.confirmBtn){
            this.confirmBtn.clear();
            this.confirmBtn.removeEventListener("click",this.confirmBtnClick,this);
        }
    }
}