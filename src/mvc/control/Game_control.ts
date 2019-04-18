/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Game_control extends Base_control{

    public EVENT:Game_event_model=new Game_event_model();//事件常量
    protected model:Game_model;
    protected view:Game_view;

    protected hall_control:Game_hall_control;
    protected room_control:Game_room_control;
    protected club_control:Game_club_control;

    public constructor(model,view){
        super(model,view);
        // this.model=model;
        //zpb:游戏层 侦听切换 大厅/房间 场景事件
        this.model.m_to_c_add_event(this.EVENT.game.cut_hall_scene,this.cut_scene,this);
        this.model.m_to_c_add_event(this.EVENT.game.cut_room_scene,this.cut_scene,this);
        this.model.m_to_c_add_event(this.EVENT.game.cut_club_scene,this.cut_scene,this);
        //分享链接--回放
        this.model.m_to_c_add_event(this.EVENT.game.share_play_game_back,this.popup_playback_cut_game,this);

        this.hall_control=new Game_hall_control(this.model.hall_model);
        this.hall_control.c_to_c_add_event(this.EVENT.base.parent_add_view,this.add_child_view,this);
        this.hall_control.c_to_c_add_event(this.EVENT.base.parent_remove_view,this.remove_child_view,this);

        this.room_control=new Game_room_control(this.model.room_model);
        this.room_control.c_to_c_add_event(this.EVENT.base.parent_add_view,this.add_child_view,this);
        this.room_control.c_to_c_add_event(this.EVENT.base.parent_remove_view,this.remove_child_view,this);
        //返回大厅
        this.room_control.c_to_c_add_event(this.EVENT.game.game_back_hall_scene,this.game_back_hall_scene,this);

        this.club_control=new Game_club_control(this.model.club_model);
        this.club_control.c_to_c_add_event(this.EVENT.base.parent_add_view,this.add_child_view,this);
        this.club_control.c_to_c_add_event(this.EVENT.base.parent_remove_view,this.remove_child_view,this);
        this.club_control.c_to_c_add_event(this.EVENT.base.hall_to_club_cut_scene,this.hall_to_club_cut_scene,this);
        this.club_control.c_to_c_add_event(this.EVENT.base.club_back_hall_scene,this.club_back_hall_scene,this);

        //----------------------------------------事件广播-----------------------------------------------
        //创建房间成功
        this.c_to_c_add_radio_event(this.EVENT.base.popup_create_room_ok,this.popup_create_room_ok,this);
        //加入房间成功
        this.c_to_c_add_radio_event(this.EVENT.base.popup_join_room_ok,this.popup_join_room_ok,this);
        //加入房间失败
        this.c_to_c_add_radio_event(this.EVENT.base.popup_join_room_fail,this.popup_join_room_fail,this);
        //大结算返回大厅;
        this.c_to_c_add_radio_event(this.EVENT.base.DJS_back_hall,this.DJS_back_hall,this);
        //回放进入游戏
        this.c_to_c_add_radio_event(this.EVENT.base.playback_cut_game,this.popup_playback_cut_game,this);
        //回放返回游戏
        this.c_to_c_add_radio_event(this.EVENT.game.game_play_back_hall_scene,this.game_play_back_hall_scene,this);
        
        //this.c_to_c_add_radio_event(this.EVENT.pop_to_game.show_player_back,);
    }
    /*zpb:切换场景*/
    private cut_scene(e,type){
        switch(type){
            case this.EVENT.game.cut_hall_scene://显示大厅场景
                //加载基础资源
                this.c_to_c_dis_event(this.EVENT.base.load_resource_start,{
                    name:"hall",
                    back_fun:this.add_hall.bind(this)
                });
                break;
            case this.EVENT.game.cut_room_scene://显示游戏场景
                //加载基础资源
                this.c_to_c_dis_event(this.EVENT.base.load_resource_start,{
                    name:"game",
                    back_fun:this.add_room.bind(this)
                });
                break;
            case this.EVENT.game.cut_club_scene://显示俱乐部场景
                //加载基础资源
                this.c_to_c_dis_event(this.EVENT.base.load_resource_start,{
                    name:"club",
                    back_fun:this.add_club.bind(this)
                });
                break;
        }
    }
    /*zpb:显示大厅场景*/
    private a=1;
    private add_hall(){
        this.clear_scene();//清空场景
        MyConsole.getInstance().trace("game_control 渲染大厅场景",6);
        this.hall_control.add_view();

        // if(this.a==1){//回放测试示例
        //     this.popup_playback_cut_game({
        //         file_url:"resource/辅助文件/20180521175908-876239-1.txt",//20180521171852-418575-1.txt",//
        //         share_user_id:1111
        //     });
        //     this.a=2;
        // }
    }
    /*zpb:显示游戏场景*/
    private add_room(){
        this.clear_scene();//清空场景
        this.model.room_model.room_load_state=this.CONST.ROOM_LOAD_STATUS.LOAD_OK;
        MyConsole.getInstance().trace("game_control 渲染游戏场景",6);
        this.room_control.add_view();
    }
    /*zpb:显示俱乐部场景*/
    private add_club(){
        this.clear_scene();//清空场景
        MyConsole.getInstance().trace("渲染俱乐部场景",3);
        this.club_control.add_view();
    }
    //zwb:游戏场景返回大厅场景
    private game_back_hall_scene(){
        this.model.room_model.clear_room_info();//zpb:房间数据清理
        this.model.set_game_scene({});
    }
    //zwb:确认发起大厅--跳转俱乐部
    private hall_to_club_cut_scene(){
        this.model.set_game_scene({});
    }
    //zwb:确认发起俱乐部--返回大厅
    private club_back_hall_scene(){
        this.model.set_game_scene({});
    }
    //来自popup----创建房间成功;
    private popup_create_room_ok(data){
        this.model.create_room_ok(data);
    }
    //来自popup----加入房间成功;
    private popup_join_room_ok(data){
        this.model.join_room_ok(data);
    }
    //来自popup----加入房间失败;
    private popup_join_room_fail(){
        this.model.join_room_fail();
    }
    //来自popup---回放进入游戏
    private popup_playback_cut_game(info){
        //file_url 文件地址 ps:resource/辅助文件/20180508184006-106034-1.txt
        //share_user_id 第一人称视角玩家ID 没有默认第一个
        this.room_control.set_play_back_info(info.file_url,info.share_user_id,function (main_info) {
            this.CONST.PLAYBACK_MODEL=true;
            this.model.play_back_start(main_info);
        }.bind(this));
    }
    //回放结束---返回大厅
    private game_play_back_hall_scene(){
        this.CONST.PLAYBACK_MODEL=false;
        this.model.room_model.clear_room_info();//zpb:房间数据清理
        this.model.set_game_scene({}); //切换场景
    }
    //大结算返回大厅;
    private DJS_back_hall(){
        this.model.room_model.clear_room_info();//zpb:房间数据清理
        this.model.join_room_fail();
    }

    private clear_scene(){
        this.room_control.remove_view();
        this.hall_control.remove_view();
        this.club_control.remove_view();
        //清空动画
        this.c_to_c_event_radio(this.EVENT.base.clear_ani_scene);
        //清空弹窗
        this.c_to_c_event_radio(this.EVENT.base.clear_popup_scene);
    }
}