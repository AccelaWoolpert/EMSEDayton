//Script 46
try {
	var addResult = aa.address.getAddressByCapId(capId);
	if (addResult.getSuccess()) { 
		var aoArray = addResult.getOutput(); 
		if (aoArray.length) { 
			var ao = aoArray[0]; 

			// get caps with same address
			var capAddResult = aa.cap.getCapListByDetailAddress(ao.getStreetName(),ao.getHouseNumberStart(),ao.getStreetSuffix(),ao.getZip(),ao.getStreetDirection(),null);
			if (capAddResult.getSuccess())	{ 
				var capIdArray = capAddResult.getOutput()

				for (c in capIdArray) {
					var relcap = aa.cap.getCap(capIdArray[c].getCapID()).getOutput();
					var reltype = relcap.getCapType().toString();
					
					logDebug(reltype +": " +appTypeString)
					
					if (reltype == appTypeString) {
						if (matches(""+relcap.getCapStatus(), "Active", "Appeal", "Attempt to Contact", "Awaiting Court Decision","In Violation","In Violation - Reissue", "New")) {
							updateAppStatus("Potential Duplicate")
							break
						}
					}
				}
			}
			else logDebug("**ERROR: getting similar addresses: " + capAddResult.getErrorMessage())
		}
		else logDebug("No address found on record.")
	}
	else logDebug("**ERROR: getting address by cap ID: " + addResult.getErrorMessage())
}
catch(err) {logDebug(err)}

