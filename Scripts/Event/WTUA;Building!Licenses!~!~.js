/*==================================================================*/
// Event Name: WTUA;Building!Licenses!~!Application.js
/*==================================================================*/

/*==================================================================*/
// Script Number: 054
// Script Name: Create License Record
/*==================================================================*/

if(wfTask == "Issue Registration" && wfStatus == "Issued"){
	issueLicense(); 
//	maintainLPLookup();
}