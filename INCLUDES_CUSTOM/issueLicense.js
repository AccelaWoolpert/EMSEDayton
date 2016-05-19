function issueLicense() {
	if(arguments.length > 0){
		var newLicId = aa.cap.getCapID(arguments[0]).getOutput();
		var newLicIdString = arguments[0];
	}
	else{
		newLicId = createParent(appTypeArray[0], appTypeArray[1], appTypeArray[2], "License",null)
		if(newLicId){
			editContactType("Applicant", "License Holder", newLicId)
			copyOwner(capId, newLicId);
			updateAppStatus("Issued","Original Issuance",newLicId);
			updateTask("License","Active","Updated via Script","Updated via Script",null,newLicId)
			copyAppSpecific(newLicId);
			copyASITables(capId,newLicId);
			
			jsDate = new Date()
			jsDate.setHours(0,0,0,0)
			jsDate.setMonth(11)
			jsDate.setDate(31)
			
			switch(""+AInfo["Select Number of Years for Registration"]) {
				case "1 Year":
					jsDate.setFullYear(jsDate.getFullYear()+1)
					break;
				case "2 Year":
					jsDate.setFullYear(jsDate.getFullYear()+2)
					break;
			}
			
			newLicIdString = newLicId.getCustomID();
			lic = new licenseObject(newLicIdString,newLicId);
			lic.setStatus("Active");
			lic.setExpiration(jsDateToASIDate(jsDate));
			saveId = capId
			capId = newLicId
			createRefLicProf(newLicIdString,"Contractor","License Holder")
			capId = saveId
		}
	}
}