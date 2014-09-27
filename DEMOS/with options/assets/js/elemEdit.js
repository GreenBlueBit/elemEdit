/*
* Jquery Element Edit Plugin
* Copyright (c) 2014 Theodor Florian Purcaru, BlueBit
* Version 0.1
* Open Source is Fun
* Be nice and let me know if you use this, I'd love to see the results
* o7
*/

jQuery(function($) {
    
    $.elemEdit = function(url, extras) {
        
        
        var urlInUse = url;
        
        //colors can be used for debuging purposes; activate via optional param 'colorize:true'
        var colors = {
                saved: 'green',
                error: 'red' };
        var initVal = '';
        var editableFld = false;
        var clickedElem = false;
        var elemId = '';
        var handledObj = undefined;
        var extras = jQuery.extend({
           
            specialHandler: function(param) {return param;},
            requestType : '',
            dataReturnType : '',
            afterError: function(param) {},
            afterSuccess: function(param) {},
            colorize: false,
            data : {}
            
            
        },extras);
        
        //events are applied for both .editSimple = textfields and .editComplex = textAreas
        $(document.body).on('blur','.editSimple, .editComplex', function () {
            cancelAction(initVal);
            
        });
        
        $(document.body).on('click','.editSimple, .editComplex', function () {
            //checks if the object is already editing; If this didn't happen, you'd wake up with hundreds of textfields, each one added for random clicks on the object
            if(!$(this).hasClass('editing'))
            {
            $(this).addClass('editing');
            handledObj = $(this);
            if($(this).hasClass('editSimple'))
                handleAction('simple');
            else
                handleAction('complex');
            }
        });
        
        // allows adding a new line wheverer the cursor is in the textarea so that I could overwrite the usual enter event
        function pasteIntoInput(el, text) {
            el.focus();
            if (typeof el.selectionStart == "number"
            && typeof el.selectionEnd == "number") {
                var val = el.value;
                var selStart = el.selectionStart;
                el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
                el.selectionEnd = el.selectionStart = selStart + text.length;
            } else if (typeof document.selection != "undefined") {
                var textRange = document.selection.createRange();
                textRange.text = text;
                textRange.collapse(false);
                textRange.select();
    }
}
        
        //saves the initial value, applies keyboard controllers and creates the textfield/textarea to be used by the user
        function handleAction(param) {
            
            handledObj.addClass('editing');
            
            initVal = getValue(handledObj);
            
            if(param == 'simple')
            handledObj.html('<div class="editWrapper"><input type="text" value="' + initVal + '" class="editField" /></div>');
            else
            handledObj.html('<div class="editWrapper"><textarea class="editField">'+initVal+'</textarea></div>');
            
            $('.editField').width(handledObj.width());
            $('.editField').height(handledObj.height());
            
            handledObj.css('white-space','pre-wrap');
            
            addKeyboardHandlers(function(){
					$('.editField').focus();
				});

            
        }
        
        function getValue(param) {
          return param.html();   
        }
        
        // handles the ESCAPE, ENTER and SHIFT keys appropriately
        function addKeyboardHandlers(callBackFnct) {
            $('.editField').keydown(function(e){
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
				handleSaving();
                
                }
            if ($(this).hasClass('editComplex')) {
                if (e.keyCode == 13 && e.shiftKey) {
                    e.preventDefault();
                    pasteIntoInput(this,'<br />');
                }
            }
            if (e.keyCode == 27) {
				cancelAction(initVal);
			}
		  });
            
			$('.editWrapper').slideDown(500, callBackFnct);
            
			$('.editWrapper').show();
		
    }
        
        //gets back the id from the element which has to be put in the class attribute like this 'id10' 
        function retrieveId()
	{
		var id;
        $.each(handledObj.attr('class').split(' '), function(i,o) {
            if (o.match(/^id[0-9]*$/)) {
				id = o.match(/^id([0-9]*)$/);
                return false;
            }
        });
        return id[1];
	}
        
        function cancelAction(val) {
            
            handledObj.removeClass('editing');
			handledObj.children('.editWrapper').slideUp(500);
			handledObj.children('.editWrapper').hide();
            handledObj.html(val);
            
        }
        
        function handleSaving() {
            var val = $('.editField').val();
            var id = retrieveId();
            
            // you can set the specialHandler to do anything you want with the value the user has wrote in, my personal reccomandation is to escape the html if you don't do it on the server side
            val = extras.specialHandler(val);
            
            var handledData = extras.data;
            
            handledData.value = val;
            handledData.id = id;
            
            //request type is by default POST however it can be replaced with the optional param 'requestType'. The same applies for dataType which is of default 'text'
            $.ajax({
                url:urlInUse,
                data:handledData,
                type: extras.requestType == '' ? 'POST' : extras.requestType,
                dataType: extras.dataReturnType == '' ? 'text' : extras.dataReturnType,
                success: function(data) {
                    if(extras.colorize)
                        handledObj.css('color',colors.saved);
                    
                    extras.afterSuccess(data);
                },
                error: function(data) {
                    if(extras.colorize)
                        handledObj.css('color',colors.error);
                   
                    extras.afterError(data);
                }
            });
            
            cancelAction(val);
            
        }
        
        
        
    };
});