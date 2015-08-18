var googleapis = require('googleapis');
var drive = googleapis.drive('v2');
/**
 * The JWT authorization is ideal for performing server-to-server communication without
 * asking for user consent.
 *
 * Suggested reading for Admin SDK users using service accounts:
 * https://developers.google.com/admin-sdk/directory/v1/guides/delegation
 *
 * Note on the private_key.pem:
 * Node.js currently does not support direct access to the keys stored within PKCS12 file
 * (see issue comment https://github.com/joyent/node/issues/4050#issuecomment-8816304)
 * so the private key must be extracted and converted to a passphrase-less RSA key:
 * Convert the .p12 file to .pem: openssl pkcs12 -in key.p12 -out key.pem -nocerts
 * Remove the passphrase from the .pem file: openssl rsa -in key.pem -out key.pem
 */
var authClient = new googleapis.auth.JWT(
    '1098288519249-l0o2d540m11bvd823trbsn2gv5j55lns@developer.gserviceaccount.com',
    './newfile.pem',
    // Contents of private_key.pem if you want to load the pem file yourself
    // (do not use the path parameter above if using this param)
    null,
    ['https://www.googleapis.com/auth/drive'],
    // User to impersonate (leave empty if no impersonation needed)
    'deepak@saarang.org');

authClient.authorize(function(err, tokens) {
  if (err) {
    console.log(err);
    return;
  }
  else {
    drive.files.list({ auth: authClient }, function(err, resp) {
      var files = resp.items;
      if(files.length==0){
        console.log("no files found");
        return;
      }
      else {
        var i=0;
        for(;i<files.length;i++){
          console.log(files[i].title+'  '+files[i].id);
        }
      }
    });
    drive.files.insert({
      resource: {
        title: 'Test_Upload_from_service_account',
        mimeType: 'text/plain'
      },
      media: {
        mimeType: 'text/plain',
        body: 'Hello World'
      },
      auth:authClient
    },function (err,response){
      if(err){
        console.log("error");
      }
      else {
        console.log("file successfully uploaded");
      }
    });
  }
  // Make an authorized request to list Drive files.
  // googleapis.drive.files.list().withAuthClient(authClient).execute()...
});