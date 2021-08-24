
function Notif(option){
    //Configuration
    var el = this;
    el.self = document.querySelector('.toast-message');
    el.message = document.querySelector('.message');
    el.top = option.topPos;
    el.classNames = option.classNames;
    el.autoClose = (typeof option.autoClose === "boolean")? option.autoClose: false;
    el.autoCloseTimeout = (option.autoClose && typeof option.autoCloseTimeout === "number")? option.autoCloseTimeout: 3000;  
    //Methods
    el.reset = function(){
      (el.message).innerHTML="";
      el.self.classList.remove(el.classNames);
    }
    el.showN = function(msg,type){
      el.reset();
      el.message.innerHTML=msg;
      el.self.style.top= el.top;
      el.self.classList.add(type);
      
      if(el.autoClose){
        setTimeout(function(){
          el.hideN();
        }, el.autoCloseTimeout);
      }
    }
    el.hideN = function(){
      el.self.style.top='-100%';
      el.reset();
    };
  }
  