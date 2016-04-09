<script type="text/javascript">
//-----------------------------------------------------------------------------
Notification.requestPermission();

function spawnNotification(title,message) {  
  
  if (!("Notification" in window)) {
	  console.log("Browser not support Notification.");
  }else if (Notification.permission === "granted") {
      CustomNotification(title,message);    
  }else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        CustomNotification(title,message);
      }
    });
  }else if (Notification.permission === 'denied'){
	  console.log("Notification permission denied!");
  }
}

function CustomNotification(title,message) {
  var options = {
      body: message,
      icon: "image/favicon.ico"
  }
  
  var notification = new Notification(title,options);
  setTimeout(notification.close.bind(notification), 3000);
 
}
</script>