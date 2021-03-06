/**
 * Created by JackerCao on 2018/4/19.
 */

//战绩;
class Record_popup extends Base_popup{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    private no_info_img;                        //没有战绩时，显示的图片;
    protected scroll_view:egret.ScrollView;     //滚动区域
    protected content:egret.Sprite = new egret.Sprite();
    protected userId;
    public constructor(){
        super(true,true);
    }
    //派发监听;
    private dis_event(userId){
        //告诉popView我要战绩数据;
        this.v_to_v_dis_event(this.EVENT.popup.hall_achievement,userId);               //监听获取战绩;
    }
    public init_content(userId){
        this.add_center_bg("p_record_view_bg_png",1101,544);
        this.add_img_title("h_record_title",{x:535,y:20});
        this.add_close_btn("h_Return_btn",{x:40,y:-20});
        this.open_ani();
        
        this.userId=userId;

        this.scroll_view = new egret.ScrollView();
        this.scroll_view.width = 1050;
        this.scroll_view.height= 544;
        this.scroll_view.verticalScrollPolicy = "off";
        this.scroll_view.horizontalScrollPolicy = "on";
        this.scroll_view.setContent(this.content);
        this.scroll_view.x=30;
        this.scroll_view.y=30;
        this.content.y=-100;
        this.center_sp.addChild(this.scroll_view);

        //没有数据时绘制的白色底图
        this.add_center_white_bg(1047,465,1101,544);

        //没有数据时的提示;
        this.no_info_img=new egret.Bitmap(RES.getRes("p_record_img"));
        this.no_info_img.anchorOffsetX=this.no_info_img.width/2;
        this.no_info_img.anchorOffsetY=this.no_info_img.height/2;
        this.no_info_img.x=Main.stageWidth/2;
        this.no_info_img.y=Main.stageHeight/2-30;
        this.center_sp.addChild(this.no_info_img);

        //提示拖动图片;
        var text_img=new egret.Bitmap(RES.getRes("l_prompt_img"));
        text_img.anchorOffsetX=text_img.width/2;
        text_img.anchorOffsetY=text_img.height/2;
        text_img.x=Main.stageWidth/2;
        text_img.y=Main.stageHeight-60;
        this.addChild(text_img);


        //手指;
        var finger_img=new egret.Bitmap(RES.getRes("p_hand_icon"));
        finger_img.anchorOffsetX=finger_img.width/2;
        finger_img.anchorOffsetY=finger_img.height/2;
        finger_img.x=Main.stageWidth/2;
        finger_img.y=Main.stageHeight-30;
        this.addChild(finger_img);
        //手指拖动动画;//丹阳特有的动画, 看需求, 暂时不用合并
        setTimeout(function () {
            egret.Tween.get(finger_img).to({x:Main.stageWidth/2-100},300).wait(100).to({x:Main.stageWidth/2-100},300).wait(500).to({x:Main.stageWidth/2+140},300).wait(500).to({x:Main.stageWidth/2},300).wait(100).call(function () {
                finger_img.scaleX=0.6;
                finger_img.scaleY=0.6;
                //this.removeChild(finger_img);
            },this);
        }.bind(this),1200);
        //派发监听;
        this.dis_event(userId);
    }

    //添加战绩数据;
    public add_record_list(info){
        var length=info.length;
        if(length>0){
            this.no_info_img.visible=false;
            this.remove_white_bg();//清空白色底图
            for(let i=0;i<length;i++){
                var cell=new Achievement_single_view(info[i],this.userId);
                //让cell监听分享战绩;
		//之前的分享不用管它
                cell.v_to_v_add_event(this.EVENT.popup.share_achievement,this.share_record_pop,this);        //之前的分享;
                cell.v_to_v_add_event(this.EVENT.popup.share,this.share_pop,this);                          //分享;
                cell.v_to_v_add_event(this.EVENT.popup.play_back_info,this.play_back_info_pop,this);         //回放;
                cell.x=20+350*i;
                cell.y=150;
                cell.scaleX=cell.scaleY=0.95;
                this.content.addChild(cell);
            }
        }
    }

    //之前的分享战绩;
    private share_record_pop(){
        //告诉popView弹出分享战绩View;
        this.v_to_v_dis_event(this.EVENT.popup.share_achievement);
    }

    //重写的一个分享战绩;
    private share_pop(){
        //告诉popView弹出分享战绩View;
        this.v_to_v_dis_event(this.EVENT.popup.share);
    }

    //显示回放;
    private play_back_info_pop(data){
        //告诉popView弹出分享战绩View;
        this.v_to_v_dis_event(this.EVENT.popup.play_back_info,data);
    }
}
