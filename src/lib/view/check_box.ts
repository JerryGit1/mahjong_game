/**
 * Created by pc-20171125 on 2018/4/17.
 */

class Checkbox extends egret.Sprite{
    private select_btn;
    private select_img;
    private is_select=false;        //是否是选择状态;
    public constructor(btn_url="",img_url="",posY=null){
        super();
        this.init_sprite(btn_url,img_url,posY);
    }
    private init_sprite(btn_url,img_url,posY){
        this.select_btn=new egret.Bitmap(RES.getRes(btn_url));
        this.select_btn.y=5;
        this.addChild(this.select_btn);


        var img=new egret.Bitmap(RES.getRes(img_url));
        img.x=this.select_btn.x+this.select_btn.width+10;
        this.addChild(img);
        
        if(posY){
            img.y+=posY;
        }
    }
    //添加选择图片;
    public box_add_select_img(type){
        var pos={x:0,y:0};
        if(type==1){
            pos.x=3;
            pos.y=7;
            this.add_box_img("h_single_icon",pos);
        }else if(type==2){
            if(this.select_img){
                this.box_remove_select_img();
            }else {
                this.add_box_img("h_many_icon",pos);
            }
        }
    }

    //删除选择图片;
    public box_remove_select_img(){
        if(this.select_img){
            this.removeChild(this.select_img);
            this.select_img=null;
        }
        //没有被选中;
        this.is_select=false;
    }

    //添加box上面的图片;
    private add_box_img(url,pos){
        //添加;
        this.select_img=new egret.Bitmap(RES.getRes(url));
        this.select_img.x=pos.x;
        this.select_img.y=pos.y;
        this.addChild(this.select_img);
        //被选中;
        this.is_select=true;
    }

    //设置当前box状态;
    public set_select_type(flag){
        var pos={x:0,y:0};
        if(flag){
            this.add_box_img("h_many_icon",pos);
            this.is_select=true;
        }else {
            this.box_remove_select_img();
            this.is_select=false;
        }
    }

    //获取选择状态;
    public get_select_type(){
        return this.is_select;
    }
}