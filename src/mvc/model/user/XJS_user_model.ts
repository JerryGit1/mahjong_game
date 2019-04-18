/**
 * Created by 周鹏斌大王 on 2018-05-05.
 */
class XJS_user_model extends User_model{
    //胡牌类型定义表
    public win_info_list={
        1:"点炮",
        2:"自摸",
        3:"刻*",
        4:"杠开",
        5:"点炮胡",
        6:"无搭",
        7:"百搭胡",
        8:"",
        9:"庄家",
        10:""
    };
    public score_type;//计分方式  tyq: 前端自定义
    public score;//总分
    public gangScore;//杠分  tyq: 前端自定义
    public hu_score;//胡分  tyq: 前端自定义
    public hu_type=0;//1胡牌 2点炮 3自摸
    public hu_info_str;
    public is_cur:boolean = false;
    // public _cpg_stop_card;
    public constructor(){
        super();
    }
    // //设置 杠分 & 胡分
    // public set_gang_and_hu_score(info,is_dian){
    //     // if(is_win){
    //     //     this.hu_score = 1;
    //     //     this.gang_score = 0;
    //     // }else{
    //     //     if()
    //     //     this.hu_score = 0;
    //     //     if(this.score!=0) this.gang_score = this.c
    //     // }
    // }

    //设置 和牌 具体信息清单
    public set_win_info(info){
        this.hu_info_str="";
        if(info){
            var ke_num = 0;
            var ke_str = "";
            for(var i in info){
                var win = Number(info[i]);
                if(win==1 || win==2) continue; //1点炮，2自摸

                if(win==3){ //刻牌
                    ke_num ++;
                    ke_str = this.win_info_list[win]+ke_num;
                }else{
                    if(ke_str != ""){
                        this.hu_info_str+=ke_str+", ";
                        ke_str = "";
                    }
                    this.hu_info_str+=this.win_info_list[win];
                    if(Number(i)!=info.length-1)this.hu_info_str+=", ";
                }
                if(Number(i)==info.length-1 && ke_str!=""){
                    this.hu_info_str+=ke_str;
                }
            }
        }
    }
}