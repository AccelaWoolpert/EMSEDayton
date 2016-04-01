function issueLicense(){
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
	thisLic = new licenseObject(newLicIdString,newLicId);
	thisLic.setStatus("Active");
	var licFirstExpYear;
	var licIssueDate = getWorkflowStatusDate("Issue Registration", "Issued");
	var licIssueYear = 1900 + licIssueDate.getYear();
	var licTerm = AInfo["Select Number of Years for Registration"];
//	licTerm = "2 Year";
	if(licTerm == "2 Year"){
		licFirstExpYear = "12/31/" + (licIssueYear + 1);
	}
	else {
		licFirstExpYear = "12/31/" + licIssueYear;
	}
	logDebug("the new exp date is " + licFirstExpYear);
	thisLic.setExpiration(licFirstExpYear);
}