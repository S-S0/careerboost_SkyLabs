function CardMain(commons, formElement) {
    this.common = commons
    this.form = formElement
    this.todoBody = document.querySelector(".section_todo_lst")
    this.todoList = this.todoBody.querySelector(".todo > ul.todo")
    this.doingList = this.todoBody.querySelector(".doing > ul.doing")
    this.doneList = this.todoBody.querySelector(".done > ul.done")
    this.getCards()
    this.registEvent()
}
CardMain.prototype = {
    registEvent : function() {
        this.todoBody.addEventListener("click", function(evt) {
            if(evt.target.tagName === "BUTTON") {
                if(evt.target.parentNode.className === "item_next_btn") {
                    var type = this.getCardType(evt.target)
                    this.moveCard(this.common.findParentByClassName(evt.target, "item"), type)
                } else if(evt.target.parentNode.className === "item_remove_btn") {
                    this.deleteCard(this.common.findParentByClassName(evt.target, "item"))
                }
            }
        }.bind(this))
    },
    getCards : function() {
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
            if(oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200) {
                this.makeTemplate(JSON.parse(oReq.responseText));
            }
        }.bind(this)
        oReq.open("GET", this.common.APIGatewayAccessURL);
        oReq.setRequestHeader("X-Api-Key", this.common.APIGatewayAccessKey);
        oReq.send();
    },
    makeTemplate : function(response) {
        var itemTemplate = document.querySelector("#cardItem").innerText
        var templateBind = Handlebars.compile(itemTemplate)
        response.Items.forEach(function(item) {
            if(item.type === "TODO") {
                this.todoList.insertAdjacentHTML("beforeend", templateBind(item))
            } else if(item.type === "DOING") {
                this.doingList.insertAdjacentHTML("beforeend", templateBind(item))
            } else {
                this.doneList.insertAdjacentHTML("beforeend", templateBind(item))
            }
        }.bind(this))
        this.removeNextButton()
    },
    removeNextButton : function() {
        var btnList = this.doneList.getElementsByClassName("item_next_btn")
        for(var i = 0; i < btnList.length; i++) {
            btnList[i].style.display = "none"
        }
    },
    getCardType : function(element) {
        return this.common.findParentByTagName(element, "UL").className.split(" ")[1].toUpperCase()
    },
    moveCard : function(itemNode, type) {
        var cardId = parseInt(itemNode.dataset.value)
        this.changeCardStatus(itemNode, cardId, type)
    },
    moving : function(itemNode, type) {
        if(type === "TODO") {
            this.doingList.insertAdjacentElement("beforeend", itemNode)
        } else if(type === "DOING") {
            this.doneList.insertAdjacentElement("beforeend", itemNode)
        }
    },
    deleteCard : function(itemNode) {
        var cardTitle = itemNode.querySelector(".item_title").innerText
        var cardInfos = itemNode.querySelector(".item_info").innerText
        this.form.cardId = parseInt(itemNode.dataset.value)
        this.form.makeForm(itemNode, cardTitle, cardInfos)
        this.form.showForm()
    },
    changeCardStatus : function(itemNode, cardId, type) {
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
            if(oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200) {
                this.moving(itemNode, type)
            }
        }.bind(this)
        oReq.open("PUT", this.common.APIGatewayAccessURL);
        oReq.setRequestHeader("Content-type", "application/json; charset=utf-8");
        oReq.setRequestHeader("X-Api-Key", this.common.APIGatewayAccessKey);
        oReq.send(JSON.stringify({"id" : cardId, "type" : type}));
    }
}