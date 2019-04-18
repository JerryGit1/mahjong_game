/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Game_event_model extends Base_event_model{
    public game={
        cut_hall_scene:"cut_hall_scene",//zpb:切换大厅场景
        cut_room_scene:"cut_room_scene",//zpb:切换房间中场景
        cut_club_scene:"cut_club_scene",//zwb:切换俱乐部场景
        game_back_hall_scene:"game_back_hall_scene",//从游戏场景返回大厅场景
        game_play_back_hall_scene:"game_play_back_hall_scene",//游戏回放返回大厅场景
        update_main_info:"update_main_info",
        share_play_game_back:"share_id_play_game_back",//分享播放游戏回放
    }
    public popup= {
        float_alert: "float_alert",             //浮层框
        user_info_pop:"user_info_pop",          //个人信息弹窗;
	create_room_update_money:"create_room_update_money", //创建房间时更新房卡
        create_replace_update_money:"create_replace_update_money"//创建代开更新房卡
    };

    //大厅代开;
    public issue={
        h_issue_delete_player:"h_issue_delete_player",      //大厅代开踢人;
    }
    //回放功能-事件--丹阳特有-不用合并
    public playback = {
        handle_playback_data:"handle_playback_data",//tyq: 处理回放文件数据
        start_play_back:"start_play_back",//tyq: 开始回放
        update_step:"update_step",//tyq: 更新回放步数
        next_playback_info:"next_playback_info",//tyq: 下一条回放数据
        xjs:"xjs",//tyq: 小结算
        clear_operation_view_btn:"clear_operation_view_btn",//tyq: 清空按钮层
        back_ok:"back_ok",//zpb:回放完成
    }
}