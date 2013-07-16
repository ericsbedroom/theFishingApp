// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//


var win1 = Titanium.UI.createWindow({  
    title:'Fish Reference',
    backgroundColor:'#fff'
});

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Fish',
    window:win1
});





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//creates template for rows
var plainTemplate = {
    childTemplates: [
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'rowtitle',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                left: '10dp',
                height: '50dp'
            }
        },      
    ]
};


function report(e) {
	Ti.API.info(e.type);
}


//uppermost element of list
var listView = Titanium.UI.createListView({
	headerTitle: 'Fish',
	// Maps the plainTemplate object to the 'plain' style name
    templates: { 'plain': plainTemplate },
    // Use the plain template, that is, the plainTemplate object defined earlier
    // for all data list items in this list view
    defaultItemTemplate: 'plain'
});

//list of salwater fish
var saltwaterDataSet = [
    { rowtitle: {text: 'Tuna'}, properties: { title: 'Tuna'} },
    { rowtitle: {text: 'Bass'}, properties: { title: 'Bass'} },
    { rowtitle: {text: 'Mackeral'}, properties: { title: 'Mackeral'} },
    { rowtitle: {text: 'Albacore'}, properties: { title: 'Albacore'} },
    { rowtitle: {text: 'Barracuda'}, properties: { title: 'Barracuda'} },
    { rowtitle: {text: 'Bluefish'}, properties: { title: 'Bluefish'} },
    { rowtitle: {text: 'Cod'}, properties: { title: 'Cod'} },
    { rowtitle: {text: 'Croaker'}, properties: { title: 'Croaker'} },
    { rowtitle: {text: 'Flounder'}, properties: { title: 'Flounder'} },
    { rowtitle: {text: 'Tuna'}, properties: { title: 'Tuna'} },
    { rowtitle: {text: 'Bass'}, properties: { title: 'Bass'} },
    { rowtitle: {text: 'Mackeral'}, properties: { title: 'Mackeral'} },
    { rowtitle: {text: 'Albacore'}, properties: { title: 'Albacore'} },
    { rowtitle: {text: 'Barracuda'}, properties: { title: 'Barracuda'} },
    { rowtitle: {text: 'Bluefish'}, properties: { title: 'Bluefish'} },
    { rowtitle: {text: 'Cod'}, properties: { title: 'Cod'} },
    { rowtitle: {text: 'Croaker'}, properties: { title: 'Croaker'} },
    { rowtitle: {text: 'Flounder'}, properties: { title: 'Flounder'} }
    
];

//list of freshwater fish
var freshwaterDataSet = [
    { rowtitle: {text: 'Trout'}, properties: { title: 'Trout'} },
    { rowtitle: {text: 'Salmon'}, properties: { title: 'Salmon'} },
    { rowtitle: {text: 'Catfish'}, properties: { title: 'Catfish'} },
    { rowtitle: {text: 'Walleye Pike'}, properties: { title: 'Walleye Pike'} },
    { rowtitle: {text: 'Rock Bass'}, properties: { title: 'Rock Bass'} },
    { rowtitle: {text: 'Carp'}, properties: { title: 'Carp'} },
    { rowtitle: {text: 'Sturgeon'}, properties: { title: 'Sturgeon'} },
    { rowtitle: {text: 'Trout'}, properties: { title: 'Trout'} },
    { rowtitle: {text: 'Salmon'}, properties: { title: 'Salmon'} },
    { rowtitle: {text: 'Catfish'}, properties: { title: 'Catfish'} },
    { rowtitle: {text: 'Walleye Pike'}, properties: { title: 'Walleye Pike'} },
    { rowtitle: {text: 'Rock Bass'}, properties: { title: 'Rock Bass'} },
    { rowtitle: {text: 'Carp'}, properties: { title: 'Carp'} },
    { rowtitle: {text: 'Sturgeon'}, properties: { title: 'Sturgeon'} }
];

//loads data sets into sections
var saltwaterSection = Titanium.UI.createListSection({
	headerTitle: 'Saltwater',
	items: saltwaterDataSet
});
var freshwaterSection = Titanium.UI.createListSection({
	headerTitle: "Freshwater",
	items: freshwaterDataSet
});



//loads sections into list view
listView.sections = [saltwaterSection, freshwaterSection];

//loads listview into window
win1.add(listView);


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var logWindow = Titanium.UI.createWindow({  
    title:'Fish Log',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Log',
    window:logWindow
});
var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'This is where the log goes',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});
var newCatchButton = Titanium.UI.createButton({
	title: "Add New Catch",
	width: 100,
	height: 50,
	right: '10px',
	top: "10px"
});

logWindow.add(label2);
logWindow.add(newCatchButton);


////// Start Database testing portion


var fishDB = Titanium.Database.open("Fish");
fishDB.execute('CREATE TABLE IF NOT EXISTS saltwaterFish(name TEXT, legalLength TEXT, maxCatch TEXT, reccomendedTackle TEXT);');
fishDB.execute('INSERT INTO saltwaterFish (name, legalLength, maxCatch, reccomendedTackle) VALUES ("Pacific Halibut", "No minimum length.", "One fish", "Good hooks and line")');


var fishDBRS = fishDB.execute('SELECT name, legalLength, maxCatch, reccomendedTackle FROM saltwaterFish');
fishDB.close();

newCatchButton.addEventListener("click", function() {
	newEntryWindow.open();
});


///end database portion


////////////////////////////////////////////////////////////////




var newEntryWindow = Ti.UI.createWindow({
	title: "New Catch",
	backgroundColor: "#fff"
});

var fishTextField = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	color: '#336699',
	top: 10, left: 10,
	width: 250, height:60
});

var fishButton = Ti.UI.createButton({
	title: 'Submit',
	width: 100,
	height: 50,
	left: '10px',
	top: '80px'
});

newEntryWindow.add(fishTextField);
newEntryWindow.add(fishButton);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var communityWindow = Titanium.UI.createWindow({
	title: 'Community Log',
	backgroundColor: '#000'
});

var tab3 = Titanium.UI.createTab({
	title: 'Community',
	window:communityWindow
});

var label3 = Titanium.UI.createLabel({
	color:'#fff',
	text:'I really appreciate Drew coming out and helping me make icons and logos',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

communityWindow.add(label3);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var win4 = Titanium.UI.createWindow({  
    title:'This means it is working!',
    backgroundColor:'#ccc'
});

var label4 = Titanium.UI.createLabel({
	color:'#000',
	text:'my new window!! This is where the fish info will go',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

var button4 = Titanium.UI.createButton({
	title: 'Go Back',
	width: 100,
	height: 50,
	right: '10px',
	top: '10px'
});

//adds label and button to fish window
win4.add(label4);
win4.add(button4);

//closes window when button is clicked
button4.addEventListener('click', function() {
	win4.close()
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2); 
tabGroup.addTab(tab3); 


// open tab group
tabGroup.open();

//opens fish window when any list item is clicked
listView.addEventListener('itemclick', function() {
	win4.open()
});
	


