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
var Form = require('./form.model');

var validationError = function(res, err) {
  return res.json(422, err);
};

// Get the list of forms
exports.index = function(req, res) {
	Form.find(function (err, forms) {
		if(err) { return handleError(res, err); }
		return res.json(200, forms);
	});
};	

// Get a single form or all forms by id
exports.showById = function(req, res) {
	if(req.params.id === '0') {
		Form.find({}, function(err, allForms) {
			if(err) return handleError(res, err);
			// NEED TO OPTIMIZE THIS SHIT
			return res.json(200, allForms);
		});
	} else {
		Form.findById(req.params.id, function (err, form) {
			if(err) { return handleError(res, err); }
			if(!form) { return res.send(404); }
			return res.json(form);
		});
	}
};

// Get a form by category
exports.showByCategory = function(req, res) {
	// refer http://docs.mongodb.org/manual/tutorial/query-documents/#match-an-array-element
	// refer http://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value
	Form.find( {'form_category.0.value' : req.params.category}, function (err, form) {
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
	Form.find( {'form_category.0.value' : req.params.category}, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form[0]) { 
			return res.send(404); 
		} else {
			actualForm = form[0];
			var len = actualForm.form_responses.length;
			for(i=0; i<len; i++) {
				// refer http://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
				// debugger;
				if(actualForm.form_responses[i].userId.equals(req.user._id)) {
					return res.json(actualForm.form_responses[i]);
				}
			}						
		}
	});
};

// gets all the responses for a given category for admin
exports.showValuesAll = function(req, res) {
	var actualForm = {};
	Form.find( {'form_category.0.value' : req.params.category}, function (err, form) {
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
	var newForm = new Form(); 
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

exports.submitForm = function(req, res) {
	Form.findById(req.body.formId, function(err, form) {
		if(err) { return handleError(res, err); }
		if(!form) { 
			return res.send(404); 
		} else {
			var validated = false;
			var chosenDept = false;

			if(req.user.applied_for.length) {
				if(form.form_category[0].value === req.user.applied_for[0].value) {
					chosenDept = true;
				}
			}

			validated = validateForm(res, form, req.body.formValues, chosenDept);
			// console.log(validated);

			if(validated) {
				var len = form.form_responses.length;
				var old_user = false;
				var userFound = -1;
				var len2 = req.body.formValues.length;
				var values = req.body.formValues;

				/**
				 * sanitizing the form data 
				 */
				for(var i=0; i<len2; i++) {
					values[i].field_value = values[i].field_value.replace('/', '');
					values[i].field_value = values[i].field_value.replace('<', '');
					values[i].field_value = values[i].field_value.replace('>', '');
					values[i].field_value = values[i].field_value.replace('*', '');
				}

				for(var i=0; i<len; i++) {
					if(form.form_responses[i].userId.equals(req.user._id)) {					 
						userFound = i;
					}
				}

				if(userFound >= 0) {
					form.form_responses[userFound].values = values;
					form.form_responses[userFound].responseUpdatedOn = Date.now();

					form.updated_on = Date.now();

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

					form.form_responses.push(fVal);

					form.save(function(err) {
						if(err) return validationError(res, err);
						else res.send({type: 'success', msg: 'Updated successfully'});
					});
				}
			} else {
				res.send({type: 'danger', msg: 'Please fill all the required details!'});
			}
		}
	});
};

// Deletes a form from the db
exports.destroy = function(req, res) {
	Form.findByIdAndRemove(req.body.del_id, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form) { return res.send(404); }
		return res.send({type: 'success', msg: 'Successfully removed'});
	});
};

// Uploads a file to the db
exports.upload = function(req, res) {
	console.log('hi');
};

function handleError(res, err) {
	return res.send(500, err);
}


function validateForm(res, form, formValues, chosenDept) {
	var validated = false;
	if(chosenDept) {
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
	}
	// console.log(i);
	return validated;
}
