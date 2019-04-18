/**
 * Created by JackerCao on 2018/5/2.
 */

class Big_settle_view extends Base_view{
    private model:DJS_user_model;
    public constructor(model){
        super();
        this.model=model;
        this.init_view();
    }
    //初始化view;
    private init_view(){
        //用户头像;
        var user_head=new User_head_view();
        user_head.create_rect_head(80,80);
        user_head.update_head_url(this.model.userImg);
        this.addChild(user_head);

        //如果是自己，则加上头像框;
        if(this.model.userId==this.CONST.USERID){
            var head_kuang=new egret.Bitmap(RES.getRes("g_cur_head"));
            head_kuang.anchorOffsetX=head_kuang.width/2;
            head_kuang.anchorOffsetY=head_kuang.height/2;
            head_kuang.x=user_head.x;
            head_kuang.y=user_head.y;
            this.addChild(head_kuang);
        }

        //用户昵称;
        var user_name=new egret.TextField();
        user_name.size=20;
        user_name.text=this.model.userName;
        user_name.x=51;
        user_name.y=-22;
        user_name.textColor=0xfce0b9;
        user_name.bold = true;
        this.addChild(user_name);

        //用户ID;
        var user_id=new egret.TextField();
        user_id.size=16;
        user_id.text="ID: "+this.model.userId;
        user_id.x=51;
        user_id.y=15;
        user_id.textColor=0xffe868;
        user_id.bold = true;
        this.addChild(user_id);

        var txt_X = -30,txt_Y=95;
        //胡牌次数text
        var hupai_num_text=new egret.TextField();
        hupai_num_text.size=28;
        hupai_num_text.text="胡牌次数:"+this.model.huNum;
        hupai_num_text.x=txt_X;
        hupai_num_text.y=txt_Y;
        hupai_num_text.bold = true;
        this.addChild(hupai_num_text);

        txt_Y+=60;
        //自摸次数text
        var zimo_num_text=new egret.TextField();
        zimo_num_text.size=28;
        zimo_num_text.text="自摸次数:"+this.model.ziMoNum;
        zimo_num_text.x=txt_X;
        zimo_num_text.y=txt_Y;
        zimo_num_text.bold = true;
        this.addChild(zimo_num_text);

        txt_Y+=60;
        //点炮次数text
        var dianpao_num_text=new egret.TextField();
        dianpao_num_text.size=28;
        dianpao_num_text.text="点炮次数:"+this.model.dianNum;
        dianpao_num_text.x=txt_X;
        dianpao_num_text.y=txt_Y;
        dianpao_num_text.bold = true;
        this.addChild(dianpao_num_text);

        txt_Y+=60;
        //杠次数text
        var gang_num_text=new egret.TextField();
        gang_num_text.size=28;
        gang_num_text.text="杠的次数:"+this.model.gangNum;
        gang_num_text.x=txt_X;
        gang_num_text.y=txt_Y;
        gang_num_text.bold = true;
        this.addChild(gang_num_text);


        //分数;
        var score_num=new egret.TextField();
        score_num.size=36;
        score_num.text=""+this.model.score;
        score_num.width=Main.stageWidth/4;
        score_num.textAlign="center";
        score_num.x=-96;
        score_num.y=368;
        score_num.bold = true;
        this.addChild(score_num);

        if(this.model.score>=0){
            score_num.textColor=0xff5806;
            score_num.text="+"+this.model.score;
            if(this.model.score==0){
                score_num.text=""+this.model.score;
            }
        }else {
            score_num.textColor=0x81e90b;
            score_num.text=""+this.model.score;
        }

        //是否是大赢家;
        if(this.model.is_big_win){
            var big_win=new egret.Bitmap(RES.getRes("g_big_win"));
            this.addChild(big_win);
            big_win.x=-104;
            big_win.y=-74;
        }

        //是否是最佳炮手;
        if(this.model.is_pao){
            var pao_img=new egret.Bitmap(RES.getRes("g_pao_img"));
            pao_img.x=68;
            pao_img.y=294;
            this.addChild(pao_img);
        }

        //是否是房主;
        if(this.model.houseOwner){
            var houseOwner=new egret.Bitmap(RES.getRes("g_host"));
            houseOwner.x=-4.5;
            houseOwner.y=-66;
            this.addChild(houseOwner);
        }

        //zwb:添加分割线   5.17-15:54
        //分割线
        var dividingline=this.set_bit_center("g_djs_dividingline");
        dividingline.x=Main.stageWidth/4-86;
        dividingline.y=250;
        this.addChild(dividingline);
    }
}