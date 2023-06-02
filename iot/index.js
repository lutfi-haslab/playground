setInterval(() => {
  const msg = {
    "id": 1,
    "projectId": "1x",
    "sensorData": {
      "temp": 20,
      "hum": 70
    },
    "ruleNotif": [
      {
        "id": 1,
        "param": "temp",
        "operator": ">",
        "threshold": 30,
        "msg": "High temperature detected",
        "lastNotifTime": 10,
      },
      {
        "id": 2,
        "param": "temp",
        "operator": "<",
        "threshold": 30,
        "msg": "Low temperature detected",
        "lastNotifTime": 5
      }
    ]
  };
  
  msg.ruleNotif.forEach(rule => {
    const param = rule.param;
    const operator = rule.operator; 
    const threshold = rule.threshold;  
    const lastNotifTime = rule.lastNotifTime;
    
    if (eval(`${msg.sensorData[ param ]} ${operator} ${threshold}`)){
        
      // Check if 15 seconds have passed since last notification
      const now = Date.now();
      if (now - lastNotifTime > 15000) {  
          
        sendNotification(rule.msg);  
        // update last notif time
        rule.lastNotifTime = now;       
      }   
    }
  });
}, 1000)

// Send notification
function sendNotification(msg) {
  console.log(msg);  
  // Code to send notification 
}