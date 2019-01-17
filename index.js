function start() {
  readCookie();
  doThings();
  setTimeout( () => { 
    addUrl();
    },1500)
 
}
window.onload = start;
var user='HzDonutHS';

function readCookie() {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    if(ca[0].length>12){
      document.getElementById('userInput').value='HzDonutHS';
      
    }
    else{
      document.getElementById('userInput').value=ca[0];
      user=ca[0]
    }
}

var nameArray=[];
var urlArray=[];
var ifLiveArray=[];
function doThings(){
  $.getJSON('https://wind-bow.gomix.me/twitch-api/users/'+document.getElementById('userInput').value+'/follows/channels?callback=?', function(data) {
  for(x=0;x<data.follows.length;x++){
    nameArray.push(data.follows[x].channel.name); 
  }
  for(x=0;x<nameArray.length;x++){
    $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/'+nameArray[x]+'/?callback=?', function(data){
      urlArray.push(data._links.channel);
      if(data.stream==null){
      ifLiveArray.push('Offline');
      }
      else{
        ifLiveArray.push('Streaming '+data.stream.game+' for ' + data.stream.viewers+' viewers');
      }
      });
  
  }
  
  /*for(y=0;y<nameArray.length;y++){
    urlArray.push('https://wind-bow.gomix.me/twitch-api/streams/'+nameArray[y]+'/?callback=?');
  } */
});
}

function addUrl(){
  for(x=0;x<urlArray.length;x++){
    urlArray[x]=urlArray[x].slice(38).toUpperCase();
  }
  var element = document.getElementById("div1");
  for(z=0;z<nameArray.length;z++){
    var para = document.createElement("li");
    //var node = document.createTextNode(urlArray[z].link("https://www.twitch.tv/"+urlArray[z])+'-----'+ifLiveArray[z]);
    if(ifLiveArray[z]!='Offline'){
      para.innerHTML=urlArray[z]+'–––––'+ifLiveArray[z].link("https://www.twitch.tv/"+urlArray[z]);
    }
    else{
      para.innerHTML=urlArray[z]+'–––––'+ifLiveArray[z];
    }
    //para.appendChild(node);
    element.appendChild(para);
  }
  for(z=nameArray.length-1;z>=0;z--){
    if(ifLiveArray[z]!='Offline'){
      new Twitch.Embed("twitch-embed", {
        width: 854,
        height: 480,
        channel: JSON.stringify(urlArray[z]),
        layout: "video"
      });
      break;   
    }       
  }
}
function changeUser(){
  document.cookie=document.getElementById('userInput').value;
  location.reload(false);
}