/**
 * Created by 周鹏斌大王 on 2018-01-28.
 */
class Chat_3_view extends Chat_view{
    public constructor(w,h){
        super(w,h);
        this.c_type=3;
    }
    public init_view(w){
        var len =31,base1Y = 20,i,line,btnStr,chatBtn1;
        //chatBtn1=this.set_bit_center("game_face_1");
        var dis=20;
        var col=4;
        var cw=Math.floor(w/col-(col-1)*15);
        for(i=1;i<=len;i++){
            btnStr = "face_"+(i-1);
            //按钮
            chatBtn1 = this.create_one_chat_btn(btnStr);
            chatBtn1.x=20+(i-1)%col*(cw+dis)+cw/2+dis*2;
            chatBtn1.y = Math.floor((i-1)/col)*(cw+dis)+cw/2;
            chatBtn1.scaleX=chatBtn1.scaleY=cw/chatBtn1.width;//缩放
            this.add_view(chatBtn1,i);
        }
        //确保都能触发touch
        this.messageSprite.graphics.beginFill(0x00ff00,0);
        this.messageSprite.graphics.drawRect(0,0,this.width,this.messageSprite.height);
    }
}