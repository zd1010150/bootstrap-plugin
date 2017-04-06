/**
 * select all widget,like bootstrap plugin style
 * usage: 1. the selctall checkbox should have two data attribute,data-toggle="selectall" data-target=".dormant-check-second"
 * data-toggle=selectall : identify the widget is selectall
 * data-target="" : the value means the selector of group checkbox
 */


var toggle = "[data-toggle=selectall]",
    checkState = "checked",
    disabledFilter = ":disabled",
    parentDataLabel = "_parent_selectall";
/**
 * get children collection
 * @param  {[type]}
 * @return {[type]}
 */
var getChild = function ($parent) {
    if (!$parent.data("target")) {
        return;
    } else
        return $($parent.data("target"));
}
/**
 * get status of checkbox
 * @param  {[type]}
 * @return {[type]}
 */
var getCheckboxState = function ($elem) {
    var _checkState = true;
    $elem.each(function () {
        _checkState = _checkState && $(this).prop(checkState);
    });
    return _checkState;
}

var SelectAll = function (element) {

    this.element = $(element)

}


SelectAll.prototype.toggleChild = function () {
    var $parent = $(this),
        $children = $($parent.data("target"));
    if ($children.length < 1 || $parent.is(disabledFilter)) return;
    $children.filter(":not("+disabledFilter+")").prop(checkState, $parent.prop(checkState));

}
SelectAll.prototype.toggleParent = function () {
    var $parent = $(this).data(parentDataLabel),
        $children = getChild($parent);
    $parent.prop(checkState, getCheckboxState($children));
}



function Plugin(option) {
    return this.each(function () {
        var $this = $(this)
        var data = $this.data('bs.selectall')

        if (!data) $this.data('bs.selectall', (data = new SelectAll(this)))
        if (typeof option == 'string') data[option]()
    })
}

var old = $.fn.selectall

$.fn.selectall = Plugin
$.fn.selectall.Constructor = SelectAll




$.fn.selectall.noConflict = function () {
    $.fn.selectall = old
    return this
}


function initSelectAllChild () {
    $(toggle).each(function () {
        var $child = getChild($(this));
        if ($child) {
            $child.on("click.bs.selectall.data-api", SelectAll.prototype.toggleParent).data(parentDataLabel, $(this));
        }
    });
};

module.exports = function(){
    initSelectAllChild();
    $(document).on('click.bs.selectall.data-api', toggle, SelectAll.prototype.toggleChild);
};

