function closeOutWorkflow(pStatus,pComment) {
	var workflowResult = aa.workflow.getTasks(capId);
  	var wfObj = workflowResult.getOutput();
	
	var fTask;
	var stepnumber;
	var dispositionDate = aa.date.getCurrentDate();
	var wftask;
	
	var  isInspTask = false
	for (i in wfObj) {
		fTask = wfObj[i];
		wftask = fTask.getTaskDescription();
		if (isInspTask ) {
			stepnumber = fTask.getStepNumber();
			if (fTask.activeFlag == "Y" ){	//|| fTask.getDisposition() == "") {
				aa.workflow.handleDisposition(capId,stepnumber,pStatus,dispositionDate,pComment,pComment,systemUserObj,"Y");
				logMessage("Closing Workflow Task " + wftask + " with status " + pStatus);
				logDebug("Closing Workflow Task " + wftask + " with status " + pStatus);
			}
		}
		else {
			if (wftask == "Inspection") isInspTask = true
		}
	}
}