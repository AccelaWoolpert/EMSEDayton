//Script 5
if (matches(appTypeArray[1],"Gas","Electrical","Mechanical","Plumbing","Sewer","Water") && matches(appTypeArray[2],"Residential")) {
	if (!matches(ApplicantContactType,"Owner","Trade Contractor")){
		showMessage = true
		cancel = true
		logMessage("Applicant must be an 'Owner' or a 'Trade Contractor'")
	}
}

//Script 6
if (matches(appTypeArray[1],"Mechanical")) {
	if (AdditionalInfoValuation <= 0 ){
		showMessage = true
		cancel = true
		logMessage("Must have a Job Cost greater than zero.")
	}
}