/**
 * Created by 周鹏斌大王 on 2018-05-01.
 */
class Action_model extends Base_model{
    private _type;//类型  this.CONST.PLAYER_ACTION
    public ming_gang_type;//明杠类型 this.CONST.MING_GANG_TYPE
    private _code;//具体值
    private _card_list;//牌列表
    private _action_card;//具体要吃 碰 杠 胡的牌
    public position;//动人人的相对方位 回放用
    public constructor(action_data,position){
        super();
        var action_info;
        if(typeof action_data=="number"){//碰 杠 旋风杠
            action_info=Base_card_model.act_code_get_info(action_data);
            this._code=action_data;
        }else{//吃
            action_info=Base_card_model.act_code_get_info(action_data.action);
            this._code=action_info.action;
            //吃的具体那张牌
            if(action_data.extra)this._action_card=new Base_card_model(action_data.extra,this.CONST.CARD_TYPE.base_stop,1);
        }
        //类型
        this._type=action_info.type;
        //操作的牌 列表
        if(action_info.card_list){
            this._card_list=[];
            for(var i in action_info.card_list){
                this._card_list.push(new Base_card_model(action_info.card_list[i],this.CONST.CARD_TYPE.base_stop,1));
            }
        }
        //方位
        this.position=position;
    }

    public get type(){
        return this._type;
    }
    public set type(type){
        this._type=type;
    }
    public get code(){
        return this._code;
    }
    public get card_list(){
        return this._card_list;
    }
    public get_card_code_with_card_list(key){//获取某张牌的code
        if(this._card_list&&this._card_list.length>key){
            return this._card_list[key].act_code;
        }
    }
    public get action_card(){
        return this._action_card;
    }
    public set action_card(code){
        this._action_card=new Base_card_model(code,this.CONST.CARD_TYPE.base_stop,1);
    }
    //-----------------------吃碰杠胡 整理手牌时候用-----------------------
    //吃的动作牌列表中 获取他自己有的牌
    public get_chi_card_list(extra){
        var arr=[];
        if(extra)this._action_card=new Base_card_model(extra,this.CONST.CARD_TYPE.base_stop,1);
        for(var i in this._card_list){
            if(Number(this._card_list[i].act_code)!=Number(extra)){
                arr.push(Number(this._card_list[i].act_code));
            }
        }
        if(arr.length!=2){
            MyConsole.getInstance().trace("重大失误,在某个吃的行为ID对应牌列表,没有找到吃的那张牌",0);
        }
        return arr;
    }
    //碰的动作牌列表中 获取他自己有的牌
    public get_peng_card_list(){
        var act_code=Number(this._card_list[0].act_code);//单牌数值
        return [act_code,act_code];
    }
    //明杠的动作牌列表中 获取他自己有的牌
    public get_gang_card_list(cpg_card_list=null){
        var act_code=this.get_gang_card_code();//单牌数值
        var _is_peng_gang = this.handle_is_peng_gang(cpg_card_list,act_code);
        if(_is_peng_gang) return [act_code];
        else return [act_code,act_code,act_code];
    }
    //判断是否为碰杠
    private handle_is_peng_gang(cpg_card_list:Array<CPG_card_model>,act_code):boolean{
        var is_peng_gang=false;
        for(var i=0;i<cpg_card_list.length;i++){ //cur_mj_cpg_list=吃碰杠的牌
            if(cpg_card_list[i] && cpg_card_list[i].action_type == this.CONST.PLAYER_ACTION.peng){ //动作等于碰时
                var peng_card = cpg_card_list[i].card_model_list[0].act_code; //找到碰的那张牌
                var gang_card = act_code; //找到杠的那张牌
                if(peng_card == gang_card){ //当碰牌等于杠牌
                    is_peng_gang=true;
                    break;
                }
            }
        }
        return is_peng_gang;
    }
    //单牌数值
    public get_gang_card_code(){
        return Number(this._card_list[0].act_code);//单牌数值
    }
    //长毛的动作牌列表中 获取他自己有的牌
    public get_zhang_mao_card_list(){
        var arr=[];
        for(var i in this._card_list){
            arr.push(Number(this._card_list[i].act_code))
        }
        return arr;
    }
    //暗杠的动作牌列表中 获取他自己有的牌
    public get_an_gang_card_list(extra){
        if(!extra){
            //其他人视角
            return [-1,-1,-1,-1];
        }else{
            //自己视角
            var action_info=Base_card_model.act_code_get_info(extra);
            return action_info.card_list;
        }

    }

}