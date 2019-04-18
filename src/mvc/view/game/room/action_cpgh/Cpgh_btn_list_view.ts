/**
 * Created by 周鹏斌大王 on 2018-04-27.
 */
class Cpgh_btn_list_view extends Base_view{
    protected EVENT:Game_room_event_model=new Game_room_event_model();//事件常量
    private list_bg;
    public constructor(){
        super();
    }
    private action_btn_info;
    private current_btn_list;
    private btn_num;
    private current_btn_type=1;//1基础 2多吃杠
    public update_btn_list(action_model_list){
        this.action_btn_info=[];
        //分类处理数据   chi：【Action_model，Action_model，Action_model】 peng:【Action_model，Action_model】
        this.btn_num=0;
        for(var i in action_model_list){
            var action_model:Action_model=action_model_list[i];
            var list_name=action_model.type;
            //特殊处理 杠 暗杠和旋风杠放一起
            if(action_model.type==this.CONST.PLAYER_ACTION.gang||action_model.type==this.CONST.PLAYER_ACTION.an_gang){
                list_name=this.CONST.PLAYER_ACTION.gang;
            }
            if(!this.action_btn_info[list_name]){
                this.action_btn_info[list_name]=[];
                this.btn_num++;
            }
            this.action_btn_info[list_name].push(action_model_list[i]);
        }
        //显示操作按钮
        this.current_btn_list=[];
        this.add_btn1_list_view();
        //全屏遮罩
        this.add_mask();
    }
    //第1层操作按钮------------------------------------
    private add_btn1_list_view(_ani=true){
        this.clear_btns();
        MyConsole.getInstance().trace("渲染吃碰杠胡按钮组");
        this.current_btn_type=1;
        var btn_dis=105;
        var start_x=Main.stageWidth*.9-this.btn_num*btn_dis;
        var start_y=Main.stageHeight-this.CONST.SELF_CARD_HEIGHT-60;
        var btn,x,y;
        for(var i in this.action_btn_info){
            x=start_x+this.current_btn_list.length*btn_dis;
            y=start_y;
            btn=this.create_btn1_view(i,x,y,this.action_btn_info[i]);
            //动画
            if(_ani){
                btn.y=start_y+50;
                btn.alpha=0;
                egret.Tween.get(btn).wait(this.current_btn_list.length*150+60).to({y:start_y,alpha:1},500,egret.Ease.backOut);
            }
        }
        btn.x+=50;
    }
    private btn1_click(e:egret.Event){
        var btn1_view:Cpg_btn_view=e.currentTarget;
        if(this.list_bg){
            this.removeChild(this.list_bg);
            this.list_bg=null;
        }
        if(this.current_btn_type==1){
            if(btn1_view.model_list.length==1){
                //发起动作
                this.execute_action(btn1_view.model_list[0]);
            }else{
                //多个吃和杠
                this.add_btn2_list_view(btn1_view.model_list);
            }
        }else if(this.current_btn_type==2){
            //第二层的过点击了
            this.add_btn1_list_view(false);
        }
    }
    //第2层操作按钮------------------------------------
    private add_btn2_list_view(model_list){
        this.clear_btns();
        this.current_btn_type=2;
        var start_y=Main.stageHeight-this.CONST.SELF_CARD_HEIGHT-60;
        if(model_list.length>1){
            var list_bg=new egret.Bitmap(RES.getRes("g_more_bg"));
            list_bg.anchorOffsetX=list_bg.width/2;
            list_bg.anchorOffsetY=list_bg.height/2;
            list_bg.x=Main.stageWidth/2;
            list_bg.y=start_y;
            this.addChild(list_bg);
            this.list_bg=list_bg;
        }
        if(model_list){
            var btn_dis=20;
            var max_w=0;
            for(var i in model_list){
                var btn=new Cpg_card_btn_view(model_list[i]);
                this.addChild(btn);
                btn.y=start_y;
                btn.changeSize(.7,.7);
                max_w+=(btn.width*.7+btn_dis);
                btn.addTouchEvent();
                btn.addEventListener("click",this.btn2_click,this);
                this.current_btn_list.push(btn);
            }

            //设置坐标
            var start_x=Main.stageWidth/2-max_w/2-50;
            for(i in this.current_btn_list){
                start_x+=this.current_btn_list[i].width/2*.7;
                this.current_btn_list[i].x=start_x;
                start_x+=btn_dis;
                start_x+=this.current_btn_list[i].width/2*.7;
            }
            //过按钮
            this.create_btn1_view(this.CONST.PLAYER_ACTION.guo,start_x+80,start_y,this.action_btn_info[this.CONST.PLAYER_ACTION.guo]);
        }
    }
    private btn2_click(e:egret.Event){
        var btn1_view:Cpg_card_btn_view=e.currentTarget;
        if(this.list_bg){
            this.removeChild(this.list_bg);
            this.list_bg=null;
        }
        if(this.current_btn_type==2){
            //发起动作
            this.execute_action(btn1_view.model);
        }
    }
    //执行动作------------------------------------
    private execute_action(action_model:Action_model){
        this.v_to_v_dis_event(this.EVENT.room.initiate_action,action_model);
    }
    private add_mask(){
        this.touchEnabled=true;
        this.graphics.beginFill(0x00ff00,0);
        this.graphics.drawRect(0,0,Main.stageWidth,Main.stageHeight);
    }
    public clear_event(){
        this.graphics.clear();
        this.touchEnabled=false;
        this.clear_btns();
    }
    //创建一个基础按钮
    private create_btn1_view(type,start_x,start_y,action_model_list){
        var btn_str="g_cpgh_btn_"+type;
        //暗杠也是杠 长毛也是杠
        if(Number(type)==this.CONST.PLAYER_ACTION.an_gang)btn_str="g_cpgh_btn_"+this.CONST.PLAYER_ACTION.gang;
        // else if(Number(type)==this.CONST.PLAYER_ACTION.zhang_mao)btn_str="g_cpgh_btn_"+this.CONST.PLAYER_ACTION.gang;
        //渲染按钮
        var btn:Cpg_btn_view=new Cpg_btn_view(btn_str,action_model_list);
        this.addChild(btn);
        btn.x=start_x;
        btn.y=start_y;
        btn.addTouchEvent();
        btn.addEventListener("click",this.btn1_click,this);
        this.current_btn_list.push(btn);
        return  btn;
    }
    //清理按钮
    private clear_btns(){
        for(var i in this.current_btn_list){
            this.current_btn_list[i].removeEventListener("click",this.btn1_click,this);
            this.current_btn_list[i].clear();
            this.removeChild(this.current_btn_list[i]);
        }
        this.current_btn_list=[];
    }
}