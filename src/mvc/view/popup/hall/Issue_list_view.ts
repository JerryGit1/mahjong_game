/**
 * Created by JackerCao on 2018/4/23.
 * 代开列表;
 */

class Issue_list_view extends Base_view{
    protected pageNum:number = 1;
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    protected scroll_view:egret.ScrollView;     //滚动区域
    protected content:egret.Sprite = new egret.Sprite();
    protected no_info_img:egret.Bitmap;
    protected no_info_white_bg:egret.Shape;
    protected issue_cell_list;
    public constructor(){
        super();
        this.issue_cell_list=[];
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
        this.scroll_view.y=60;
        this.addChild(this.scroll_view);

        //没有数据时显示的白色底图
        this.add_white_bg();

        //没有数据时显示的图片;
        this.no_info_img=new egret.Bitmap(RES.getRes("h_replace_img"));
        this.no_info_img.anchorOffsetX=this.no_info_img.width/2;
        this.no_info_img.anchorOffsetY=this.no_info_img.height/2;
        this.no_info_img.x=Main.stageWidth/2;
        this.no_info_img.y=Main.stageHeight/2-30;
        this.addChild(this.no_info_img);
    }

    //更新视图;
    public update_list(data){
        //清空
        var len=this.content.numChildren;
        for(var i=0;i<len;i++){
            this.content.removeChildAt(0);
        }
        this.issue_cell_list=[];
        var length=data.length;
        if(length>0){
            this.no_info_img.visible=false;
            this.no_info_white_bg.visible=false;
            for(let i=0;i<length;i++){
                var issue_cell=new Issue_cell_view(data[i],i);
                issue_cell.v_to_v_add_event(this.EVENT.popup.delete_user,this.delete_user,this);                    //代开删除用户;
                issue_cell.v_to_v_add_event(this.EVENT.popup.dissolution_room,this.dissolution_room,this);          //解散房间;
                issue_cell.v_to_v_add_event(this.EVENT.popup.share,this.share,this);                                //邀请;
                issue_cell.v_to_v_add_event(this.EVENT.popup.qz_dissolution_room,this.qz_dissolution_room,this);                            //邀请;
                issue_cell.x=70;
                issue_cell.y=150*i;
                this.content.addChild(issue_cell);
                this.issue_cell_list.push(issue_cell);
            }
        }
    }
    
    //更新cell数据;
    public update_cell_room_data(info){
        var length=this.issue_cell_list.length;
        if(length>0&&info.extraType){
            //房间开局
            if(info.extraType==6){
                for(let i=0;i<length;i++){
                    if(this.issue_cell_list[i].cell_room_id==info.roomId){
                        this.issue_cell_list[i].room_star_game();
                    }
                }
            }else if(info.extraType==4||info.extraType==5){    //玩家为离线状态;
                for(let i=0;i<length;i++){
                    if(this.issue_cell_list[i].cell_room_id==info.roomId){
                        this.issue_cell_list[i].set_player_is_off_type(info);
                    }
                }
            }
        }
    }

    //代开删除用户;
    private delete_user(data){
        this.v_to_v_dis_event(this.EVENT.popup.delete_user,data);
    }

    //代开解散房间;
    private dissolution_room(data){
        this.v_to_v_dis_event(this.EVENT.popup.dissolution_room,data);
    }

    //强制解散房间;
    private qz_dissolution_room(data){
        this.v_to_v_dis_event(this.EVENT.popup.qz_dissolution_room,data);
    }

    //邀请;
    private share(){
        this.v_to_v_dis_event(this.EVENT.popup.share);
    }
}
