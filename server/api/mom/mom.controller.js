'use strict';

var _ = require('lodash');
var Mom = require('./mom.model');
var PDFDocument = require ('pdfkit');
var fs = require ('fs');
var blobStream = require ('blob-stream');
var i=0;
var j=0;
var options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};
// Get list of moms
exports.index = function(req, res) {
  Mom.find(function (err, moms) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(moms);
  });
};

// Get a single mom
exports.show = function(req, res) {
  Mom.findById(req.params.id, function (err, mom) {
    if(err) { return handleError(res, err); }
    if(!mom) { return res.status(404).send('Not Found'); }
    return res.json(mom);
  });
};

// Creates a new mom in the DB.
exports.create = function(req, res) {
  Mom.create(req.body, function(err, mom) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(mom);
  });
};

// Updates an existing mom in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Mom.findById(req.params.id, function (err, mom) {
    if (err) { return handleError(res, err); }
    if(!mom) { return res.status(404).send('Not Found'); }
    var updated = _.merge(mom, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(mom);
    });
  });
};

// Deletes a mom from the DB.
exports.destroy = function(req, res) {
  Mom.findById(req.params.id, function (err, mom) {
    if(err) { return handleError(res, err); }
    if(!mom) { return res.status(404).send('Not Found'); }
    mom.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.getPdf= function(req,res){
  Mom.findById(req.params.id, function (err, mom) {
  if (err){ return handleError(res, err); }
  console.log(mom.attendedBy[0]);
  console.log(mom.agenda[0]);
  var doc = new PDFDocument; 
  doc.pipe (fs.createWriteStream('output.pdf'));
  var stream = doc.pipe(blobStream());
  

  //pdf formating
  doc.image('server/api/mom/saarang.jpg', 50, 15,{width:80});
  doc.image('server/api/mom/iitm.jpg', 440, 15,{width:80})
  doc.fontSize(20)
   .fillColor('orange')
   .text('Saarang-2016'.slice(0,3) ,220,40,
    {continued: true})
   .fillColor('green')
   .text('Saarang-2016'.slice(3,6),
    {continued: true})
   .fillColor('blue')
   .text('Saarang-2016'.slice(6,10),
    {continued: true})
   .fillColor('black')
   .text('Saarang-2016'.slice(10,12))
   .fontSize(14)
   .fillColor('blue')
   .text(mom.title,240,90,{align:'justify'})
   .fontSize(8)
   .fillColor('black')
   .text(mom.date.toUTCString().slice(0,26),{align: 'right'});
  doc
   .fontSize(9)
   .fillColor('blue')
   .text('Attended By:',60,130,{underline: true});
   
   for(i=0 ; i< mom.attendedBy.length ; i++){
    doc.fontSize(8)
    .fillColor('black')
    .text((i+1)+'. '+mom.attendedBy[i].name);

   }
  doc.text('\n \n');
  doc
   .fontSize(9)
   .fillColor('blue')
   .text('Agenda:',{underline: true});

  for(j=0 ; j< mom.agenda.length ; i++,j++){
    doc.fontSize(8)
    .fillColor('black')
    .text((j+1)+'. '+mom.agenda[j]);
     
   }
  doc.text('\n \n');
  doc
   .fontSize(9)
   .fillColor('blue')
   .text('Updates:',{underline: true});

  for(j=0 ; j< mom.updates.length ; i++,j++){
    doc.fontSize(8)
    .fillColor('black')
    .text((j+1)+'. '+mom.updates[j]);
     
   }
  doc.text('\n \n');
  doc
   .fontSize(9)
   .fillColor('blue')
   .text('Points Discussed:',{underline: true});

  for(j=0 ; j< mom.pointsDiscussed.length ; j++){
    doc.fontSize(8)
    .fillColor('black')
    .text((j+1)+'. '+mom.pointsDiscussed[j]);
    
   }
  
  doc.text('\n \n');
  doc
   .fontSize(9)
   .fillColor('blue')
   .text('Plan Of Action:',{underline: true});

  for(j=0 ; j< mom.planOfAction.length ; j++){
    doc.fontSize(8)
    .fillColor('black')
    .text((j+1)+'. '+mom.planOfAction[j]);
   }

  doc.end();
  stream.on('finish',function(){
    console.log("hi");
    //var blob = stream.toBlob('application/pdf');
    var url = stream.toBlobURL('application/pdf');
    console.log("hi2");

    return res.status(200).send({
        url: url
      });
  });
  
 }).populate('attendedBy'); 

}


function handleError(res, err) {
  return res.status(500).send(err);
}