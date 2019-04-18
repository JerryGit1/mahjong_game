/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Club_view extends Base_view{
    public EVENT:Game_club_event_model=new Game_club_event_model();//事件常量
    //俱乐部主页
    private main_view:Club_main_view;
    //俱乐部广场
    private square_view:Club_square_view;
    public constructor(){
        super();
    }
    //-------------------------------------------------------------------
    //切换俱乐部主页
    public cut_main(club_info:Array<Club_base_model>,notice){
        this.clear_scene();
        this.main_view=new Club_main_view(club_info,notice);
        //返回大厅
        this.main_view.v_to_v_add_event(this.EVENT.club.back_hall,this.back_hall,this);
        //跳转广场
        this.main_view.v_to_v_add_event(this.EVENT.club.cut_scene,this.skip_square_scene,this);
        //监听浮层文字
        this.main_view.v_to_v_add_event(this.EVENT.club.float_alert,this.float_alert,this);

        this.addChild(this.main_view);
    }
    //切换广场场景
    public cut_square(club_info:Game_club_model,notice){
        this.clear_scene();
        this.square_view=new Club_square_view(club_info,notice);
        //返回主页
        this.square_view.v_to_v_add_event(this.EVENT.club.cut_scene,this.back_main,this);
        //创建房间监听
        this.square_view.v_to_v_add_event(this.EVENT.club.create_room,this.square_create_popup,this);
        //加入房间监听
        this.square_view.v_to_v_add_event(this.EVENT.club.join_room,this.square_join_popup,this);
        //申请离开俱乐部
        this.square_view.v_to_v_add_event(this.EVENT.club.request_leave,this.square_leave_popup,this);
        //我的成绩弹窗
        this.square_view.v_to_v_add_event(this.EVENT.club.add_my_info,this.add_my_info,this);
        //刷新按钮
        this.square_view.v_to_v_add_event(this.EVENT.club.update_square_info,this.refresh_main_scene,this);
        this.addChild(this.square_view);
    }
    //跳转 广场场景
    private skip_square_scene(model:Club_base_model){
        this.v_to_v_dis_event(this.EVENT.club.cut_club_square,model);
    }
    //俱乐部创建房间
    private square_create_popup(){
        this.v_to_v_dis_event(this.EVENT.club.create_room);
    }
    //俱乐部加入房间
    private square_join_popup(info){
        this.v_to_v_dis_event(this.EVENT.club.join_room,info);
    }
    //申请离开俱乐部
    private square_leave_popup(){
        this.v_to_v_dis_event(this.EVENT.club.request_leave);
    }
    //俱乐部-我的成绩弹窗
    private add_my_info(){
        this.v_to_v_dis_event(this.EVENT.club.add_my_info);
    }
    //刷新俱乐部场景---通过按钮和通过定时器去刷新
    private refresh_main_scene(clubId){
        this.v_to_v_dis_event(this.EVENT.club.update_square_info,clubId);
    }
    //清理场景
    private clear_scene(){
        if(this.main_view){
            //返回大厅
            this.main_view.v_to_v_remove_event(this.EVENT.club.back_hall);
            //跳转广场
            this.main_view.v_to_v_remove_event(this.EVENT.club.cut_scene);
            this.main_view.clear();
            this.removeChild(this.main_view);
            this.main_view=null;
        }
        if(this.square_view){
            //返回主页
            this.square_view.v_to_v_remove_event(this.EVENT.club.cut_scene);
            this.square_view.clear();
            this.removeChild(this.square_view);
            this.square_view=null;
        }
    }
    //-------------------------事件
    // 返回大厅
    private back_hall(){
        this.v_to_v_dis_event(this.EVENT.club.back_hall);

    }
    //刷新俱乐部广场视图
    public update_square_info(data){
        this.square_view.update_square_info(data);
    }
    //返回俱乐部首页
    private back_main(){
        this.v_to_v_dis_event(this.EVENT.club.cut_scene);
    }
    //监听浮层文字回调
    public float_alert(info){
        this.v_to_v_dis_event(this.EVENT.club.float_alert,info);
    }
    public clear(){
        this.clear_scene();
        super.clear();
    }

}