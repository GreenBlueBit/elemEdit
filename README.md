elemEdit
========

A [really] small and flexible jquery plugin

The purpose of this project is to allow people to make any html element to become editable be it as a textfield or textarea 
with just one line of code;

A few of the features that it boosts : 

* Event delegation so that you can use on any dynamically added object;
* Supports input and textarea elements;
* Full keyboard and mouse support with the ability to add new line using 'shift + enter', saving with enter and cancelling by
pressing ESC or clicking on any other element;
* Is fully loaded with a number of customizable methods and values which are optional for the user such as callbacks for
successful edits, errors, cancels, types of data and a lot more;
* Fully commented for anyone who wishes to add to it and a plethora of demos;
* Ajax support with custom url and additional data to be sent;

For more projects or to contact me please go to : http://facebook.com/greenbluebit or my old CV : http://ted.bluebit.nu/

Example :

* HTML - <div id='randomDiv' class='editSimple'> Text Here </div>
* Javascript - $.elemEdit({'phpfile.php'}); //Yep, that's all, one line of code, cool right?
