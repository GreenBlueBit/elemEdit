elemEdit
========

A [really] small and flexible jquery plugin

NOTE : You only need the editElem.js file and jquery for this to work, the rest are demos, license stuff and version info.

The purpose of this project is to allow people to make any html element to become editable be it as a textfield or textarea and send the modification anywhere you'd like with just one line of code;

A few of the features that it boosts : 

* Event delegation so that you can use on any dynamically added object;
* Supports input and textarea elements;
* Full keyboard and mouse support with the ability to add new line using 'shift + enter', saving with enter and cancelling by
pressing ESC or clicking on any other element;
* Is fully loaded with a number of customizable methods and values which are optional for the user such as callbacks for
successful edits, errors, types of data and a lot more;
* Fully commented for anyone who wishes to add to it and a plethora of demos;
* Ajax support with custom url and additional data to be sent;

For more projects or to contact me please go to : http://facebook.com/greenbluebit or my old CV : http://ted.bluebit.nu/

Example :

* HTML - &lt;div id='randomDiv' class='editSimple'&gt; Text Here &lt;/div&gt;
* Javascript - $.elemEdit({'phpfile.php'}); //Yep, that's all, one line of code, cool right?

Online Demos :

* Using a few of the possible extra parameters : http://demos.bluebit.nu/withOptions/
* The one line of code to rule them all : http://demos.bluebit.nu/withoutOptions/
* Yes I know it's full of Doge memes, get over it.
