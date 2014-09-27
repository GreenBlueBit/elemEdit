$(document).ready(function() {
   getAppreciates(); 
    $.elemEdit('assets/php/serverSide.php',
               {
                colorize: true,
                data : {
                    a : 'saveEdit',
                    author : 'BlueBit'
                },
        afterSuccess : function () {
            console.log('after edit');   
        },
        specialHandler : function(param) {return param + ' edited by special Handler';}
    });
    
    
    
    
    // doing funny stuff not related to plugin
    
    $('#appImg').qtip({
   content: 'Such Skill! Wow Plugin! Great Mouse! Press Much!',
   show: 'mouseover',
   hide: 'mouseout',
        position: {
      corner: {
         target: 'topRight',
         tooltip: 'bottomLeft'
      }
   },
        style: { 
      border: {
         width: 1,
         radius: 3,
         color: '#9B9B9B'
      }
}
    });
    
    $('h1').qtip({
   content: 'Click to edit, then press either Enter to save or Esc to cancel (clicking anywhere else will also cancel the process)',
   show: 'mouseover',
   hide: 'mouseout',
        position: {
      corner: {
         target: 'topRight',
         tooltip: 'bottomLeft'
      }
   },
        style: { 
      border: {
         width: 1,
         radius: 3,
         color: '#9B9B9B'
      }
}
    });
    
    $('#content').qtip({
   content: 'Click to edit, then press either Enter to save or Esc to cancel (clicking anywhere else will also cancel the process)',
   show: 'mouseover',
   hide: 'mouseout',
        position: {
      corner: {
         target: 'topRight',
         tooltip: 'bottomLeft'
      }
   },
        style: { 
      border: {
         width: 1,
         radius: 3,
         color: '#9B9B9B'
      }
}
    });
    
    $('#imag').qtip({
   content: 'Such curiosity! Much explore! Easter egg Wow!',
   show: 'mouseover',
   hide: 'mouseout',
        position: {
      corner: {
         target: 'topRight',
         tooltip: 'bottomLeft'
      }
   },
        style: { 
      border: {
         width: 1,
         radius: 3,
         color: '#9B9B9B'
      }
}
    });
    
});
function appreciate(clickedElem)
{
    var cl = clickedElem.getAttribute('class');
    if( cl == "unclicked")
    {
        console.log("appreciate with element");
        clickedElem.setAttribute('class',"clicked");   
        //$("#appImg").setAttribute('src','assets/img/appreciated.png');
        var appreciates = $("#appAmount").html();
        $("#appAmount").html(parseInt(appreciates,10)+1);
        addAppreciate();
    }
    
}

function addAppreciate()
{
    console.log("pressedAppreciate");
       $.ajax({
                        type:"post",
                        url:"assets/php/serverSide.php",
                        datatype:'json',
                        data:{'a':'appreciate'},
                        success:function()
                {
                console.log("success");
                },
            error : function() 
                {
                console.log("fail");
                }
                     
            });
}

function getAppreciates()
{
    console.log("getting appreciates");
    
    $.ajax({
        type:"post",
        url:"assets/php/serverSide.php",
        datatype:"json",
        data:{"a":"getAppreciate"},
        success: function(data)
              {
                  console.log(data);
                    var appreciates = jQuery.parseJSON(data);
                    
                    console.log(appreciates);
                    console.log(appreciates[0]["amount"]);
                    $("#appAmount").html(appreciates[0]["amount"]);
              },
        error: function()
              {
                  $("#appAmount").html("Not Available");
              }
    });
}