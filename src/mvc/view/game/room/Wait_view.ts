/**
 * Created by 周鹏斌大王 on 2018-04-17.
 */
class Wait_view extends Base_wait_view{
    private start_game_btn:MyButton;
    public constructor(_is_house_owner=false,rule_str=""){
        super();
        this.add_share_btn();//分享按钮
        this.add_leave_btn(_is_house_owner);//离开or解散按钮
        this.add_rule_txt(rule_str);//游戏规则
    }

    /**
     * 显示开局按钮状态
     * @param type  0人没有凑齐不显示 1显示
     */
    public update_start_btn(type=0){
        if(!this.start_game_btn){
            this.start_game_btn=new MyButton("openingBtn");
            this.addChild(this.start_game_btn);
            this.start_game_btn.x=this.share_btn.x;
            this.start_game_btn.y=this.share_btn.y;
            this.start_game_btn.addTouchEvent();
            this.start_game_btn.addEventListener("click",this.start_btn_click,this);
        }
        this.start_game_btn.visible=Boolean(type);
        this.share_btn.visible=!Boolean(type);
    }
    //--------------------事件-----------------------
    //发起开局
    private start_btn_click(){
        this.v_to_v_dis_event(this.EVENT.room.start_game);
    }
    public clear(){
        if(this.start_game_btn){
            this.start_game_btn.clear();
            this.start_game_btn.removeEventListener("click",this.start_btn_click,this);
        }
        this.start_game_btn=null;
        super.clear();
    }
}