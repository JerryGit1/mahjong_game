/**
 * Created by 周鹏斌大王 on 2017-12-26.
 * 玩家 （基础信息）
 */
class Base_user_model extends Base_model{

    protected _userId:number;//tyq: 用户id
    protected _userName:string;//tyq: 昵称
    protected _userImg:string;//tyq: 头像
    protected _position:number;//tyq: 方向
    protected _score:number=0;//tyq: 分数
    protected _gender:number=1;//tyq: 性别 1-男 2-女
    protected _ip:string;
    protected _joinIndex:number;//tyq: 进入房间顺序
    protected _userAgree:boolean;//tyq: 用户是否同意（针对包踹等动作）
    protected _money:number;//tyq: 用户当前余额
    protected _notice:string;//tyq: 系统跑马灯
    protected _state:number=1;//tyq: 在线or掉线状态   1在线 2-离线



    public houseOwner:boolean=false;//tyq: 房主
    public zhuang:boolean=false;//zpb:庄
    //zpb:当前第一人称视角下 这个类的玩家 位置/风向 当前游戏界面的所在位置 1-下 2-右 3-上 4-左 （当前玩家固定为1）
    public current_table_board_position:number=0;
    //zpb:当前位置是否有人
    public current_table_board_is_join=false;
    public paoIndex:number;
    protected _playStatus:number=-1; //tyq: 玩家状态   this.CONST.USER_PLAY_STATUS
    protected _is_action=false;//是否有动作--动画
    public constructor(){
        super();
    }
    /*
    * ========================参数初始化=========================
    * */
    //tyq: ID
    set userId(value:number) {
        var cv = Number(value);
        if(this._userId != cv){
            this._userId = cv;
        }
    }
    get userId():number {
        return this._userId;
    }

    //tyq: 昵称
    set userName(value: string) {
        if(this._userName != value){
            this._userName =Base_user_model.get_char(value);
        }
    }
    get userName(): string {
        return this._userName;
    }
    //zpb:科学截取文字
    public static get_char(str,len=5){
        var tt = String(decodeURIComponent(str));
        var bytesCount=0;
        for (var i = 0; i < tt.length; i++)
        {
            var c = tt.charAt(i);
            if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
            {
                bytesCount += 1;
            }
            else
            {
                bytesCount += 2;
            }
        }
        if(bytesCount>len*2+1){
            tt = tt.substring(0,len)+".";
        }
        return tt;
    }

    //tyq: 头像
    set userImg(value: string) {
        this._userImg = value;
    }
    get userImg(): string {
        return this._userImg;
    }

    //tyq: 玩家状态
    set playStatus(value: number) {
        if(this._playStatus!=value){
            this._playStatus = value;
           // this.m_to_c_dis_event(this.EVENT.user.update_user_playStatus);
        }
    }
    get playStatus(): number {
        return this._playStatus;
    }

    //tyq: 方位
    set position(value:number){
        var cv = Number(value);
        if(this._position != cv) {
            this._position = cv;
        }
    }
    get position():number{
        return this._position;
    }

    //tyq: 分数
    set score(value:number){
        var cv = Number(value);
        if(this._score != cv){
            this._score = cv;
        }
    }
    get score():number{
        return this._score;
    }

    //tyq: 性别
    set gender(value:number){
        var cv = Number(value);
        if(this._gender != cv){
            this._gender = cv;
        }
    }
    get gender():number{
        return this._gender;
    }

    //tyq: ip
    set ip(value:string){
        if(this._ip != value){
            this._ip = value;
        }
    }
    get ip():string{
        return this._ip;
    }

    //tyq: 进入房间顺序
    set joinIndex(value:number){
        var cv = Number(value);
        if(this._joinIndex != cv){
            this._joinIndex = cv;
        }
    }
    get joinIndex():number{
        return this._joinIndex;
    }

    //tyq: 用户是否同意（根据房间不同的playStatus，具备不同的意义）
    set userAgree(value:boolean){
        if(this._userAgree != value){
            this._userAgree = value;
        }
    }
    get userAgree():boolean{
        return this._userAgree;
    }

    //tyq: 用户当前余额
    set money(value:number){
        var cv = Number(value);
        if(this._money != cv){
            this._money = cv;
            //this.m_to_c_dis_event(this.EVENT.hall.update_money);
        }
    }
    get money():number{
        return this._money;
    }

    //tyq: 跑马灯
    set notice(value:string){
        if(this._notice != value){
            this._notice = value;
        }
    }
    get notice():string{
        return this._notice;
    }

    //tyq: 在线 or 掉线状态
    public state_change_timer;
    set state(value:number){
        this._state = value;
        this.m_to_c_dis_event(this.EVENT.user.update_online_status,this._state);
    }
    get state():number{
        return this._state;
    }
    //上线/掉线提示
    public online_tips(){
       // this.m_to_c_dis_event(this.EVENT.popup.floatAlert,{name:this._userName,type:"online_"+this._state});
    }
    //获取解散房间 时需要的玩家信息
   public get_dissolve_room_info(agree=0){
        return{
            userName:this._userName,//昵称
            userImg:this.userImg,//头像
            agree:agree,//0 还没操作  1同意 2拒绝
        }
   }
   public money_circleNum(num){
       var card_num;
       switch (Number(num)){
           case 2: card_num = 4;break;
           case 4: card_num = 6;break;
           case 8: card_num = 12;break;
       }
       return card_num;
   }

   public init_card_data(){
       this.userId=null;
       this._userName=null;
       this._userImg=null;
       this._position=null;
       this._score=0;
       this._gender=null;
       this._ip=null;
       this._joinIndex=null;
       this._userAgree=null;
       this._money=null;
       this._notice=null;
       this._state=null;
       this.houseOwner=false;
       this.zhuang=false;
       this.current_table_board_position=0;
       this.current_table_board_is_join=false;
       this.paoIndex=0;
       this._playStatus=-1;
       this._is_action=false;
   }
}