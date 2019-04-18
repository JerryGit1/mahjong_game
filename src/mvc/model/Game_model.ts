/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Game_model extends Scene_model{
    public EVENT:Game_event_model=new Game_event_model();//事件常量
    public hall_model:Game_hall_model;//大厅 model
    public room_model:Game_room_model;//房间中 model
    public club_model:Game_club_model;//俱乐部 model
    public _game_status;//游戏状态
    public _is_jing_mo_join_new_room_type=1;//静默加入房间 1.没有  2.加入中 3.加入过了

    protected ani_model:Ani_model;
    protected user_group_model:User_group_model;
    protected socket_model:Web_socket_service;
    public constructor(){
        super();

    }
    public set_model(socket_model,ani_model){
        this.socket_model=socket_model;
        this.ani_model=ani_model;

        this.user_group_model=new User_group_model();
        this.hall_model=new Game_hall_model();
        this.room_model=new Game_room_model();
        this.club_model=new Game_club_model();

        this.hall_model.set_model(this.user_group_model.position_id_get_user_model(1),socket_model);
        this.room_model.set_model(this.user_group_model,socket_model);
        this.club_model.set_model(this.user_group_model.position_id_get_user_model(1),socket_model);
        //this.club_model.m_to_c_add_event(this.EVENT.game.cut_club_scene,this.cut_club_scene,this);//切换俱乐部场景
        this.club_model.m_to_c_add_event(this.EVENT.game.cut_hall_scene,this.cut_hall_scene,this);//返回大厅

        //hyh: 大厅-刷新大接口
        this.hall_model.m_to_c_add_event(this.EVENT.game.update_main_info,this.apply_room_info,this);
        //tyq: 房间-刷新大接口
        this.room_model.m_to_c_add_event(this.EVENT.game.update_main_info,this.apply_room_info,this);
    }
    /*zpb:处理大接口---相应数据*/
    public mainInterface(data,share_room_id,playback_room_info){
        MyConsole.getInstance().trace("-----》处理大接口数据-gameModel","custom1");
        /*设置用户信息*/
        this.user_group_model.set_self_info(data["currentUser"]);
        /*判定游戏场景*/
        this.set_game_scene(data,share_room_id,playback_room_info);
    }
    /*切换大厅/房间场景*/
    public set_game_scene(info,share_room_id=false,playback_room_info=false){
        if(!info.roomInfo){//玩家在 大厅/俱乐部 场景
            var roomStr=""+share_room_id;
            if(share_room_id&&this._is_jing_mo_join_new_room_type==1&&roomStr.length==6) { //分享房间号码
                //静默加入房间
                this._is_jing_mo_join_new_room_type=2;//加入中
                this.hall_model.join_room({roomId:share_room_id,_is_jing_mo_join_new_room_type:true});
            }else if(playback_room_info){//分享回放
                //播放回放
                this.m_to_c_dis_event(this.EVENT.game.share_play_game_back,playback_room_info);
            }else if(this.club_model.club_is_open){//玩家在俱乐部场景
                if(this.game_status!=this.CONST.GAME_STARE.CLUB){
                    this.game_status=this.CONST.GAME_STARE.CLUB;//设置当前场景
                    this.m_to_c_dis_event(this.EVENT.game.cut_club_scene);//切换场景
                }
            }
            else if(this.game_status!=this.CONST.GAME_STARE.HALL){
                this.game_status=this.CONST.GAME_STARE.HALL;//设置当前场景
                this.m_to_c_dis_event(this.EVENT.game.cut_hall_scene);//切换场景
            }
        }else{//玩家在房间中场景
             this.room_model.init_data(info);
            if(this.game_status!=this.CONST.GAME_STARE.ROOM){
                this.game_status=this.CONST.GAME_STARE.ROOM;//设置当前场景
                this.m_to_c_dis_event(this.EVENT.game.cut_room_scene);//切换场景
            }else{
                //清空弹窗层
                //直接刷新视图
                this.room_model.update_view();
            }
        }
    }

    //将当前场景变成大厅场景;
    public game_scene_hall(data){
        //this.user_group_model.set_self_info(data);
        this.game_status=this.CONST.GAME_STARE.HALL;//设置当前场景
        this.m_to_c_dis_event(this.EVENT.game.cut_hall_scene);//切换场景
    }
    //创建房间成功
    public create_room_ok(info){
        var room_info = {
            chiType:info.roomInfo.chiType,
            circleNum:info.roomInfo.circleNum,
            state:this.CONST.ROOM_STATUS.SHORT_BOARD,
            lastNum:info.roomInfo.circleNum,
            huaType:info.roomInfo.huaType,
            roomId:info.roomInfo.roomId,
            roomType:info.roomInfo.roomType,
            scoreType:info.roomInfo.scoreType,
            userId:info.roomInfo.userId
        }
        this.mainInterface({
            roomInfo:room_info,
            currentUser:info.userInfo
        },null,null);
    }
    //加入房间成功--丹阳特有-不用合并
    public join_room_ok(info){
        if(this.game_status!=this.CONST.GAME_STARE.ROOM){//如果已经加入成功 就交给游戏层去处理
            var currentUser,anotherUsers=[];
            for(var i in info.userInfo){
                if(Number(info.userInfo[i].userId)==this.user_group_model.position_id_get_user_model(1).userId){
                    currentUser=info.userInfo[i];
                }else{
                    anotherUsers.push(info.userInfo[i]);
                }
            }
            var room_info = {
                chiType:info.chiType,
                circleNum:info.circleNum,
                state:this.CONST.ROOM_STATUS.SHORT_BOARD,
                lastNum:info.circleNum,
                huaType:info.huaType,
                roomId:info.roomId,
                roomType:info.roomType,
                scoreType:info.scoreType,
                userId:info.userId
            };
            this.mainInterface({
                roomInfo:room_info,
                currentUser:currentUser,
                anotherUsers:anotherUsers
            },null,null);
        }else if(this.game_status==this.CONST.GAME_STARE.ROOM){
            MyConsole.getInstance().trace("重大失误,当前已经在游戏里边了，居然还在切游戏",0);
        }
    }
    //加入房间失败
    public join_room_fail(){
        this.set_game_scene({});
    }
    //俱乐部返回大厅
    private cut_hall_scene(){
        this.set_game_scene({});
    }
    //开始启动回放
    public play_back_start(info){
        this.mainInterface(info,null,null);
    }

    /*-------------设置游戏场景状态-----------------*/
    protected set game_status(str:string){
        for(var i in this.CONST.GAME_STARE){
            if(this.CONST.GAME_STARE[i]==str){
                this._game_status=str;
                return;
            }
        }
        MyConsole.getInstance().trace("游戏场景状态中没有这个奇葩状态-"+str,0);
    }
    protected get game_status():string{
        return this._game_status;
    }
    /*-------------页面失去焦点----4号机--------*/
    public onfocus(){
        if(this.game_status==this.CONST.GAME_STARE.ROOM){//页面失去焦点 如果在游戏要去刷新大接口
            this.m_to_c_dis_event(this.EVENT.base.update_main_info);
        }
    }
    /*-------------请求大接口-----------------*/
    protected apply_room_info(type=null){
        if(type&&type=="share_room_id_join_defeated"){//分享房间号码加入失败
            //切回大厅
            this.set_game_scene({roomInfo:false});
        }else{
            this.m_to_c_dis_event(this.EVENT.base.update_main_info);
        }
    }
    
    
}