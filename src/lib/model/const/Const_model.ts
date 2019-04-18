/**
 * Created by 周鹏斌大王 on 2017-12-23.
 *
 * 常量model 所有静态变量都放这
 * 丹阳特有-不用合并
 */
class Const_model{
    /*zpb:单例 模式*/
    private static model:Const_model;
    public static getInstance(){
        if(!this.model){
            this.model=new Const_model();
        }
        return this.model;
    }

    /*单项常量*/
    public  GAME_NAME="丹阳推倒胡";//游戏名称
    public  SERVICE_VERSION="";//后端版本
    public  HTTP_HOST="";//服务器host地址
    public  IOS=false;//是否是ios手機
    public  PC=false;//是否是PC
    public  ISSCREEEN:boolean=false;//是否是锁定屏幕竖屏模式 横屏下会提示 旋转
    public  login_statistic = false;/*玩家登录统计*/
    public  version_type="release";//版本类型【demo（日志不会上传） alpha release】

    public  USER_repetitionLogin=false;//重复登录
    public  USER_turnLogin = false;//切换登录

    public  PLAYBACK_MODEL=false;/*回放模式下*/
    public  PLAYBACK_PAUSE=false;/*回放模式是否暂停*/
    public  PLAYBACK_SHARE_USERID;/*回放模式下分享人的id*/
    public  PLAYBACK_SHARE_INFO;/*分享回放的数据*/
    public USERID;      /*当前玩家userId*/
    public USERNAME;    /*当前玩家userName*/
    public  curr_is_silence_join=false;//是否通过分享的房间号加入
    public  marquee_tips="";//跑马灯内容


    public  CLUB_SHARE_ID;/*俱乐部Id*/
    public  HEART_TIME=8;/*心跳保持时间 秒*/


    /*場景状态*/
    public GAME_STARE={ //游戏场景
        LOAD:"load",//加载中
        HALL:"hall",//hall大厅
        ROOM:"room",//房间里
        CLUB:"club"//俱乐部
    };
    public club={
        request_join:"request_join",//申请加入状态
        request_cut_main_scene:"request_cut_main_scene",//申请切换俱乐部场景
        main_scene:"main_scene",//首页场景状态
        square_scene:"square_scene",//广场场景状态
    };
    public club_max_create_num=5;//最多创建加入中的牌桌数量


    //zpb:房间【加载】状态 (添加加载状态是因为在加入房间时如果直接切换界面会出错)*/
    public ROOM_LOAD_STATUS = {
        LOADING:-1,//未加载
        CUTSCENE:2,//加载中
        LOAD_OK:3,//zpb:加载完成
    };

    //zpb:房间【流程】状态
    public ROOM_STATUS = {
        INIT:-1,//初始化
        SHORT_BOARD:1,//缺人
        PLAY:2,//牌局中
        PREPARE:3, //小结算等待
        GAME_OVER:4,//大结算完毕或已解散
    };

    /*tyq: 房间中头像位置 准备阶段*/
    public HEAD_POS_wait = [
        {"x":Main.stageWidth/2,"y":Main.stageHeight/2+200},//1号
        {"x":Main.stageWidth/2+300,"y":Main.stageHeight/2},//右边
        {"x":Main.stageWidth/2,"y":Main.stageHeight/2-210},//上边
        {"x":Main.stageWidth/2-300,"y":Main.stageHeight/2},//左边
    ];
    /*tyq: 房间中头像位置 游戏阶段*/
    public HEAD_POS_game = [
        {"x":Main.stageWidth*0.06,"y":"动态设置"},//1号
        {"x":Main.stageWidth*0.95,"y":Main.stageHeight/2-Main.stageHeight*.1},//右边
        {"x":Main.stageWidth-170,"y":60},//上边
        {"x":Main.stageWidth*0.05,"y":Main.stageHeight/2-Main.stageHeight*.1},//左边
    ];

    //花牌位置
    public HUA_CARD_START_POINT=[
        {x:Main.stageWidth*0.17,y:Main.stageHeight*0.87},//一号位
        {x:Main.stageWidth*0.85,y:Main.stageHeight*0.72},//右边
        {x:Main.stageWidth*0.72,y:Main.stageHeight*0.25-24},//上边
        {x:Main.stageWidth*0.23,y:Main.stageHeight*0.28},//左边
    ];
    public HUA_CARD_DIS = 45;//花牌展示间距
    /*tyq: 房间中准备icon 提示*/
    public WAIT_TIP_POS = [
        {"x":Main.stageWidth/2,"y":Main.stageHeight/2+135},//1号
        {"x":Main.stageWidth/2+220,"y":Main.stageHeight/2},//右边
        {"x":Main.stageWidth/2,"y":Main.stageHeight/2-130},//上边
        {"x":Main.stageWidth/2-220,"y":Main.stageHeight/2},//左边
    ];

    /*tyq: 玩家动作*/
    public PLAYER_ACTION = {
        system_deal_card:-1,//系统发牌
        play_card:501,//出牌
        chi:1,//吃
        peng:2,//碰
        gang:3,//杠
        an_gang:4,//暗杠
        hu:6,//胡
        guo:7,//过
        hua:8,//补花
    };

    //特殊杠
    public ZHANG_MAO_TYPE={
        dnxb_zhang_mao:51,//东南西北长毛---------------------------只算分用到
        zfb_zhang_mao:52,//中发白长毛---------------------------只算分用到
        dnxb_bu_mao:53,//补毛---------------------------算分用到
        zfb_bu_mao:54,//补毛---------------------------算分用到
    }

    //杠-类型
    public MING_GANG_TYPE={
        dian_gang:31,//点杠---------------------------
        peng_gang:32,//碰杠---------------------------碰了之后 摸了一张相同牌组成的杠
    }

    //zpb:玩家【房间】状态
    public USER_PLAY_STATUS={
        HALL:1,//大厅
        ROOM_IN:2,//进入游戏
        PREPARED:3,//已准备
        GAME:4,//游戏中
        XJS:5,//小结算
        NONE:-1
    };

    //zpb:玩家【在线】状态*/
    public USER_LINE_STATE={
        ON_LINE:1,//上线
        OFF_LINE:2//下线
    };

    //zpb:玩家【牌】的类型
    public CARD_TYPE={
        play:1,//桌牌
        base_stop:2,//基础手牌
        cpg_stop:3,//吃碰杠的手牌
        an_g_stop:4,//暗杠的手牌,
        hua_card:5,//花牌
    };

    //胡牌类型
    public HU_WIN_TYPE = {
        // XIHU:1,       //稀胡
        // GANHU:2,      //干胡
        // GANLIGAN:3,   //干胡干
        // SANGAN:4,     //三干
        // SIGAN:5,      //四干
        // WUGAN:6,      //五干
        // QINGYISE:7,   //清一色
        // PENGPENGHU:8, //碰碰胡
        // ZHUANGJIA:9,  //庄家
        // ZIMO:10,      //自摸
        // DIANPAO:11,   //点炮
        // SANJIABI:12   //三家闭
    };

    //音效地址基础
    public SOUND_PATH_BASE="resource/sound/";
    //音效地址--牌
    public SOUND_PATH_CARD="card/";
    //音效地址--聊天
    public SOUND_PATH_CHAT="chat/";

    public SELF_CARD_WIDTH = Math.floor(Main.stageWidth/14);//自己手牌大小
    public SELF_CARD_HEIGHT=202*.96;

    //设置牌数据
    public CARD_INFO={
        base_stop_w_p1:0,//基础手牌宽度---1号位置
        base_stop_w_p3:0,//基础手牌宽度---3号位置
        base_stop_w_p2:0,//基础手牌宽度---2号位置--高度
        base_stop_w_p4:0,//基础手牌宽度---4号位置--高度
        base_stop_w_p2_start_Y:0,//手牌起始Y坐标
    }

    //风向坐标
    public LOCATION_POINT:egret.Point;
    public set_card_data(){
        var info=this.CARD_INFO;
        info.base_stop_w_p1=(Main.stageWidth-10*2)/13;//一号玩家的宽度
        info.base_stop_w_p3=(Main.stageWidth-250*2)/15;//三号玩家的宽度
        var self_card_h=106*(info.base_stop_w_p1/74);
        info.base_stop_w_p4=info.base_stop_w_p2=(Main.stageHeight-self_card_h*2)/8;//2/4号玩家的宽度
        info.base_stop_w_p2_start_Y=Main.stageHeight-Math.floor(self_card_h*1.5);

        //1号牌高度
        this.SELF_CARD_HEIGHT=self_card_h;
        //1号头像坐标
        this.HEAD_POS_game[0].y=Main.stageHeight-self_card_h-100;
        //风向坐标
        this.LOCATION_POINT=new egret.Point(Main.stageWidth/2,Main.stageHeight*.45);
    }


    /*格式化时间戳*/
    public formatting_timestamp(timestamp=null,is_type=1):string{
        let dateTime;
        if(timestamp){
            dateTime = new Date(Math.floor(timestamp));
        }else{
            dateTime = new Date();
        }
        let year = dateTime.getFullYear();
        let month = this.addPreZero(dateTime.getMonth()+1);
        let day = this.addPreZero(dateTime.getDate());

        let hours = this.addPreZero(dateTime.getHours());
        let minutes = this.addPreZero(dateTime.getMinutes());
        let seconds = this.addPreZero(dateTime.getSeconds());
        if(is_type==1){
            let createTime =  year +"-"+ month +"-" + day +" " + hours + ":" + minutes +":" + seconds;
            return createTime;
        }else if(is_type==2){
            let createTime = ""+ year+month+day+hours+ minutes+seconds;
            return createTime;
        }else if(is_type==3){
            let createTime = month +"-" + day +" " + hours + "-" + minutes +"-" + seconds;
            return createTime;
        }else{
            let createTime =  hours + "-" + minutes;
            return createTime;
        }
    }

    // 补零方法
    protected addPreZero(num){
        if(num<10){
            return '0'+num;
        }else {
            return num;
        }
    };
    public HEAD_WIDTH = 102;    
    public HEAD_HEIGHT = 122;
    //通过数据获取规则====>tyq: 不同游戏规则不一，不用合并
    public get_game_rule(data,type=null):string{
        var ruleStr, //存储玩法
        roomType="", //房间类型：1房主模式；2自由模式
        circleNum="", //圈数 2/4/8 (默认2)
        scoreType="", //计分方式：1出冲大宝；2出冲包三家；3陪冲；4不出冲
        huaType="", //玩法类型：1无花；2有花
        chiType=""; //玩法类型：1不可以吃；2可以吃

        if(Number(data.roomType)==1){roomType="房主模式,";}
        else if(Number(data.roomType)==2){roomType="代开模式,";}

        switch (Number(data.circleNum)){
            case 2:circleNum = "2圈 房卡X4,";break;
            case 4:circleNum = "4圈 房卡X6,";break;
            case 8:circleNum = "8圈 房卡X12,";break;
        }

        switch (Number(data.scoreType)){
            case 1:scoreType = "出冲大包,";break;
            case 2:scoreType = "出冲包三家,";break;
            case 3:scoreType = "陪冲,";break;
            case 4:scoreType = "不出冲,";break;
        }

        if(Number(data.huaType)==1){huaType="无花,";}
        else if(Number(data.huaType)==2){huaType="有花,";}

        if(Number(data.chiType)==1){chiType="不可以吃";}
        else if(Number(data.chiType)==2){chiType="可以吃";}

        ruleStr = circleNum+roomType+scoreType+huaType+chiType;//具体的玩法
        return ruleStr;
    }

}