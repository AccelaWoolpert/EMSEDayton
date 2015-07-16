//Script #23
try {
	if ( matches(AInfo["Change Case Type"],"Y","Yes") ){
		editAppName(""+AInfo["Case Type"])
		editAppSpecific("Change Case Type","N")
	}
}
catch(err){
	logDebug("SharePoint Script 23: " + err)
}
