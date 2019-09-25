function MainPageInit() {
    this.registEvent()
}
MainPageInit.prototype = {
    registEvent : function() {
        document.addEventListener("DOMContentLoaded", function() {
            var CommonFunc = new Commons()
            new CardMain(CommonFunc, new DeleteForm(CommonFunc))
            new Register(new AddForm(CommonFunc))
        })
    }
}
new MainPageInit()