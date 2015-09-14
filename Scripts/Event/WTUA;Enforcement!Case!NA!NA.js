//Script 50
if (wfTask == "Complaint Intake" && wfStatus == "ActiveAssigned") {
	var today = new Date()
	scheduleInspectDate("Initial Investigation",jsDateToASIDate(today),wfStaffUserID)
}