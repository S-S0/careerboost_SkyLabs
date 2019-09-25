function Register(formElement) {
    this.addTodoBtn = document.querySelector("#add_todo_btn")
    this.form = formElement
    this.registEvent()
}
Register.prototype = {
    registEvent : function() {
        this.addTodoBtn.addEventListener("click", function() {
            this.form.showForm()
        }.bind(this))
    }
}
function AddForm(commons) {
    this.common = commons
    this.addForm = document.forms.addTodoForm
    this.addFormView = document.querySelector(".wrap_popup.add")
    this.agreeBtn = this.addFormView.querySelector(".btn_agree")
    this.cancelBtn = this.addFormView.querySelector(".btn_reject")
    this.registEvent()
}
AddForm.prototype = {
    todoJson : {},
    registEvent : function() {
        this.agreeBtn.addEventListener("click", function() {
            this.makeRequestJson()
            this.submitTodo()
            this.todoJson = {}
        }.bind(this))
        this.cancelBtn.addEventListener("click", function() {
            this.addForm.who.value = ""
            this.addForm.what.value = ""
            this.addForm.priority.value = "1"
            this.hideForm()
        }.bind(this))
    },
    showForm : function() {
        this.addFormView.style.display = ""
    },
    hideForm : function() {
        this.addFormView.style.display = "none"
        this.todoJson = {}
    },
    makeRequestJson : function() {
        this.todoJson["title"] = this.addForm.what.value
        this.todoJson["name"] = this.addForm.who.value
        this.todoJson["sequence"] = this.addForm.priority.value
    },
    submitTodo : function() {
        var oReq = new XMLHttpRequest();
        oReq.onreadystatechange = function() {
            if(oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200) {
                window.location.href = "main.html";
            }
        }
        oReq.open("POST", this.common.APIGatewayAccessURL);
        oReq.setRequestHeader("Content-type", "application/json; charset=utf-8");
        oReq.setRequestHeader("X-Api-Key", this.common.APIGatewayAccessKey);
        oReq.send(JSON.stringify(this.todoJson));
    }
}