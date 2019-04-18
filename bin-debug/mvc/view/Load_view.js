var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
var Load_view = (function (_super) {
    __extends(Load_view, _super);
    function Load_view() {
        return _super.call(this) || this;
    }
    Load_view.prototype.add_resource_view = function (loadingType) {
        if (this.loadingView)
            MyConsole.getInstance().trace("多线程加载还没做呢");
        this.loadingView = new Resource_view(loadingType);
        this.addChild(this.loadingView);
    };
    Load_view.prototype.resource_setProgress = function (load, total) {
        if (load === void 0) { load = 0; }
        if (total === void 0) { total = 1; }
        if (this.loadingView)
            this.loadingView.setProgress(load, total);
    };
    Load_view.prototype.remove_resource_view = function () {
        if (this.loadingView) {
            /*由于屏幕适配，加上动画效果后，易穿帮 2.1.0舍弃*/
            this.loadingView.clear();
            this.removeChild(this.loadingView);
            this.loadingView = null;
        }
    };
    Load_view.prototype.add_data_loading = function () {
        this.removeDataLoading();
        this.loadDataView = new Data_view("玩命加载中...");
        this.addChild(this.loadDataView);
    };
    Load_view.prototype.removeDataLoading = function () {
        if (this.loadDataView) {
            this.loadDataView.clear();
            this.removeChild(this.loadDataView);
            this.loadDataView = null;
        }
    };
    return Load_view;
}(Base_view));
__reflect(Load_view.prototype, "Load_view");
//# sourceMappingURL=Load_view.js.map