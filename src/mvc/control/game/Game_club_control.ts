/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Game_club_control extends Base_control{
    public EVENT:Game_club_event_model=new Game_club_event_model();//事件常量
    protected model:Game_club_model;
    protected view:Club_view;
    public constructor(model){
        super(model,null);
        this.model=model;

        //确认可以从大厅跳转俱乐部
        this.model.m_to_c_add_event(this.EVENT.club.cut_club_scene,this.cut_club_scene,this);//切换俱乐部
        this.model.m_to_c_add_event(this.EVENT.club.request_join,this.club_request_join,this);//申请加入俱乐部
        this.model.m_to_c_add_event(this.EVENT.club.request_leave,this.leave_to_main,this);//申请离开俱乐部
        this.model.m_to_c_add_event(this.EVENT.club.float_alert,this.popup_float_alert,this);//通用浮层提示框
        this.model.m_to_c_add_event(this.EVENT.club.update_square_info,this.update_square_view,this);//刷新俱乐部视图


        //接受广播事件
        //大厅通知俱乐部有一个申请加入的俱乐部ID
        this.c_to_c_add_radio_event(this.EVENT.base.hall_to_club_join_id,this.hall_to_club_join_id,this);
        //大厅通知俱乐部切换到俱乐部场景
        this.c_to_c_add_radio_event(this.EVENT.base.hall_to_club_cut_scene,this.hall_to_club_cut_scene,this);
        //俱乐部确认加入房间
        this.c_to_c_add_radio_event(this.EVENT.base.sure_club_join_room,this.sure_club_join_room,this);
        //俱乐部确认创建房间
        this.c_to_c_add_radio_event(this.EVENT.base.sure_club_create_room,this.sure_club_create_room,this);
        //俱乐部确认我的战绩
        this.c_to_c_add_radio_event(this.EVENT.base.club_get_my_info,this.club_get_my_info,this);
        //俱乐部-战绩翻页刷新视图
        this.c_to_c_add_radio_event(this.EVENT.base.club_update_my_info,this.club_get_my_info,this);
        //俱乐部确认申请离开
        this.c_to_c_add_radio_event(this.EVENT.base.club_request_leave_popup,this.club_leave_popup,this);//申请离开俱乐部

    }
    //添加视图
    public add_view(){
        this.view=new Club_view();
        super.add_view();

        if(this.model.scene_status==this.CONST.club.square_scene) {//在游戏中返回直接去俱乐部广场
            //在俱乐部广场
            this.cut_club_square_scene(this.model.club_base_info_model);
        }else{
            this.cut_club_main_scene();//在这之前已经获取到数据了
        }
        //-------------------事件侦听--------------------
        this.view.v_to_v_add_event(this.EVENT.club.cut_club_square,this.cut_club_square_scene,this);
        this.view.v_to_v_add_event(this.EVENT.club.create_room,this.square_create_popup,this);//创建房间
        this.view.v_to_v_add_event(this.EVENT.club.join_room,this.square_join_popup,this);//加入房间
        this.view.v_to_v_add_event(this.EVENT.club.request_leave,this.square_leave_popup,this);//申请离开
        this.view.v_to_v_add_event(this.EVENT.club.add_my_info,this.add_my_info,this);//我的成绩弹窗
        this.view.v_to_v_add_event(this.EVENT.club.back_hall,this.back_hall_scene,this);//返回大厅
        this.view.v_to_v_add_event(this.EVENT.club.cut_scene,this.back_main,this);//返回俱乐部主页
        this.view.v_to_v_add_event(this.EVENT.club.update_square_info,this.update_square_info,this);//刷新按钮
        this.view.v_to_v_add_event(this.EVENT.club.float_alert,this.popup_float_alert,this);//申请离开俱乐部-浮层文字监听

    }
    //第1步------通过分享ID弹出申请加入俱乐部
    private hall_to_club_join_id(join_club_id,){
        if(join_club_id){
            //设置场景状态
            this.model.scene_status=this.CONST.club.request_join;
            //走500001接口获取
            this.model.club_request_join_before(join_club_id);
        }
    }
    //第2步------弹出申请加入俱乐部弹窗
    private club_request_join(model){
        model["back_fun"]=this.sure_join_club_send.bind(this);
        this.c_to_c_event_radio(this.EVENT.base_popup.club_request_join,model);
    }
    //第3步------确认加入俱乐部
    private sure_join_club_send(club_id){
        this.model.sure_join_club_send(club_id);
    }
    //第4步------大厅通知俱乐部弹出场景
    private hall_to_club_cut_scene(user_id){
        //判断这个人是否有俱乐部列表
        //设置场景状态
        this.model.scene_status=this.CONST.club.request_cut_main_scene;
        //获取我的俱乐部列表信息
        this.model.get_my_club_list();
    }
    //第5步-----通知game_control 切换俱乐部场景 确认可以从大厅跳转俱乐部
    private cut_club_scene(){
        if(this.model.scene_status==this.CONST.club.request_cut_main_scene){//请求切换到俱乐部场景
            this.model.club_is_open=true;//设置俱乐部开启
            this.model.scene_status=this.CONST.club.main_scene;
            this.c_to_c_dis_event(this.EVENT.base.hall_to_club_cut_scene,this);
        }else if(this.model.scene_status==this.CONST.club.square_scene){//在俱乐部广场
            this.model.scene_status=this.CONST.club.main_scene;
            this.cut_club_main_scene();
        }else{
            //刷新首页数据

        }
    }
    //第6步-----进入俱乐部主页
    private cut_club_main_scene(){
        this.view.cut_main(this.model.club_info,this.model.get_notice());
    }
    //第7步------进入俱乐部广场
    private cut_club_square_scene(model:Club_base_model){
        this.model.scene_status=this.CONST.club.square_scene;
        this.model.club_base_info_model=model;
        //渲染场景-----特殊情况 视图先出现 再刷新数据
        this.view.cut_square(this.model,this.model.get_notice());
        //获取数据
        this.update_square_info();
        // this.update_square_view();
    }
    //第7.1步-----请求刷新俱乐部广场
    private update_square_info(){
        if(this.model.scene_status==this.CONST.club.square_scene){
            this.model.get_club_info(this.model.club_base_info_model.clubId);
        }
    }
    //第7.2步-----刷新俱乐部广场视图
    private update_square_view(data){
        if(this.model.scene_status==this.CONST.club.square_scene){
            this.view.update_square_info(data);
        }
    }
    //第8步-----弹窗加入某个牌桌
    private square_join_popup(info){
        var data={
            roomId:info.roomId,
            userId:info.userId,
            scene_status:this.model.scene_status,
        };
        this.c_to_c_event_radio(this.EVENT.base.join_club_room_popup,data);
    }
    //第8.1步----确认加入某个牌桌--hall
    private sure_club_join_room(info){
        this.model.club_join_room_send(info.roomId,info.userId);
    }
    //第9步----弹窗创建房间
    private square_create_popup(){
        this.c_to_c_event_radio(this.EVENT.base.create_club_room_popup,this.model.club_base_info_model.clubId);
    }
    //第9.1步--确认创建房间----hall
    private sure_club_create_room(data){
        this.model.club_create_room_send(data);
    }
    //第10步----弹窗我的战绩
    private add_my_info(){
        var data={
            clubId:this.model.club_base_info_model.clubId,
            userId:this.model.self_model.userId,
            page:1,
            date:1
        };
        this.c_to_c_event_radio(this.EVENT.base.club_my_info_popup,data);
    }
    //第10.1步----确认我的战绩
    private club_get_my_info(data){
        //请求我的战绩信息
        this.model.set_club_get_my_info(data);
    }

    //第11步----弹窗申请离开
    private square_leave_popup(){
        var data={
            clubName:this.model.club_base_info_model.clubName,
            clubId:this.model.club_base_info_model.clubId,
        };
        this.c_to_c_event_radio(this.EVENT.base_popup.suqare_leave_popup,data);
    }
    //第11.1步--确认申请离开
    private club_leave_popup(){
        this.model.sure_leave_club_send(this.model.club_base_info_model.clubId);
    }
    //第11.2步--申请离开后返回俱乐部主页
    private leave_to_main(){
        this.model.get_my_club_list();
    }

    //第12步------返回大厅
    private back_hall_scene(){
        this.model.club_is_open=false;
        this.c_to_c_dis_event(this.EVENT.base.club_back_hall_scene,this);
    }
    //第13步------返回俱乐部主页----返回按钮
    private back_main(){
        this.model.get_my_club_list();
    }

    //刷新俱乐部场景---通过按钮和通过定时器去刷新
    private refresh_main_scene(clubId){
        this.model.get_club_info(clubId);
    }
    //通用浮层提示框
    private popup_float_alert(info){
        this.c_to_c_event_radio(this.EVENT.base.base_float_alert,info);//通用浮层提示框
    }
    //移除视图
    public remove_view(){
        super.remove_view();
    }
}