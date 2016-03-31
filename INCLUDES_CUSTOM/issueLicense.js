function issueLicense(){// select statement to determine expiration date based on license type
	if(arguments.length > 0){
		var newLicId = aa.cap.getCapID(arguments[0]).getOutput();
		var newLicIdString = arguments[0];
	}
	else{
		newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);//copies parcel, address and contact.
		if(newLicId){
			copyOwner(capId, newLicId);
			newLicIdString = newLicId.getCustomID();
			updateAppStatus("Issued","Originally Issued",newLicId);
			copyAppSpecific(newLicId);
			copyASITables(capId,newLicId);
			changeApplicantToLicenseHolder(newLicId);
		}
	}
//	thisLic = new licenseObject(newLicIdString,newLicId);
//	expUnit = thisLic.b1Exp.getExpUnit();
//	expInterval = thisLic.b1Exp.getExpInterval();
//	var newExpDate;
//	var currentYear = sysDate.getYear();// Current year
//	var startingYear2000 = 2000;// Year 2000 is the reference year
//	if(AInfo["Select Number of Years for Registration"] == "2 Year"){
//		newExpDate = "12/31/" + currentYear + 1;
//	}
//	else {
//		newExpDate = "12/31/" + currentYear;
//	}
//	logDebug("the new exp date is " + newExpDate);
//	thisLic.setExpiration(newExpDate);
}