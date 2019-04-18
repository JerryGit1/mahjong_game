/**
 * Created by 周鹏斌大王 on 2018-04-26.
 */
class Base_card_model extends Base_model{

    public act_code=0;//初始 值 牌的行为编码
    public _is_hun=false;//是否是混牌
    public view_type;//牌类型 ;this.CONST.CARD_TYPE  1桌牌  2普通手牌 3吃碰杠手牌 4暗杠手牌
    public view_position;//牌对应的玩家方位
    public view_status;//牌状态 普通  亮 灰
    public constructor(code,view_type,postion,hun_code=null){
        super();
        this.act_code=code;

        this.view_type=view_type;
        this.view_position=postion;
        this.set_hun(hun_code);
        if(typeof this.act_code=="undefined")MyConsole.getInstance().trace("重大失误,act_code不能为空",0);
    }
    //设置混牌
    public set_hun(code){
        if(Number(code)==Number(this.act_code)){
            this._is_hun=true;
        }else{
            this._is_hun=false;
        }
    }
    //---------------------------吃碰杠行为编码--------------------------------
    public static act_code_get_info(act_code){
        //分类
        var type;
        var card_type=Const_model.getInstance().PLAYER_ACTION;
        if(Number(act_code)>=1 && Number(act_code)<=34){
            type = card_type.play_card;
        }else if(Number(act_code)==-1){
            type = card_type.system_deal_card;
        }
        else if(Number(act_code)==-2){
            type = card_type.an_gang;
        }else if(Number(act_code)>=35 && Number(act_code)<=56){
            type = card_type.chi;
        }else if(Number(act_code)>=57 && Number(act_code)<=90){
            type = card_type.peng;
        }else if(Number(act_code)>=91 && Number(act_code)<=124){//杠
            type = card_type.gang;
        }else if(Number(act_code)>=180 && Number(act_code)<=187){
            type = card_type.hua;
        }else if(Number(act_code)==-1000){//前端自定义 无动作
            type = -1000;
        }else if(Number(act_code)==0){//过
            type = card_type.guo;
        }else if(Number(act_code)==500){//胡
            type = card_type.hu;
        }else if(Number(act_code)==501){//出牌
            type = card_type.play_card;
        }else{
            MyConsole.getInstance().trace("重大失误，未知的-发牌出牌吃碰杠行为编码-"+act_code,0);
        }
        //牌列表 副本
        var card_list;
        if(this.action_route[String(act_code)])card_list=this.action_route[String(act_code)].concat();
        return{
            type:type,
            card_list:card_list
        }

    }
    //获取一张牌是 中发白补毛还是东南西北补毛
    public static get_card_bumao_type(act_code){
        if(Number(act_code)>=28 && Number(act_code)<=31){
            return Const_model.getInstance().ZHANG_MAO_TYPE.dnxb_bu_mao;
        }else if(Number(act_code)>=32 && Number(act_code)<=34){
            return Const_model.getInstance().ZHANG_MAO_TYPE.zfb_bu_mao;
        }else{
            MyConsole.getInstance().trace("未知的补毛类型-"+act_code,0);
        }
        return null;
    }


    private static action_route = {
        //暗杠
        "-2":[-2,-2,-2,-2],
        //吃
        "35":[1,2,3],
        "36":[2,3,4],
        "37":[3,4,5],
        "38":[4,5,6],
        "39":[5,6,7],
        "40":[6,7,8],
        "41":[7,8,9],
        "42":[10,11,12],
        "43":[11,12,13],
        "44":[12,13,14],
        "45":[13,14,15],
        "46":[14,15,16],
        "47":[15,16,17],
        "48":[16,17,18],
        "49":[19,20,21],
        "50":[20,21,22],
        "51":[21,22,23],
        "52":[22,23,24],
        "53":[23,24,25],
        "54":[24,25,26],
        "55":[25,26,27],
        "56":[32,33,34],

        //碰
        "57":[1,1,1],
        "58":[2,2,2],
        "59":[3,3,3],
        "60":[4,4,4],
        "61":[5,5,5],
        "62":[6,6,6],
        "63":[7,7,7],
        "64":[8,8,8],
        "65":[9,9,9],

        "66":[10,10,10],
        "67":[11,11,11],
        "68":[12,12,12],
        "69":[13,13,13],
        "70":[14,14,14],
        "71":[15,15,15],
        "72":[16,16,16],
        "73":[17,17,17],
        "74":[18,18,18],
        "75":[19,19,19],
        "76":[20,20,20],
        "77":[21,21,21],
        "78":[22,22,22],
        "79":[23,23,23],
        "80":[24,24,24],
        "81":[25,25,25],
        "82":[26,26,26],
        "83":[27,27,27],
        "84":[28,28,28],
        "85":[29,29,29],
        "86":[30,30,30],
        "87":[31,31,31],
        "88":[32,32,32],
        "89":[33,33,33],
        "90":[34,34,34],

        //杠
        "91":[1,1,1,1],
        "92":[2,2,2,2],
        "93":[3,3,3,3],
        "94":[4,4,4,4],
        "95":[5,5,5,5],
        "96":[6,6,6,6],
        "97":[7,7,7,7],
        "98":[8,8,8,8],
        "99":[9,9,9,9],
        "100":[10,10,10,10],
        "101":[11,11,11,11],
        "102":[12,12,12,12],
        "103":[13,13,13,13],
        "104":[14,14,14,14],
        "105":[15,15,15,15],
        "106":[16,16,16,16],
        "107":[17,17,17,17],
        "108":[18,18,18,18],
        "109":[19,19,19,19],
        "110":[20,20,20,20],
        "111":[21,21,21,21],
        "112":[22,22,22,22],
        "113":[23,23,23,23],
        "114":[24,24,24,24],
        "115":[25,25,25,25],
        "116":[26,26,26,26],
        "117":[27,27,27,27],
        "118":[28,28,28,28],
        "119":[29,29,29,29],
        "120":[30,30,30,30],
        "121":[31,31,31,31],
        "122":[32,32,32,32],
        "123":[33,33,33,33],
        "124":[34,34,34,34],
        "125":[28,29,30,31],
        "126":[32,33,34],

        //花牌--丹阳特有-不用合并
        "180":[180],//春
        "181":[181],//夏
        "182":[182],//秋
        "183":[183],//冬
        "184":[184],//梅
        "185":[185],//兰
        "186":[186],//竹
        "187":[187],//菊
    }
}