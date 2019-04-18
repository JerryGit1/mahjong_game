/**
 * Created by JackerCao on 2018/4/17.
 */

class CheckboxArr extends egret.Sprite{
    public box_type;
    public box_arr;
    //CJ:PosY:美术切图的时候感觉上下位置有点偏差，所以弄了一个y更改一点坐标;
    public constructor(arrInfo,posY=null){
        super();
        this.box_arr=[];
        this.resolve_info(arrInfo,posY);
    }

    private resolve_info(checkBox_arr,posY=null){
        //type:1 单选   2多选;
        this.box_type=checkBox_arr.type;
        var box_url="";
        if(this.box_type==1){
            box_url="h_single_btn";
        }else if(this.box_type==2){
            box_url="h_many_btn";
        }
        var arr=checkBox_arr.checkBox_arr;
        //box数量；
        var checkBox_leng=arr.length;
        for(let i=0;i<checkBox_leng;i++){
            var box=new Checkbox(box_url,arr[i].img,posY);
            box.x=160*(i%4+1);
            box["index"]=i;
            box.y=60*Math.floor(i/4);
            this.addChild(box);
            this.box_arr.push(box);
            box.touchEnabled=true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch_box_back,this);
        }
    }
    //box的点击事件;
    private touch_box_back(e){
        var box:Checkbox = e.currentTarget;
        //单选;
        if(this.box_type==1){
            for(let i=0;i<this.box_arr.length;i++){
                this.box_arr[i].box_remove_select_img();
            }
        }

        
        box.box_add_select_img(this.box_type);
    }

    //设置默认选择;
    public set_default_select(default_arr){
        for(let i=0;i<default_arr.length;i++){
            if(this.box_arr[default_arr[i]])this.box_arr[default_arr[i]].box_add_select_img(this.box_type);
        }
    }

    //获取当前选择;
    public get_arr_select_index_select(){
        if(this.box_type==1){
            for(let i=0;i<this.box_arr.length;i++){
                if(this.box_arr[i].is_select){
                    return i+1;
                }
            }
        }else if(this.box_type==2){
            var arr={};
            for(let i=0;i<this.box_arr.length;i++){
                if(this.box_arr[i].is_select){
                    arr[i]="1";
                }else {
                    arr[i]="0";
                }
            }
            return arr;
        }
    }
}