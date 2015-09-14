
//Script 46
var capAddResult = aa.cap.getCapListByDetailAddress(AddressStreetName,parseInt(AddressHouseNumber),AddressStreetSuffix,AddressZip,AddressStreetDirection,null);
if (capAddResult.getSuccess())	{ 
	var capIdArray = capAddResult.getOutput()

	for (c in capIdArray) {
		var relcap = aa.cap.getCap(capIdArray[c].getCapID()).getOutput();
		var reltype = relcap.getCapType().toString();
		
		logDebug(reltype +": " +appTypeString)
		
		if (reltype == appTypeString) {
			if (matches(""+relcap.getCapStatus(), "Open", "Unassigned","Active")) {
				cancel = true
				showMessage = true
				logMessage("Existing active "+ appTypeString + " record was found at the same address, cannot create a duplicate.")
			}
		}
	}
}
else {
	logDebug("**ERROR: getting similar addresses: " + capAddResult.getErrorMessage());  
}
