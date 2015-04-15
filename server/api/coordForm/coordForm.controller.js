/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var CoordForm = require('./coordForm.model');
var User = require('../user/user.model');

var validationError = function(res, err) {
  return res.json(422, err);
};

// Get the list of forms
exports.index = function(req, res) {
	CoordForm.find(function (err, forms) {
		if(err) { return handleError(res, err); }
		return res.json(200, forms);
	});
};	

// Get a single form or all forms by id
exports.showById = function(req, res) {
	if(req.params.id === '0') {
		CoordForm.find({}, function(err, allForms) {
			if(err) return handleError(res, err);
			// NEED TO OPTIMIZE THIS SHIT
			return res.json(200, allForms);
		});
	} else {
		CoordForm.findById(req.params.id, function (err, form) {
			if(err) { return handleError(res, err); }
			if(!form) { return res.send(404); }

			var i = 0;
			var len = form.form_responses.length;
			for(i=0; i<len; i++) {
				// refer http://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
				if(form.form_responses[i].userId.equals(req.user._id))
					form.form_responses = form.form_responses[i];
			}					
			return res.json(form);
		});
	}
};

// Get a form by category
exports.showByCategory = function(req, res) {
	// refer http://docs.mongodb.org/manual/tutorial/query-documents/#match-an-array-element
	// refer http://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value
	CoordForm.find( {'form_category.0.value' : req.params.category}, function (err, form) {
		// console.log('params : ' + req.params.category);
		if(err) { return handleError(res, err); }
		if(!form[0]) return res.send(404); 
		return res.json(form[0]);
	});
};

// Get filled form values of the user
exports.showValues = function(req, res) {
	var actualForm = {};
	var i = 0;
	CoordForm.findById(req.params.id, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form) { 
			return res.send(404); 
		} else {
			actualForm = form;
			var len = actualForm.form_responses.length;
			for(i=0; i<len; i++) {
				// refer http://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
				if(actualForm.form_responses[i].userId.equals(req.user._id)) {
					return res.json(200, actualForm.form_responses[i]);
				}
			}						
		}
	});
};

// sends forms applied by the user
exports.showByIdArray = function(req, res) {
	var actualForm = {};
	var send = [];
	var numForms = 0;
	var i, j = 0;
	// refer http://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
	CoordForm.find({
		'_id': { $in: req.user.formApplied }
	}, function (err, forms) {
		if(err) { return handleError(res, err); }
		if(!forms.length) {
			return res.send(404);
		} else {
			numForms = forms.length;
			for(j=0; j<numForms; j++) {
				actualForm = forms[j];
				var len = actualForm.form_responses.length;
				for(i=0; i<len; i++) {
					// refer http://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
					if(actualForm.form_responses[i].userId.equals(req.user._id)) {
						actualForm.form_responses = actualForm.form_responses[i];
						send.push(actualForm);
					}
				}					
			}
			// console.log(send);	
			res.json(200, send);		
		}
	});
};

// gets all the responses for a given category for admin
exports.showValuesAll = function(req, res) {
	var actualForm = {};
	CoordForm.find( {'form_category.0.value' : req.params.category}, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form[0]) { 
			return res.send(404); 
		} else {
			// console.log(form[0].form_responses);
			actualForm = form[0];
			return res.json(actualForm.form_responses);
		}
	});
};

// Create a new form in the db
exports.create = function(req, res) {
	var newForm = new CoordForm(); 
	var formDetails = req.body;
	
	// need to make alerts here after authenticating the details
	newForm.form_id = formDetails.formValues.form_id;
	newForm.form_name = formDetails.formValues.form_name;
	newForm.form_department = formDetails.formValues.form_department;
	newForm.form_subDepartment = formDetails.formValues.form_subDepartment;
	newForm.form_position = formDetails.formValues.form_position;
	newForm.form_fields = formDetails.formValues.form_fields;

	// console.log(formDetails.formValues.form_fields);
	newForm.save(function(err, form) {
		if(err) return validationError(res, err);
		else res.send({type: 'success', msg: 'Created successfully'});
	});
};

// Saves the form into the database
exports.saveForm = function(req, res) {
	// should not send this formId using req.body :(
	CoordForm.findById(req.body.formId, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form) { 
			return res.send(404); 
		} else {
			var validated = false;

			validated = validateForm(res, form, req.body.formValues);
			// console.log(validated);

				var len1 = form.form_responses.length;
				var old_user = false;
				var userFound = -1;
				var len2 = req.body.formValues.length;
				var values = req.body.formValues;
			
					/**
				 * sanitizing the form data 
				 */
				for(var i=0; i<len2; i++) {
					console.log(values[i].field_value);
					if(values[i].field_value) {
						values[i].field_value = values[i].field_value.replace('/', '');
						values[i].field_value = values[i].field_value.replace('<', '');
						values[i].field_value = values[i].field_value.replace('>', '');
						values[i].field_value = values[i].field_value.replace('*', '');
					} else
						values[i].field_value = '';
				}

				for(var i=0; i<len1; i++) {
					if(form.form_responses[i].userId.equals(req.user._id)) {					 
						userFound = i;
					}
				}

				if(userFound >= 0) {
					form.form_responses[userFound].values = values;
					form.form_responses[userFound].responseUpdatedOn = Date.now();

					form.updated_on = Date.now();

					if(!validated)
						form.form_responses[userFound].validation = false;
					else
						form.form_responses[userFound].validation = true;

					form.markModified('updated_on');
					form.markModified('form_responses');

					form.save(function(err) {
						if(err) return validationError(res, err);
						else res.send({type: 'success', msg: 'Updated successfully'});
					});
				
					old_user = true;
				}
				
				if(old_user !== true) {
					var fVal = {}
					fVal.values = values;
					fVal.userId = req.user._id;
					fVal.userName = req.user.name;
					fVal.userEmail = req.user.email;
					fVal.responseCreatedOn = Date.now();
					fVal.responseUpdatedOn = Date.now();

					if(!validated)
						fVal.validation = false;
					else
						fval.validation = true;

					form.form_responses.push(fVal);

					// updating the user kind of jugad but easy and better option
					User.findById(req.user._id, function (err, user) {
						if(err) { validationError(res, err); }
						if(!user) { res.send(404); }

						// var tmp = {};
						// tmp['formId'] = req.body.formId;
						// tmp['department'] = req.body.formDept[0];
						// tmp['subDepartment'] = req.body.formSubDept[0];
						// tmp['position'] = req.body.formPosition[0];
						// user.formApplied.push(tmp);
						user.formApplied.push(req.body.formId);
						user.save(function (err) {
							if(err) { return validationError(res, err); }
						});
					});

					form.save(function (err) {
						if(err) return validationError(res, err);
						else res.send({type: 'success', msg: 'Updated successfully'});
					});
				}
		}
	});
};
// Deletes a form from the db
exports.destroy = function(req, res) {
	CoordForm.findByIdAndRemove(req.body.del_id, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form) { return res.send(404); }
		return res.send({type: 'success', msg: 'Successfully removed'});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}


function validateForm(res, form, formValues) {
	var validated = false;
	var len1 = form.form_fields.length;
	var len2 = formValues.length;
	var j = 0;
	var i = 1;
	if(len1 !== len2) {
		res.send({type: 'danger', msg: 'Bloody Hell'});
	} else {
		while(j<len1) {
			if(form.form_fields[j].field_required) {
				if(formValues[j].field_value)
					i *= 1;
				else
					i *= 0;
			}
			j++;
		}

		if(i === 1)
			validated = true;
		else
			validated = false;
	}
	// console.log(i);
	return validated;
}
