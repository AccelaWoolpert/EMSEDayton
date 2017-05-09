function issueLicense() {
	//SET CONTACT STATE
	var capContactResult = aa.people.getCapContactByCapID(capId);
	if(capContactResult.getSuccess()){
		var contactList = capContactResult.getOutput();
		for(i in contactList){
			thisContact = contactList[i];
			conModel = thisContact.getCapContactModel();
			conModel.setState("OH");
			logDebug(aa.people.editContactByCapContact(conModel).getSuccess());
		}
	}
	
	newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null);
	if(newLicId){
		editContactType("Applicant", "License Holder", newLicId);
		copyOwner(capId, newLicId);
		updateAppStatus("Issued","Original Issuance",newLicId);
		updateTask("License","Active","Updated via Script","Updated via Script",null,newLicId);
		copyAppSpecific(newLicId);
		copyASITables(capId,newLicId);
		
		jsDate = new Date();
		jsDate.setHours(0,0,0,0);
		
		switch(""+AInfo["Select Number of Years for Registration"]){
			case "1 Year":
				if(jsDate.getMonth() == 11){
					jsDate.setFullYear(jsDate.getFullYear()+1);
				}
				else{
					jsDate.setFullYear(jsDate.getFullYear());
				}
				break;
			case "2 Year":
				if(jsDate.getMonth() == 11){
					jsDate.setFullYear(jsDate.getFullYear()+2);
				}
				else{
					jsDate.setFullYear(jsDate.getFullYear()+1);
				}
				break;
		}
		
		jsDate.setMonth(11);
		jsDate.setDate(31);
		
		var idNum = 1; logDebug("-----"+idNum+"-----");
		
		newLicIdString = newLicId.getCustomID();
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		lic = new licenseObject(newLicIdString,newLicId);
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		lic.setStatus("Active");
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		lic.setExpiration(jsDateToASIDate(jsDate));
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		saveId = capId;
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		capId = newLicId;
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		AInfo["Business License #"] = newLicIdString;
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		createRefLicProf(newLicIdString,"Contractor","License Holder");
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		capId = saveId;
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		
		refLP = getRefLicenseProf(newLicIdString);
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		refLP.setLicenseExpirationDate(aa.date.parseDate(jsDateToASIDate(jsDate)));
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		refLP.setLicenseIssueDate(aa.date.getCurrentDate());
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		refLP.setBusinessName2("Issued");
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		aa.licenseScript.editRefLicenseProf(refLP);
		
		idNum++; logDebug("-----"+idNum+"-----");
		
		
		aa.licenseScript.associateLpWithCap(newLicId,refLP);
		
		idNum++; logDebug("-----"+idNum+"-----");
		
	}
}
