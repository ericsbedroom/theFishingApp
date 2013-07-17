// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//


var fishListWindow = Titanium.UI.createWindow({  
    title:'Fish Reference',
    backgroundColor:'#fff'
});

var fishListTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Fish',
    window:fishListWindow
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//creates template for rows
var plainTemplate = {
    childTemplates: [
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'rowtitle',  // Bind ID for this label
            properties: {        
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


var refDB = Titanium.Database.install("fish", "fish");

var refDB = Titanium.Database.open("fish");


var rows = refDB.execute("SELECT name FROM freshwaterFish");

//list of freshwater fish
var freshwaterDataSet = [];

for (var i = 0; i < rows.rowCount; i++) {
	freshwaterDataSet.push({
		rowtitle: { text: rows.fieldByName('name')}
	});
	rows.next();
}



//list of salwater fish
var saltwaterDataSet = [
    { title: {text: 'Tuna'}},
    { rowtitle: {text: 'Bass'}},
    { rowtitle: {text: 'Mackeral'}},
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
fishListWindow.add(listView);


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
var logWindowTab = Titanium.UI.createTab({  
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



var newLogEntryWindow = Ti.UI.createWindow({
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

newLogEntryWindow.add(fishTextField);
newLogEntryWindow.add(fishButton);

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

var communityTab = Titanium.UI.createTab({
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
tabGroup.addTab(fishListTab);  
tabGroup.addTab(logWindowTab); 
tabGroup.addTab(communityTab); 


// open tab group
tabGroup.open();

//opens fish window when any list item is clicked
listView.addEventListener('itemclick', function() {
	win4.open()
});
	


