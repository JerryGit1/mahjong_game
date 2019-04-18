/**
 * Created by JackerCao on 2018-04-18.
 */

//加入房间View;
class Join_room_popup extends Base_popup{
    public EVENT:Popup_event_model=new Popup_event_model();//事件常量
    private input_box_arr;          //输入框背景;
    private input_btn_arr;          //数字按钮数组;
    private input_text_arr;         //文字数组;
    private input_num_arr;          //显示的数字数组;
    private index_box;              //当前输入第几个字;
    private userId;                 //当前输入第几个字;
    private room_id;                //房间号ID;

    protected NumberBtn:Array<any> = ["h_1_btn","h_2_btn","h_3_btn","h_4_btn","h_5_btn","h_6_btn","h_7_btn","h_8_btn","h_9_btn","h_0_btn","h_clear_btn","h_delete_btn"];
    protected NumberText:Array<any> = ["h_please_icon","h_transport_icon","h_enter_icon","h_room_icon","h_between_icon","h_number_icon"];

    public constructor(userId){
        super(true,true);
        this.userId=userId;
        this.input_box_arr=[];
        this.input_btn_arr=[];
        this.input_text_arr=[];
        this.input_num_arr=[];
        this.index_box=0;
        this.room_id="";

        //背景;
        this.init_content();
        //输入框背景;
        this.init_Input_box();
        //初始化按钮;
        this.init_btn_list();
    }
    //内容;
    private  init_content(){
        this.add_center_bg("p_join_room_bg_png",733,538);
        this.add_img_title("h_join_room_title",{x:366,y:0});
        this.add_close_btn("l_close_btn",{x:710,y:10});
        this.open_ani();
    }

    //初始化输入框;
    private init_Input_box(){
        for(let i=0;i<6;i++){
            var input_box=new egret.Bitmap(RES.getRes("h_input_bg"));
            input_box.x=60+i*110;
            input_box.y=80;
            this.center_sp.addChild(input_box);
            this.input_box_arr.push(input_box);

            var text_box=new egret.Bitmap(RES.getRes(this.NumberText[i]));
            text_box.x=input_box.x+12;
            text_box.y=input_box.y+10;
            this.center_sp.addChild(text_box);
            this.input_text_arr.push(text_box);

            var num_box=new egret.Bitmap();
            num_box.x=input_box.x+12;
            num_box.y=input_box.y+10;
            this.center_sp.addChild(num_box);
            this.input_num_arr.push(num_box);
        }
    }

    //初始化按钮;
    private init_btn_list(){
        for(let i=0;i<this.NumberBtn.length;i++){
            var btn=new MyButton(this.NumberBtn[i]);
            btn.x=110+i%4*170;
            btn.y=220+Math.floor(i/4)*110;
            btn.addTouchEvent();
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.input_btn_back,this);
            this.center_sp.addChild(btn);
            this.input_btn_arr.push(btn);
        }
    }

    //数字btn回调;
    private input_btn_back(e){
        var btn:MyButton= e.currentTarget;
        var btn_name=btn.get_name();
        switch(btn_name){
            case "h_delete_btn":      //删除;
                if(this.index_box>0){
                    this.index_box--;
                    this.input_num_arr[this.index_box].texture="";
                    this.room_id=this.room_id.substring(0,this.room_id.length-1);
                }

                if(this.index_box==0){
                    this.clear_all_num();
                }
                break;
            case "h_clear_btn":      //重输入;
                this.clear_all_num();
                break;
            default:
                this.hide_text();
                var num= btn_name.replace(/[^0-9]/ig,"");
                var url="h_"+num+"_num";
                if(this.index_box<6){
                    this.input_num_arr[this.index_box].texture=RES.getRes(url);
                    this.index_box++;
                    this.room_id+=""+num;
                }
                if(this.index_box==6){
                    //告诉服务器，我要加入房间
                    MyConsole.getInstance().trace("我要加入房间",0);
                    this.jion_room();
                    // this.close_click(); //关闭弹框
                    this.clear_all_num(); //清空用户输入的房间号部分

                }
                break;
        }
    }

    //清空所有输入的数字;
    private clear_all_num(){
        this.index_box=0;
        this.room_id="";
        for(let i=0;i<this.input_num_arr.length;i++){
            this.input_num_arr[i].texture="";
        }
        this.show_text();
    }

    //隐藏文字;
    private hide_text(){
        for(let i=0;i<this.NumberText.length;i++){
            this.input_text_arr[i].visible=false;
        }
    }

    //显示文字;
    private show_text(){
        for(let i=0;i<this.NumberText.length;i++){
            this.input_text_arr[i].visible=true;
        }
    }

    private jion_room(){
        var info={"userId":this.userId,"roomId":this.room_id};
        this.v_to_v_dis_event(this.EVENT.popup.join_room,info);
    }
}
