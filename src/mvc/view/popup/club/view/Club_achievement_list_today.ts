/**
 * Created by zwb on 2018/5/15.
 * 俱乐部今日战绩-列表-view
 */

//代开列表;
class Club_achievement_list_today extends Base_view{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected scroll_view:egret.ScrollView;//滚动区域
    protected content:egret.Sprite = new egret.Sprite();
    protected cell_today:Club_achievement_single_today;//俱乐部战绩-今日-cell
    protected no_info_img:egret.Bitmap;//没有数据时显示的图片;
    protected no_info_white_bg:egret.Shape;//没有数据时显示的白色底图
    private userId;
    private clubId;
    public constructor(data){
        super();
        this.userId=data.userId;
        this.clubId=data.clubId;
        this.init_content();
    }
    //没有数据时显示的白色底图
    protected add_white_bg(){
        this.no_info_white_bg=new egret.Shape();
        this.no_info_white_bg.graphics.beginFill(0xFDFDF9,1);
        this.no_info_white_bg.graphics.drawRoundRect(0,0,1047,465,30,30);
        this.no_info_white_bg.graphics.endFill();
        this.addChild(this.no_info_white_bg);
        this.no_info_white_bg.x=1101/2-this.no_info_white_bg.width/2;
        this.no_info_white_bg.y=544/2-this.no_info_white_bg.height/2+10;
    }

    private init_content(){
        //列表-滚动
        this.scroll_view = new egret.ScrollView();
        this.scroll_view.width = 1050;
        this.scroll_view.height= 450;
        this.scroll_view.verticalScrollPolicy = "off";
        this.scroll_view.horizontalScrollPolicy = "on";
        this.scroll_view.setContent(this.content);
        this.scroll_view.x=21;
        this.scroll_view.y=54;
        this.scroll_view.touchEnabled=true;
        this.addChild(this.scroll_view);

        //没有数据时显示的白色底图
        this.add_white_bg();

        //没有数据时显示的图片;
        this.no_info_img=new egret.Bitmap(RES.getRes("p_record_img"));
        this.no_info_img.anchorOffsetX=this.no_info_img.width/2;
        this.no_info_img.anchorOffsetY=this.no_info_img.height/2;
        this.no_info_img.x=Main.stageWidth/2;
        this.no_info_img.y=Main.stageHeight/2-30;
        this.addChild(this.no_info_img);
    }

    //更新视图;
    public add_club_today_list(info){
        var data=info.infos;
        //清空
        var len=this.content.numChildren;
        for(var i=0;i<len;i++){
            this.content.removeChildAt(0);
        }
        var length=data.length;
        if(length>0){
            this.no_info_img.visible=false;//清空无战绩提示图
            this.no_info_white_bg.visible=false;//清空无战绩白色底图
            for(let i=0;i<length;i++){
                this.cell_today=new Club_achievement_single_today(data[i],this.userId);//战绩-今日
                this.cell_today.v_to_v_add_event(this.EVENT.popup.play_back_info,this.play_back_info_pop,this);//回放pop
                this.cell_today.v_to_v_add_event(this.EVENT.popup.share,this.share_pop,this);//分享pop
                this.cell_today.x=20+350*i;
                this.cell_today.y=10;
                this.cell_today.scaleX=this.cell_today.scaleY=0.95;
                this.content.addChild(this.cell_today);
            }
        }
    }
    //显示回放pop
    private play_back_info_pop(data){
        this.v_to_v_dis_event(this.EVENT.base_popup.club_play_back_info,data);
    }
    //分享pop
    private share_pop(){
        this.v_to_v_dis_event(this.EVENT.base_popup.share);
    }
}

