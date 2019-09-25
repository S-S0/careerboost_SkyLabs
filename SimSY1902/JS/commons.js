function Commons() {}
Commons.prototype = {
    APIGatewayAccessURL : "",
    APIGatewayAccessKey : "",
    findParentByClassName : function(element, classString) {
        if (!element.parentNode) {
            return null;
        }
        if (element.parentNode.className === classString) {
            return element.parentNode;
        }
        return this.findParentByClassName(element.parentNode, classString);
    },
    findParentByTagName : function(element, tagString) {
        if (!element.parentNode) {
            return null;
        }
        if (element.parentNode.tagName === tagString) {
            return element.parentNode;
        }
        return this.findParentByTagName(element.parentNode, tagString);
    }
}