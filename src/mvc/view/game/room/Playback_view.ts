/**
 * Created by 周鹏斌大王 on 2018-05-10.
 */
class Playback_view extends Base_view{
    protected EVENT:Game_room_event_model=new Game_room_event_model();//事件常量

    private model:Play_back_model;
    public constructor(model:Play_back_model){
        super();
        this.model=model;

        //返回大厅按钮
        var btn=new MyButton("g_pb_home");
        this.addChild(btn);
        btn.x=Main.stageWidth-btn.width/2-5;
        btn.y=btn.height/2+5;
        btn.addTouchEvent();
        btn.addEventListener("click",this.play_back_home,this);

        //X1
        var on_off=new On_off_btn("g_pb_stop","g_pb_play",function () {
            if(on_off.bl){
                model.play();
            }else{
                model.stop();
            }
        });
        this.addChild(on_off);
        on_off.x=btn.x;
        on_off.y=Main.stageHeight/2+3;
        on_off.addTouchEvent();
        //X1
        var X1=new On_off_btn("g_pb_x1_l","g_pb_x1_a",function () {
            X5.bl=false;
            X10.bl=false;
            on_off.bl=X1.bl=true;

            model.set_speed(1);
        });
        this.addChild(X1);
        X1.x=btn.x;
        X1.y=on_off.y+on_off.height+2;
        X1.addTouchEvent();
        //X5
        var X5=new On_off_btn("g_pb_x5_l","g_pb_x5_a",function () {
            X1.bl=false;
            X10.bl=false;
            on_off.bl=X5.bl=true;
            model.set_speed(5);
        });
        this.addChild(X5);
        X5.x=btn.x;
        X5.bl=false;
        X5.y=X1.y+X1.height;
        X5.addTouchEvent();
        //X10
        var X10=new On_off_btn("g_pb_x10_l","g_pb_x10_a",function () {
            X5.bl=false;
            X1.bl=false;
            on_off.bl=X10.bl=true;
            model.set_speed(10);
        });
        this.addChild(X10);
        X10.x=btn.x;
        X10.bl=false;
        X10.y=X5.y+X5.height;
        X10.addTouchEvent();
    }
    //渲染动作icon
    private action_icon_list=[];
    private action_type_list=[];
    public add_user_action_btn_icon(action_model_list:Array<Action_model>){
        this.clear_action_icon();
        for(var i in action_model_list){
            if(this.action_type_list.indexOf(action_model_list[i].type)>=0) continue;
            this.action_type_list.push(action_model_list[i].type);
            var icon=this.create_icon(action_model_list[i].type);
            if(icon){
                this.addChild(icon);
                this.action_icon_list.push(icon);
                icon.scaleX=icon.scaleY=.5;
                var dis=icon.width*icon.scaleX+15;
                switch(action_model_list[i].position){
                    case 1:
                        icon.y=Main.stageHeight-this.CONST.SELF_CARD_HEIGHT-icon.height/2-10;
                        icon.x=Main.stageWidth/2-(action_model_list.length*dis)/2+dis*this.action_type_list.length;
                        break;
                    case 2:
                        icon.y=Main.stageHeight/2-(action_model_list.length*dis)/2+dis*this.action_type_list.length;
                        icon.x=Main.stageWidth-240;
                        break;
                    case 3:
                        icon.y=120;
                        icon.x=Main.stageWidth/2-(action_model_list.length*dis)/2+dis*this.action_type_list.length;
                        break;
                    case 4:
                        icon.y=Main.stageHeight/2-(action_model_list.length*dis)/2+dis*this.action_type_list.length;
                        icon.x=240;
                        break;
                }
            }
        }
    }
    //创建单个icon
    private create_icon(type){
        if(Number(type)==this.CONST.PLAYER_ACTION.play_card||
            Number(type)==this.CONST.PLAYER_ACTION.system_deal_card)return;
        var btn_str="g_cpgh_btn_"+type;
        //暗杠也是杠 长毛也是杠
        if(Number(type)==this.CONST.PLAYER_ACTION.an_gang)btn_str="g_cpgh_btn_"+this.CONST.PLAYER_ACTION.gang;
        var icon=this.set_bit_center(btn_str);
        return icon;
    }
    //清理icon
    private clear_action_icon(){
        for(var i in this.action_icon_list){
            this.removeChild(this.action_icon_list[i]);
        }
        this.action_icon_list=[];
        this.action_type_list=[];
    }

    //返回大厅
    private play_back_home(){
        this.v_to_v_dis_event(this.EVENT.room.play_back_home);
    }
}