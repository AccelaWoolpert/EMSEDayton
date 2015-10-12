//Script 5
if (matches(appTypeArray[1],"Gas","Electrical","Mechanical","Plumbing","Sewer","Water") && matches(appTypeArray[2],"Residential")) {
	if (!matches(ApplicantContactType,"Owner","Trade Contractor")){
		showMessage = true
		cancel = true
		logMessage("Applicant must be a 'Owner' or a 'Trade Contractor'")
	}
}