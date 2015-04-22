'use strict';

var _ = require('lodash');
var CoordForm = require('./coordForm.model');
var Response = require('./response.model');
var User = require('../user/user.model');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

// Get the list of forms
exports.index = function(req, res) {
	CoordForm.find(function (err, forms) {
		if(err) { return handleError(res, err); }
		return res.status(200).json(forms);
	})
	.populate('department subDepartment', 'name');
};	

// Get a single form or all forms by id
exports.showById = function(req, res) {
	CoordForm.findById(req.params.id, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form) { return res.sendStatus(404); }
		return res.json(form);
	});
};

// Get a form by category
exports.showByDepartment = function(req, res) {
	CoordForm.find({department : req.params.department}, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form[0]) return res.sendStatus(404); 
		return res.json(form);
	});
};

// Get form for the given formId
exports.getForm = function(req, res) {
	CoordForm.findById(req.params.id, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form) { return res.sendStatus(404); }
		return res.json(form);
	})
	.populate('department')
	.populate('subDepartment');
};

// Get response for the given formId and user
exports.getResponse = function(req, res) {
	Response.findOne({$and: [{form: req.params.id}, {user: req.user._id}]}, function (err, response) {
		if(err) { return handleError(res, err); }
		if(!response) { return res.sendStatus(404); }
		return res.json(response);
	})
	.populate('form', 'name');
};

exports.showResponse = function (req, res) {
	Response.findById(req.params.id, function (err, response) {
		if(err) { return handleError(res, err); }
		if(!response) { return res.sendStatus(404); }
		return res.json(response);
	})
	.populate('user', 'name cgpa')
	.populate('form', 'name department subDepartment position');
}

// sends forms applied by the user
exports.showByUser = function(req, res) {
	Response.find({user: req.user._id}, function (err, response) {
		if(err) { return handleError(res, err); }
		if(!response) { return res.sendStatus(404); }
		return res.json(response);
	})
	.populate('form', 'name department position');
};

// gets all the responses for a given category for core
exports.showAllResponses = function(req, res) {
	CoordForm.findById(req.params.id, function (err, coordForm) {
		if(err) { return handleError(res, err); }
		if(!coordForm) { return res.sendStatus(404); }
		Response.find({form: coordForm._id}, function (err, response) {
			if(err) { return handleError(res, err); }
			if(!response) { return res.sendStatus(404); }
			console.log(response);
			return res.json(response);
		})
		.populate('user', 'name cgpa')
		.populate('form', 'name department subDepartment position');
	});
};

// Create a new form in the db
exports.create = function(req, res) {
	var newForm = new CoordForm(req.body); 

	// console.log(formDetails.formValues.fields);
	newForm.createdOn = Date.now();
	newForm.updatedOn = Date.now();
	newForm.save(function (err, form) {
		if(err) return validationError(res, err);
		else res.send({type: 'success', msg: 'Created successfully'});
	});
};

// Saves the form into the database
exports.saveForm = function (req, res) {
	// should not send this formId using req.body :(
	CoordForm.findById(req.body.formId, function (err, form) {
		console.log(req.body.formId);
		if(err) { return handleError(res, err); }
		if(!form) { return res.sendStatus(404); } 

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
		// console.log(form._id, req.user._id);
		Response.findOne({$and: [{form: form._id}, {user: req.user._id}]}, function (err, response) {
			if(err) { return handleError(res, err); }
			if(!response) {
				response = new Response();
				response.form  = form._id;
				response.user = req.user._id;
				response.valid = validateForm(res, form, values);
				response.fields = values;
				if(req.body.fileId)	response.fileId = req.body.fileId;

				response.createdOn = Date.now();
				response.updatedOn = Date.now();
				response.save(function (err) {
					if(err) return validationError(res, err);
					else res.send({type: 'success', msg: 'Applied and saved successfully'});
				});
			} else {
				// console.log(values);
				response.fields = values;
				if(req.body.fileId)	response.fileId = req.body.fileId;
				response.updatedOn = Date.now();
				response.valid = validateForm(res, form, req.body.formValues);

				response.save(function (err) {
					if(err) return validationError(res, err);
					else res.send({type: 'success', msg: 'Saved successfully'});
				});
			}
		});
	});
};

exports.updateResponse = function (req, res) {
	if(req.body._id) { delete req.body._id; }
	Response.findById(req.params.id, function (err, response) {
		if (err) { return handleError(res, err); }
		if(!response) { return res.sendStatus(404); }
		var updated = _.merge(response, req.body);
		// console.log(response);
		response.updatedOn = Date.now();
		response.save(function (err) {
			if (err) { return handleError(res, err); }
			// console.log(response);
		  	return res.json(response);
		});
	});
}

// Deletes a response from the db
exports.deleteApp = function(req, res) {
	console.log(req.body.formId);
	console.log(req.user._id);
	Response.remove({$and: [{form: req.body.formId}, {user: req.user._id}]}, function (err, response) {
		if(err) { return handleError(res, err); }
		if(!response) { return res.sendStatus(404); }
		return res.status(200).json(response);
	});
};

// Deletes a form from the db
exports.destroy = function (req, res) {
	CoordForm.findByIdAndRemove(req.params.id, function (err, form) {
		if(err) { return handleError(res, err); }
		if(!form) { return res.sendStatus(404); }
		return res.send({type: 'success', msg: 'Successfully removed'});
	});
};

function handleError(res, err) {
	return res.status(500).json(err);
}


function validateForm(res, form, formValues) {
	var validated = false;
	var len1 = form.fields.length;
	var len2 = formValues.length;
	var j = 0;
	var i = 1;
	if(len1 !== len2) {
		res.send({type: 'danger', msg: 'Bloody Hell'});
	} else {
		while(j<len1) {
			if(form.fields[j].field_required) {
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
