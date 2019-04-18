/**
 * Created by 周鹏斌大王 on 2018-04-17.
 */
class Test_popup extends Base_popup{

    public constructor(){
        super(true,true);
        this.add_center_bg("b_p_comHitBg",400,400);
        this.add_txt_title("我谁谁");
        this.add_close_btn("b_p_closeBtn");
        this.open_ani();
    }

}