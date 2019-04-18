/**
 * Created by Tang on 2018/1/8.
 */
class Route_model{
    private service_to_local_list:Array<any> = [];
    private local_to_service_list:Array<any> = [];
    private fields_analysis_list=[];
    /*tyq: 解析接受到的服务器内容*/
    public  get_server_to_local_by_route(data){
        for(var key in data){
            var _isArray = Array.isArray(data[key]);
            if(_isArray && typeof (data[key][0])=="object"){
                for(var i in data[key]){
                    this.get_server_to_local_by_route(data[key][i]);
                }
            }else if(typeof (data[key]) == "object"){
                this.get_server_to_local_by_route(data[key]);
            }
            var newKey = this.get_server_new_key(key);
            if(newKey){
                data[newKey] = data[key];
                if(newKey!=key) delete data[key];
            }else{
                data[key] = data[key];
            }
        }
        return data;
    }
    /*tyq: 解析本地发起的数据*/
    public  get_local_to_server_by_route(data){
        // var tempData = JSON.parse(JSON.stringify(data));
        for(var key in data){
            var _isArray = Array.isArray(data[key]);
            if(_isArray && typeof (data[key][0])=="object"){
                for(var i in data[key]){
                    this.get_local_to_server_by_route(data[key][i]);
                }
            }else if(!_isArray && typeof (data[key]) == "object"){
                this.get_local_to_server_by_route(data[key]);
            }
            var newKey = this.get_local_new_key(key);
            if(newKey){
                data[newKey] = data[key];
                if(newKey!=key) delete data[key];
            }else{
                data[key] = data[key];
            }
        }
        return data;
    }

    //服务器内容key值对应
    protected  get_server_new_key(old_key):string{
        var n_k = "";

        for(var i=0;i<this.service_to_local_list.length;i++){
            var new_key = this.service_to_local_list[i][old_key];
            if(new_key){
                n_k = new_key;
                break;
            }
        }

        if(n_k == ""){
            if(!Number(old_key) && Number(old_key)!=0) MyConsole.getInstance().trace("重大失误-----服务器所传字段不在解析表中："+old_key,0);
            n_k = old_key;
        }
        return n_k;
    }
    //本地内容key值对应
    protected  get_local_new_key(old_key):string{
        var n_k = "";

        for(var i=0;i<this.local_to_service_list.length;i++){
            var new_key = this.local_to_service_list[i][old_key];
            if(new_key){
                n_k = new_key;
                break;
            }
        }

        if(n_k == ""){
            if(!Number(old_key) && Number(old_key)!=0) MyConsole.getInstance().trace("重大失误-----本地所传字段不在解析表中："+old_key,0);
            n_k = old_key;
        }
        return n_k;
    }
    /*--------------------------------通过-文件-进行路由字段解析----------------------------------*/
    public set_fields_analysis_by_file(){
        MyConsole.getInstance().trace("四号机:对通信字段编码 进行解析",2);

        RES.getResByUrl("resource/fieldsAnalysis.txt",function (text) {
            var fields_str = text.replace(/\"/g,"").replace("\{","").replace("\}","");
            var fields_arr = fields_str.split(",");

            for(var i in fields_arr){
                var arr = fields_arr[i].split(":");
                var key = arr[0];
                var val = arr[1];
                var temp1 = {},temp2 = {};
                temp1[key] = val;
                temp2[val] = key;
                this.service_to_local_list.push(temp1);
                this.local_to_service_list.push(temp2);
            }

            // console.log("【服务器字段解析表】",this.service_to_local_list);
            // console.log("==========================分割线=====================");
            // console.log("【本地地段解析表】",this.local_to_service_list);
        }, this, RES.ResourceItem.TYPE_TEXT);
    }

    /*--------------------------------通过-接口-进行路由字段解析----------------------------------*/
    // //服务器内容key值对应
    // protected  get_server_new_key(old_key):string{
    //     for(var i in this.fields_analysis_list){
    //         if(i==old_key){
    //             return this.fields_analysis_list[i];
    //         }
    //     }
    //     //MyConsole.getInstance().trace("重大失误-----服务器所传字段不在解析表中："+old_key,0);
    // }
    // //本地内容key值对应
    // protected  get_local_new_key(old_key):string{
    //     for(var i in this.fields_analysis_list){
    //         if(this.fields_analysis_list[i]==old_key){
    //             return i;
    //         }
    //     }
    //     MyConsole.getInstance().trace("重大失误-----本地所传字段不在解析表中："+old_key,0);
    // }
    //
    // public set_fields_analysis(list){
    //     MyConsole.getInstance().trace("四号机:对通信字段编码 进行解析",2);
    //     this.fields_analysis_list=list;
    // }

}