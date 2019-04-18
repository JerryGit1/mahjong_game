/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
class Load_view extends Base_view{

    /*资源加载视图*/
    protected loadingView:Resource_view;
    /*数据加载视图*/
    protected loadDataView:Data_view;
    public constructor(){
        super();
    }

    public add_resource_view(loadingType){
        if(this.loadingView) MyConsole.getInstance().trace("多线程加载还没做呢");
        this.loadingView = new Resource_view(loadingType);
        this.addChild(this.loadingView);
    }

    public resource_setProgress(load=0,total=1){
        if(this.loadingView)this.loadingView.setProgress(load, total);
    }

    public remove_resource_view(){
        if(this.loadingView){
            /*由于屏幕适配，加上动画效果后，易穿帮 2.1.0舍弃*/
            this.loadingView.clear();
            this.removeChild(this.loadingView);
            this.loadingView=null;
        }
    }

    public add_data_loading(){
        this.removeDataLoading();
        this.loadDataView = new Data_view("玩命加载中...");
        this.addChild(this.loadDataView);
    }
    
    public removeDataLoading(){
        if(this.loadDataView){
            this.loadDataView.clear();
            this.removeChild(this.loadDataView);
            this.loadDataView = null;
        }
    }


}