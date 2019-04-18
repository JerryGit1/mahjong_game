/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Ani_control extends Base_control{
    public EVENT:Ani_event_model=new Ani_event_model();//事件常量
    protected model:Ani_model;
    protected view:Ani_view;

    public constructor(model,view){
        super(model,view);
        //清空所有动画层遗留
        this.c_to_c_add_radio_event(this.EVENT.base.clear_ani_scene,this.clear_ani_scene,this);
        //------------------游戏--------------------
        this.c_to_c_add_radio_event(this.EVENT.room_ani.start_ani,this.start_ani,this);
        this.c_to_c_add_radio_event(this.EVENT.room_ani.kai_hun_ani,this.kai_hun_ani,this);
        this.c_to_c_add_radio_event(this.EVENT.room_ani.tips_send_card_ani,this.tips_send_card_ani,this);
        this.c_to_c_add_radio_event(this.EVENT.room_ani.user_send_card,this.game_user_send_card,this);
        this.c_to_c_add_radio_event(this.EVENT.room_ani.max_card_tips,this.game_max_card_tips,this);
        this.c_to_c_add_radio_event(this.EVENT.room_ani.cpgh_ani,this.cpgh_ani,this);
        this.c_to_c_add_radio_event(this.EVENT.room_ani.liu_ju_ani,this.liu_ju_ani,this);
        this.c_to_c_add_radio_event(this.EVENT.room_ani.score_ani,this.score_ani,this);
        this.c_to_c_add_radio_event(this.EVENT.room_ani.play_chat_ani,this.play_chat_ani,this);
	//开局-补花动画--丹阳特有--不用合并
        this.c_to_c_add_radio_event(this.EVENT.room_ani.start_flower_ani,this.start_flower_ani,this);
    }
    //游戏开场动画
    private start_ani(back_fun){
        this.view.start_ani(back_fun);
    }
    //游戏开混动画
    private kai_hun_ani(info){
        if(info.hunPai_model){
            this.view.kai_hun_ani(info.hunPai_model,info.back_fun);
        }else {//无混
            if(info.back_fun)info.back_fun();
        }
    }
    //开局-补花动画--丹阳特有--不用合并
    private start_flower_ani(info){
        this.view.start_flower_ani(info);
    }
    //提示出牌动画
    private tips_send_card_ani(bl){
        if(bl)this.view.tips_send_card_ani();
    }
    //玩家出牌动画
    private game_user_send_card(info){
        this.view.game_user_send_card(info);
    }
    //玩家打出去的牌 放大提示动画
    private game_max_card_tips(info){
        this.view.game_max_card_tips(info);
    }
    //吃碰杠胡过
    private cpgh_ani(info){
        this.view.cpgh_ani(info);
    }
    //吃碰杠胡过
    private liu_ju_ani(info){
        this.view.liu_ju_ani(info);
    }
    //杠分数动画
    private score_ani(info){
        this.view.score_ani(info);
    }

    //聊天动画;
    private play_chat_ani(info){
        this.view.show_chat_ani(info);
    }

    //清空动画场景
    private clear_ani_scene(){
        this.view.clear_ani_scene();
    }

}