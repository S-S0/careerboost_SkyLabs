function DeleteForm(commons) {
    this.common = commons
    this.deleteForm = document.querySelector(".wrap_popup.delete")
    this.agreeBtn = this.deleteForm.querySelector(".btn_agree")
    this.cancelBtn = this.deleteForm.querySelector(".btn_reject")
    this.registEvent()
}
DeleteForm.prototype = {
    cardId : null,
    target : null,
    registEvent : function() {
        this.agreeBtn.addEventListener("click", function() {
            this.deleteRequest(this.target)
            this.cleanInfo()
        }.bind(this))
        this.cancelBtn.addEventListener("click", function() {
            this.hideForm()
        }.bind(this))
    },
    makeForm : function(itemNode, title, info) {
        this.target = itemNode
        this.deleteForm.querySelector(".del_title").innerText = title
        this.deleteForm.querySelector(".del_info").innerText = info
    },
    showForm : function() {
        this.deleteForm.style.display = ""
    },
    hideForm : function() {
        this.deleteForm.style.display = "none"
        this.cleanInfo()
    },
    cleanInfo : function() {
        this.cardId = null
        this.target = null
    },
    deleteRequest : function(itemNode) {
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
            if(oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200) {
                itemNode.remove()
                this.hideForm()
            }
        }.bind(this)
        oReq.open("DELETE", this.common.APIGatewayAccessURL);
        oReq.setRequestHeader("Content-type", "application/json; charset=utf-8");
        oReq.setRequestHeader("X-Api-Key", this.common.APIGatewayAccessKey);
        oReq.send(JSON.stringify({"id" : this.cardId}));
    }
}