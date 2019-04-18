/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Popup_event_model extends Base_event_model{
    public popup={
        create_room:"create_room",                                          //创建房间;
        join_room:"join_room",                                              //加入房间;
        create_room_ok:"create_room_ok",                                    //创建房间ok;
        join_room_ok:"join_room_ok",                                        //加入房间成功;
        join_room_fail:"join_room_fail",                                    //加入房间失败;
        hall_achievement:"hall_achievement",                                //战绩信息;
        share_achievement:"share_achievement",                              //分享战绩;
        play_back_info:"play_back_info",                                    //牌桌回放;
        issue_info:"issue_info",                                            //代开数据;
        delete_user:"delete_user",                                          //删除用户;
        dissolution_room:"dissolution_room",                                //代开解散房间;
        qz_dissolution_room:"qz_dissolution_room",                          //强制解散房间;
        issue_history:"issue_history",                                      //代开历史;
        user_agree:"user_agree",                                            //用户协议;
        change_score:"change_score",                                        //更改房卡;
        XJS_wait_ok:"XJS_wait_ok",                                          //小结算OK;
        sponsor_DJS:"sponsor_DJS",                                          //发起大结算;
        share:"share",                                                      //分享;
        room_dissolution_room:"room_dissolution_room",                      //游戏解散房间;
        back_hall:"back_hall",                                              //返回大厅;
        float_alert:"float_alert",                                          //浮层;
        get_history_info:"get_history_info",                                //获取代开历史的数据;
        issue_room_star_game:"issue_room_star_game",                        //代开房间开始牌局;
	create_room_update_money:"create_room_update_money",                //创建房间扣除房卡
        create_replace_update_money:"create_replace_update_money",          //创建代开更新房卡
    };

    public socket={
        socket_close:"socket_close",                                        //网络关闭;
        socket_unusual:"socket_unusual",                                    //网络异常;
    }
    /*--------------------tyq: 房间内------------------------*/
    public popup_room = {
        sponsor_dissolve_room:"sponsor_dissolve_room",//设置弹框-》发起解散房间
        sponsor_DJS:"sponsor_DJS",//发起大结算
        chitchat:"chitchat",//聊天弹框
        location:"location",//定位弹框
        setup_popup:"setup_popup",//设置弹框
        share_popup:"share_popup",//分享弹框
        add_rule_pop:"add_rule_pop",//规则弹框
        sponsor_chat:"sponsor_chat",//发起聊天
        add_djs_pop:"add_djs_pop",//大结算弹框
        clear_btns:"clear_btns",//清空加入房间号
        add_xjs_pop:"add_xjs_pop",//小结算弹框
        r_room_dissolution_room:"r_room_dissolution_room",//四人-解散房间弹框
        XJS_wait_ok:"XJS_wait_ok",//小结算-准备-OK;
        is_agree_dissolve_room:"is_agree_dissolve_room", //是否同意解散房间
    }
    public dissolution_room={                                               //解散房间;
        is_agree_diss_room:"is_agree_diss_room",                               //是否同意解散房间;
    }

    public chat={
        click_sponsor_action:"click_sponsor_action",                        //点击文字回调;
        send_chat_status:"send_chat_status",                                //发送聊天;
    }

    public player_back={
        show_player:"show_player",                                          //回放;
    }
}