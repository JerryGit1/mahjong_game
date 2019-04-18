/**
 * Created by 周鹏斌大王 on 2018-04-27.
 */
class Base_user_card_view extends Base_view{

    protected model:User_model;
    protected stop_card_w=0;//桌牌的宽度
    protected stop_cpg_card_w=0;//吃碰杠牌宽度
    protected stop_card_dis=0;//桌牌间距
    protected cpg_card_max_w=0;//吃碰杠牌总宽度
    protected play_card_w=0;//桌牌宽度
    protected stop_start_point:egret.Point;//手牌起始坐标
    protected x_sk=0;//2/4号位置 x轴偏移量
    protected base_stop_card_list:Array<Base_card_view>=[];//基础手牌数组
    protected cpg_stop_card_list:Array<Cpg_base_card_view>=[];//吃碰杠牌数组
    protected play_cards_point:Array<egret.Point>=[];//桌牌坐标数组
    protected play_card_list:Array<Base_card_view>=[];//桌牌数组
    protected hua_card_list:Array<egret.Bitmap>=[];//花牌数组
    public new_play_card_point;//最新出的牌的坐标
    public _is_send_card=false;//物理意义上是否可以出牌了
    public constructor(user_model){
        super();
        this.model=user_model;
    }
    //预设全部桌牌坐标
    protected set_play_cards_point(){

    }
    //发牌动画
    public send_card_ani(back_fun){
        this.update_play_card();
        this.update_cpg_stop_card();
        var card_model:Base_card_model,card_view:Base_card_view,self=this;
        var num=0;//0 1 2 3
        var card_num;
        var timer=setInterval(function () {
            if(num<=3){
                //添加
                add_group_card(num);
            }else{
                clearInterval(timer);
            }
            num++;
        },200);
        function add_group_card(group_num){
            for(var i=0;i<4;i++){
                card_model=self.model.stop_card[i+group_num*4];
                if(card_model){
                    card_view=new Base_card_view(card_model,self.stop_card_w);
                    self.addChild(card_view);
                    self.set_base_stop_card_view_point(card_view,i+(group_num*4));
                    card_view.alpha=0;
                    egret.Tween.get(card_view).to({alpha:1},60);
                    self.base_stop_card_list.push(card_view);
                }
            }
        }
    }
    //更新牌层 constraint_update 强制更新
    public update_card_info(constraint_update,card_type,except_card_type){
        //桌牌
        if(!card_type||card_type==this.CONST.CARD_TYPE.play)
        if(this.model.play_card_is_change||constraint_update)this.update_play_card();
        //手牌
        if(!card_type||card_type==this.CONST.CARD_TYPE.base_stop)
        if(this.model.stop_card_is_change||constraint_update)this.update_stop_card();
        //花牌
        if(!card_type||card_type==this.CONST.CARD_TYPE.hua_card){
            if(this.model.hua_card_is_change||(constraint_update&&except_card_type==0)){
                this.update_hua_card();
            }
        }


        //最新出的牌箭头
        if(this.model.is_new_send_card_user){
            if(this.play_card_list.length>0)
            this.set_new_play_card_point(this.play_card_list[this.play_card_list.length-1]);
        }else{
            this.new_play_card_point=null;
        }
    }
    //手牌更新
    protected update_stop_card(){
        MyConsole.getInstance().trace(this.model.current_table_board_position+"号位,更新手牌视图");
        //清理
        this.clear_stop_card();
        //更新吃碰杠的手牌
        this.update_cpg_stop_card();
        //更新基础手牌
        this.update_base_stop_card();
        this.model.stop_card_is_change=false;
    }
    //花牌更新
    protected update_hua_card(){
        MyConsole.getInstance().trace(this.model.current_table_board_position+"号位,更新花牌视图");
        //清理
        this.clear_hua_card();
        this.x_sk = 0;
        //更新花牌
        for(var i in this.model.hua_card){
            var flower = this.set_bit_center("g_flower_"+this.model.hua_card[i].act_code);
            this.addChild(flower);
            this.set_hua_card_point(flower,i);
            this.hua_card_list.push(flower);
        }
        this.model.hua_card_is_change = false;
        this._is_send_card = false;
    }
    //桌牌更新
    protected update_play_card(){
        MyConsole.getInstance().trace(this.model.current_table_board_position+"号位,更新桌牌视图");
        if(this.play_cards_point.length==0)this.set_play_cards_point();
        this.clear_play_card();
        for(var i in this.model.play_card){
            var card=new Base_card_view(this.model.play_card[i],this.play_card_w);
            this.addChild(card);
            card.x=this.play_cards_point[i].x;
            card.y=this.play_cards_point[i].y;
            this.set_play_card_view_point(card,i,this.model.play_card.length);
            this.play_card_list.push(card);
        }
        //下一个桌牌坐标---出牌动画用
        if(this.model.play_card)this.model.new_play_card_point=this.play_cards_point[this.model.play_card.length];
        this.set_plays_card_layer();
        this.model.play_card_is_change=false;
    }
    //更新吃碰杠的手牌
    protected update_cpg_stop_card(){
        var card_model:CPG_card_model,card_view:Cpg_base_card_view;
        if(this.model.cpg_stop_card&&this.model.cpg_stop_card.length>0){
            for(var i in this.model.cpg_stop_card){
                card_model=this.model.cpg_stop_card[i];
                switch(card_model.action_type){
                    case this.CONST.PLAYER_ACTION.chi:
                        card_view=new Chi_card_view(card_model,this.stop_cpg_card_w);
                        break;
                    case this.CONST.PLAYER_ACTION.peng:
                        card_view=new Peng_card_view(card_model,this.stop_cpg_card_w);
                        break;
                    case this.CONST.PLAYER_ACTION.gang:
                        card_view=new Gang_card_view(card_model,this.stop_cpg_card_w);
                        break;
                    case this.CONST.PLAYER_ACTION.an_gang:
                        card_view=new An_gang_card_view(card_model,this.stop_cpg_card_w);
                        break;
                    // case this.CONST.PLAYER_ACTION.zhang_mao:
                    //     card_view=new Zhang_mao_card_view(card_model,this.stop_cpg_card_w);
                    //     break;
                    default:
                        MyConsole.getInstance().trace("重大失误,无法渲染未知的吃碰杠牌型",0);
                        break;
                }
                this.addChild(card_view);
                this.set_cpg_stop_card_view_point(card_view,i);
                this.cpg_stop_card_list.push(card_view);
            }
        }
    }
    //更新基础手牌
    protected update_base_stop_card(){
        var card_model:Base_card_model,card_view:Base_card_view;
        for(var i in this.model.stop_card){
            card_model=this.model.stop_card[i];
            card_view=new Base_card_view(card_model,this.stop_card_w);
            this.addChild(card_view);
            this.set_base_stop_card_view_point(card_view,i);
            this.base_stop_card_list.push(card_view);
        }
    }
    //设置单张手牌坐标
    protected set_cpg_stop_card_view_point(card_view,i){

    }
    //设置单张手牌坐标
    protected set_base_stop_card_view_point(card_view,i){

    }
    //设置单张桌牌坐标
    protected set_play_card_view_point(card_view:Base_card_view,i,max=0){

    }
    //设置单张花牌坐标
    protected set_hua_card_point(card,i){

    }
    //设置最新打出去的那张牌箭头提示坐标
    protected set_new_play_card_point(card_view:Base_card_view){
        this.new_play_card_point={
            x:card_view.x,
            y:card_view.y
        }
    }
    //设置整体桌牌层级
    protected set_plays_card_layer(){

    }
    //清理手牌
    protected clear_stop_card(){
        if(this.base_stop_card_list)
        for(var i in this.base_stop_card_list){
            this.base_stop_card_list[i].clear();
            this.removeChild(this.base_stop_card_list[i]);
            this.base_stop_card_list[i]=null;
        }
        if(this.cpg_stop_card_list)
        for(i in this.cpg_stop_card_list){
            this.cpg_stop_card_list[i].clear();
            this.removeChild(this.cpg_stop_card_list[i]);
            this.cpg_stop_card_list[i]=null;
        }
        this.base_stop_card_list=[];
        this.cpg_stop_card_list=[];
    }
    //清理桌牌
    protected clear_play_card(){
        if(this.play_card_list)
        for(var i in this.play_card_list){
            //牌点击
            this.play_card_list[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.stop_card_touch,this);
            //牌拖动
            this.play_card_list[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.stop_card_begin,this);
            this.play_card_list[i].clear();
            this.removeChild(this.play_card_list[i]);
            this.play_card_list[i]=null;
        }
        this.play_card_list=[];
    }
    //tyq: 清理花牌
    protected clear_hua_card(){
        if(this.hua_card_list){
            for(var i in this.hua_card_list){
                this.removeChild(this.hua_card_list[i]);
                this.hua_card_list[i] = null;
            }
            this.hua_card_list = [];
        }
    }
    protected stop_card_touch(e){

    }
    protected stop_card_begin(e){

    }

    //基础手牌高亮
    public play_highlight(code){
        if(this.play_card_list)
            for(var i in this.play_card_list){
                if(this.play_card_list[i].code==code){
                    this.play_card_list[i].update_bg("light");
                }else{
                    this.play_card_list[i].update_bg();
                }
            }
    }
    //提示手牌中参与吃碰杠的牌
    public tip_current_action_cpg_card(_is=false){
        //去掉全部提示
        for(var s in this.base_stop_card_list){
            var card_view=this.base_stop_card_list[s];
            card_view.set_jian_tou_icon(false);
        }
    }

    //自动出牌
    public auto_send_card(){

    }
}