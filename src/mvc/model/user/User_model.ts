/**
 * Created by 周鹏斌大王 on 2017-12-26.
 * tyq: 玩家 （牌数据）
 */
class User_model extends Base_user_model{
    public EVENT:Base_event_model=new Base_event_model();//事件常量
    //上个动作
    private _last_action:Action_model;
    //当前动作
    private _current_action:Array<Action_model>;
    //当前是否是最新出牌人
    public is_new_send_card_user;
    private hun_code;//混ID
    //可操作手牌
    private _stop_card:Array<Base_card_model>;
    //吃碰杠手牌
    private _cpg_stop_card:Array<CPG_card_model>;
    //tyq: 花牌
    private _hua_card:Array<Base_card_model>;
    //tyq: 被替换的真实手牌  (前端自定义，开局补花动画需要)
    private _real_card:Array<Base_card_model>;
    //tyq: 定混牌 ---》在user_group_model的整体玩家牌设置---游戏开局中或断线重连中设置
    public dingHunPai;
    //桌牌
    private _play_card:Array<Base_card_model>;
    public stop_card_is_change=false;//手牌是否有数据变化
    public play_card_is_change=false;//桌牌是否有数据变化
    public hua_card_is_change=false;//花牌是否有数据变化
    public send_stop_card_info={x:0,y:0,w:0};//打出去手牌坐标
    public new_play_card_point:egret.Point=new egret.Point();//最新桌牌位置
    public max_play_card_point:egret.Point=new egret.Point();//打出去的牌 放大提示的位置
    //开始聊天时间
    public last_chat_time=0;
    public constructor(){
        super();
        this.init_card_data();
    }
    /*tyq: 初始化/清理 数据*/
    public init_card_data(_is_clear_base_info=true){
        this._last_action=this._current_action=null;
        this._stop_card=[];
        this._real_card = [];
        this._hua_card=[];
        this._cpg_stop_card=[];
        this._play_card=[];
        this.hun_code=null;
        this.stop_card_is_change=this.play_card_is_change=false;
        this._playStatus=this.CONST.USER_PLAY_STATUS.ROOM_IN;
        if(_is_clear_base_info)super.init_card_data();
    }
    //动作信息--------------------------------------------
    public set last_action(num:any){
        MyConsole.getInstance().trace("---->设置"+this.current_table_board_position+"号位上个动作信息->"+num);
        this._last_action=this.create_action_model(Number(num));
    }
    public get last_action(){
        return this._last_action;
    }
    public get current_action(){
        return this._current_action;
    }
    public set current_action(list){
        this._current_action=[];
        //多个吃 多个杠 在view层去处理了
        if(list){
            for(var i in list){
                var action_model=this.create_action_model(list[i]);
                if(action_model.type==this.CONST.PLAYER_ACTION.gang){//坑爹的 后端不会告诉是明杠还是暗杠 自己判断
                    var act_code=action_model.get_card_code_with_card_list(0);
                    if(this.get_card_num_with_base_stop_card(act_code)>=4){//手牌里边判断是暗杠还是明杠
                        action_model.type=this.CONST.PLAYER_ACTION.an_gang;
                    }else if(this.get_card_with_peng_stop_card(act_code)){//碰牌里边判断是碰杠还是点杠
                        action_model.ming_gang_type=this.CONST.MING_GANG_TYPE.peng_gang;//碰杠
                    }else{
                        action_model.ming_gang_type=this.CONST.MING_GANG_TYPE.dian_gang;//点杠
                    }
                }
                this._current_action.push(action_model);
            }
            //动作排序
            this.action_settle();
        }

    }
    public set_current_action_chi_card(code){//设置当前动作中吃的那张牌
        if(this._current_action)
        for(var i in this._current_action){
            if(this._current_action[i].type==this.CONST.PLAYER_ACTION.chi){
                this._current_action[i].action_card=code;
            }
        }
    }
    private create_action_model(action){
        return new Action_model(action,this.current_table_board_position);
    }
    //动作列表排序
    private  action_settle(){
        function sort_number(a:Action_model,b:Action_model){
            return a.type - b.type;
        }
        this._current_action.sort(sort_number);
    }
    //设置全部手牌--------------------------------------------
    public set stop_card(list){
        //不排序
        if(list){
            this._stop_card=[];
            for(var i in list){
                this._stop_card.push(this.create_base_card_model(list[i]));
            }
            this.stop_card_is_change=true;
        }
    }
    public get stop_card():Array<Base_card_model>{
        return this._stop_card;
    }
    //添加一张手牌
    public add_stop_card(code){
        //先排序
        this.stop_card_settle();
        if(!code)code=-1;
        this._stop_card.push(this.create_base_card_model(code));
        this.stop_card_is_change=true;
    }
    //删除-一张手牌
    public remove_stop_card(code){
        for(var i in this._stop_card){
            if(this._stop_card[i].act_code==code||Number(this._stop_card[i].act_code)==-1){
                this._stop_card.splice(Number(i),1);
                break;
            }
        }
        //排序
        this.stop_card_settle();

        this.stop_card_is_change=true;
    }
    //删除-一组手牌
    public remove_stop_cards(code_list){
        for(var i in code_list){
            this.remove_stop_card(code_list[i]);
        }
    }
    //手牌排序-----系统最新发的牌需要不加入排序
    public stop_card_settle(){
        function sort_number(a:Base_card_model,b:Base_card_model){
            if(a._is_hun&&!b._is_hun)return -1;
            if(!a._is_hun&&b._is_hun)return 1;
            return a.act_code - b.act_code;
        }
        this.stop_card.sort(sort_number);
    }
    //在有当前动作的情况下 找出手牌中 符合操作的牌列表
    public get_current_action_cpg_card_list(){
        var tips_card_code_list=[];//要提示的牌的列表
        //获取列表
        if(this.current_action){
            for(var i in this.current_action){
                var action_model:Action_model=this.current_action[i];
                if(action_model.card_list){//有可操作列表
                    //如果 要操作的牌 在手牌里 是要去掉的
                    var cpg_card=action_model.action_card;
                    //遍历
                    for(var s in action_model.card_list){
                        var card_model:Base_card_model=action_model.card_list[s];
                        if(card_model){
                            if(!cpg_card||card_model.act_code!=cpg_card.act_code){
                                add_code(card_model.act_code);
                            }
                        }
                    }
                }

            }
        }
        //添加一个code
        function add_code(code){
            for(var i in tips_card_code_list){
                if(tips_card_code_list[i]==code){
                    return;
                }
            }
            tips_card_code_list.push(code);
        }

        return tips_card_code_list;
    }
    //获取手牌中某张牌数量
    public get_card_num_with_base_stop_card(code){
        var num=0;
        for(var i in this._stop_card){
            if(this._stop_card[i].act_code==code){
                num++;
            }
        }
        return num;
    }
    //=========================花牌==========================
    //获取花牌插入的位置
    private get_hua_insert_index(len,stop_len):Array<any>{
        function check_random(arr,value,idx){
            for(var k=0;k<arr.length;k++){
                if(arr[k]==value&&idx!=k){
                    return false;
                }
            }
            return true;
        }
        var idx = [];
        for(var j=0;j<len;){
            idx[j] = Math.floor(Math.random()*stop_len);
            if(check_random(idx,idx[j],j)){
                j++;
            }
        }
        return idx;
    }
    //设置--花牌插入手牌
    public insert_hua_in_stop(){
        //临时插入 手牌中
        var len = this._hua_card.length,stop_len = this._stop_card.length;
        this.set_real_card();
        if(len==0) return ;

        if(this.current_table_board_position==1){
            var arr = this.get_hua_insert_index(len,stop_len);
            for(var j=0;j<arr.length;j++){
                this._stop_card[arr[j]] = this._hua_card[j];
            }
        }
    }
    //获取真实牌数据
    protected set_real_card(){
        this._real_card = [];
        for(var i in this._stop_card){
            this._real_card.push(this._stop_card[i]);
        }
    }
    //重置手牌
    public reset_real_card(){
        if(this._real_card && this._real_card.length>0){
            this._stop_card = this._real_card;
            this.stop_card_settle();
            this.stop_card_is_change=true;
        }
    }
    //设置花牌
    public set hua_card(list){
        if(list){
            this._hua_card=[];
            for(var i in list){
                this._hua_card.push(this.create_base_card_model(list[i]));
            }
            this.hua_card_is_change = true;
        }
    }
    public get hua_card():Array<Base_card_model>{
        return this._hua_card;
    }
    //花牌排序
    public hua_card_sort(){
        function sort_number(a:Base_card_model,b:Base_card_model){
            return a.act_code - b.act_code;
        }
        this.hua_card.sort(sort_number);
    }
    //将手牌中的花牌删掉
    public delete_hua_from_stop(){
        for(var i in this._hua_card){
            for(var j=this._stop_card.length-1;j>=0;j--){
                if(this.current_table_board_position==1 && this._hua_card[i].act_code == this._stop_card[j].act_code){
                    this._stop_card.splice(Number(j),j);
                    break;
                }else if(this.current_table_board_position!=1){
                    this._stop_card.splice(Number(j),j);
                    break;
                }
            }
        }
        this.stop_card_is_change=true;
    }

    //设置吃碰杠手牌--------------------------------------------
    public set cpg_stop_card(list:any){
        if(list){
            this._cpg_stop_card=[];
            // //处理长毛问题
            // this.set_zhang_mao(list);
            for(var i in list){
                if(typeof  list[i]=="number"){
                    this._cpg_stop_card.push(this.create_cpg_card_model(list[i]));
                }else{
                    this._cpg_stop_card.push(this.create_cpg_card_model(list[i].action,list[i].extra));//,list[i].num
                }
            }
            this.stop_card_is_change=true;
        }
    }
    // //处理长毛问题
    // public set_zhang_mao(list){
    //     var arr=[127,128,129,130];
    //     var arr_info;
    //     var brr=[131,132,133];
    //     var brr_info;
    //     for(var i:any=list.length-1;i>=0;i--){
    //         if(Number(list[i])==125){//找到东南西北的杠
    //             list[i]=arr_info={action:list[i]};
    //             arr_info.num=[0,0,0,0];
    //         }else if(Number(list[i])==126){//找到中发白的杠
    //             list[i]=brr_info={action:list[i]};
    //             brr_info.num=[0,0,0];
    //         }
    //     }
    //     for(var s=list.length-1;s>=0;s--){
    //         var _is;
    //         //查看 每个杠 各有几个 并从原始数组删除
    //         //先检测东南西北
    //         for(i in arr){
    //             if(arr[i]==Number(list[s])){
    //                 list.splice(s,1);
    //                 if(!arr_info){
    //                     MyConsole.getInstance().trace("重大失误,东南西北 长毛没有基础action",0);
    //                 }else{
    //                     //补杠次数递增
    //                     arr_info.num[i]++;
    //                 }
    //                 _is=true;
    //                 break;
    //             }
    //         }
    //         if(_is)continue;
    //         //先检测中发白
    //         for(i in brr){
    //             if(brr[i]==Number(list[s])){
    //                 list.splice(s,1);
    //                 if(!brr_info){
    //                     MyConsole.getInstance().trace("重大失误,中发白 长毛没有基础action",0);
    //                 }else{
    //                     brr_info.num[i]++;
    //                 }
    //                 break;
    //             }
    //         }
    //     }
    // }
    public get cpg_stop_card(){
        return this._cpg_stop_card;
    }
    //添加一组吃碰杠牌
    public add_cpg_stop_card(info){
        if(info){
            this._cpg_stop_card.push(this.create_cpg_card_model(info.action,info.extra));//,info.zm_list
            this.stop_card_is_change=true;
        }
    }
    //删除一组碰牌----点杠
    public remove_cpg_stop_card(code){
        for(var i in this._cpg_stop_card){
            if(this._cpg_stop_card[i].peng_card_code==code){
                this._cpg_stop_card.splice(Number(i),1);
                break;
            }
        }
    }
    //获取吃碰杠牌中  某张牌碰牌是否存在
    public get_card_with_peng_stop_card(code){
        var num=0;
        for(var i in this._cpg_stop_card){
            if(this._cpg_stop_card[i].peng_card_code==code){
                return true;
            }
        }
        return false;
    }
    //设置全部桌牌--------------------------------------------
    public set play_card(list){
        if(list){
            this._play_card=[];
            for(var i in list){
                this._play_card.push(this.create_play_card_model(list[i]));
            }
        }
    }
    public get play_card(){
        return this._play_card;
    }
    //添加一张桌牌
    public add_play_card(code){
        this._play_card.push(this.create_play_card_model(code));
        this.play_card_is_change=true;
    }
    //添加一张花牌
    public add_hua_card(code){
        this._hua_card.push(this.create_base_card_model(code));
        this.hua_card_is_change = true;
    }
    //删除一张桌牌--倒着删（吃碰杠后）
    public remove_play_card(code){
        for(var i=this._play_card.length-1;i>=0;i--){
            if(this._play_card[i].act_code==code){
                this._play_card.splice(Number(i),1);
                break;
            }
        }
        this.play_card_is_change=true;
    }
    //设置 基础手牌和桌牌中的混牌--------------此时才可进行排序  _settle是否排序 胡的时候不排序
    public set_hun_card(hun_code,_settle=true,type=""){
        if(hun_code){
            this.hun_code=hun_code;
            for(var i in this.stop_card){
                this.stop_card[i].set_hun(hun_code);
            }
            for(var i in this.play_card){
                this.play_card[i].set_hun(hun_code);
            }
        }
        //排序
        if(_settle)
            if(this.last_action&&this.last_action.type==this.CONST.PLAYER_ACTION.system_deal_card){//最后一张牌不加入排序
                var last_card=this.stop_card[this.stop_card.length-1];
                this.stop_card.splice(this.stop_card.length-1,1);//先舍弃
                this.stop_card_settle();//在排序
                this.stop_card.push(last_card);//再放进去
            }else{
                this.stop_card_settle();
            }
    }
    public check_is_hun(code){
        if(this.dingHunPai){
            var hun_code = this.dingHunPai+1;
            switch (this.dingHunPai){
                case 9: hun_code = 1;break;
                case 18: hun_code = 10;break;
                case 27: hun_code = 19;break;
                case 31: hun_code = 28;break;
                case 34: hun_code = 32;break;
                case 180:
                case 184: hun_code = 29;break;
                case 181:
                case 185: hun_code = 30;break;
                case 182:
                case 186: hun_code = 31;break;
                case 183:
                case 187: hun_code = 28;break;
            }
            if(code == hun_code) {
                this.set_hun_card(hun_code,true);
                return true;
            }
        }else{
            return false;
        }
        return false;
    }
    //-------------------------------------------------------
    //创建一张基础牌
    private create_base_card_model(code):Base_card_model{
        if(code!=-1&&this.current_table_board_position!=1){//回放模式下
            var card=new Base_card_model(code,this.CONST.CARD_TYPE.cpg_stop,this.current_table_board_position,this.hun_code);
            return card;
        }else{
            var card=new Base_card_model(code,this.CONST.CARD_TYPE.base_stop,this.current_table_board_position,this.hun_code);
            return card;
        }

    }
    //创建一组吃碰杠的牌
    private create_cpg_card_model(code,extra=null):CPG_card_model{//,zm_list=null
        var card=new CPG_card_model(code,extra,this.current_table_board_position);//,zm_list
        if(card.action_type==this.CONST.PLAYER_ACTION.gang || card.action_type==this.CONST.PLAYER_ACTION.an_gang){
            var len = card.card_model_list.length-1;
            card.is_ding_hun_pai = card.card_model_list[len].act_code == this.dingHunPai;
        }
        return card;
    }
    //创建一张桌牌
    private create_play_card_model(code):Play_card_model{
        var card=new Play_card_model(code,this.current_table_board_position,this.hun_code);
        return card;
    }
    //-----------------------更新动态视图-----------------------
    //设置头像踢人按钮
    public set_houseOwner_tiren(bl){
        this.m_to_c_dis_event(this.EVENT.user.set_tiren_btn,bl);
    }
    public clear(){
        this.init_card_data();
        super.clear();
    }
}