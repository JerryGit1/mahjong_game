/**
 * Created by 周鹏斌大王 on 2018-05-01.
 */
class Cpg_btn_view extends MyButton{


    public model_list:Array<Action_model>;
    public constructor(str,model_list){
        super(str);
        this.model_list=model_list;
    }


}