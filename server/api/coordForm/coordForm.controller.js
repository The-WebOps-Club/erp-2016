'use strict';

var _ = require('lodash');
var CoordForm = require('./coordForm.model');
var Response = require('./response.model');
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
	CoordForm.findById(req.params.id, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form) { return res.send(404); }
		return res.json(form);
	});
};

// Get a form by category
exports.showByCategory = function(req, res) {
	CoordForm.find( {form_department : req.params.category}, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form[0]) return res.send(404); 
		return res.json(form[0]);
	});
};

// Get filled form values of the user
exports.showValues = function(req, res) {
	Response.findOne({$and: [{form: form.id}, {user: req.user._id}]}, function (err, response) {
		if(err) {
			return handleError(res, err);
		}
		if(!response){
			res.send(404);
		}
		else {
			res.json(response);
		}
	});
};

// sends forms applied by the user
exports.showByIdArray = function(req, res) {
	Response.find({user: req.user._id}, function (err, response){
		if(err) { return handleError(res, err); }
		if(!response) { 
			return res.send(404); 
		} else {
			return res.json(response);
		}
	});
};

// gets all the responses for a given category for admin
exports.showValuesAll = function(req, res) {
	Response.find({form: req.params.id}, function (err, response){
		if(err) { return handleError(res, err); }
		if(!form[0]) { 
			return res.send(404); 
		} else {
			return res.json(response);
		}
	});
};

// Create a new form in the db
exports.create = function(req, res) {
	// Do we even need this? Can't we do newForm = new CoordForm(req.body);
	console.log(req.body);
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
		} 
		else {
			var len2 = req.body.formValues.length;
			var values = req.body.formValues;
			/**
			 * sanitizing the form data 
			 */
			for(var i=0; i<len2; i++) {
				if(values[i].field_value) {
					values[i].field_value = values[i].field_value.replace('/', '');
					values[i].field_value = values[i].field_value.replace('<', '');
					values[i].field_value = values[i].field_value.replace('>', '');
					values[i].field_value = values[i].field_value.replace('*', '');
				} else
					values[i].field_value = '';
			}
			console.log(form._id, req.user._id);
			Response.findOne({$and: [{form: form.id}, {user: req.user._id}]}, function (err, response) {
				if(err) {
					return handleError(res, err);
				}
				if(!response){
					response = new Response();
					response.form  = form._id;
					response.user = req.user._id;
					response.valid = validateForm(res, form, req.body.formValues);
					response.values = values;

					response.save(function (err) {
						if(err) return validationError(res, err);
						else res.send({type: 'success', msg: 'Updated successfully'});
					});
				}
				else {
					console.log(response);
					response.values = values;
					response.updatedOn = Date.now();
					response.valid = validateForm(res, form, req.body.formValues);

					response.save(function(err) {
						if(err) return validationError(res, err);
						else res.send({type: 'success', msg: 'Updated successfully'});
					});
				}
			});
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
