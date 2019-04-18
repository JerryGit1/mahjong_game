/**
 * Created by JackerCao on 2018/4/20.
 */

class Share_popup extends Base_popup{
    public constructor(){
        super(true,true);
        this.add_center_bg("share_bg_png",Main.stageWidth,Main.stageHeight);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close_click,this);
    }
}