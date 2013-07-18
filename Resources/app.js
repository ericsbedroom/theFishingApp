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


var refDB = Ti.Database.open("fish")
refDB.remove();
refDB = Titanium.Database.install("fish.sqlite", "fish");


var rows = refDB.execute("SELECT name FROM freshwaterFish");
//list of freshwater fish

var freshwaterDataSet = [];
var saltwaterDataSet = [];

for (var i = 0; i < rows.rowCount; i++) {
	freshwaterDataSet.push({
		rowtitle: { text: rows.fieldByName('name')}
	});
	rows.next();
}

rows = refDB.execute("SELECT name FROM saltwaterFish");
for (var i = 0; i < rows.rowCount; i++) {
	saltwaterDataSet.push({
		rowtitle: { text: rows.fieldByName('name')}
	});
	rows.next();
}


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


newCatchButton.addEventListener('click', function() {
	newLogEntryWindow.open();
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

////////////////////

var newCatchBackButton = Titanium.UI.createButton({
	title: "back",
	width: 100,
	height: 50,
	right: "10px",
	top: "10px",
});

newCatchBackButton.addEventListener('click', function() {
	newLogEntryWindow.close();
});

newLogEntryWindow.add(newCatchBackButton);

///
var TackleBoxWindow = Titanium.UI.createWindow({  
    title:'Virtual Tackle Box',
    backgroundColor:'#fff'
});

var tackleBoxTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tackle Box',
    window:TackleBoxWindow
});
///


////////////////////
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

//
//  add tabs
//
tabGroup.addTab(fishListTab);  
tabGroup.addTab(logWindowTab);
tabGroup.addTab(tackleBoxTab); 
tabGroup.addTab(communityTab); 
// open tab group
tabGroup.open();



