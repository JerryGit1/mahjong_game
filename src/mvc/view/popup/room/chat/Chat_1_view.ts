/**
 * Created by 周鹏斌大王 on 2018-01-28.
 */
class Chat_1_view extends Chat_view{

    public constructor(w,h){
        super(w,h);
        this.c_type=1;
    }
    public init_view(w){
        var len =6,base1Y = 20,i,line,btnStr,chatBtn1,dis=40;
        for(i=1;i<=len;i++){
            btnStr = "g_chat_local_sp"+i;
            //按钮
            chatBtn1 = this.create_one_chat_btn(btnStr);
            base1Y+=chatBtn1.height/2;
            chatBtn1.y = base1Y;
            base1Y+=chatBtn1.height/2;
            chatBtn1.x=w/2;
            this.add_view(chatBtn1,i);
            //线
            line = this.set_bit_center("g_chat_line");
            base1Y+=line.height/2+dis/2;
            line.y = base1Y;
            line.x = chatBtn1.x;
            base1Y+=line.height/2+dis/2;
            chatBtn1.graphics.beginFill(0x00ff00,0);
            chatBtn1.graphics.drawRect(-w/2,-(chatBtn1.height+dis)/2,w,chatBtn1.height+dis);
            this.messageSprite.addChild(line);
        }
    }
}