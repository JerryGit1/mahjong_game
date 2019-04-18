/**
 * Created by 周鹏斌大王 on 2018-04-18.
 */
class Room_info_model extends Base_model{
    public constructor(){
        super();
    }

    public userId;//房主 id
    public zhuangPlayer;// 庄家 id
    public position;//zpb:3.0API 风向
    private _userName;//房主昵称
    public set userName(str){
        this._userName=Base_user_model.get_char(str);
    }
    public get userName(){
        return this._userName;
    }
    public roomId;//房间号码
    private _state;//房间状态
    public set state(num){
        var _is_add=false;
        for(var i in this.CONST.ROOM_STATUS){
            if(Number(this.CONST.ROOM_STATUS[i])==Number(num)){
                this._state=Number(num);
                _is_add=true;
                break;
            }
        }
        if(!_is_add)MyConsole.getInstance().trace("重大失误,room_info_model-房间状态 没有此状态 "+num,0);
    }
    public get state(){
        return this._state;
    }
    public lastNum;//剩余圈数
    public _circleNum;//all圈数
    public get circleNum(){
        return this._circleNum;
    }
    public set circleNum(num){
        this._circleNum=num;
    }
    public currMJNum;//剩余麻将数
    public roomType;//房间类型
    public scoreType;//计分方式 1-出冲大包 2-出冲包三家 3-陪冲 4-不出冲
    public chiType;//是否允许吃牌 1-不允许 2-允许
    public huaType;//是否带花牌  1-无花 2-有花
    public xjst;//小局开始 服务器系统时间
    public init_data(data){
        //基础信息
        this.setParams(data);
        //规则信息
        this.set_rule(data);
    }


    //设置规则
    public rule_tips;
    private set_rule(info){
        this.rule_tips=this.CONST.get_game_rule(info);
    }
    //设置解散房间信息
    public dissolveRoom_model:Dissolve_room_model;
    public set_dissolveRoom_info(dissolveRoom,user_group_model:User_group_model){
        if(dissolveRoom){
            var base_info=dissolveRoom.othersAgree.concat();
            base_info.push({userId:dissolveRoom.userId,agree:1});
            // var base_info=[];
            // for(let i=0;i<dissolveRoom.othersAgree.length;i++){
            //     base_info.push(dissolveRoom.othersAgree[i]);
            // }
            // base_info.push({userId:dissolveRoom.userId,agree:1});

            this.dissolveRoom_model=new Dissolve_room_model();
            //发起人
            this.dissolveRoom_model.respond_user_name=user_group_model.user_id_get_user_model(dissolveRoom.userId).userName;
            //发起时间
            this.dissolveRoom_model.dissolveTime=dissolveRoom.dissolveTime;
            //列表
            this.dissolveRoom_model.user_list_model=user_group_model.get_diss_room_user_models(base_info)
        }else{
            this.dissolveRoom_model=null;
        }

    }
    //设置分享
    public set_share_info(cur_user_count=0,user_max_num=0){
        var roomId = ""+this.roomId;
        if(roomId.length==7){//俱乐部
            //设置大厅的分享链接
            Weixin_JSSDK_model.getInstance().hallShare();
        }else{
            var last_num = user_max_num-cur_user_count;
            //设置分享 （罗列开房选项）
            Weixin_JSSDK_model.getInstance().gameShare(this.roomId,this.rule_tips,last_num,this.userName);
        }
    }
    //设置混牌
    private _kai_hun;//开混的牌
    public hunPai;
    public set dingHunPai(num){
        this._kai_hun=Number(num);
        this.hunPai=this._kai_hun+1;
        if(this._kai_hun==9)this.hunPai=1;//万
        else if(this._kai_hun==18)this.hunPai=10;//饼
        else if(this._kai_hun==27)this.hunPai=19;//条
        else if(this._kai_hun==31)this.hunPai=28;//东-南
        else if(this._kai_hun==34)this.hunPai=32;//中-白
        else if(this._kai_hun==180 || this._kai_hun==184) this.hunPai = 29;
        else if(this._kai_hun==181 || this._kai_hun==185) this.hunPai = 30;
        else if(this._kai_hun==182 || this._kai_hun==186) this.hunPai = 31;
        else if(this._kai_hun==183 || this._kai_hun==187) this.hunPai = 28;
    }
    public get dingHunPai(){
        return this._kai_hun;
    }
    //出牌操作提示动画
    private _tips_card_ani=true;
    public get tips_card_ani(){
        if(this._tips_card_ani){
            this._tips_card_ani=false;
            return true;
        }
        return false;
    }
    public set tips_card_ani(bl){
        this._tips_card_ani=bl;
    }
    //----------------------动作----------------------
    //上个动作人
    public last_action_user;
    //上个动作
    public last_action;

    //当前动作人
    public current_action_user;
    //当前动作
    public current_action_list=[];

    //上个发牌人
    public lastFaUserId;
    //上个出牌人
    public lastChuUserId;
    public lastChuCard;//code

    //---------------------------IP冲突提示---------------------------------------------
    /*判断Ip冲突*/
    public check_ip_same(arr:Array<any>){
        var str = "";
        var str2 = "";
        for(var i=0;i<arr.length;i++){
            if(str.indexOf(arr[i].name)<0){
                for(var j=i+1;j<arr.length;j++){
                    if(arr[i].IP == arr[j].IP){
                        if(str.indexOf(arr[i].name)>-1){
                            str += ","+arr[j].name;
                            if(arr[j].name.lengh>5){
                                str2 += arr[j].name.substring(0,4)+"...";
                            }
                        }else{
                            if(str != "") str += ";";
                            if(str2 != "") str2 += ";";
                            str += arr[i].name+","+arr[j].name;

                            var tempI = arr[i].name.length>5?arr[i].name.substring(0,4)+"...":arr[i].name;
                            var tempJ = arr[j].name.length>5?arr[j].name.substring(0,4)+"...":arr[j].name;
                            str2 += tempI+","+tempJ;
                        }
                    }
                }
            }
        }
        if(str)return "本房间内 <font color='#D3820D'>"+str+"</font> IP相同";
        return null;
    }


    //----------------------------小结算清理-------------------------------------------
    public xjs_clear_info(){
        this.last_action_user=null;
        this.current_action_user=null;
        this.lastFaUserId=null;
        this.lastChuUserId=null;
        this.lastChuCard=null;
        this.hunPai=null;
        this._kai_hun=null;
        this.tips_card_ani=false;//出牌操作提示动画
    }
    //大结算清理
    public djs_clear_info(){
        this.circleNum=null;
        this.lastNum=null;
    }
}