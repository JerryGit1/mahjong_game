/**
 * Created by 周鹏斌大王 on 2017-12-23.
 */
class Base_event_model{
    //基础事件--------------切记这块很少用到在这定义 要慎重思考
    //其他层的事件 有自己各自的
    public base={
        parent_add_view:"parent_add_view",//control 从父级添加视图
        parent_remove_view:"parent_remove_view",//control 从父级移除视图
        load_resource_start:"load_resource_start",//开始请求资源加载
        load_resource_ok:"load_resource_ok",//资源加载完毕

        //俱乐部
        base_float_alert:"base_float_alert",//浮层框
        create_club_room_popup:"create_club_room_popup",//俱乐部创建房间弹框
        join_club_room_popup:"join_club_room_popup",//俱乐部加入房间弹窗

        hall_to_club_join_id:"hall_to_club_join_id",//大厅通知俱乐部有一个加入俱乐部的ID
        hall_to_club_cut_scene:"hall_to_club_cut_scene",//大厅通知俱乐部切换俱乐部场景
        club_back_hall_scene:"club_back_hall_scene",//俱乐部返回大厅
        sure_club_join_room:"sure_club_join_room",//俱乐部确认加入房间
        sure_club_create_room:"sure_club_create_room",//俱乐部确认创建房间
        club_my_info_popup:"club_my_info_popup",//我的信息弹窗
        club_get_my_info:"club_get_my_info",//获取我的信息
        club_update_my_info:"club_update_my_info",//战绩翻页刷新视图
        club_request_leave_popup:"club_request_leave_popup",//申请离开弹窗

        popup_create_room_ok:"popup_create_room_ok",//创建房间成功
        issue_success:"issue_success",//创建代开成功跳转代开
        popup_join_room_ok:"popup_join_room_ok",//加入房间成功
        popup_join_room_fail:"popup_join_room_fail",//加入房间失败
        update_main_info:"update_main_info",//更新大接口
        DJS_back_hall:"DJS_back_hall",//大结算返回大厅;
        playback_cut_game:"playback_cut_game",//回放切换游戏场景
        playback_half_over:"playback_half_over",//回放中途播完（房间申请了解散房间）

        clear_ani_scene:"clear_ani_scene",//清空动画场景
        clear_popup_scene:"clear_popup_scene",//清空弹窗场景

        is_show_player_back_pop:"is_show_player_back_pop",          //是否显示战绩pop;
    };
    //弹窗
    public base_popup={
        look_user_info:"look_user_info",//查看用户信息
        pay_user_info:"pay_user_info",//用户充值弹窗
        add_create_room_pop:"add_create_room_pop",//创建房间
        add_join_room_pop:"add_join_room_pop",//加入房间
        pay_user_money:"pay_user_money",//充值;
        record:"record",                //战绩;
        club_request_join:"club_request_join",//俱乐部-申请加入
        suqare_leave_popup:"suqare_leave_popup",//俱乐部-申请离开
        add_my_info:"add_my_info",//俱乐部-我的成绩
        club_add_my_info:"club_add_my_info",//俱乐部-我的成绩-数据刷新
        club_play_back_info:"club_play_back_info",//俱乐部-战绩回放
        issue:"issue",//代开
        hint:"hint",//通用弹窗;
        add_user_Agree_pop:"add_user_Agree_pop",        //用户协议;
        help:"help",                                    //帮助;
        setting:"setting",                              //设置;
        share:"share",                                  //分享;
    };
    //user_model
    public user={
        set_tiren_btn:"set_tiren_btn",//设置踢人按钮
        update_online_status:"update_online_status",//更新在线状态
    }

    public hall_issue={
        hall_issue_delete_player:"hall_issue_delete_player"
    }

    //pop广播到hall的按钮回调;
    public pop_to_hall={
        game_create_room_back:"game_create_room_back",           //创建按钮回调;
        user_agree_back:"user_agree_back",                      //同意用户协议按钮回调;
        join_room_back:"join_room_back",                        //加入房间按钮回调;
        pop_change_money:"pop_change_money",                    //pop改变房卡数量;
    }

    public room_to_hall={
        room_change_money:"room_change_money",                    //房间改变房卡数量;
    }

    public room_to_pop={
        add_setting_pop:"add_setting_pop",                            //游戏添加设置pop;
        add_rule_pop:"add_rule_pop",                                  //游戏添加规则pop;
        add_location_pop:"add_location_pop",                          //游戏添加定位pop;
        add_chitchat_pop:"add_chitchat_pop",                          //游戏添加聊天pop;
        add_djs_pop:"add_djs_pop",                                    //大结算pop;
        add_xjs_pop:"add_xjs_pop",                                    //小结算pop;
        xjs_wait_ok:"xjs_wait_ok",                                    //小结算准备OK;
        r_room_dissolution_room:"r_room_dissolution_room",            //房间解散房间回应;
    }

    public pop_to_room={
        room_dissolution_room:"room_dissolution_room",                  //申请解散房间;
        is_agree_diss_room:"is_agree_diss_room",                        //是否同意解散房间;
        pop_sponsor_DJS:"pop_sponsor_DJS",                              //发起大结算;
        chat_status:"chat_status",                                      //发送聊天;
    }

    public pop_to_game={
        show_player_back:"show_player_back"
    }
    
    //动画
    public room_ani={
        start_ani:"start_ani",//开场动画
        kai_hun_ani:"kai_hun_ani",//开混动画
        tips_send_card_ani:"tips_send_card_ani",//提示出牌动画
        user_send_card:"user_send_card",//玩家出牌动画
        max_card_tips:"max_card_tips",//出的牌放大提示动画
        cpgh_ani:"cpgh_ani",//吃碰杠胡动画
        liu_ju_ani:"liu_ju_ani",//流局动画
        score_ani:"score_ani",//分数动画
        play_chat_ani:"play_chat_ani", //播放聊天动画;
        start_flower_ani:"start_flower_ani",//开局补花动画
    }
}