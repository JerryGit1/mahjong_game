/**
 * Created by 周鹏斌大王 on 2018-05-09.
 */
class Play_back_model extends Base_model{
    protected user_group_model:User_group_model;
    protected socket_model:Web_socket_service;
    protected play_info_list=[];//回放列表
    protected action_index=0;//动作序列号
    protected type=1;//播放状态 1没开始 2播放中 3暂停中 4结束了
    protected speed=1000;//速度/秒
    public constructor(){
        super();
        this.EVENT = new Base_event_model();
    }

    public set_model(socket_model,user_group_model){
        this.socket_model=socket_model;
        this.user_group_model=user_group_model;
    }
    //第1步-------加载回放文件
    public load_file(url,self_user_id,back_fun){
        Http_service_model.getInstance().get_play_back_data(url,function (data_list) {
            //处理回放数据
            this.play_info_list=this.socket_model.all_data_transcoding(data_list);
            //返回大接口数据
            back_fun(this.manage_main_info(self_user_id,this.play_info_list[0].infos));
        }.bind(this));
    }
    //第2步-------处理大接口数据
    private manage_main_info(self_user_id,info){
        //房间信息
        var room_info=info.roomInfo;
        //玩家信息
        var current_user=info.userInfo[0];
        for(var i in info.userInfo){
            if(self_user_id&&self_user_id==info.userInfo[i].userId){
                current_user=null;
                current_user=info.userInfo[i];
                break;
            }
        }
        var other_user=[];
        for(var i in info.userInfo){
            info.userInfo[i].state=1;//在线
            if(current_user.userId!=info.userInfo[i].userId){
                other_user.push(info.userInfo[i]);
            }
        }
        return{
            roomInfo:room_info,
            currentUser:current_user,
            anotherUsers:other_user
        }
    }

    //第3步-------开始回放
    public start(){
        if(this.type==4||this.type==1){
            this.type=1;
            this.action_index=1;
            this.set_speed(1);
            this.play();
        }else{
            MyConsole.getInstance().trace("当前状态无法开始播放",0);
        }
    }

    //第4步-------暂停回放
    public stop(){
        if(this.type==2){
            this.type=3;
            clearInterval(this.timer);
        }
    }

    //第5步-------恢复回放
    private timer;
    public play(){
        if(this.type==1||this.type==3){
            this.type=2;
            clearInterval(this.timer);
            this.timer=setInterval(this.send_data.bind(this),this.speed);
        }
    }

    //第6步-------发送数据
    private send_data(){
        if(this.action_index>=this.play_info_list.length){ //动作序列号大于等于回放列表
            this.half_over(); //发起中途解散弹框
            return;
        }
        var current_action_info=this.play_info_list[this.action_index];
        if(current_action_info&&current_action_info.interfaceId){
            var interfaceId=current_action_info.interfaceId;
            if(this.action_index!=this.play_info_list.length-1){
                this.socket_model.playbackModelRadioServiceInfo(interfaceId,current_action_info.infos,this.action_index);
            }else{
                //100104 游戏，动作执行--回应
                if(current_action_info.interfaceId==Number(Port_model.getInstance().CONFIG.game_executeAction_respond.interfaceId)){
                    this.socket_model.playbackModelRadioServiceInfo(interfaceId,current_action_info.infos,this.action_index);
                    this.half_over();
                }else{
                    this.stop();
                    //小结算延迟 体验
                    setTimeout(function () {
                        this.socket_model.playbackModelRadioServiceInfo(interfaceId,current_action_info.infos,this.action_index);
                    }.bind(this),2000);
                }
            }
            this.action_index++;
        }else{
            MyConsole.getInstance().trace("回放卡住了,没有interfaceId",0);
            this.stop();
        }
    }

    //暂停回放
    private half_over(){
        this.stop();//暂停回放
        setTimeout(function () {
            this.m_to_c_dis_event(this.EVENT.base.playback_half_over); //回放结束返回大厅弹框
        }.bind(this),2000);
    }

    public set_speed(id){
        if(id==1){
            this.speed=1000;
        }else if(id==5){
            this.speed=600;
        }else if(id==10){
            this.speed=300;
        }
        this.stop();
        this.play();
    }

    //第7步-------回放结束
    public over(){
        this.stop();
        this.type=4;
        this.action_index=0;
        this.play_info_list=null;
    }

}