(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
//  console.log('Submit');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
//  console.log('Cancel');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}


function loadOptions() {

 var $lineColorPicker = $('#lineColorPicker');
 if (localStorage.lineColor) {
  $lineColorPicker[0].value = localStorage.lineColor;
 }
 
 var $bgColorPicker = $('#bgColorPicker');
 if (localStorage.bgColor) {
  $bgColorPicker[0].value = localStorage.bgColor;
 }

 var $invertCheckbox = $('#invertCheckbox');

 if (localStorage.invert) {
  $invertCheckbox[0].checked = localStorage.invert === '1';
 }
 
} 

function getAndStoreConfigData() {
 var $lineColorPicker = $('#lineColorPicker');
 var $bgColorPicker = $('#bgColorPicker');

 var $invertCheckbox = $('#invertCheckbox');
 var $invertValue = 0;
 if ($invertCheckbox[0].checked) {
   $invertValue = 1; 
 }
 console.log('invert value: ' + $invertValue);

 var options = {
  invert:        $invertValue,
  lineColor:     $lineColorPicker.val(),
  bgColor:       $bgColorPicker.val()
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.lineColor     = options.lineColor;
 localStorage.bgColor       = options.bgColor;
 localStorage.invert = $invertValue;

 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
