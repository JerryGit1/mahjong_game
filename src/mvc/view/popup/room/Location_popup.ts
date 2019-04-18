/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
//定位

class Location_popup extends Base_popup{
    private model:Location_model;
    public constructor(model){
        super(true,true);
        this.model=model;
        //初始化视图;
        this.init_view();
        //初始化内容;
        this.init_content();
    }
    private init_view(){
        this.add_center_bg("p_user_view_Bg_png",701,402);
        this.add_close_btn("l_close_btn",{x:690,y:10});
        this.add_img_title("g_location_title",{x:350,y:40});
        this.open_ani();
    }

    private init_content(){
        //大层
        var big_sp=new egret.Sprite();
        this.center_sp.addChild(big_sp);
        //线层
        var line_sp=new egret.Sprite();
        big_sp.addChild(line_sp);
        //头像层
        var head_sp=new egret.Sprite();
        big_sp.addChild(head_sp);
        var w=500;
        var h=260;
        //显示头像
        var point_arr=[];
        for(var i in this.model.user_info_list){
            var head_view:User_head_view=new User_head_view();
            head_sp.addChild(head_view);
            head_view.create_rect_head(60,60,"head_bg");
            head_view.update_head_url(this.model.user_info_list[i].userImg);
            switch(Number(i)){
                case 0:
                    head_view.x=w/2;
                    head_view.y=h;
                    break;
                case 1:
                    head_view.x=w;
                    head_view.y=h/2;
                    break;
                case 2:
                    head_view.x=w/2;
                    head_view.y=0;
                    break;
                case 3:
                    head_view.x=0;
                    head_view.y=h/2;
                    break;
            }
            point_arr.push({
                x:head_view.x,
                y:head_view.y
            });
            if(this.model.user_info_list[i].userImg){
                this.add_nickname_txt(head_view,this.model.user_info_list[i].userName);
            }
        }
        //画线

        var txt_point=[
            {x:361,y:211,r:-28},
            {x:256,y:148},
            {x:102,y:191,r:28},
            {x:351,y:21,r:28},
            {x:119,y:103},
            {x:81,y:56,r:-28}
        ]

        for(var i in this.model.dis_list){
            var info=this.model.dis_list[i];
            line_sp.graphics.lineStyle(3,0xB3AC9C);
            if(info.dis){
                if(info.dis<300){
                    info.dis="<300m";
                    line_sp.graphics.lineStyle(4,0xff0000);//红色
                }else if(info.dis<1000){
                    info.dis="<1000m";
                    line_sp.graphics.lineStyle(4,0xff9900);//黄色
                }else{
                    if(info.dis>100*1000){
                        info.dis=">100公里";
                        line_sp.graphics.lineStyle(4,0x6F9967);//绿色
                    }else{
                        line_sp.graphics.lineStyle(4,0x6F9967);//绿色
                        info.dis+="m";
                    }
                }
            }else{
                line_sp.graphics.lineStyle(2,0xB3AC9C);
                info.dis="?";
            }
            var start_point=point_arr[info.p1-1];//玩家方位-1
            var over_point=point_arr[info.p2-1];//玩家方位-1
            line_sp.graphics.moveTo(start_point.x,start_point.y);
            line_sp.graphics.lineTo(over_point.x,over_point.y);
            var txt=new egret.TextField();
            line_sp.addChild(txt);
            txt.textColor=0x985451;
            txt.text=info.dis;
            txt.size=24;
            txt.x=over_point.x/2-start_point.x/2;
            txt.y=over_point.y/2-start_point.y/2;
            txt.rotation=txt_point[i]["r"];
            txt.x=txt_point[i].x;
            txt.y=txt_point[i].y;
        }
        big_sp.x=this.center_sp.width/2-big_sp.width/2;
        big_sp.y=this.center_sp.height/2-big_sp.height/2+40;

    }
    private add_nickname_txt(head_view,nickname){
        var sp=new egret.Sprite();
        this.addChild(sp);

        var bg=this.set_bit_center("g_name_bg",false);
        head_view.addChild(bg);
        bg.width=65;
        bg.x=-bg.width/2;
        bg.y=head_view.height/2-bg.height;

        var nick_name_txt=new egret.TextField();
        head_view.addChild(nick_name_txt);
        nick_name_txt.size=14;
        nick_name_txt.width=bg.width;
        nick_name_txt.textAlign="center";
        nick_name_txt.text=nickname;
        nick_name_txt.x=bg.x;
        nick_name_txt.y=bg.y+5;
    }


}