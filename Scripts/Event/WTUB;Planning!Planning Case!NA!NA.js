/* Start Validation of ASI Fields */
var requiredASIbyCaseType = []
requiredASIbyCaseType["Planned Development"] = ["Public Hearing Ad Date","City Commission Action"]
requiredASIbyCaseType["Area Wide Rezoning"] = ["Public Hearing Ad Date","City Commission Action"]
requiredASIbyCaseType["Urban Renewal Plans"] = ["Public Hearing Ad Date","City Commission Action"]
// requiredASIbyCaseType["Urban/Strategy/Policy"] = ["City Commission Action"] 			//Case Type doesn't exist........
requiredASIbyCaseType["Zoning Code Text Amendment"] = ["Public Hearing Ad Date","City Commission Action"]

validateRequiredPlanningASI(requiredASIbyCaseType)
/* --- End Validation --- */