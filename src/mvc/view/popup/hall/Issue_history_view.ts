/**
 * Created by pc-20171125 on 2018/4/23.
 * 代开历史
 */

class Issue_history_view extends Base_view{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected pageNum:number = 1;
    protected pageAll:number;
    protected scroll_view:egret.ScrollView;     //滚动区域
    protected content:egret.Sprite = new egret.Sprite();
    protected no_info_img:egret.Bitmap;
    protected no_info_white_bg:egret.Shape;
    public constructor(){
        super();
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
        this.scroll_view = new egret.ScrollView();
        this.scroll_view.width = 1050;
        this.scroll_view.height= 450;
        this.scroll_view.verticalScrollPolicy = "on";
        this.scroll_view.horizontalScrollPolicy = "off";
        this.scroll_view.setContent(this.content);
        this.scroll_view.addEventListener(egret.Event.CHANGE,this.update_ListView,this);
        this.scroll_view.y=60;
        this.addChild(this.scroll_view);

        //没有数据时显示的白色底图
        this.add_white_bg();

        //没有数据时显示的图片;
        this.no_info_img=new egret.Bitmap(RES.getRes("h_replace_history_img"));
        this.no_info_img.anchorOffsetX=this.no_info_img.width/2;
        this.no_info_img.anchorOffsetY=this.no_info_img.height/2;
        this.no_info_img.x=Main.stageWidth/2;
        this.no_info_img.y=Main.stageHeight/2-30;
        this.addChild(this.no_info_img);
    }
    //更新视图;
    public update_list(data){
        this.pageAll=data.pages;
        var list=data.infos;
        //清空
        var len=this.content.numChildren;
        for(var i=0;i<len;i++){
            this.content.removeChildAt(0);
        }
        var length=list.length;
        if(length>0){
            this.no_info_img.visible=false;
            this.no_info_white_bg.visible=false;
            for(let i=0;i<length;i++){
                var issue_history_cell=new Issue_history_cell(list[i],i);
                // issue_cell.v_to_v_add_event(this.EVENT.popup.delete_user,this.delete_user,this);                     //代开删除用户;
                //issue_cell.v_to_v_add_event(this.EVENT.popup.dissolution_room,this.dissolution_room,this);            //解散房间;
                issue_history_cell.v_to_v_add_event(this.EVENT.popup.share,this.share_issue_room,this);                 //分享代开历史;
                issue_history_cell.v_to_v_add_event(this.EVENT.popup.play_back_info,this.play_back_info,this);          //记录按钮回调;
                issue_history_cell.x=70;
                issue_history_cell.y=150*i;
                this.content.addChild(issue_history_cell);
            }
        }
    }

    //分享代开记录;
    private share_issue_room(){
        this.v_to_v_dis_event(this.EVENT.popup.share);
    }

    //记录按钮回调;
    private play_back_info(info){
        this.v_to_v_dis_event(this.EVENT.popup.play_back_info,info);
    }

    protected update_ListView(){
        if(this.scroll_view.scrollTop > 865*this.pageNum){
            var num = this.pageNum +1;
            if(num <= this.pageAll){
                this.v_to_v_dis_event(this.EVENT.popup.get_history_info,num);
                this.pageNum = num;
                this.scroll_view.removeEventListener(egret.Event.CHANGE,this.update_ListView,this);
            }
        }
    }
}