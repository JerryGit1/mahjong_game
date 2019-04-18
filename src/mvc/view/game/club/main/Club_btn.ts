/**
 * Created by zwb on 2018/5/15.
 * 俱乐部主页--按钮
 */
class Club_btn extends MyButton{
    public constructor(str,info:Club_base_model){
        super(str);

        // 俱乐部名字
        var txt=new egret.TextField();
        this.addChild(txt);
        txt.width=this.width;
        txt.anchorOffsetX=txt.width/2;
        txt.y=5;
        txt.textAlign="center";
        txt.size=35;
        this.addChild(txt);
        txt.text=info.clubName;

        // 主持人
        var txt=new egret.TextField();
        this.addChild(txt);
        txt.width=this.width;
        txt.size=25;
        txt.x=-45+62;
        txt.y=69;
        this.addChild(txt);
        txt.text=String(decodeURIComponent(info.clubUserName));

        // 人数
        var txt=new egret.TextField();
        this.addChild(txt);
        txt.width=this.width;
        txt.size=25;
        txt.x=-3;
        txt.y=101;
        this.addChild(txt);
        txt.text=info.allNums+"人";

    }
}